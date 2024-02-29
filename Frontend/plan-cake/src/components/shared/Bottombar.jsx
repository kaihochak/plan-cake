import { Link, useLocation } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";

const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
        {/* Home */}
        <li className="leftsidebar-link group bg-primary">
          <Link
              to="/"
              className="flex gap-4 p-4 hover:bg-accent [&_*]:hover:text-accent-foreground">
              <GoHome className='text-accent/80 text-[30px]'/>
          </Link>
        </li>
        {/* Create */}
        <li className="leftsidebar-link group bg-primary">
          <Link
              to="/create-event"
              className="flex gap-4 p-4 hover:bg-accent [&_*]:hover:text-accent-foreground">
              <IoMdAddCircleOutline className='text-accent/80 text-[30px]'/>
          </Link>
        </li>
        {/* Search */}
        <li className="leftsidebar-link group bg-primary">
          <Link
              to="/search"
              className="flex gap-4 p-4 hover:bg-accent [&_*]:hover:text-accent-foreground">
              <IoIosSearch className='text-accent/80 text-[30px]'/>
          </Link>
        </li>
    </section>
  );
};

export default Bottombar;
