import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { TiHeartOutline, TiHeart } from "react-icons/ti";
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import { database, auth } from '../../firebase/firebase'; // Adjust import paths as needed
import Context from '../../context/Context';

export const ProductPage = () => {
    const { id } = useParams();
    const context = useContext(Context);
    const {
        allproducts,
        handleAddToCart,
        handleAddToFavorites,
        favorite,
        loading,
    } = context;

    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [secondaryImages, setSecondaryImages] = useState([]);
    const [selectedTab, setSelectedTab] = useState('description');
    const [reviewText, setReviewText] = useState('');
    const [clientName, setClientName] = useState('');
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        if (allproducts && allproducts.length > 0) {
            const selectedProduct = allproducts.find((p) => p.id === id);
            if (selectedProduct) {
                setProduct(selectedProduct);
                setMainImage(selectedProduct.image || '');
                setSecondaryImages([selectedProduct.image2, selectedProduct.image3].filter(Boolean));
                fetchReviews();
            }
        }
    }, [id, allproducts]);

    const handleImageClick = (image, index) => {
        const newSecondaryImages = [...secondaryImages];
        newSecondaryImages[index] = mainImage;
        setMainImage(image);
        setSecondaryImages(newSecondaryImages);
    };

    const RenderStars = ({ rating, onClick }) => (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => {
                const starRating = index + 1;
                return (
                    <FaStar
                        key={index}
                        size={24}
                        className={starRating <= rating ? "text-yellow-500" : "text-black"}
                        onClick={() => onClick(starRating)}
                    />
                );
            })}
        </div>
    );

    const fetchReviews = async () => {
        try {
            const reviewsRef = query(collection(database, `Reviews/${id}/Reviews`));
            const snapshot = await getDocs(reviewsRef);
            const reviewsData = snapshot.docs.map((doc) => doc.data());
            setReviews(reviewsData);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const submitReview = async () => {
        if (!auth.currentUser) {
            setError("You must be logged in to submit a review.");
            return;
        }

        if (!clientName || !reviewText || rating === 0) {
            setError("All fields are required.");
            return;
        }

        try {
            const reviewsRef = collection(database, `Reviews/${id}/Reviews`);
            await addDoc(reviewsRef, {
                clientName,
                reviewText,
                rating,
                productId: id,
                timestamp: new Date().toISOString(),
            });

            setReviewText('');
            setClientName('');
            setRating(0);
            setError('');
            fetchReviews();
        } catch (error) {
            console.error("Error submitting review:", error);
            setError("Failed to submit review. Please try again.");
        }
    };

    const isFavorite = favorite[product?.id];

    return (
        <div className="flex flex-col items-center font-serif overflow-hidden">
            {loading && <p>Loading...</p>}
            {product && (
                <>
                    <div className="flex mt-12">
                        <div className="flex flex-col mr-5">
                            {secondaryImages.map((image, index) => (
                                <img
                                    key={index}
                                    className="w-24 h-auto my-2 cursor-pointer"
                                    src={image}
                                    alt={`Secondary ${index}`}
                                    onClick={() => handleImageClick(image, index)}
                                />
                            ))}
                        </div>
                        <img className="w-96 h-96" src={mainImage} alt={product.name} />
                        <div className="flex flex-col items-start bg-gray-100 m-1 w-96 p-4">
                            <h2 className="text-xl border-b-2 border-black">{product.name}</h2>
                            <p>Price: {product.price} Lei</p>
                            <div className="flex justify-between items-center w-full mt-4">
                                <button
                                    className={`fa-heart ${isFavorite ? 'text-red-500' : 'text-black'}`}
                                    onClick={() => handleAddToFavorites(product)}
                                >
                                    {isFavorite ? <TiHeart size={30} color="red" /> : <TiHeartOutline size={30} />}
                                </button>
                                <button
                                    className="text-white bg-black w-full py-2 mt-4"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-1/2 mt-5 border-b-2 border-black">
                        <button
                            className={`flex-1 py-2 px-4 ${selectedTab === 'description' ? 'font-bold' : ''}`}
                            onClick={() => setSelectedTab('description')}
                        >
                            Description
                        </button>
                        <button
                            className={`flex-1 py-2 px-4 ${selectedTab === 'reviews' ? 'font-bold' : ''}`}
                            onClick={() => setSelectedTab('reviews')}
                        >
                            Reviews
                        </button>
                    </div>

                    {selectedTab === 'description' && (
                        <div className="w-2/3 mt-5">
                            <p>{product.description}</p>
                        </div>
                    )}

                    {selectedTab === 'reviews' && (
                        <div className="w-2/3 mt-5">
                            <h2>Add a Review</h2>
                            <RenderStars rating={rating} onClick={setRating} />
                            <input
                                type="text"
                                className="w-full mb-4 p-2"
                                placeholder="Your name"
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                            />
                            <textarea
                                className="w-full mb-4 p-2"
                                placeholder="Write a review..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                            />
                            {error && <p className="text-red-500">{error}</p>}
                            <button onClick={submitReview} className="text-white bg-black py-2 px-4">
                                Submit
                            </button>

                            <h2 className="mt-5">Reviews</h2>
                            {reviews.map((review, index) => (
                                <div key={index} className="border-b py-2">
                                    <p><strong>{review.clientName}</strong>: {review.reviewText}</p>
                                    <RenderStars rating={review.rating} onClick={() => {}} />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
