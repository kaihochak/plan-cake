import React from 'react';
import { Link } from 'react-scroll';
import { ModeToggle } from '@/components/utility/mode-toggle';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { RxHamburgerMenu } from "react-icons/rx";

const LandingHeader = () => {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<header className='container sticky top-0 z-50 flex items-center justify-between w-full p-8 overflow-hidden bg-transparent font-regular backdrop-filter backdrop-blur bg-opacity-10 border-secondary-dark/10'>
			{/* Logo Desktop */}
			<div className='hidden md:flex'>
				<Link
					to='features'
					activeClass='active'
					smooth={true}
					spy={true}
					className='flex self-center cursor-pointer pr-9'
				>
					<img src="/assets/icons/logo.png" alt="" className='w-[150px] md:w-[120px]' />
				</Link>
			</div>

			{/* Nav Items desktop */}
			<div className="flex-row items-center justify-between hidden md:flex gap-x-4 ">
				<Link
					to='features'
					activeClass='active'
					smooth={true}
					spy={true}
					className='button-text'
				>
					Features
				</Link>

				<Link
					to='about'
					activeClass='active'
					smooth={true}
					spy={true}
					className='button-text'
				>
					About
				</Link>

				<Link
					to='faq'
					activeClass='active'
					smooth={true}
					spy={true}
					className='button-text'
				>
					FAQ
				</Link>
				{/* Dark Mode */}
				{/* <div className="flex self-center ml-2 ">
                    <ModeToggle />
                </div> */}
			</div>

			{/* Mobile NAV */}
			<section className='grid w-full grid-cols-3 md:hidden'>
				<div className='col-span-1'></div>
				<Link
					to='features'
					activeClass='active'
					smooth={true}
					spy={true}
					className='flex self-center cursor-pointer'
				>
					<img src="/assets/icons/logo.png" alt="" className='w-[150px] md:w-[120px]' />
				</Link>
				<div className='flex justify-end md:hidden'>
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<RxHamburgerMenu className='text-3xl text-text' />
						</SheetTrigger>
						<SheetContent>
							<div className="flex flex-col items-center justify-between p-10 gap-y-4">
								<Link
									to='features'
									activeClass='active'
									smooth={true}
									spy={true}
									className='button-text '
									onClick={() => setIsOpen(false)}
								>
									Features
								</Link>

								<Link
									to='about'
									activeClass='active'
									smooth={true}
									spy={true}
									className='button-text'
									onClick={() => setIsOpen(false)}
								>
									About
								</Link>

								<Link
									to='faq'
									activeClass='active'
									smooth={true}
									spy={true}
									className='button-text'
									onClick={() => setIsOpen(false)}
								>
									FAQ
								</Link>
							</div>

							{/* Dark Mode */}
							{/* <div className="flex items-center self-center justify-center mb-10 gap-x-4">
                                <p className='body'>Switch Theme</p>
                                <ModeToggle />
                            </div> */}

							<SheetFooter>
								<SheetClose asChild>
									<div className='flex flex-col items-center justify-between gap-y-6'>
										{/* Contact Us */}
										{/* <div className='flex self-center'>
                                            <Link
                                                to='contact'
                                                activeClass='active'
                                                smooth={true}
                                                spy={true}
                                                className='px-4 py-1 text-white rounded-2xl button-text bg-accent-dark'
                                            >
                                                Contact Us
                                            </Link>
                                        </div> */}
									</div>
								</SheetClose>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				</div>
			</section >

		</header>
	);
};

export default LandingHeader;
