import React, { useContext, useEffect, useState } from 'react';
import { database, auth } from '../../firebase/firebase';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Plus, Minus, X } from 'phosphor-react';
import Data from '../../context/Data';

export const ShowCart= ({ cartProduct, productIncrement, productDecrement, setCartProduct,productPrice }) => {
    const [product, setProduct] = useState({});
    const { id } = cartProduct;
    const context = useContext(Data);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const productDocRef = doc(database, `Cutomer/UID ${auth.currentUser.uid}/Cart`, id);
                const productDoc = await getDoc(productDocRef);
                if (productDoc.exists()) {
                    setProduct(productDoc.data());
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchProductData();
    }, [id]);

    const increase = () => {
        productIncrement(cartProduct);
    }

    const decrease = () => {
        productDecrement(cartProduct);
    }

      const deleteProduct = async (cartProduct) => {
    try {
        await deleteDoc(doc(database, `Customer/UID ${auth.currentUser.uid}/Cart`, cartProduct.firestoreId));
        console.log('Sterge');
        setCartProduct(prevCartProducts => prevCartProducts.filter(item => item.firestoreId !== cartProduct.firestoreId));
    } catch (error) {
        console.error('Error deleting product:', error);
    }
};

    const truncateTitle = (title) => {
        const words = title.split(' ');
        return words.length > 3 ? `${words.slice(0, 3).join(' ')}...` : title;
    };

    return (
        <tr className="text-center border-b">
            <td className="p-2 text-left">
                <Link to={`/product/${cartProduct.category}/${id}`}>
                    <img
                        src={cartProduct.image}
                        alt="img"
                        className="sm:h-38 sm:w-40 h-26 w-24 rounded-md object-contain object-center cursor-pointer"
                    />
                </Link>
            </td>
            <td className="p-2 no-underline">
                <h3 className="text-sm font-semibold text-black text-left">
                    <Link to={`/product/${cartProduct.category}/${id}`} className="block sm:hidden">
                        {truncateTitle(cartProduct.name)}
                    </Link>
                    <Link to={`/product/${cartProduct.category}/${id}`} className="hidden sm:block text-left text-black no-underline;">
                        {cartProduct.name}
                    </Link>
                </h3>
            </td>
            <td className="p-2">
                <div className="flex items-center justify-center">
                    <div className="border-2 border-black">
                        <button onClick={decrease} type="button" className="h-7 w-7 pt-2">
                            <Minus size={20} />
                        </button>
                        <input
                            type="text"
                            className="mx-1 h-7 w-9 border text-center text-black"
                            value={cartProduct.quantity}
                            readOnly
                        />
                        <button onClick={increase} type="button" className="h-7 w-7 pt-2">
                            <Plus size={20} />
                        </button>
                    </div>
                </div>
            </td>
            <td className="p-2">
                {cartProduct.price} Lei
            </td>
            
            <td className="p-2">
                {cartProduct.totalPrice} Lei
            </td>
            <td className="p-2 text-left">
                <button onClick={deleteProduct} type="button" className="flex items-center justify-center ml-2">
                    <X size={28} />
                </button>
            </td>
        </tr>
    );
};
