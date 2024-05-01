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
        <section className="topbar">
            <nav className="p-6 flex justify-center">
                {/* Logo as Home Button */}
                <Link to="/" className="home-logo">
                    <img src={Logo} alt="Home" className="w-28 " />
                </Link>
            </nav>
        </section>
    )
}

export default TopBar
