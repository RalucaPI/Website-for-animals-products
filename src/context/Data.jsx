import React, { useEffect, useState } from 'react';
import Context from './Context';
import { useParams } from 'react-router-dom';
import { collection, query, onSnapshot, getDocs, setDoc, deleteDoc, doc,getDoc, where,addDoc,updateDoc } from 'firebase/firestore';
import { auth, database } from '../firebase/firebase';
import { onAuthStateChanged } from "firebase/auth";
function Data(props) {
    
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState({});
    const [product, setProduct] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [productCats, setProductCats] = useState([]);
    const [productReptile, setProductReptile] = useState([]);
    const [productFish, setProductFish] = useState([]);
    const [productDogs, setProductDogs] = useState([]);
    const [productBirds, setProductBirds] = useState([]);
    const [productRodents, setProductRodents] = useState([]);
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [account, setAccount] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userAf, setUserAf] = useState(null);
    const { id } = useParams();
    const getProductData = async () => {
        if (!dataLoaded) {
            setLoading(true);

            try {
                const queries = [
                    query(collection(database, 'Bird')),
                    query(collection(database, 'Cat')),
                    query(collection(database, 'Dog')),
                    query(collection(database, 'Reptile')),
                    query(collection(database, 'Fish')),
                    query(collection(database, 'Rodent')),
                ];

                const dataPromises = queries.map((q, index) => {
                    return new Promise((resolve, reject) => {
                        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
                            const productObject = {};
                            const productArray = [];
                            QuerySnapshot.forEach((doc) => {
                                const productData = { ...doc.data(), id: doc.id };
                                productObject[doc.id] = productData;
                                productArray.push(productData);
                            });
                            resolve({ index, productArray, productObject });
                        }, reject);
                    });
                });

                const dataResults = await Promise.all(dataPromises);
                 dataResults.forEach(({ index, productArray, productObject }) => {
                    switch (index) {
                        case 0:
                            setProductBirds(Object.values(productObject));
                            break;
                        case 1:
                            setProductCats(Object.values(productObject));
                            break;
                        case 2:
                            setProductDogs(Object.values(productObject));
                            break;
                        case 3:
                            setProductReptile(Object.values(productObject));
                            break;
                        case 4:
                            setProductFish(Object.values(productObject));
                            break;
                        case 5:
                            setProductRodents(Object.values(productObject));
                            break;
                        default:
                            break;
                    }
                });
               

                setDataLoaded(true);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        getProductData();
    }, [id]);

    const allproducts = [...productBirds, ...productDogs, ...productFish,
        ...productCats, ...productRodents, ...productReptile,
    ];
    const prodrand = [...productBirds.slice(0, 5), ...productDogs.slice(0, 5),
        ...productFish.slice(0, 5), ...productCats.slice(0, 5),
        ...productRodents.slice(0, 5), ...productReptile.slice(0, 5)
    ];


    const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    email: '',
    telephone: '',
    address: '',
    locality: ''
  });

    const [cartProducts, setCartProducts] = useState([]);
    useEffect(() => {
        const fetchcartProducts = async () => {
            if (user) {
                const productSnapshot = await getDocs(collection(database, `Customer/UID ${user.uid}/Cart`));
                const productsList = productSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCartProducts(productsList);
            }
        };

        fetchcartProducts();
    }, [user]);

    const parsePrice = (price) => parseFloat(price.toString().replace(/\./g, '').replace(/,/g, '.'));

    const productInc = (cartProduct) => {
    const updatedCartProducts = cartProducts.map((product) => {
        if (product.firestoreId === cartProduct.firestoreId) {
            const updatedProduct = { ...product };
            updatedProduct.quantity += 1;
            updatedProduct.totalPrice = updatedProduct.quantity * parsePrice(updatedProduct.price);
            return updatedProduct;
        }
        return product;
    });

    setCartProducts(updatedCartProducts);

    if (user) {
        updateDoc(doc(database, `Customer/UID ${auth.currentUser.uid}/Cart`, cartProduct.firestoreId), {
            quantity: cartProduct.quantity + 1,
            totalPrice: (cartProduct.quantity + 1) * parsePrice(cartProduct.price),
        }).then(() => {
            console.log('Marire');
        }).catch((error) => {
            console.error('Error updating product:', error);
        });
    } else {
        console.log('Nu sunteti conectat');
    }
};


    const productDec = (cartProduct) => {
    if (cartProduct.quantity > 1) {
        const updatedCartProducts = cartProducts.map((product) => {
            if (product.firestoreId === cartProduct.firestoreId) {
                const updatedProduct = { ...product };
                updatedProduct.quantity -= 1;
                updatedProduct.totalPrice = updatedProduct.quantity * parsePrice(updatedProduct.price);
                return updatedProduct;
            }
            return product;
        });

        setCartProducts(updatedCartProducts);

        if (user) {
            updateDoc(doc(database, `Customer/UID ${auth.currentUser.uid}/Cart`, cartProduct.firestoreId), {
                quantity: cartProduct.quantity - 1,
                totalPrice: (cartProduct.quantity - 1) * parsePrice(cartProduct.price),
            }).then(() => {
                console.log('Micsorare');
            }).catch((error) => {
                console.error('Eroare:', error);
            });
        } else {
            console.log('Nu sunteti conectat');
        }
    } else {
        deleteProduct(cartProduct);
    }
};


   const deleteProduct = async (cartProduct) => {
        try {
            await deleteDoc(doc(database, `Customer/UID ${auth.currentUser.uid}/Cart`, cartProduct.firestoreId));
            console.log('Sterge');
            setCartProducts(prevcartProducts => prevcartProducts.filter(item => item.firestoreId !== cartProduct.firestoreId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };


    const totalPrice = cartProducts.reduce((total, product) => total + (product.quantity * parsePrice(product.price)), 0).toFixed(2);
    const nrProd = cartProducts.reduce((total, product) => total + product.quantity, 0);
    const addproduct = async (product, collectionName) => {
        try {
            const collectionRef = collection(database, collectionName);
            await addDoc(collectionRef, product);
            console.log(`Product added to collection: ${collectionName}`);
        } catch (error) {
            console.error('Error adding product to Firebase:', error);
        }
};
    const addProductToFirebase = async (product, collectionName) => {
    try {
        const collectionRef = collection(database, collectionName);
        await addDoc(collectionRef, product);
        console.log(`Product added to collection: ${collectionName}`);
    } catch (error) {
        console.error('Error adding product to Firebase:', error);
    }
    };

    ////////////////////////////////////////////       Add to cart         /////////////////////////////////////////
  const addToCart = async (product) => {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    console.error('User is not logged in');
    setShowAlert(true); // Show alert to log in if applicable
    return;
  }

  if (!product || !product.id) {
    console.error('Product or Product ID is missing', product);
    return;
  }

  try {
    const cartRef = collection(database, `Customer/UID ${uid}/Cart`);
    const productToSave = {
      id: product.id,
      image: product.image,
      name: product.name,
      price: product.price,
      quantity: 1,
      totalPrice: product.price,
    };

    const cartSnapshot = await getDocs(
      query(cartRef, where('id', '==', product.id))
    );

    if (!cartSnapshot.empty) {
      const cartDoc = cartSnapshot.docs[0];
      const cartProduct = cartDoc.data();
      const updatedQuantity = cartProduct.quantity + 1;

      await updateDoc(cartDoc.ref, {
        quantity: updatedQuantity,
        totalPrice: updatedQuantity * cartProduct.price,
      });
    } else {
      const docRef = await addDoc(cartRef, productToSave);
      setCartProducts((prev) => [
        ...prev,
        { ...productToSave, firestoreId: docRef.id },
      ]);
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};


const handleAddToCart = (product) => {
    addToCart({ ...product });
};


    //////////////////////////////////////        Add to favorites              ////////////////////////////////////
    

const [favorite, setFavorite] = useState({});
const [productId, setProductId] = useState(null);

useEffect(() => {
    if (user) {
        updateFavorites(user.uid);
    }
}, [user]);

const updateFavorites = async (uid) => {
    if (!uid) return;
    const favoritesRef = collection(database, `Customer/UID ${uid}/Favorites`);
    const snapshot = await getDocs(favoritesRef);
    const favoritesData = snapshot.docs.reduce((acc, doc) => {
        acc[doc.id] = doc.data();
        return acc;
    }, {});
    setFavorite(favoritesData);
};

const isInFavorites = !!favorite[productId];
const heartClass = isInFavorites ? 'text-red-500' : 'text-black';

const addToFavorites = async (product) => {
    const uid = auth.currentUser?.uid;

    if (!uid || !product || !product.id) {
        console.error('User ID, Product, or Product ID is missing', uid, product, product.id);
        return;
    }

    const favoriteRef = doc(database, `Customer/UID ${uid}/Favorites`, product.id);
    const favoriteSnapshot = await getDoc(favoriteRef);

    if (favoriteSnapshot.exists()) {
        await deleteDoc(favoriteRef);
        setFavorite((prev) => {
            const updatedFavorites = { ...prev };
            delete updatedFavorites[product.id];
            return updatedFavorites;
        });
    } else {
        await setDoc(favoriteRef, product);
        setFavorite((prev) => ({ ...prev, [product.id]: product }));
    }
    updateFavorites(uid);
};

useEffect(() => {
    if (products && products.id) {
        setProductId(products.id);
    }
}, [products]);

const handleAddToFavorites = (product) => {
    addToFavorites(product);
};

const [showAlert, setShowAlert] = useState(false);

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserAf(currentUser);
        fetchUserData();
      } else {
        setUserAf(null);
        setUsers([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(database, "Users"));
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push({ ...doc.data(), uid: doc.data().uid });
      });
      setUsers(usersArray);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.clear("users");
    setIsLoggedIn(false);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);
   

   return (
       <Context.Provider value={{
           getProductData, id, product, productBirds, productCats, productDogs, productFish, productReptile, productRodents,
           allproducts, prodrand, handleAddToCart, deliveryDetails, setDeliveryDetails, cartProducts, setCartProducts, productDec, productInc,
           nrProd, totalPrice, handleAddToFavorites, favorite, users,setUsers, user, setUser, isLoggedIn, logout, setIsLoggedIn,
           fetchUserData, setUserAf, userAf, account,  loading, setLoading, search, setSearch, addProductToFirebase, addproduct
            }}>
            {props.children}
        </Context.Provider>
    ); 
}
export default Data;