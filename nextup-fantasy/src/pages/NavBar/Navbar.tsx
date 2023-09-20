import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks.tsx';
import BurgerBar from './BurgerBar';
import NextUpLogo from '../../assets/NextUp Fantasy-logos.jpeg';
import '../../index.css';
import { Login } from '../Credentials/Login.tsx';
import { gapi } from 'gapi-script';
import { AuthContext, AuthContextType } from '../../context/authContext.tsx';
import { Logout } from '../Credentials/Logout.tsx';

const Navbar = () => {
  const authContext = useContext<AuthContextType>(AuthContext);

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
          {authContext?.currentUser ? (
            <>
              <img
                className="rounded-full w-[50px] h-[50px]"
                src={
                  (authContext.currentUser as { imageUrl?: string })
                    ?.imageUrl || ''
                }
                referrerPolicy="no-referrer"
              />
              <Logout
                setCurrentUser={authContext?.setCurrentUser}
                currentUser={authContext.currentUser}
              />
            </>
          ) : (
            <Login
              setCurrentUser={authContext?.setCurrentUser}
              currentUser={authContext.currentUser}
            />
          )}

          <BurgerBar />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
