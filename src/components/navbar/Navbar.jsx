import React, { Fragment, useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { Dialog, Transition } from '@headlessui/react';
import { PiShoppingCartBold } from "react-icons/pi";
import { RiAdminLine } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import { TiHeartOutline } from "react-icons/ti";
import { IoSearchSharp, IoMenuSharp, IoCloseSharp } from "react-icons/io5";
import { PawPrint, Microphone } from "phosphor-react";
import Context from '../../context/Context';
import { collection, onSnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth";
import { auth, database } from '../../firebase/firebase';
import "./Navbar.css";

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Hook pentru a detecta ruta curentă
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const dropdownTimeout = useRef(null);
    const dropdownTimeout2 = useRef(null);
    const context = useContext(Context);
    const { setSearch, search } = context;
    const [cartItemCount, setCartItemCount] = useState(0);
    const [user] = useAuthState(auth);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        navigate('/search');
    };

    const handleMouseEnter = () => {
        clearTimeout(dropdownTimeout.current);
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        dropdownTimeout.current = setTimeout(() => {
            setDropdownOpen(false);
        }, 200);
    };

    const handleMouseEnter2 = () => {
        clearTimeout(dropdownTimeout2.current);
        setDropdownOpen2(true);
    };

    const handleMouseLeave2 = () => {
        dropdownTimeout2.current = setTimeout(() => {
            setDropdownOpen2(false);
        }, 200);
    };

    const signUserOut = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    useEffect(() => {
        if (user) {
            const cartRef = collection(database, `Customer/UID ${auth.currentUser.uid}/Cart`);
            const unsubscribe = onSnapshot(cartRef, (snapshot) => {
                const cartItems = snapshot.docs.map((doc) => doc.data());
                const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
                setCartItemCount(totalQuantity);
            });

            return () => unsubscribe();
        } else {
            setCartItemCount(0);
        }
    }, [user]);

    // Ascunde navbar-ul pe pagina "/"
    if (location.pathname === "/") {
        return null;
    }

    return (
        <div className="sticky top-0 z-50 bg-gradient-to-r from-[#ffe6cc] via-[#ffe39b] to-[#ff8551] h-16 flex items-center text-base">
            <header className="w-full">
                <nav className="px-4 sm:px-6 md:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center ml-6">
                            <Link to="/home" className="text-4xl font-dancing-script">
                                PawZone
                            </Link>
                        </div>
                        <Link to='/'>
                            <div className="paw">
                                <div className="paw1"><PawPrint size={35} color="#000000" weight="fill" /></div>
                                <div className="paw2"><PawPrint size={35} color="#000000" weight="fill" /></div>
                                <div className="paw4"><PawPrint size={35} color="#000000" weight="fill" /></div>
                                <div className="paw3"><PawPrint size={35} color="#000000" weight="fill" /></div>
                            </div>
                        </Link>
                        <div className="hidden md:flex space-x-4 text-black text-lg font-medium">
                            <button onClick={() => navigate('/cats')}>Cats</button>
                            <button onClick={() => navigate('/dogs')}>Dogs</button>
                            <button onClick={() => navigate('/birds')}>Birds</button>
                            <button onClick={() => navigate('/rodents')}>Rodents</button>
                            <button onClick={() => navigate('/fishes')}>Fishes</button>
                            <button onClick={() => navigate('/reptiles')}>Reptiles</button>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="search"
                                    value={search}
                                    onChange={handleSearchChange}
                                    placeholder="Search"
                                    className="inp_nav px-6 py-2 pl-10 rounded-md bg-gray-100 border-transparent outline-0 text-sm"
                                />
                                <IoSearchSharp size={22} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            </div>
                            <button onClick={() => navigate('/vocal-search')}><Microphone size={22} className="text-black" /></button>
                            {user && user.email === 'test@gmail.com' && (
                                <button onClick={() => navigate('/admin')}><RiAdminLine size={22} className="text-black" /></button>
                            )}
                            <div
                                className="menu-item-account"
                                onMouseEnter={handleMouseEnter2}
                                onMouseLeave={handleMouseLeave2}
                            >
                                <VscAccount size={22} className="text-black" />
                                {dropdownOpen2 && (
                                    <div className="dropdown-content">
                                        <button onClick={() => navigate('/account')}>Account</button>
                                        {user ? (
                                            <button onClick={signUserOut}>Log out</button>
                                        ) : (
                                            <>
                                                <button onClick={() => navigate('/sign-up')}>Sign up</button>
                                                <button onClick={() => navigate('/log-in')}>Log in</button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                            <button onClick={() => navigate('/favorites')}><TiHeartOutline size={22} className="text-black" /></button>
                            <button onClick={() => navigate('/cart')} className="relative text-black">
                                <PiShoppingCartBold size={22} />
                                <span className={cartItemCount > 0 ? 'cart-indicator show' : 'cart-indicator'}>
                                    {cartItemCount > 0 && cartItemCount}
                                </span>
                            </button>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};
