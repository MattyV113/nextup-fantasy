import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const Login = () => {
  const onSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log('User Logged In', response);
  };

  const onFailure = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log('login failed', response);
  };

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
};
