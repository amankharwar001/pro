import React from 'react';
import { Fade } from 'react-awesome-reveal';
import Image from 'next/image';


const Footercta = () => {
    return (
        <div className='container bg-[#003066] absolute -top-20 left-2/4 -translate-x-2/4 p-8 md:p-16 rounded-2xl w-[90%]'>
            <div className="  md:flex justify-between m-auto text-white z-20">
                <div>
                    <Fade triggerOnce cascade duration={1000} delay={300}>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Have any question?</h2>
                        <p className="text-base md:text-xl mb-6">Ask us anything. Do you have a love question you want us to answer?</p>
                    </Fade>
                </div>
                <div className="flex items-center">
                    <Fade triggerOnce duration={1000} delay={500}>
                        <button className="flex bg-white text-black font-bold text-base md:text-lg justify-start md:justify-center p-2 md:p-4 px-4 md:px-6 rounded-full mt-6">
                            Contact Us
                        </button>
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
    );
};

export default Footercta;
