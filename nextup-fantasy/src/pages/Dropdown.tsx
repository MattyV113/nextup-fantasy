import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';

function Dropdown() {
  return (
    <Menu>
      <MenuHandler>
        <Button className="p-2 ">Projections</Button>
      </MenuHandler>
      <MenuList className="text-black border absolute border-black bg-white rounded w-[200px] h-[80px] p-2 ">
        <Link to="/weekly-rankings">
          {' '}
          <MenuItem className="h-[50%] hover:text-gray-500">Week 3</MenuItem>
        </Link>
        <Link to="/season-rankings">
          {' '}
          <MenuItem className="h-[50%] hover:text-gray-500">
            Season Long
          </MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
}

export default Dropdown;
