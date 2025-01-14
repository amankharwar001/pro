


import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { MdKeyboardArrowRight ,MdKeyboardArrowLeft} from "react-icons/md";

export default function DropDown({ data }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        if (!isOpen) {  // Only show on hover when dropdown is not open
            setIsHovered(true);
        }
    };

    const handleMouseLeave = () => {
        if (!isOpen) {  // Only hide on hover when dropdown is not open
            setIsHovered(false);
        }
    };

    const handleClick = () => {
        setIsOpen((prev) => !prev); // Toggle dropdown on click
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className='min-w-12 cursor-pointer flex justify-end'>
                <button
                    className="focus:outline-none p-2 rounded-lg bg-[#003066] text-white hover:bg-[#005f99] transition-all duration-300"
                    onClick={handleClick}
                >
                    {isOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
                </button>
            </div>

            {(isOpen || isHovered) && (
                <div className="absolute right-0 w-72 z-[999] bg-white shadow-xl rounded-lg transition-all duration-300 transform opacity-100 scale-100 ">
                    <ul className="py-2">
                        {/* Standard Items */}
                        <Link href="/">
                            <li className="px-6 text-lg flex  justify-between text-start items-center gap-5 py-3 text-md text-black hover:bg-[#f1f1f1] hover:text-[#003066] font-semibold cursor-pointer transition-colors hover:scale-105">
                            <MdKeyboardArrowLeft className='text-slate-500' size={20} />  Home 
                            </li>
                        </Link>
                        <Link href="/about">
                            <li className="px-6 text-lg flex justify-between text-start items-center gap-5 py-3 text-md text-black hover:bg-[#f1f1f1] hover:text-[#003066] font-semibold cursor-pointer transition-colors hover:scale-105">
                            <MdKeyboardArrowLeft className='text-slate-500' size={20} /> About 
                            </li>
                        </Link>
                        {/* Dynamically Generated Items */}
                        {data?.map((product) => (
                            <Link key={product.id} href={`${process.env.NEXT_PUBLIC_BASE_PATH}product/${product?.seo}`}>
                                <li className="px-6 text-lg flex justify-between text-start items-center gap-5 py-3 text-md text-black hover:bg-[#f1f1f1] hover:text-[#003066] font-semibold cursor-pointer transition-colors hover:scale-105">
                                <MdKeyboardArrowLeft className='text-slate-500' size={20} /> {product.nickname} 
                                </li>
                            </Link>
                        ))}
                        <Link href="/partner">
                            <li className="px-6 text-lg flex justify-between text-start items-center gap-5 py-3 text-md text-black hover:bg-[#f1f1f1] hover:text-[#003066] font-semibold cursor-pointer transition-colors hover:scale-105">
                            <MdKeyboardArrowLeft className='text-slate-500' size={20} /> Partner 
                            </li>
                        </Link>
                        <Link href="/blog">
                            <li className="px-6 text-lg flex justify-between text-start items-center gap-5 py-3 text-md text-black hover:bg-[#f1f1f1] hover:text-[#003066] font-semibold cursor-pointer transition-colors hover:scale-105">
                            <MdKeyboardArrowLeft className='text-slate-500' size={20} />  Blog 
                            </li>
                        </Link>
                        <Link href="/contact">
                            <li className="px-6 text-lg flex justify-between text-start items-center gap-5 py-3 text-md text-black hover:bg-[#f1f1f1] hover:text-[#003066] font-semibold cursor-pointer transition-colors hover:scale-105">
                            <MdKeyboardArrowLeft className='text-slate-500' size={20} /> Contact 
                            </li>
                        </Link>

                        
                    </ul>
                </div>
            )}
        </div>
    );
}
