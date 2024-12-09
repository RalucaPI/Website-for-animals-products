import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/home/HomePage';
import { SignUp } from './pages/account/SignUp';
import { LogIn } from './pages/account/LogIn';
import { Admin} from './pages/admin/Admin';
import { Account } from './pages/account/Account';
import { Cart } from './pages/cart/Cart';
import  Cats  from './pages/cats/Cats';
import  Dogs from './pages/dogs/Dogs';
import  Birds  from './pages/birds/Birds';
import  Rodents  from './pages/rodents/Rodents';
import  Fishes  from './pages/fishes/Fishes';
import  Reptiles  from './pages/reptiles/Reptiles';
import { ProductPage } from './pages/products/ProductPage';
import AddProduct  from './pages/products/AddProduct'
import { Navbar } from './components/navbar/Navbar';
import { Favorite } from './pages/favorites/Favorite';
import { Search } from './components/search/Search';
import { Start } from './animations_road/road/Start'
import { Voice } from './components/vocal_search/Voice';
import Data from './context/Data';
function App() {

  return (
        <Data>
          <Router>
            <Navbar/>
              <Routes>
                <Route path='/' element={<Start/>}/>
                <Route path="/home" element={<HomePage />} />
                <Route path="/product/:category/:id" element={<ProductPage />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/log-in" element={<LogIn />} />
                <Route path="/account" element={<Account />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/cats" element={<Cats />} />
                <Route path="/dogs" element={<Dogs />} />
                <Route path="/birds" element={<Birds />} />
                <Route path="/rodents" element={<Rodents />} />
                <Route path="/fishes" element={<Fishes />} />
                <Route path="/reptiles" element={<Reptiles />} />
                <Route path="/search" element={< Search/>} />
                <Route path="/favorites" element={< Favorite/>} />
                <Route path="/vocal-search" element={<Voice/>} />
                
                <Route path="/admin" element={
                  <ProtectedRoutesForAdmin>
                    < Admin />
                  </ProtectedRoutesForAdmin>} /> 
            
                <Route path='/add-product' element={
                    <ProtectedRoutesForAdmin>
                      <AddProduct />
                    </ProtectedRoutesForAdmin>}
                  />
              </Routes>
            </Router>
        </Data>
  );
}

export default App;

export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem('user')) {
    return children
  }
  else {
    return <Navigate to='/log-in' />
  }
}

export const ProtectedRoutesForAdmin = ({children}) => {
  const admin = JSON.parse(localStorage.getItem('user'))
  console.log(admin.user.email)
  if (admin.user.email === 'test@gmail.com') {
    return children
  }
  else {
    return <Navigate to='/log-in' />
  }
}
