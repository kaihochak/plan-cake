import { Link, useLocation } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { GiDandelionFlower } from "react-icons/gi";

const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
        {/* Home */}
        <Link
            to="/"
            className={`p-2 transition rounded-[10px] 
                      ${pathname === "/" ? "[&_h2]:bg-accent [&_*]:text-accent " : ""}`}
          >
            <GoHome className='text-[30px]'/>
        </Link>

        {/* PickAFilm */}
        <Link
            to="/pickAFilm"
            className={`p-2 transition rounded-[10px]
                      ${pathname === "/pickAFilm" ? "[&_h2]:bg-accent [&_*]:text-accent " : ""}`}
        >
            <GiDandelionFlower className='text-[30px]'/>
        </Link>

        {/* Create */}
        <Link
            to="/create-event"
            className={`p-2 transition rounded-[10px] 
                      ${pathname === "/create-event" ? "[&_h2]:bg-accent [&_*]:text-accent " : ""}`}
        >
            <IoMdAddCircleOutline className='text-[30px]'/>
        </Link>

        {/* Explore */}
        <Link
            to="/explore"
            className={`p-2 transition rounded-[10px] 
                      ${pathname.startsWith("/explore") ? "[&_h2]:bg-accent [&_*]:text-accent " : ""}`}
        >
            <IoIosSearch className='text-[30px]'/>
        </Link>
    </section>
  );
};

export default Bottombar;
