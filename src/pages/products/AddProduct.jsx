import React, { useState, useContext } from 'react';
import Context from '../../context/Context';

function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    image: '',
    image2: '',
    image3: '',
    description: '',
    material: '',
    color: '',
    size: '',
  });
  const { addproduct } = useContext(Context);
  const [collection, setCollection] = useState(''); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleCollectionChange = (e) => {
    setCollection(e.target.value);
  };

  const handleSubmit = async () => {
    if (!product.name || !product.price || !product.image ||  !collection) {
      setError('Please fill in all required fields and select a collection.');
      setSuccess(false);
      return;
    }

   try {
      await addproduct(product, collection); // Trimite produsul și colecția
      setSuccess(true);
      setError('');
      setProduct({
        name: '',
        price: '',
        image: '',
        image2: '',
        image3: '',
        description: '',
        material: '',
        color: '',
        size: '',
      });
      setCollection('');
    } catch (err) {
      setError('Failed to add product. Please try again.');
      setSuccess(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-[#000000] px-10 py-5 rounded-xl w-full max-w-md shadow-lg">
        <h1 className="text-center text-white text-xl mb-6 font-bold">Add Product</h1>

        {error && (
          <div className="bg-red-500 text-white text-sm p-2 mb-4 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500 text-white text-sm p-2 mb-4 rounded-md">
            Product added successfully!
          </div>
        )}

        <div className="mb-4">
          <select
            value={collection}
            onChange={handleCollectionChange}
            className="bg-[#250606] px-2 py-2 w-full rounded-lg text-white placeholder-gray-300 outline-none"
          >
            <option value="" disabled>
              Select Collection
            </option>
            <option value="Bird">Bird</option>
            <option value="Cat">Cat</option>
            <option value="Dog">Dog</option>
            <option value="Fish">Fish</option>
            <option value="Reptile">Reptile</option>
            <option value="Rodent">Rodent</option>
          </select>
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="bg-[#250606] px-2 py-2 w-full rounded-lg text-white placeholder-gray-300 outline-none"
            placeholder="Product name"
          />
        </div>
        <div className="mb-4">
          <input
              type="number"
              name="price"
              value={product.price || ''} 
              onChange={(e) => {
                const value = e.target.value;
                setProduct((prevProduct) => ({
                  ...prevProduct,
                  price: value === '' ? '' : parseFloat(value), 
                }));
              }}
              className="bg-[#250606] px-2 py-2 w-full rounded-lg text-white placeholder-gray-300 outline-none"
              placeholder="Product price"
            />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleInputChange}
            className="bg-[#250606] px-2 py-2 w-full rounded-lg text-white placeholder-gray-300 outline-none"
            placeholder="Product image1 URL"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="image2"
            value={product.image2}
            onChange={handleInputChange}
            className="bg-[#250606] px-2 py-2 w-full rounded-lg text-white placeholder-gray-300 outline-none"
            placeholder="Product image2 URL (optional)"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="image3"
            value={product.image3}
            onChange={handleInputChange}
            className="bg-[#250606] px-2 py-2 w-full rounded-lg text-white placeholder-gray-300 outline-none"
            placeholder="Product image3 URL (optional)"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="bg-[#250606] px-2 py-2 w-full rounded-lg text-white placeholder-gray-300 outline-none"
            placeholder="Product description"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="material"
            value={product.material}
            onChange={handleInputChange}
            className="bg-[#250606] px-2 py-2 w-full rounded-lg text-white placeholder-gray-300 outline-none"
            placeholder="Product material"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="color"
            value={product.color}
            onChange={handleInputChange}
            className="bg-[#250606] px-2 py-2 w-full rounded-lg text-white placeholder-gray-300 outline-none"
            placeholder="Product color (optional)"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="size"
            value={product.size}
            onChange={handleInputChange}
            className="bg-[#250606] px-2 py-2 w-full rounded-lg text-white placeholder-gray-300 outline-none"
            placeholder="Product size (optional)"
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-[#a31414] w-full text-black font-bold px-4 py-2 rounded-lg hover:bg-[#ff5a5a] transition"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
