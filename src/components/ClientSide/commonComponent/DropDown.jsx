



// import { useState } from 'react';
// import { FaBars } from 'react-icons/fa';
// import Link from 'next/link';
// import { MdKeyboardArrowLeft } from "react-icons/md";

// export default function DropDown({ data }) {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isHovered, setIsHovered] = useState(false);

//     const handleMouseEnter = () => {
//         if (!isOpen) setIsHovered(true);
//     };

//     const handleMouseLeave = () => {
//         if (!isOpen) setIsHovered(false);
//     };

//     // Close dropdown on menu item click
//     const closeDropdown = () => {
//         setIsOpen(false);
//         setIsHovered(false);
//     };

//     return (
//         <div
//             className="relative inline-block"
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//         >
//             <div className='min-w-12 cursor-pointer flex justify-end'>
//                 <button
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="focus:outline-none p-2 rounded-lg bg-[#003066] text-white hover:bg-[#005f99] transition-all duration-300"
//                 >
//                     <FaBars size={25} />
//                 </button>
//             </div>

//             {(isOpen || isHovered) && (
//                 <div className="absolute right-0 w-72 z-[999] bg-white shadow-xl rounded-lg transition-all duration-300 transform opacity-100 scale-100">
//                     <ul className="py-2">
//                         {/* Standard Items */}
//                         <Link href="/" passHref>
//                             <li onClick={closeDropdown} className="px-6 text-lg flex justify-between items-center gap-5 py-3 text-black hover:bg-[#f1f1f1] hover:text-[#003066] font-semibold cursor-pointer">
//                                 <MdKeyboardArrowLeft className='text-slate-500' size={20} /> Home
//                             </li>
//                         </Link>
//                         <Link href="/about" passHref>
//                             <li onClick={closeDropdown} className="px-6 text-lg flex justify-between items-center gap-5 py-3 text-black hover:bg-[#f1f1f1] hover:text-[#003066] font-semibold cursor-pointer">
//                                 <MdKeyboardArrowLeft className='text-slate-500' size={20} /> About
//                             </li>
//                         </Link>
//                         {/* Dynamically Generated Items */}
//                         {data?.map((product) => (
//                             <Link key={product.id} href={`${process.env.NEXT_PUBLIC_BASE_PATH}product/${product?.seo}`} passHref>
//                                 <li onClick={closeDropdown} className="px-6 text-lg flex justify-between items-center gap-5 py-3 text-black hover:bg-[#f1f1f1] hover:text-[#003066] font-semibold cursor-pointer">
//                                     <MdKeyboardArrowLeft className='text-slate-500' size={20} /> {product.nickname}
//                                 </li>
//                             </Link>
//                         ))}
//                         <Link href="/partner" passHref>
//                             <li onClick={closeDropdown} className="px-6 text-lg flex justify-between items-center gap-5 py-3 text-black hover:bg-[#f1f1f1] hover:text-[#003066] font-semibold cursor-pointer">
//                                 <MdKeyboardArrowLeft className='text-slate-500' size={20} /> Partner
//                             </li>
//                         </Link>
//                         <Link href="/blog" passHref>
//                             <li onClick={closeDropdown} className="px-6 text-lg flex justify-between items-center gap-5 py-3 text-black hover:bg-[#f1f1f1] hover:text-[#003066] font-semibold cursor-pointer">
//                                 <MdKeyboardArrowLeft className='text-slate-500' size={20} /> Blog
//                             </li>
//                         </Link>
//                         <Link href="/contact" passHref>
//                             <li onClick={closeDropdown} className="px-6 text-lg flex justify-between items-center gap-5 py-3 text-black hover:bg-[#f1f1f1] hover:text-[#003066] font-semibold cursor-pointer">
//                                 <MdKeyboardArrowLeft className='text-slate-500' size={20} /> Contact
//                             </li>
//                         </Link>
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// }






import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Link from 'next/link';
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function DropDown({ data }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        if (!isOpen) setIsHovered(true);
    };

    const handleMouseLeave = () => {
        if (!isOpen) setIsHovered(false);
    };

    const closeDropdown = () => {
        setIsOpen(false);
        setIsHovered(false);
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="min-w-12 cursor-pointer flex justify-end">
                <button
                    // onClick={() => setIsOpen(!isOpen)}
                    className="focus:outline-none p-2 rounded-lg bg-[#003066] text-white hover:bg-[#005f99] transition-all duration-5000"
                >
                    <FaBars size={25} />
                </button>
            </div>

            {(isOpen || isHovered) && (
                <div
                className={`absolute right-0 w-72 z-[999] bg-white shadow-xl rounded-lg transform transition-all duration-2000 ease-out ${
                    isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
            >
                
                    <ul className="py-2">
                        <Link href="/" passHref>
                            <li
                                onClick={closeDropdown}
                                className="px-6 text-lg flex justify-between items-center gap-5 py-3 text-black hover:bg-[#f1f1f1] hover:text-[#003066] font-semibold cursor-pointer"
                            >
                                <MdKeyboardArrowLeft className="text-slate-500" size={20} /> Home
                            </li>
                        </Link>
                        <Link href="/about" passHref>
                            <li
                                onClick={closeDropdown}
                                className="px-6 text-lg flex justify-between items-center gap-5 py-3 text-black hover:bg-[#f1f1f1] hover:text-[#003066] font-semibold cursor-pointer"
                            >
                                <MdKeyboardArrowLeft className="text-slate-500" size={20} /> About
                            </li>
                        </Link>
                        {data?.map((product) => (
                            <Link
                                key={product.id}
                                href={`${process.env.NEXT_PUBLIC_BASE_PATH}product/${product?.seo}`}
                                passHref
                            >
                                <li
                                    onClick={closeDropdown}
                                    className="px-6 text-lg flex justify-between items-center gap-5 py-3 text-black hover:bg-[#f1f1f1] hover:text-[#003066] font-semibold cursor-pointer"
                                >
                                    <MdKeyboardArrowLeft className="text-slate-500" size={20} /> {product.nickname}
                                </li>
                            </Link>
                        ))}
                        <Link href="/partner" passHref>
                            <li
                                onClick={closeDropdown}
                                className="px-6 text-lg flex justify-between items-center gap-5 py-3 text-black hover:bg-[#f1f1f1] hover:text-[#003066] font-semibold cursor-pointer"
                            >
                                <MdKeyboardArrowLeft className="text-slate-500" size={20} /> Partner
                            </li>
                        </Link>
                        <Link href="/blog" passHref>
                            <li
                                onClick={closeDropdown}
                                className="px-6 text-lg flex justify-between items-center gap-5 py-3 text-black hover:bg-[#f1f1f1] hover:text-[#003066] font-semibold cursor-pointer"
                            >
                                <MdKeyboardArrowLeft className="text-slate-500" size={20} /> Blog
                            </li>
                        </Link>
                        <Link href="/contact" passHref>
                            <li
                                onClick={closeDropdown}
                                className="px-6 text-lg flex justify-between items-center gap-5 py-3 text-black hover:bg-[#f1f1f1] hover:text-[#003066] font-semibold cursor-pointer"
                            >
                                <MdKeyboardArrowLeft className="text-slate-500" size={20} /> Contact
                            </li>
                        </Link>
                    </ul>
                </div>
            )}
        </div>
    );
}
