


// import { useState } from 'react';
// import { FaBars } from 'react-icons/fa';
// import Image from "next/image";
// import { Fade } from 'react-awesome-reveal';
// import Link from 'next/link';

// export default function Sidebar({ data, isOpen, closeSidebar }) {

//     return (
//         <>

//             {isOpen && (
//                 <div
//                     className="fixed inset-0 bg-black opacity-50 z-[9999]"
//                     onClick={closeSidebar}
//                 ></div>
//             )}

//             {/* Sidebar */}
//             <div
//                 className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-[9999] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
//                     }`}
//             >
//                 {/* Sidebar content */}
//                 <div className="p-4">
//                     <Fade triggerOnce left>
//                         <div className="flex items-center">
//                             <Image
//                                 src="/paramotor_assets/paramotor_logo.png"
//                                 alt="Paramotor Logo"
//                                 className="w-54"
//                                 width={100}
//                                 height={100}
//                             />
//                         </div>
//                     </Fade>
//                     <ul className="mt-5">
//                         <Link href="/" passHref>
//                             <li onClick={closeSidebar} className="py-2 text-lg hover:text-[#003066] font-bold cursor-pointer">
//                                 Home
//                             </li>
//                         </Link>
//                         <Link href="/about" passHref>
//                             <li onClick={closeSidebar} className="py-2 text-lg hover:text-[#003066] font-bold cursor-pointer">
//                                 About
//                             </li>
//                         </Link>
//                         {data?.map((product) => (
//                             <Link key={product.id} href={`${process.env.NEXT_PUBLIC_BASE_PATH}product/${product?.link}`} passHref>
//                                 <li onClick={closeSidebar} className="py-2 text-lg hover:text-[#003066] font-bold cursor-pointer">
//                                     {product.nickname}
//                                 </li>
//                             </Link>
//                         ))}
//                         <Link href="/partner" passHref>
//                             <li onClick={closeSidebar} className="py-2 text-lg hover:text-[#003066] font-bold cursor-pointer">
//                                 Partner with Us
//                             </li>
//                         </Link>
//                         <Link href="/blog" passHref>
//                             <li onClick={closeSidebar} className="py-2 text-lg hover:text-[#003066] font-bold cursor-pointer">
//                                 Resources
//                             </li>
//                         </Link>
//                         <Link href="/contact" passHref>
//                             <li onClick={closeSidebar} className="py-2 text-lg hover:text-[#003066] font-bold cursor-pointer">
//                                 Contact
//                             </li>
//                         </Link>
//                     </ul>
//                 </div>
//             </div>
//         </>
//     );
// }



import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Image from "next/image";
import { Fade } from 'react-awesome-reveal';
import Link from 'next/link';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar({ data, isOpen, closeSidebar, activationBlog }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-[9999]"
                    onClick={closeSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-[9999] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
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
                    <ul className="mt-5">
                        <Link href="/" passHref>
                            <li onClick={closeSidebar} className="py-2 text-lg hover:text-[#003066] font-bold cursor-pointer">
                                Home
                            </li>
                        </Link>
                        <Link href="/about" passHref>
                            <li onClick={closeSidebar} className="py-2 text-lg hover:text-[#003066] font-bold cursor-pointer">
                                About
                            </li>
                        </Link>

                        {/* Product Dropdown */}
                        <li className="py-2 text-lg font-bold cursor-pointer flex items-center justify-between hover:text-[#003066]"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            Products
                            {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </li>

                        {/* Smooth Animation for Dropdown */}
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.ul
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="ml-4  overflow-hidden"
                                >
                                    {data?.map((product) => (
                                        <Link key={product.id} href={`${process.env.NEXT_PUBLIC_BASE_PATH}product/${product?.seo}`} passHref>
                                            <li onClick={closeSidebar} className="py-2 text-md hover:text-[#003066] cursor-pointer">
                                                {product.content}
                                            </li>
                                        </Link>
                                    ))}
                                </motion.ul>
                            )}
                        </AnimatePresence>

                        <Link href="/partner" passHref>
                            <li onClick={closeSidebar} className="py-2 text-lg hover:text-[#003066] font-bold cursor-pointer">
                                Partner with Us
                            </li>
                        </Link>
                        {activationBlog === "active" && (
                            // <NavItem href="/blog" label="Resources" />
                            <Link href="/blog" passHref>
                                <li onClick={closeSidebar} className="py-2 text-lg hover:text-[#003066] font-bold cursor-pointer">
                                    Resources
                                </li>
                            </Link>
                        )}
                        <Link href="/contact" passHref>
                            <li onClick={closeSidebar} className="py-2 text-lg hover:text-[#003066] font-bold cursor-pointer">
                                Contact
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </>
    );
}
