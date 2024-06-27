import React, { useState, useEffect } from 'react';
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down 200px
    const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        if (currentScrollPos > 300) setIsVisible(true);
        else setIsVisible(false);
    };

    // Add scroll event listener to window
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Scroll to top of page on button click
    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}
            className={`fixed bottom-10 right-10 lg:bottom-20 lg:right-20 z-50 p-3 lg:p-4 shadow-md rounded-full backdrop-filter bg-primary-light backdrop-blur-lg bg-opacity-60 text-secondary-dark transform transition-transform duration-700 ${isVisible ? 'translate-x-0' : 'translate-x-[17rem]'}`}
        >
            <MdKeyboardDoubleArrowUp className='subtitle' />
        </button>
    );
};

export default ScrollToTopButton;
