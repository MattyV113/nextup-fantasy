import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

import { AuthContextType } from '../../context/authContext';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const Login = ({ setCurrentUser }: AuthContextType) => {
  const onSuccess = (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ): void => {
    if ('profileObj' in res) {
      setCurrentUser(res.profileObj);
    }

    console.log('User Logged In', res);
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
