import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Logo from '/assets/icons/logo.png';
import ProfilePlaceholder from '/assets/icons/profile-placeholder.svg';
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from '@/lib/react-query/queries'
import { IoMdLogOut } from 'react-icons/io';

const TransTopBar = ({isSticky}) => {
    const { mutate: signOut, isSuccess } = useSignOutAccount();
    const navigate = useNavigate();
    const { user } = useUserContext();

    useEffect(() => {
        if (isSuccess) navigate(0);
    }, [isSuccess]);

    return (
        <section className="transTopbar">
            <nav className="flex justify-center px-5 py-6">
                {/* Logo as Home Button */}
                <Link to="/" className="home-logo">
                    <img src={Logo} alt="Home" className="w-32 " />
                </Link>

                {/* Right side of TransTopBar */}
                <div className='flex gap-4'>
                    {/* Logout */}
                    {/* <button 
                        variant="ghost"
                        onClick={() => signOut()}
                    >
                        <IoMdLogOut className='text-[30px] text-primary-foreground'/>
                    </button> */}
                    {/* Profile */}
                    {/* <Link to={`/profile/${user.id}`} className='gap-3 flex-center'>
                        <img 
                            src={user.imageUrl || ProfilePlaceholder} 
                            alt="profile"
                            className="w-8 h-8 rounded-full"
                        />
                    </Link> */}
                </div>
            </nav>
        </section>
    )
}

export default TransTopBar
