import React from 'react';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import Header from '../../components/ClientSide/commonComponent/Header';
import FooterSection from '../../components/ClientSide/commonComponent/FooterSection';
import Image from 'next/image';
const Found4O4 = () => {
    return (
        <>
            
            <section className="flex justify-center items-center pb-20">
      <div className="text-center container mx-auto px-4">
        <div className="flex justify-center items-center">
          <div className="w-full">
            <div className="relative w-full h-[300px] md:h-[400px] mx-auto -mt-10 -mb-24 -z-[10]">
              <Image
                src="/gif/stone_age.gif"  
                alt="404 Gif"
                layout="fill"
                objectFit="contain"
                loading="lazy"
                className="rounded-lg"
              />
            </div>
            <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
            <div className="">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Look like youre lost
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                The page you are looking for is not available!
              </p>
              <Link href="/" className="bg-[#003066] text-white py-2 px-6 rounded-lg hover:bg-[#1a3350] transition duration-300">
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
            
        </>

    );
};

export default Found4O4;

