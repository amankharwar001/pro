import { useState } from "react";
import Link from "next/link";
import { TiArrowSortedUp } from "react-icons/ti";
import { IoIosArrowDown } from "react-icons/io";

export default function NavBar({ data }) {
  return (
    <header className="text-black">
      {/* Main Navbar */}
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {/* Dropdown Menu for Product */}
          <NavItem href={process.env.NEXT_PUBLIC_BASE_PATH} label="Home" />
          <div className="relative group ">
            <div className="flex items-center gap-2">
                <span className="text-md font-medium cursor-pointer group-hover:text-[#013466] transition  ">
                Product
                </span>
                <span className=" group-hover:rotate-180 transform transition-all duration-2000 ease-out group-hover:text-[#013466]"> <IoIosArrowDown /></span>
            </div>
            {/* Dropdown on hover */}
            <ul className="absolute hidden group-hover:flex max-w-72 py-3 pr-5 flex-col bg-white shadow-md rounded-md">
              {data?.map((product) => (
                <NavItem
                  key={product.id}
                  href={`${process.env.NEXT_PUBLIC_BASE_PATH}product/${product?.link}`}
                  label={product.nickname}
                />
              ))}
            </ul>
          </div>

          {/* Static Navigation Links */}
          <NavItem href="/about" label="About" />
          <NavItem href="/partner" label="Partner with Us" />
          <NavItem href="/blog" label="Resources" />
          <NavItem href="/contact" label="Contact" />
        </nav>
      </div>
    </header>
  );
}

const NavItem = ({ href, label }) => (
  <li className="list-none">
    <Link
      href={href}
      passHref
      className="block px-4 py-2 text-md font-medium text-black hover:text-[#013466] rounded transition whitespace-nowrap"
    >
      {label}
    </Link>
  </li>
);
