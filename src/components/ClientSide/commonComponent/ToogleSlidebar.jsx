// components/Sidebar.js
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Image from "next/image";
import { Fade, Zoom } from 'react-awesome-reveal';
import Link from 'next/link';

export default function Sidebar({ data }) {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Close sidebar when clicking outside of it
    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Menu icon */}
            <button
                onClick={toggleSidebar}
                className="text-2xl p-2 m-2 text-[#003066]"
            >
                <FaBars />
            </button>

            {/* Sidebar overlay (dark background) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40"
                    onClick={closeSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Sidebar content */}
                <div className="p-4">
                    <Fade triggerOnce left>
                        <div className="flex items-center">
                            <Image
                                src="/paramotor_assets/paramotor_logo.png"
                                alt="Paramotor Logo"
                                className="w-54"
                                width={100}
                                height={100}
                            />
                        </div>
                    </Fade>
                    <ul className='mt-5'>
                        <Link href="/">
                            <li className=" py-2 text-lg  hover:text-[#003066] font-bold cursor-pointer">Home</li>
                        </Link>
                        <Link href="/about">
                            <li className=" py-2 text-lg  hover:text-[#003066] font-bold cursor-pointer">About </li>
                        </Link>
                        <Link href="/partner">
                            <li className=" py-2 text-lg  hover:text-[#003066] font-bold cursor-pointer">Partner</li>
                        </Link>
                        <Link href="/blog">
                            <li className=" py-2 text-lg  hover:text-[#003066] font-bold cursor-pointer">Blog</li>
                        </Link>
                        <Link href="/contact">
                            <li className=" py-2 text-lg  hover:text-[#003066] font-bold cursor-pointer">Contact</li>
                        </Link>
                        {data?.map((product) => (
                            <Link key={product.id} href={`product/${product?.seo}`}>
                                <li className=" py-2 text-lg  hover:text-[#003066] font-bold cursor-pointer">{product.nickname} </li>
                            </Link>
                        ))}
                    </ul>
                    {/* <Fade triggerOnce right delay={500}>
                        <button className="bg-[#003066] w-full text-center mt-4 text-white text-sm md:text-base px-2 md:px-4 py-2 rounded-md">
                            Sign up
                        </button>
                    </Fade> */}
                </div>
            </div>
        </>
    );
}