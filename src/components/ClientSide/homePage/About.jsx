import React from 'react';
import Image from 'next/image';
import { Fade, Slide } from 'react-awesome-reveal';

const About = ({ apidata }) => {
    

    return (
        <div className='bg-[#003066] '>
            <div className="container p-8 text-white py-24">
                <div className='lg:grid grid-cols-4 gap-6'>
                    <div className='col-span-2'>
                        <Slide triggerOnce direction="left">
                            <h5 className="font-bold mb-4">{apidata?.heading}</h5>
                        </Slide>
                        <Fade triggerOnce direction="left" delay={300}>
                            <h2 className="font-bold mb-6">{apidata?.content}</h2>
                        </Fade>
                        <Fade triggerOnce delay={600} className='flex'>
                            <a
                                href={apidata?.btnLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-auto border border-white hover:bg-white hover:text-black text-white text-base md:text-lg justify-start md:justify-center p-2 md:px-4 rounded-full "
                            >
                                {apidata?.btn}
                            </a>
                        </Fade>
                    </div>
                    <div className="lg:pt-0 pt-10 col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {apidata?.info.map((item, index) => (
                            <Fade triggerOnce direction="up" delay={index * 200} key={index}>
                                <div className="flex items-start gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 6L9 17l-5-5"></path>
                                    </svg>
                                    <div>
                                        <h6 className="font-semibold">{item.heading}</h6>
                                        <p className='text-sm md:text-base'>{item.content}</p>
                                    </div>
                                </div>
                            </Fade>
                        ))}
                    </div>
                </div>
                <hr className='mt-24' />
                <div className="lg:flex justify-between items-center mt-8 text-center">
                    <p className='text-start lg:text-center'>{apidata?.bottomtext}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8 lg:justify-center place-items-center">
                        {apidata?.images.map((image, index) => (
                            <Fade triggerOnce delay={index * 200} key={image.id}>
                                <Image
                                    src={`/${image.filePath}`}
                                    alt={image.altText || `Paramotor image ${index + 1}`}
                                    className=" md:w-full  md:h-5 object-contain mx-auto mt-5 md:mt-0"
                                    width={131}
                                    height={75}
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
