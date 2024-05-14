import { Link, useLocation } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { BiFilm } from "react-icons/bi";
import { BiPlusCircle } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { BiUserCircle } from "react-icons/bi";
import ProfilePlaceholder from '/assets/icons/profile-placeholder.svg';
import { useUserContext } from "@/context/AuthContext";

const Bottombar = () => {
    const { pathname } = useLocation();
    const { user } = useUserContext();

    return (
        <section className="bottom-bar">
            {/* Home */}
            <Link
                to="/"
                className={`p-2 transition rounded-[10px] 
                      ${pathname === "/" ? "[&_h2]:bg-accent [&_*]:text-accent " : ""}`}
            >
                <BiHomeAlt className='text-[30px] md:text-[48px]' />
            </Link>

            {/* PickAFilm */}
            <Link
                to="/pickAFilm"
                className={`p-2 transition rounded-[10px]
                      ${pathname === "/pickAFilm" ? "[&_h2]:bg-accent [&_*]:text-accent " : ""}`}
            >
                <BiFilm className='text-[30px] md:text-[48px]' />

            </Link>

            {/* Create */}
            <Link
                to="/create-event"
                className={`p-2 transition rounded-[10px] 
                      ${pathname === "/create-event" ? "[&_h2]:bg-accent [&_*]:text-accent " : ""}`}
            >
                <BiPlusCircle className='text-[30px] md:text-[48px]' />
            </Link>

            {/* Explore */}
            <Link
                to="/explore"
                className={`p-2 transition rounded-[10px] 
                      ${pathname.startsWith("/explore") ? "[&_h2]:bg-accent [&_*]:text-accent " : ""}`}
            >
                <BiSearch className='text-[30px] md:text-[48px]' />
            </Link>

            {/* Profile */}
            <Link
                to="/profile/${user.id}"
                className={`p-2 transition rounded-[10px] 
                      ${pathname.startsWith("/explore") ? "[&_h2]:bg-accent [&_*]:text-accent " : ""}`}
            >
                {user ?
                    <img
                        src={user.imageUrl || ProfilePlaceholder}
                        alt="profile"
                        className="w-8 h-8 rounded-full md:w-12 md:h-12"
                    /> :
                    <BiUserCircle className='text-[30px] md:text-[48px]' />
                }
            </Link>
        </section>
    );
};

export default Bottombar;
