import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import { TiHeartOutline, TiHeart } from 'react-icons/ti';
import Context from '../../context/Context';
import 'rc-slider/assets/index.css';

function Rodents() {
    const {
        productRodents,
        handleAddToCart,
        favorite,
        setFavorite,
        handleAddToFavorites,
    } = useContext(Context);

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    const colors = [
        '#f8b4b4',
        '#b4d8f8',
        '#f8e1b4',
        '#d8f8b4',
        '#f3b4f8',
        '#ce99ff',
        '#dfccff',
        '#49fdfd',
    ];

    useEffect(() => {
        if (productRodents.length > 0) {
            const prices = productRodents.map((product) => parseFloat(product.price)).filter((price) => !isNaN(price));
            if (prices.length > 0) {
                const min = Math.min(...prices);
                const max = Math.max(...prices);
                setMinPrice(min);
                setMaxPrice(max);
                setPriceRange([min, max]);
            }
            setFilteredProducts(productRodents);
        }
    }, [productRodents]);

    // Apply filters
    useEffect(() => {
        const filtered = productRodents.filter((product) => {
            const price = product.price ? parseFloat(product.price) : null;

            const matchesSearch = search === '' || product.name.toLowerCase().includes(search.toLowerCase());
            const matchesMaterial = selectedMaterials.length === 0 || selectedMaterials.includes(product.material);
            const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.color);
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const matchesPrice = price === null || (price >= priceRange[0] && price <= priceRange[1]);

            return matchesSearch && matchesMaterial && matchesColor && matchesCategory && matchesPrice;
        });

        setFilteredProducts(filtered);
    }, [search, selectedMaterials, selectedColors, selectedCategories, priceRange, productRodents]);

    const toggleFavorite = (productId) => {
        setFavorite((prev) => ({
            ...prev,
            [productId]: !prev[productId],
        }));
    };

    return (
        <>
            <div>
                <h1 className="text-4xl text-center mb-14 mt-8 font-bold">Products for rodents</h1>
            </div>

            <div className="flex">
                <div className="w-1/5 p-4">
                    <div className="filter_container">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products"
                            className="px-4 py-2 w-full rounded-md text-sm my-2 bg-[#e4e4e4] text-black"
                        />

                        <div className="mt-4">
                            <span>Price</span>
                            <Slider
                                range
                                min={minPrice}
                                max={maxPrice}
                                value={priceRange}
                                onChange={setPriceRange}
                                trackStyle={[{ backgroundColor: 'black' }]}
                                handleStyle={[{ borderColor: 'black' }, { borderColor: 'black' }]}
                                railStyle={{ backgroundColor: 'gray' }}
                            />
                            <div className="flex justify-between my-2">
                                <span>{priceRange[0]} Lei</span>
                                <span>{priceRange[1]} Lei</span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <span>Materials</span>
                            <div className="flex flex-col mt-2">
                                {[...new Set(productRodents.map((product) => product.material).filter(Boolean))].map(
                                    (material, index) => (
                                        <label key={index} className="flex items-center mb-2">
                                            <input
                                                type="checkbox"
                                                value={material}
                                                onChange={(e) => {
                                                    const { value, checked } = e.target;
                                                    setSelectedMaterials((prev) =>
                                                        checked
                                                            ? [...prev, value]
                                                            : prev.filter((mat) => mat !== value)
                                                    );
                                                }}
                                                className="mr-2"
                                            />
                                            {material}
                                        </label>
                                    )
                                )}
                            </div>
                        </div>

                        <div className="mt-4">
                            <span>Colors</span>
                            <div className="flex flex-col mt-2">
                                {[...new Set(productRodents.map((product) => product.color).filter(Boolean))].map(
                                    (color, index) => (
                                        <label key={index} className="flex items-center mb-2">
                                            <input
                                                type="checkbox"
                                                value={color}
                                                onChange={(e) => {
                                                    const { value, checked } = e.target;
                                                    setSelectedColors((prev) =>
                                                        checked
                                                            ? [...prev, value]
                                                            : prev.filter((col) => col !== value)
                                                    );
                                                }}
                                                className="mr-2"
                                            />
                                            {color}
                                        </label>
                                    )
                                )}
                            </div>
                        </div>

                        <div className="mt-4">
                            <span>Category</span>
                            <div className="flex flex-col mt-2">
                                {[...new Set(productRodents.map((product) => product.category).filter(Boolean))].map(
                                    (category, index) => (
                                        <label key={index} className="flex items-center mb-2">
                                            <input
                                                type="checkbox"
                                                value={category}
                                                onChange={(e) => {
                                                    const { value, checked } = e.target;
                                                    setSelectedCategories((prev) =>
                                                        checked
                                                            ? [...prev, value]
                                                            : prev.filter((cat) => cat !== value)
                                                    );
                                                }}
                                                className="mr-2"
                                            />
                                            {category}
                                        </label>
                                    )
                                )}
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setSearch('');
                                setSelectedMaterials([]);
                                setSelectedColors([]);
                                setSelectedCategories([]);
                                setPriceRange([minPrice, maxPrice]);
                            }}
                            className="px-8 py-2 my-4 w-full bg-[#000000] hover:bg-[#454444] text-white text-sm font-medium rounded-md"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                <div className="w-4/5 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product, index) => {
                            const { id, name, image, price, category } = product;
                            const backgroundColor = colors[index % colors.length];
                            const buttonColor = colors[(index + 1) % colors.length];
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
                                                <button onClick={() => handleAddToFavorites(product)}>
                                                    {isFavorite ? <TiHeart size={24} color="red" /> : <TiHeartOutline size={24} />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="leading-relaxed mb-3 mx-2 mt-auto">
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="focus:outline-none text-black font-medium rounded-lg text-sm w-full py-2 px-4"
                                            style={{ backgroundColor: buttonColor, color: 'white' }}
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Rodents;
