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

const LeftSidebar = () => {
    const navigate = useNavigate();
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

    return (
        <section>
            {/* when open*/}
            <nav className="leftsidebar">
                <div className="flex flex-col gap-11 ">
                    {/* Logo */}
                    <Link to="/" className="px-10 flex-center">
                        <img
                            src={Logo}
                            alt="logo"
                            width={170}
                            height={36}
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
                            className={`leftsidebar-link ${pathname.startsWith("/profile") ? "[&_h2]:bg-accent [&_*]:text-accent " : ""}`}
                        >
                            <h2 className='pl-1 h-20 w-[0.5px] rounded-xl mr-8'></h2>
                            <img
                                src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                                alt="profile"
                                className="w-12 h-12 rounded-full"
                            />
                            <div className="flex flex-col">
                                <p className="body-bold">{user.name}</p>
                                <p className="small-regular text-light-3">@{user.username}</p>
                            </div>
                        </NavLink>
                    )}


                    {/* Links */}
                    <ul className="flex flex-col gap-6">
                        {/* Home */}
                        <NavLink to="/"
                            className={`leftsidebar-link ${pathname === "/" ? "[&_h2]:bg-accent [&_*]:text-accent " : ""}`}
                        >
                            <h2 className='pl-1 h-20 w-[0.5px] rounded-xl mr-8'></h2>
                            <GoHome className='text-accent/80 text-[30px]' />
                            <p>Home</p>
                        </NavLink>
                        
                        {/* PickAFilm */}
                        <NavLink to="/pickAFilm"
                            className={`leftsidebar-link ${pathname === "/pickAFilm" ? "[&_h2]:bg-accent [&_*]:text-accent " : ""}`}
                        >
                            <h2 className='pl-1 h-20 w-[0.5px] rounded-xl mr-8'></h2>
                            <GiDandelionFlower className='text-accent/80 text-[30px]' />
                            <p>PickAFilm</p>
                        </NavLink>

                        {/* Create */}
                        <NavLink to="/create-event"
                            className={`leftsidebar-link ${pathname === "/create-event" ? "[&_h2]:bg-accent [&_*]:text-accent " : ""}`}
                        >
                            <h2 className='pl-1 h-20 w-[0.5px] rounded-xl mr-8'></h2>
                            <IoMdAddCircleOutline className='text-accent/80 text-[30px]' />
                            <p>Create</p>
                        </NavLink>

                        {/* Explore */}
                        <NavLink to="/explore"
                            className={`leftsidebar-link ${pathname === "/explore" ? "[&_h2]:bg-accent [&_*]:text-accent " : ""}`}
                        >
                            <h2 className='pl-1 h-20 w-[0.5px] rounded-xl mr-8'></h2>
                            <IoIosSearch className='text-accent/80 text-[30px]' />
                            <p>Explore</p>
                        </NavLink>
                    </ul>

                </div>

                {/* Logout */}
                <button className="leftsidebar-link" onClick={(e) => handleSignOut(e)}>
                    <h2 className='pl-1 h-20 w-[0.5px] rounded-xl mr-8'></h2>
                    <IoMdLogOut className="text-accent/80 text-[30px]" />
                    <p>Logout</p>
                </button>
            </nav>
        </section>
    );
};

export default LeftSidebar;