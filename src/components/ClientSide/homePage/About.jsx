import React from 'react';
import Image from 'next/image';
import { Fade, Slide } from 'react-awesome-reveal';
import { IoCheckmark } from "react-icons/io5";

const About = ({ apidata }) => {


    return (
        <div className='bg-[#003066] py-32'>
            <div className="container overflow-hidden p-8 text-white ">
                <div className='lg:grid grid-cols-4 gap-6'>
                    <div className='col-span-2'>
                        <Slide triggerOnce direction="left">
                            <h6 className="font-bold mb-4 text-p ">{apidata?.heading}</h6>
                        </Slide>
                        <Fade triggerOnce direction="left" delay={300}>
                            <h3 className="font-bold mb-6 text-h3_medium">{apidata?.content}</h3>
                        </Fade>
                        {/* <Fade triggerOnce delay={600} className='flex'>
                            <a
                                href={apidata?.btnLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-auto border border-white hover:bg-white hover:text-black text-white text-base md:text-lg justify-start md:justify-center p-2 md:px-4 rounded-full "
                            >
                                {apidata?.btn}
                            </a>
                        </Fade> */}
                        {apidata?.btn && (
                            <Fade triggerOnce delay={600} className='flex'>
                                <a
                                    href={apidata?.btnLink || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-auto border border-white hover:bg-white hover:text-black text-white text-base md:text-lg justify-start md:justify-center p-2 md:px-4 rounded-full"
                                >
                                    {apidata?.btn}
                                </a>
                            </Fade>
                        )}

                    </div>
                    <div className="lg:pt-0 pt-10 col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
                        {apidata?.info.map((item, index) => (
                            <Fade triggerOnce direction="up" delay={index * 200} key={index}>
                                <div className="flex items-start gap-2">
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 6L9 17l-5-5"></path>
                                    </svg> */}
                                    <span>  <IoCheckmark className='text-white text-semibold' size={20} /> </span>
                                    <div>
                                        <h3 className="font-semibold pb-2 text-p">{item.heading}</h3>
                                        <p className='text-p text-gray-300'>{item.content}</p>
                                    </div>
                                </div>
                            </Fade>
                        ))}
                    </div>
                </div>
                <hr className='mt-24' />
                <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] items-center mt-10 text-center gap-6 md:gap-10">
                    {/* Left Text Section */}
                    <h6 className="text-h6  m-auto lg:m-0 lg:max-w-sm text-semibold text-start">
                        {apidata?.bottomtext}
                    </h6>

                    {/* Right Image Section */}
                    <div className="flex flex-wrap justify-center md:justify-around gap-4 logocol">
                        {apidata?.images.map((image, index) => (
                            <Fade triggerOnce delay={index * 200} key={image.id}>
                                <Image
                                    src={`/${image.filePath}`}
                                    alt={image.altText || `Paramotor image ${index + 1}`}
                                    className="w-24 h-auto md:w-32  object-contain"
                                    width={160}
                                    height={90}
                                />
                            </Fade>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
