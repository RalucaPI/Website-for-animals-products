import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import Context from '../../context/Context';
import { collection, getDocs } from 'firebase/firestore';
import { database, auth } from '../../firebase/firebase';

export const Admin = () => {
  const { users, allproducts } = useContext(Context);
  const [view, setView] = useState('products');
  const [cashOnDeliveryOrders, setCashOnDeliveryOrders] = useState([]);
  const [paidByCardOrders, setPaidByCardOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.error('User is not authenticated');
        navigate('/login');
      } else {
        fetchOrders('Cash on delivery order', setCashOnDeliveryOrders);
        fetchOrders('Paid by card order', setPaidByCardOrders);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchOrders = async (type, setState) => {
    try {
      const result = await getDocs(collection(database, `Customer/UID ${auth.currentUser.uid}/${type}`));
      const ordersArray = result.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setState(ordersArray);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const renderTable = () => {
    switch (view) {
      case 'products':
        return renderProductsTable();
      case 'accounts':
        return renderAccountsTable();
      case 'cashOnDeliveryOrders':
        return renderOrdersTable(cashOnDeliveryOrders);
      case 'paidByCardOrders':
        return renderOrdersTable(paidByCardOrders);
      default:
        return null;
    }
  };

  const renderProductsTable = () => (
    <table className="w-full border-collapse overflow-hidden rounded-lg">
      <thead>
        <tr>
          <th className="border bg-gray-800 text-white text-left px-4 py-3 uppercase font-bold">#</th>
          <th className="border bg-gray-800 text-white text-left px-4 py-3 uppercase font-bold">Image</th>
          <th className="border bg-gray-800 text-white text-left px-4 py-3 uppercase font-bold">Name</th>
          <th className="border bg-gray-800 text-white text-left px-4 py-3 uppercase font-bold">Type</th>
          <th className="border bg-gray-800 text-white text-left px-4 py-3 uppercase font-bold">Price</th>
          <th className="border bg-gray-800 text-white text-left px-4 py-3 uppercase font-bold">Material</th>
          <th className="border bg-gray-800 text-white text-left px-4 py-3 uppercase font-bold">Weight</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(allproducts) &&
          allproducts.map((product, index) => (
            <tr key={index} className="odd:bg-gray-50 hover:bg-gray-100 transition">
              <td className="border px-4 py-3">{index + 1}</td>
              <td className="border px-4 py-3">
                <img src={product.image} alt={product.name} className="rounded h-12" />
              </td>
              <td className="border px-4 py-3">{product.name}</td>
              <td className="border px-4 py-3">{product.type}</td>
              <td className="border px-4 py-3">{product.price}</td>
              <td className="border px-4 py-3">{product.material}</td>
              <td className="border px-4 py-3">{product.weight}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );

  const renderAccountsTable = () => (
    <table className="w-full border-collapse overflow-hidden rounded-lg">
      <thead>
        <tr>
          <th className="border bg-gray-800 text-white text-left px-4 py-3 uppercase font-bold">#</th>
          <th className="border bg-gray-800 text-white text-left px-4 py-3 uppercase font-bold">UID</th>
          <th className="border bg-gray-800 text-white text-left px-4 py-3 uppercase font-bold">Name</th>
          <th className="border bg-gray-800 text-white text-left px-4 py-3 uppercase font-bold">Phone</th>
          <th className="border bg-gray-800 text-white text-left px-4 py-3 uppercase font-bold">Email</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(users) &&
          users.map((user, index) => (
            <tr key={index} className="odd:bg-gray-50 hover:bg-gray-100 transition">
              <td className="border px-4 py-3">{index + 1}</td>
              <td className="border px-4 py-3">{user.uid}</td>
              <td className="border px-4 py-3">{user.name}</td>
              <td className="border px-4 py-3">{user.phone}</td>
              <td className="border px-4 py-3">{user.email}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );

  const renderOrdersTable = (orders) => (
    <table className="w-full border-collapse overflow-hidden rounded-lg">
      <thead>
        <tr>
          <th className="border bg-gray-800 text-white text-left px-4 py-3 uppercase font-bold">#</th>
          <th className="border bg-gray-800 text-white text-left px-4 py-3 uppercase font-bold">Name</th>
          <th className="border bg-gray-800 text-white text-left px-4 py-3 uppercase font-bold">Email</th>
          <th className="border bg-gray-800 text-white text-left px-4 py-3 uppercase font-bold">Phone</th>
          <th className="border bg-gray-800 text-white text-left px-4 py-3 uppercase font-bold">Address</th>
          <th className="border bg-gray-800 text-white text-left px-4 py-3 uppercase font-bold">City</th>
          <th className="border bg-gray-800 text-white text-left px-4 py-3 uppercase font-bold">Total Price</th>
          <th className="border bg-gray-800 text-white text-left px-4 py-3 uppercase font-bold">Products</th>
          <th className="border bg-gray-800 text-white text-left px-4 py-3 uppercase font-bold">Sizes</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(orders) &&
          orders.map((order, index) => (
            <tr key={index} className="odd:bg-gray-50 hover:bg-gray-100 transition">
              <td className="border px-4 py-3">{index + 1}</td>
              <td className="border px-4 py-3">{order.name}</td>
              <td className="border px-4 py-3">{order.email}</td>
              <td className="border px-4 py-3">{order.phone}</td>
              <td className="border px-4 py-3">{order.address}</td>
              <td className="border px-4 py-3">{order.city}</td>
              <td className="border px-4 py-3">{order.totalPrice}</td>
              <td className="border px-4 py-3">{order.cartItems.map((item) => item.name).join(', ')}</td>
              <td className="border px-4 py-3">{order.cartItems.map((item) => item.size).join(', ')}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );

  if (loading) {
    return <p className="text-center text-gray-700">Loading...</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <div className="w-64 bg-gray-800 text-white flex flex-col shadow-lg p-5">
        <button
          className={`mb-3 px-4 py-3 text-left rounded-lg ${
            view === 'products' ? 'bg-gray-700 text-blue-400' : 'bg-transparent hover:bg-gray-700 hover:text-blue-400'
          } transition`}
          onClick={() => setView('products')}
        >
          Products
        </button>
        <button
          className={`mb-3 px-4 py-3 text-left rounded-lg ${
            view === 'accounts' ? 'bg-gray-700 text-blue-400' : 'bg-transparent hover:bg-gray-700 hover:text-blue-400'
          } transition`}
          onClick={() => setView('accounts')}
        >
          Accounts
        </button>
        <button
          className={`mb-3 px-4 py-3 text-left rounded-lg ${
            view === 'cashOnDeliveryOrders' ? 'bg-gray-700 text-blue-400' : 'bg-transparent hover:bg-gray-700 hover:text-blue-400'
          } transition`}
          onClick={() => setView('cashOnDeliveryOrders')}
        >
          Cash on Delivery Orders
        </button>
        <button
          className={`mb-3 px-4 py-3 text-left rounded-lg ${
            view === 'paidByCardOrders' ? 'bg-gray-700 text-blue-400' : 'bg-transparent hover:bg-gray-700 hover:text-blue-400'
          } transition`}
          onClick={() => setView('paidByCardOrders')}
        >
          Paid by Card Orders
        </button>
        <button
          className="mt-4 px-4 py-3 text-left rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
          onClick={() => navigate('/add-product')}
        >
          Add Product
        </button>
      </div>
      <div className="flex-1 p-5 bg-white shadow-lg rounded-lg m-5">{renderTable()}</div>
    </div>
  );
};

export default Admin;
