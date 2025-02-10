import React from 'react';
import { Fade } from 'react-awesome-reveal';
import Image from 'next/image';


const Footercta = () => {
    return (
        <div>
            <div className=' overflow-hidden bg-[#003066] absolute -top-20 left-2/4 -translate-x-2/4  rounded-2xl w-[90%]'>
                <div className=" p-8 md:p-16 md:flex justify-between m-auto text-white z-20">
                    <div>
                        <Fade triggerOnce  duration={2000} delay={300}>
                            <h2 className="text-h2_medium font-bold mb-4">Have any question?</h2>
                            <p className="text-[18px] mb-6">Ask us anything. Do you have a love question you want us to answer?</p>
                        </Fade>
                    </div>
                    <div className="flex items-center">
                        <Fade triggerOnce duration={2000} delay={500}>
                            {/* <button className="flex bg-white text-black font-bold text-base md:text-lg justify-start md:justify-center p-2 md:p-4 px-4 md:px-6 rounded-full mt-6">
                                Contact Us
                            </button> */}
                            <div class="p-4 flex flex-col items-center justify-center">
                                <div class="cursor-pointer">
                                    <button class="relative inline-flex items-center justify-center bg-white px-6 py-3 overflow-hidden font-medium text-teal-600 transition duration-300 ease-out rounded-md shadow-md group">
                                        <span class="absolute inset-0 flex items-center justify-center w-full h-full  duration-300 -translate-x-full bg-red-600 group-hover:translate-x-0 ease">
                                        </span>
                                        <span class="relative font-bold text-base md:text-lg text-[#013466] group-hover:text-white">Contact Us</span>
                                    </button>
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>
                <div className='absolute bottom-[10%] right-[10%] animate-left-right'>
                    <Image
                        src="/paramotor_assets/footer_cta/icon-1.png"
                        alt="Paramotor Logo"
                        className=" w-16"
                        width={100}
                        height={20}
                    />
                </div>
                <div className='absolute bottom-0 left-[40%] animate-left-right'>
                    <Image
                        src="/paramotor_assets/footer_cta/icon-2.png"
                        alt="Paramotor Logo"
                        className="w-20"
                        width={100}
                        height={20}
                    />
                </div>
                <div className='absolute bottom-0 left-[60%] animate-zoom-in-out'>
                    <Image
                        src="/paramotor_assets/footer_cta/icon-3.png"
                        alt="Paramotor Logo"
                        className="w-44"
                        width={100}
                        height={20}
                    />
                </div>
                <div className='absolute top-0 right-0 animate-zoom-in-out'>
                    <Image
                        src="/paramotor_assets/footer_cta/icon-4.png"
                        alt="Paramotor Logo"
                        className="w-20"
                        width={100}
                        height={20}
                    />
                </div>
                <div className='absolute bottom-0 left-0 animate-zoom-in-out'>
                    <Image
                        src="/paramotor_assets/footer_cta/icon-5.png"
                        alt="Paramotor Logo"
                        className="w-28 "
                        width={100}
                        height={20}
                    />
                </div>
                <div className='absolute top-0 left-[50%]'>
                    <Image
                        src="/paramotor_assets/footer_cta/icon-6.png"
                        alt="Paramotor Logo"
                        className="w-20"
                        width={100}
                        height={20}
                    />
                </div>
            </div>
        </div>
    );
};

export default Footercta;
