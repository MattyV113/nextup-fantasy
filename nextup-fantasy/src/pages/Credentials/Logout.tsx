import { GoogleLogout } from 'react-google-login';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const Logout = ({ setUser }) => {
  const onSuccess = () => {
    console.log('User logged out');
    setUser(null);
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
