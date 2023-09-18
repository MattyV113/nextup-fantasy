import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineClose } from 'react-icons/ai';
import NavLinks from './NavLinks.tsx';
import BurgerBar from './BurgerBar';
import NextUpLogo from '../../assets/NextUp Fantasy-logos.jpeg';
import '../../index.css';
import { Login } from '../Credentials/Login.tsx';
import { Logout } from '../Credentials/Logout.tsx';
import { gapi } from 'gapi-script';
import { AuthContext } from '../../context/authContext.tsx';

const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: '',
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  return (
    <div className=" border-b border-white">
      <nav className="h-[150px] w-[100%] flex items-center justify-between mx-auto">
        <div className="flex gap-[10px] flex-row">
          <Link className="hover:text-gray-500" to="/">
            {' '}
            <img
              className="hidden ml-4 rounded-full sm:block w-[80px]"
              src={NextUpLogo}
              alt=""
            />
          </Link>
        </div>
        <NavLinks />
        <div className="flex items-center gap-4">
          {currentUser ? (
            <img
              className="rounded-full w-[50px] h-[50px]"
              src={currentUser ? currentUser.imageUrl : ''}
              referrerpolicy="no-referrer"
            />
          ) : (
            <Login setCurrentUser={setCurrentUser} />
          )}

          <BurgerBar />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
