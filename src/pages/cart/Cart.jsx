import React, { useState, useContext, useEffect } from 'react';
import { ShowProducts } from './ShowProducts';
import Context from '../../context/Context';
import { database, auth } from '../../firebase/firebase';
import { collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import { Card } from './Card';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

export const Cart = () => {
  const context = useContext(Context);
  const { cartProducts, productDec, productInc, setCartProducts, nrProd, totalPrice, users, deliveryDetails, setDeliveryDetails } = context;
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

useEffect(() => {
    const fetchCartProducts = async () => {
        const uid = auth.currentUser?.uid;
        if (!uid) {
            console.error('No user is logged in.');
            navigate('/log-in'); // Redirect to login page
            return;
        }

        try {
            const productSnapshot = await getDocs(collection(database, `Customer/UID ${uid}/Cart`));
            const productList = productSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setCartProducts(productList);
        } catch (error) {
            console.error('Error fetching cart products:', error);
        }
    };

    fetchCartProducts();
}, [setCartProducts, navigate]);

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setShowPaymentMethods(true);
  };

  const handleCashPayment = async () => {
    try {
      await addDoc(collection(database, `Customer/UID ${auth.currentUser.uid}/Cash on delivery order`), {
        ...deliveryDetails,
        totalPrice,
        nrProd,
        cartProducts,
      });
      clearForm();
      alert('The order was placed!');
      await deleteCartProducts();
      navigate('/home');
    } catch (error) {
      console.error('Eroare:', error);
    }
  };

  const clearForm = () => {
    setDeliveryDetails({
      name: '',
      email: '',
      telephone: '',
      address: '',
      locality: '',
    });
  };

  const deleteCartProducts = async () => {
    const users = auth.currentUser;
    if (!users) return;

    try {
      const docRefs = await getDocs(collection(database, `Customer/UID ${auth.currentUser.uid}/Cart`));
      const deletePromises = docRefs.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
    } catch (error) {
      console.error('Eroare la ștergerea productlor din coș:', error);
    }
  };

  const openModal = () => {
    console.log('Deschidere modal');
    setShowModal(true);
  };

  const closeModal = () => {
    console.log('Inchidere modal');
    setShowModal(false);
  };

  return (
    <>
      {cartProducts.length > 0 ? (
        <>
          <div className="rounded-lg bg-[#ffffff] w-3/4 mx-auto my-6">
            <ShowProducts
              productsCart={cartProducts}
              productIncrement={productInc}
              productDecrement={productDec}
              setCartProduct={setCartProducts}
            />
          </div>
          <div className="mx-auto max-w-6xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="mt-6 h-full bg-[#ffffff] p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="flex justify-between">
                <p className="text-gray-700">Total products</p>
                <p className="text-gray-700">{nrProd}</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between mb-3">
                <p className="text-lg font-bold">Total</p>
                <div>
                  <p className="mb-1 text-lg font-bold">{(totalPrice / 100).toFixed(2)} Lei</p>
                </div>
              </div>
            </div>
          </div>
          <div className="form_cout mx-auto max-w-4xl justify-center px-6 md:space-x-6 xl:px-0">
            <div className="text_checkout border-b-2 border-black text-white">
              Delivery details
            </div>
            <form onSubmit={handleAddressSubmit} className="form_checkout justify-center border-transparent">
              <div className="form_row border-transparent">
                <div className="input_data border-transparent">
                  <input
                    type="text"
                    name="numeCustomer"
                    value={deliveryDetails.name}
                    onChange={(e) => setDeliveryDetails({ ...deliveryDetails, name: e.target.value })}
                    placeholder="Full name"
                    required
                    className="input_cout border-transparent"
                  />
                  <div className="underline"></div>
                </div>
              </div>
              <div className="form_row">
                <div className="input_data border-transparent">
                  <input
                    type="text"
                    name="telephone"
                    value={deliveryDetails.telephone}
                    onChange={(e) => setDeliveryDetails({ ...deliveryDetails, telephone: e.target.value })}
                    placeholder="Telephone"
                    required
                    className="input_cout border-transparent"
                  />
                  <div className="underline"></div>
                </div>
              </div>
              <div className="form_row">
                <div className="input_data">
                  <input
                    type="email"
                    name="email"
                    value={deliveryDetails.email}
                    onChange={(e) => setDeliveryDetails({ ...deliveryDetails, email: e.target.value })}
                    placeholder="Email"
                    required
                    className="input_cout"
                  />
                  <div className="underline"></div>
                </div>
              </div>
              <div className="form_row">
                <div className="input_data">
                  <input
                    type="text"
                    name="address"
                    value={deliveryDetails.address}
                    onChange={(e) => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })}
                    placeholder="Address"
                    required
                    className="input_cout"
                  />
                  <div className="underline"></div>
                </div>
              </div>
              <div className="form_row">
                <div className="input_data">
                  <input
                    type="text"
                    name="locality"
                    value={deliveryDetails.locality}
                    onChange={(e) => setDeliveryDetails({ ...deliveryDetails, locality: e.target.value })}
                    placeholder="Locality"
                    required
                    className="input_cout"
                  />
                  <div className="underline"></div>
                </div>
              </div>
              <div className="form_row submit_btn_cout text-center items-center">
                <div className="input_data">
                  <div className="inner items-center text-center"></div>
                  <button className="submit_bt" type="submit">Next</button>
                </div>
              </div>
            </form>
          </div>
          <div className="payment-methods items-start mx-auto max-w-4xl mb-6 px-6 md:space-x-6 xl:px-0">
            {showPaymentMethods && (
              <div>
                <div className="text-left ml-12 met_plt text-3xl font-semibold border-b-2 border-black">Payment method</div>
                <div className="payment-method pt-4 ml-6">
                  <input
                    type="checkbox"
                    id="cash"
                    name="paymentMethod"
                    value="cash"
                    checked={selectedPaymentMethod === 'cash'}
                    onChange={() => setSelectedPaymentMethod('cash')}
                    className="hidden"
                  />
                  <label htmlFor="cash" className="payment-method-label">
                    Cash on delivery 
                  </label>
                </div>
                <div className="payment-method ml-6 mt-6">
                  <input
                    type="checkbox"
                    id="card"
                    name="paymentMethod"
                    value="card"
                    checked={selectedPaymentMethod === 'card'}
                    onChange={() => setSelectedPaymentMethod('card')}
                    className="hidden"
                  />
                  <label htmlFor="card" className="payment-method-label">
                    With the card
                  </label>
                </div>
              </div>
            )}
            {selectedPaymentMethod === 'cash' && (
              <button onClick={handleCashPayment} className=" ">
                <label htmlFor="card" className="payment-method-label my-4">Cash on delivery</label>
              </button>
            )}
            {selectedPaymentMethod === 'card' && (
              <button onClick={openModal} className="payment-method">
                <label htmlFor="card" className="payment-method-label">Pay with card</label>
              </button>
            )}
          </div>
          {showModal && <Card closeModal={closeModal} navigate={navigate} />}
        </>
      ) : (
        <div className="text-center mt-6">
          <p className="text-lg font-bold">You don't have any products in the cart</p>
        </div>
      )}
    </>
  );
};

export default Cart;
