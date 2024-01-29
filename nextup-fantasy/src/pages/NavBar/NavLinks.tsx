import { useNavigate } from 'react-router';
import Dropdown from '../Dropdown';
import { Button } from '@material-tailwind/react';
import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../../context/authContext';

function NavLinks() {
  const navigate = useNavigate();
  const authContext = useContext<AuthContextType>(AuthContext);
  return (
    <>
      <div className="md:static absolute md:min-h-fit bg-min-h-[60vh] md:w-auto left-0 top-[-100%] w-full flex items-center px-5   ">
        <ul className="flex  md:flex-row text-md md:text-[18px] flex-col md:items-center mt-[20px] list-none gap-8 md:gap-[4vw]">
          <li>
            <Button onClick={() => navigate('/')} className="p-2 ">
              Home
            </Button>
          </li>
          <li>
            <Button onClick={() => navigate('/start-sit')} className="p-2">
              Start/Sit
            </Button>
          </li>
          <li>
            <Dropdown />
          </li>
          <li>
            <Button
              onClick={() =>
                navigate(
                  `/profile/${
                    (authContext.currentUser as { googleId?: string })
                      ?.googleId || ''
                  }`
                )
              }
              className="p-2 "
            >
              Profile
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default NavLinks;
