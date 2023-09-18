import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

import { useState } from 'react';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const Login = ({ setCurrentUser }) => {
  const onSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log('User Logged In', response);
    setCurrentUser(response.profileObj);
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
