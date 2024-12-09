import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../context/Context';

export const Search = () => {
    const context = useContext(Context);
    const { allproducts, search } = context;

    const filterProducts = allproducts.filter((obj) =>
        (obj.name && obj.name.toLowerCase().includes(search.toLowerCase())) ||
        (obj.category && obj.category.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div>
            <h1 className="text-4xl text-center mb-14 mt-8 font-bold">Search results</h1>
            <div className="flex flex-wrap -m-4 my-4 mx-4">
                {filterProducts.map((product, index) => {
                    const { id, name, image, image2, image3, price, category } = product;
                    const images = [image, image2, image3].filter(Boolean);
                    return (
                        <div
                            key={index}
                            className="p-4 md:w-1/3 lg:w-1/4 xl:w-1/5 md:h-auto drop-shadow-lg"
                        >
                            <div className="h-full border-2 hover:shadow-[#d4d4d4] hover:shadow-2xl transition-shadow duration-300 ease-in-out border-[#cdc8ff] border-opacity-60 rounded-2xl overflow-hidden">
                                <div>
                                    <Link to={`/product/${category}/${id}`}>
                                        <img
                                            className="rounded-2xl w-full h-50 p-2 hover:scale-110 transition-transform duration-300 ease-in-out"
                                            src={images[0]}
                                            alt={name}
                                        />
                                    </Link>
                                </div>
                                <h3 className="title-font text-lg font-medium ml-4 text-gray-900 mb-1 truncate">
                                    <Link to={`/product/${category}/${id}`} className="no-underline text-black">
                                        {name}
                                    </Link>
                                </h3>
                                <div className="tracking-widest text-s title-font font-small mb-1 ml-4">
                                    {price} Lei
                                </div>
                                <div className="leading-relaxed mb-3 mx-2">
                                    <div className="flex justify-between items-center ml-2"></div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
