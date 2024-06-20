import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Logo from '/assets/icons/logo.png';
import ProfilePlaceholder from '/assets/icons/profile-placeholder.svg';
import { IoMdLogOut } from "react-icons/io";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from '@/lib/react-query/queries'

const TopBar = ({isSticky}) => {
    const { mutate: signOut, isSuccess } = useSignOutAccount();
    const navigate = useNavigate();
    const { user } = useUserContext();

    useEffect(() => {
        if (isSuccess) navigate(0);
    }, [isSuccess]);

    return (
        <section className="cursor-pointer topbar">
            <nav className="flex justify-center p-5">
                {/* Logo as Home Button */}
                <Link to="/" className="home-logo">
                    <img src={Logo} alt="Home" className="w-28 md:w-32 lg:w-36" />
                </Link>
            </nav>
        </section>
    )
}

export default TopBar
