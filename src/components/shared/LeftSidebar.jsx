import React from 'react'
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from '/assets/icons/logo.png';
import { GoHome } from "react-icons/go";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { GiDandelionFlower } from "react-icons/gi";
import Loader from '@/components/utility/Loader'
import { useSignOutAccount } from "@/lib/react-query/queries";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const LeftSidebar = () => {
    const navigate = useNavigate();
    const [hoveredId, setHoveredId] = React.useState(null);
    const { pathname } = useLocation();
    const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

    const { mutate: signOut } = useSignOutAccount();

    const handleSignOut = async (e) => {
        e.preventDefault();
        signOut();
        setIsAuthenticated(false);
        setUser(INITIAL_USER);
        navigate("/sign-in");
    };

    function handleMouseEnter(index) {
        setTimeout(() => {
            setHoveredId(index);
        }, 200);
    }
    function getHoveredId() {
    
        // Convert the pathname to lower case for case insensitivity
        var normalizedPathname = pathname.toLowerCase();
    
        // Remove any subpathnames (everything after the first '/')
        var basePath = normalizedPathname.split('/')[1];
        
        // Use a switch statement on the basePath
        switch (basePath) {
            case 'profile':
                return 0;
            case '':  // This is the base case, equivalent to '/'
                return 1;
            case 'pickafilm':
                return 2;
            case 'create-event':
                return 3;
            case 'explore':
                return 4;
            case 'sign-in':
            default:
                return null;
        }
    }

    function handleMouseLeave() {
        setTimeout(() => {
            setHoveredId(getHoveredId());
        }, 200);
    }

    return (
        <section>
            <nav className="leftsidebar group">
                <div className='flex flex-col gap-y-4'>
                    {/* Logo */}
                    <Link to="/" className="pl-4 flex-center">
                        <img
                            src={Logo}
                            alt="logo"
                            width={170}
                            height={36}
                            className='leftsidebar-text'
                        />
                    </Link>

                    {/* Profile */}
                    {isLoading || !user.email ? (
                        <div className="h-14">
                            <Loader />
                        </div>
                    ) : (
                        <NavLink
                            to={`/profile/${user.id}`}
                            className="leftsidebar-link"
                            onMouseEnter={() => handleMouseEnter(0)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {hoveredId === 0 && <motion.h2 layoutId='line' className='bg-accent leftsidebar-line'></motion.h2>}
                            {hoveredId !== 0 && <h2 className='leftsidebar-line'></h2>}
                            <img
                                src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                                alt="profile"
                                className="w-12 h-12 ml-8 rounded-full leftsidebar-text"
                            />
                            <div className="flex flex-col">
                                <p className="leftsidebar-text body-bold">{user.name}</p>
                                <p className="leftsidebar-text small-regular text-light-3">@{user.username}</p>
                            </div>
                        </NavLink>
                    )}
                </div>


                {/* Links */}
                <ul className="flex flex-col mb-20">
                    {/* Home */}
                    <NavLink to="/"
                        className="leftsidebar-link"
                        onMouseEnter={() => handleMouseEnter(1)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {hoveredId === 1 && <motion.h2 layoutId='line' className='bg-accent leftsidebar-line'></motion.h2>}
                        {hoveredId !== 1 && <h2 className='leftsidebar-line'></h2>}
                        <GoHome className='ml-8 leftsidebar-logo' />
                        <p className='pl-4 leftsidebar-text subtitle'>Home</p>
                    </NavLink>

                    {/* PickAFilm */}
                    <NavLink to="/pickAFilm"
                        className="leftsidebar-link"
                        onMouseEnter={() => handleMouseEnter(2)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {hoveredId === 2 && <motion.h2 layoutId='line' className='bg-accent leftsidebar-line'></motion.h2>}
                        {hoveredId !== 2 && <h2 className='leftsidebar-line'></h2>}
                        <GiDandelionFlower className='ml-8 leftsidebar-logo' />
                        <p className='pl-4 leftsidebar-text subtitle'>PickAFilm</p>
                    </NavLink>

                    {/* Create */}
                    <NavLink to="/create-event"
                        className="leftsidebar-link"
                        onMouseEnter={() => handleMouseEnter(3)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {hoveredId === 3 && <motion.h2 layoutId='line' className='bg-accent leftsidebar-line'></motion.h2>}
                        {hoveredId !== 3 && <h2 className='leftsidebar-line'></h2>}
                        <IoMdAddCircleOutline className='ml-8 leftsidebar-logo' />
                        <p className='pl-4 leftsidebar-text subtitle'>Create</p>
                    </NavLink>

                    {/* Explore */}
                    <NavLink to="/explore"
                        className="leftsidebar-link"
                        onMouseEnter={() => handleMouseEnter(4)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {hoveredId === 4 && <motion.h2 layoutId='line' className='bg-accent leftsidebar-line'></motion.h2>}
                        {hoveredId !== 4 && <h2 className='leftsidebar-line'></h2>}
                        <IoIosSearch className='ml-8 leftsidebar-logo' />
                        <p className='pl-4 leftsidebar-text subtitle'>Explore</p>
                    </NavLink>
                </ul>

                {/* Logout */}
                <button
                    className="leftsidebar-link"
                    onClick={(e) => handleSignOut(e)}
                    onMouseEnter={() => handleMouseEnter(5)}
                    onMouseLeave={handleMouseLeave}
                >
                    {hoveredId === 5 && <motion.h2 layoutId='line' className='bg-accent leftsidebar-line'></motion.h2>}
                    {hoveredId !== 5 && <h2 className='leftsidebar-line'></h2>}
                    <IoMdLogOut className="ml-8 leftsidebar-text leftsidebar-logo" />
                    <p className='leftsidebar-text'>Logout</p>
                </button>
            </nav>
        </section>
    );
};

export default LeftSidebar;