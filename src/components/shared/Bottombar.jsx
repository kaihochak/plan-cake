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
            className={`p-4 transition rounded-[10px] 
                      ${pathname === "/" ? "bg-accent [&_*]:text-accent-foreground": "bg-primary [&_*]:text-primary-foreground"}`}
          >
            <GoHome className='text-[30px]'/>
        </Link>

        {/* PickAFilm */}
        <Link
            to="/pickAFilm"
            className={`p-4 transition rounded-[10px]
                      ${pathname === "/pickAFilm" ? "bg-accent [&_*]:text-accent-foreground": "bg-primary [&_*]:text-primary-foreground"}`}
        >
            <GiDandelionFlower className='text-[30px]'/>
        </Link>

        {/* Create */}
        <Link
            to="/create-event"
            className={`p-4 transition rounded-[10px] 
                      ${pathname === "/create-event" ? "bg-accent [&_*]:text-accent-foreground": "bg-primary [&_*]:text-primary-foreground"}`}
        >
            <IoMdAddCircleOutline className='text-[30px]'/>
        </Link>

        {/* Explore */}
        <Link
            to="/explore"
            className={`p-4 transition rounded-[10px] 
                      ${pathname.startsWith("/explore") ? "bg-accent [&_*]:text-accent-foreground": "bg-primary [&_*]:text-primary-foreground"}`}
        >
            <IoIosSearch className='text-[30px]'/>
        </Link>
    </section>
  );
};

export default Bottombar;
