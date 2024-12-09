import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TiHeartOutline, TiHeart } from "react-icons/ti";
import Context from '../../context/Context';
import { database, auth } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

export function Favorite() {
    const {handleAddToCart, favorite, handleAddToFavorites, user, setUser} = useContext(Context);
    const [favoriteProducts, setFavoriteProducts] = useState([]);
       const colors = [
        "#f8b4b4", // Light Red
        "#b4d8f8", // Light Blue
        "#f8e1b4", // Light Orange
        "#d8f8b4", // Light Green
        "#f3b4f8", // Light Purple
        "#ce99ff",
        "#dfccff",
        "#49fdfd"
    ];
   
    useEffect(() => {
        const fetchUserData = () => {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    console.log('User logged in:', user);
                    setUser(user);
                } else {
                    console.log('No user logged in');
                }
            });
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchFavoriteProducts = async () => {
            if (user) {
                const uid = user.uid;
                try {
                    const favoriteProductsRef = collection(database, `Customer/UID ${uid}/Favorites`);
                    const favoriteProductsSnapshot = await getDocs(favoriteProductsRef);
                    const favoriteProductsData = favoriteProductsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                    console.log('Fetched favorite products:', favoriteProductsData);
                    setFavoriteProducts(favoriteProductsData);
                } catch (error) {
                    console.error('Error fetching favorite products:', error);
                }
            }
        };

        fetchFavoriteProducts();
    }, [user]);

    return (
        <div>
            <h1 className='text-4xl text-center mb-14 mt-8 font-bold'>Favorite products</h1>
            <div className="card_f">
                <div className='button_heart'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-1 mx-2'>
                        {favoriteProducts.map((product, index) => {
                            const { id, name, image, price, category } = product;
                            const isFavorite = favorite[id];
                            const backgroundColor = colors[index % colors.length];
                            const buttonColor = colors[(index + 1) % colors.length]; 

                            return (
                                  <div
                            key={id}
                            className="border-2 hover:shadow-2xl hover:scale-105 transition-shadow duration-300 ease-in-out 
                                     border-opacity-60 overflow-hidden flex flex-col justify-between min-h-[350px] max-h-[380px]"
                        >
                            <div>
                                <div className="h-[190px] flex justify-center items-center mb-4">
                                    <Link to={`/product/${category}/${id}`}>
                                        <img
                                            className="w-full h-full object-cover mb-4 p-2 hover:scale-105 transition-transform duration-300 ease-in-out"
                                            src={image}
                                            alt={name}
                                        />
                                    </Link>
                                </div>

                                <div className="leading-relaxed mx-2">
                                    <div className="title-font text-lg font-medium text-gray-900 truncate text-center p-2 mt-6">
                                        <Link to={`/product/${category}/${id}`} className="no-underline text-black">
                                            {name}
                                        </Link>
                                    </div>

                                    <div className="flex justify-between items-center px-4">
                                        <div className="tracking-widest text-s title-font font-small mb-1">
                                            {price} Lei
                                        </div>
                                        <button
                                            className="fas fa-heart"
                                            onClick={() => handleAddToFavorites(product)}
                                        >
                                            {isFavorite ? <TiHeart size={24} color="red" /> : <TiHeartOutline size={24} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="leading-relaxed mb-3 mx-2 mt-auto">
                                <div className="flex justify-between items-center">
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        type="button"
                                        className="focus:outline-none text-black font-medium  text-sm w-full py-2 px-4"  style={{
                                            backgroundColor: buttonColor, // Dynamic button color
                                            color: "white", // White text for better contrast
                                        }}
                                       
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
