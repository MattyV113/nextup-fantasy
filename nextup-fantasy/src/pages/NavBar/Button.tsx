import { Link } from 'react-router-dom';
import { Props } from '../../context/authContext';

const Button = ({ children }: Props) => {
  return (
    <Link
      to="/register"
      className="bg-match-orange h-4  drop-shadow-xl no-underline mt-3 text-black font-[Poppins] hidden sm:block  py-2 px-6 rounded md:ml-8 hover:bg-orange-500
    duration-500"
    >
      {children}
    </Link>
  );
};

export default Button;
