import React, { useContext, useState } from 'react';
import { addDoc, collection, deleteDoc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { database, auth } from '../../firebase/firebase';
import Context from '../../context/Context';
import './Card.css';

export const Card = ({ closeModal }) => {
  const context = useContext(Context);
  const { totalPrice, nrProd, cartProducts, deliveryDetails, setDeliveryDetails } = context;
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    securityCode: '',
  });
  const navigate = useNavigate();

  const deleteCartProducts = async (user) => {
    console.log('Deleting products from cart');
    if (!user) {
      console.log('User is not logged in');
      return;
    }
    try {
      const docRefs = await getDocs(collection(database, `Customer/UID ${auth.currentUser.uid}/Cart`));
      const deletePromises = docRefs.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
      console.log('Products successfully deleted');
    } catch (error) {
      console.error('Error deleting products from cart:', error);
    }
  };

  const finalizeCardPayment = async (e) => {
    e.preventDefault();
    console.log('Card payment initiated');
    const user = auth.currentUser;

    const [month, year] = cardDetails.expiryDate.split('/');
    const cardExpiryDate = new Date(`20${year}`, month - 1);

    if (cardExpiryDate < new Date()) {
      alert('The card expiry date is in the past. Please provide a valid date.');
      return;
    }

    if (
      cardDetails.cardNumber.replace(/\s/g, '').length !== 16 ||
      !/^\d+$/.test(cardDetails.cardNumber.replace(/\s/g, '')) ||
      cardDetails.expiryDate.length !== 5 ||
      !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiryDate) ||
      cardDetails.securityCode.length !== 3 ||
      !/^\d+$/.test(cardDetails.securityCode)
    ) {
      alert('Please enter valid card details!');
      return;
    }

    try {
      await addDoc(collection(database, `Customer/UID ${auth.currentUser.uid}/Paid by card order`), {
        ...deliveryDetails,
        totalPrice,
        nrProd,
        cartProducts,
      });
      setDeliveryDetails({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        county: ''
      });
      await deleteCartProducts(user);
      alert('Card payment successfully completed!');
      closeModal();
      navigate('/');
    } catch (error) {
      console.error('Error processing card payment:', error);
    }
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    console.log('Card detail changed:', name, value);
    if (name === 'cardNumber') {
      const newValue = value.replace(/\s/g, '');
      const formattedValue = newValue.replace(/[^0-9]/g, '').replace(/(.{4})/g, '$1 ').trim();
      setCardDetails((prevDetails) => ({
        ...prevDetails,
        [name]: formattedValue,
      }));
    } else if (name === 'expiryDate') {
      const newValue = value.replace(/[^0-9/]/g, '');
      if (newValue.length <= 5) {
        let formattedValue = newValue;
        if (newValue.length === 3 && !newValue.endsWith('/')) {
          formattedValue = `${newValue.substr(0, 2)}/${newValue.substr(2)}`;
        }
        setCardDetails((prevDetails) => ({
          ...prevDetails,
          [name]: formattedValue,
        }));
      }
    } else if (name === 'securityCode') {
      const newValueCVV = value.replace(/[^0-9/]/g, '');
      if (newValueCVV.length <= 3) {
        setCardDetails((prevDetails) => ({
          ...prevDetails,
          [name]: newValueCVV,
        }));
      }
    } else {
      setCardDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  return (
    <div className="modal_card">
      <div className="modal-content_card">
        <span className="close_card" onClick={closeModal}>&times;</span>
        <div id="form-container">
          <div id="card-front">
            <div id="shadow"></div>
            <div id="image-container">
              <span id="amount">Total: <strong>{totalPrice} Lei</strong></span>
              <span id="card-image">
                <i className="fa fa-credit-card"></i>
              </span>
            </div>
            <label htmlFor="card-number" className='lbl_card'>Card Number</label>
            <input
              className='inp_card'
              type="text"
              id="card-number"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleCardDetailsChange}
              placeholder="1234 5678 9101 1112"
              maxLength={19}
              pattern="[0-9]*"
              required
            />
            <div id="cardholder-container">
              <label htmlFor="card-holder" className='lbl_card'>Cardholder Name</label>
              <input
                className='inp_card'
                type="text"
                id="card-holder"
                name="name"
                value={deliveryDetails.name}
                onChange={(e) => setDeliveryDetails({ ...deliveryDetails, name: e.target.value })}
                placeholder="e.g. John Doe"
                required
              />
            </div>
            <div id="exp-container">
              <label htmlFor="card-exp" className='lbl_card'>Expiry Date: </label>
              <input
                className='inp_card'
                id="card-month"
                type="text"
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={handleCardDetailsChange}
                placeholder="MM/YY"
                maxLength={5}
                pattern="\d{2}/\d{2}"
                required
              />
            </div>
            <div id="cvc-container">
              <label htmlFor="card-cvc" className='lbl_card'>CVC/CVV</label>
              <input
                className='inp_card'
                id="card-cvc"
                name="securityCode"
                value={cardDetails.securityCode}
                onChange={handleCardDetailsChange}
                placeholder="XXX"
                maxLength={3}
                required
              />
              <p>Security Code</p>
            </div>
          </div>
          <div id="card-back">
            <div id="card-stripe"></div>
          </div>
          <button type="button" id="card-btn" onClick={finalizeCardPayment}>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
