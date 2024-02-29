import React from 'react'
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from '/assets/icons/logo.png';
import { GoHome } from "react-icons/go";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import Loader from '@/components/utility/Loader'
import { Button } from "@/components/ui/button";
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
        <nav className="leftsidebar">
            <div className="flex flex-col gap-11">
                {/* Logo */}
                <Link to="/" className="flex gap-3 items-center">
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
                    <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
                        <img
                            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                            alt="profile"
                            className="h-14 w-14 rounded-full"
                        />
                        <div className="flex flex-col">
                            <p className="body-bold">{user.name}</p>
                            <p className="small-regular text-light-3">@{user.username}</p>
                        </div>
                    </Link>
                )}

                {/* Links */}
                <ul className="flex flex-col gap-6">
                    {/* Home */}
                    <NavLink
                        to="/"
                        className={`leftsidebar-link flex gap-4 p-4 hover:rounded-lg hover:bg-accent [&_*]:hover:text-accent-foreground 
                        ${pathname === "/" ? "bg-accent [&_*]:text-accent-foreground": ""}`}
                    >
                        <GoHome className='text-accent/80 text-[30px]' />
                        <p>Home</p>
                    </NavLink>
                    {/* Create */}
                    <NavLink
                        to="/create-event"
                        className={`leftsidebar-link flex gap-4 p-4 hover:rounded-lg hover:bg-accent [&_*]:hover:text-accent-foreground 
                        ${pathname === "/create-event" ? "bg-accent [&_*]:text-accent-foreground": ""}`}
                    >
                        <IoMdAddCircleOutline className='text-accent/80 text-[30px]' />
                        <p>Create</p>
                    </NavLink>
                    {/* Search */}
                    <NavLink
                        to="/search"
                        className={`leftsidebar-link flex gap-4 p-4 hover:rounded-lg hover:bg-accent [&_*]:hover:text-accent-foreground 
                        ${pathname === "/search" ? "bg-accent [&_*]:text-accent-foreground": ""}`}
                    >
                        <IoIosSearch className='text-accent/80 text-[30px]' />
                        <p>Search</p>
                    </NavLink>
                </ul>


            </div>

            <button
                className="leftsidebar-link group flex gap-4 p-4 hover:bg-accent [&_*]:hover:text-accent-foreground"
                onClick={(e) => handleSignOut(e)}>
                <IoMdLogOut className="text-accent/80 text-[30px]" />
                <p>Logout</p>
            </button>
        </nav>
    );
};

export default LeftSidebar;