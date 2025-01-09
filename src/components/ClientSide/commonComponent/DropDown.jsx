// import { useState } from 'react';
// import { FaUser } from "react-icons/fa";
// import Link from 'next/link';
// import { FaBars } from 'react-icons/fa';

// export default function DropDown({ data }) {
//     const [isOpen, setIsOpen] = useState(false);

//     const handleMouseEnter = () => {
//         setIsOpen(true);
//     };

//     const handleMouseLeave = () => {
//         setIsOpen(false);
//     };

//     return (
//         <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//             {/* <button className="px-4 py-2 text-sm bg-white border text-[#003066] border-[#003066] rounded-full hover:bg-gray-200 font-semibold flex gap-2 items-center focus:outline-none">
//                 <span>
//                     <FaUser />
//                 </span>
//                 Personal
//             </button> */}
//             <FaBars size={30}/>
//                 {isOpen && (
//             <div className=''>
//                     <div className="absolute top-[39px] right-0 w-48 bg-white border border-gray-200 shadow-lg rounded-md  transition-all duration-300 ease-out transform opacity-100 scale-100 md:w-56 z-10">
//                         <ul className="py-2">
//                             {data?.map((product) => (
//                                 <li
//                                     key={product.id}
//                                     className="px-4 py-2 text-md hover:bg-gray-100 hover:text-[#003066] font-semibold cursor-pointer transition-colors"
//                                 >
//                                     <Link href={`product/${product?.seo}`}>{product.nickname}</Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//             </div>
//                 )}

//         </div>
//     );
// }





// import { useState } from 'react';
// import { FaBars } from 'react-icons/fa';
// import Link from 'next/link';

// export default function DropDown({ data }) {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isHovered, setIsHovered] = useState(false);

//     const handleMouseEnter = () => {
//         setIsHovered(true);
//     };

//     const handleMouseLeave = () => {
//         setIsHovered(false);
//     };

//     const handleClick = () => {
//         setIsOpen((prev) => !prev); // Toggle dropdown on click
//     };

//     return (
//         <div
//             className="relative inline-block"
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//         >
//             <button
//                 className="focus:outline-none"
//                 onClick={handleClick}
//             >
//                 <FaBars size={30} />
//             </button>

//             {(isOpen || isHovered) && (
//                 <div className="absolute top-[39px] right-0 w-48 bg-white border border-gray-200 shadow-lg rounded-md transition-all duration-300 ease-out transform opacity-100 scale-100 md:w-56 z-10">
//                     <ul className="py-2">
//                         {data?.map((product) => (
//                             <li
//                                 key={product.id}
//                                 className="px-4 py-2 text-md hover:bg-gray-100 hover:text-[#003066] font-semibold cursor-pointer transition-colors"
//                             >
//                                 <Link href={`product/${product?.seo}`}>{product.nickname}</Link>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// }





// import { useState } from 'react';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import Link from 'next/link';

// export default function DropDown({ data }) {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isHovered, setIsHovered] = useState(false);

//     const handleMouseEnter = () => {
//         if (!isOpen) {  // Only show on hover when dropdown is not open
//             setIsHovered(true);
//         }
//     };

//     const handleMouseLeave = () => {
//         if (!isOpen) {  // Only hide on hover when dropdown is not open
//             setIsHovered(false);
//         }
//     };

//     const handleClick = () => {
//         setIsOpen((prev) => !prev); // Toggle dropdown on click
//     };

//     return (
//         <div
//             className="relative inline-block"
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//         >
//             <button
//                 className="focus:outline-none"
//                 onClick={handleClick}
//             >
//                 {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
//             </button>

//             {(isOpen || isHovered) && (
//                 <div className="absolute  right-0 w-48 bg-white border border-gray-200 shadow-lg rounded-md transition-all duration-300 ease-out transform opacity-100 scale-100 md:w-56 z-10">
//                     <ul className="py-2">
//                         <li className="px-4 py-2 text-md hover:bg-gray-100 hover:text-[#003066] font-semibold cursor-pointer transition-colors">Home</li>
//                         <li className="px-4 py-2 text-md hover:bg-gray-100 hover:text-[#003066] font-semibold cursor-pointer transition-colors">About</li>
//                         <li className="px-4 py-2 text-md hover:bg-gray-100 hover:text-[#003066] font-semibold cursor-pointer transition-colors">Partner</li>
//                         <li className="px-4 py-2 text-md hover:bg-gray-100 hover:text-[#003066] font-semibold cursor-pointer transition-colors">Blog</li>
//                         <li className="px-4 py-2 text-md hover:bg-gray-100 hover:text-[#003066] font-semibold cursor-pointer transition-colors">Contact</li>
//                         {data?.map((product) => (
//                             <li
//                                 key={product.id}
//                                 className="px-4 py-2 text-md hover:bg-gray-100 hover:text-[#003066] font-semibold cursor-pointer transition-colors"
//                             >
//                                 <Link href={`product/${product?.seo}`}>{product.nickname}</Link>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// }



import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { MdKeyboardArrowRight } from "react-icons/md";

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
                <div className="absolute -right-10 w-72 bg-[#f1f1f1] shadow-xl rounded-lg transition-all duration-300 transform opacity-100 scale-100 z-10">
                    <ul className="py-2">
                        {/* Standard Items */}
                        <Link href="/">
                            <li className="px-6 text-lg flex items-end gap-5 py-3 text-md text-black hover:bg-[#f1f1f1] hover:text-[#003066] font-semibold cursor-pointer transition-colors hover:ml-2">
                                Home <MdKeyboardArrowRight className='text-slate-500' size={20} />
                            </li>
                        </Link>
                        <Link href="/about">
                            <li className="px-6 text-lg flex items-end gap-5 py-3 text-md text-black hover:bg-[#f1f1f1] hover:text-[#003066] font-semibold cursor-pointer transition-colors hover:ml-2">
                                About <MdKeyboardArrowRight className='text-slate-500' size={20} />
                            </li>
                        </Link>
                        <Link href="/partner">
                            <li className="px-6 text-lg flex items-end gap-5 py-3 text-md text-black hover:bg-[#f1f1f1] hover:text-[#003066] font-semibold cursor-pointer transition-colors hover:ml-2">
                                Partner <MdKeyboardArrowRight className='text-slate-500' size={20} />
                            </li>
                        </Link>
                        <Link href="/blog">
                            <li className="px-6 text-lg flex items-end gap-5 py-3 text-md text-black hover:bg-[#f1f1f1] hover:text-[#003066] font-semibold cursor-pointer transition-colors hover:ml-2">
                                Blog <MdKeyboardArrowRight className='text-slate-500' size={20} />
                            </li>
                        </Link>
                        <Link href="/contact">
                            <li className="px-6 text-lg flex items-end gap-5 py-3 text-md text-black hover:bg-[#f1f1f1] hover:text-[#003066] font-semibold cursor-pointer transition-colors hover:ml-2">
                                Contact <MdKeyboardArrowRight className='text-slate-500' size={20} />
                            </li>
                        </Link>

                        {/* Dynamically Generated Items */}
                        {data?.map((product) => (
                            <Link key={product.id} href={`product/${product?.seo}`}>
                                <li className="px-6 text-lg flex items-end gap-5 py-3 text-md text-black hover:bg-[#f1f1f1] hover:text-[#003066] font-semibold cursor-pointer transition-colors hover:ml-2">
                                    {product.nickname} <MdKeyboardArrowRight className='text-slate-500' size={20} />
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
