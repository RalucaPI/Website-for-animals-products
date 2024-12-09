import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TiHeartOutline, TiHeart } from "react-icons/ti";
import Context from '../context/Context';

export function Page() {
    const { allproducts, handleAddToCart, favorite, handleAddToFavorites } = useContext(Context);

    // Define an array of colors for the product cards and buttons
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

    return (
        <div className="p-4">
            <h1 className="text-4xl text-center mb-14 mt-8 font-bold">Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-1 mx-2">
                {allproducts.map((product, index) => {
                    const { id, name, image, price, category } = product;

                    // Pick a color based on the product index
                    const backgroundColor = colors[index % colors.length];
                    const buttonColor = colors[(index + 1) % colors.length]; // Slightly different color for the button

                    // Check if the product is already in favorites
                    const isFavorite = favorite[id];

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
                                        className="focus:outline-none text-black font-medium rounded-lg text-sm w-full py-2 px-4"
                                        style={{
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
    );
}