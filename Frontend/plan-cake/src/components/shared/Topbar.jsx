import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Logo from '@/assets/icons/logo.png';
import ProfilePlaceholder from '@/assets/icons/profile-placeholder.svg';
import { Button } from "@/components/ui/button"
import { IoMdLogOut } from "react-icons/io";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from '@/lib/react-query/queries'

const TopBar = () => {
    const { mutate: signOut, isSuccess } = useSignOutAccount();
    const navigate = useNavigate();
    const { user } = useUserContext();

    useEffect(() => {
        if (isSuccess) navigate(0);
    }, [isSuccess]);

    return (
        <section>
            <nav className="flex justify-between items-center">
                {/* Logo as Home Button */}
                <Link to="/" className="home-logo">
                    <img src={Logo} alt="Home" className="w-20 " />
                </Link>

                {/* Right side of TopBar */}
                <div className='flex gap-4'>
                    {/* Logout */}
                    <button 
                        variant="ghost"
                        onClick={() => signOut()}
                    >
                        <IoMdLogOut className='text-[30px] text-primary-foreground'/>
                    </button>
                    {/* Profile */}
                    <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
                        <img 
                            src={user.imageUrl || ProfilePlaceholder} 
                            alt="profile"
                            className="h-8 w-8 rounded-full"
                        />
                    </Link>
                </div>
            </nav>
        </section>
    )
}

export default TopBar
