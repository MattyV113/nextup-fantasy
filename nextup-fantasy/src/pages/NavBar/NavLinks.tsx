import Dropdown from '../Dropdown';
import { Button } from '@material-tailwind/react';

function NavLinks() {
  return (
    <>
      <div className="md:static absolute md:min-h-fit bg-min-h-[60vh] md:w-auto left-0 top-[-100%] w-full flex items-center px-5   ">
        <ul className="flex  md:flex-row text-xl md:text-[18px] flex-col md:items-center mt-[20px] list-none gap-8 md:gap-[4vw]">
          <li>
            <Button className="p-2 ">Home</Button>
          </li>
          <li>
            <Button className="p-2 ">Start/Sit</Button>
          </li>
          <li>
            <Dropdown />
          </li>
          <li>
            <Button className="p-2 ">AI Tool</Button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default NavLinks;
