import { GoogleLogout } from 'react-google-login';
import { AuthContextType } from '../../context/authContext';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const Logout = ({ setCurrentUser, currentUser }: AuthContextType) => {
  const onSuccess = () => {
    if (currentUser !== null) {
      setCurrentUser(null);
      localStorage.removeItem('user');
      console.log('User logged out');
    }
  };

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};
