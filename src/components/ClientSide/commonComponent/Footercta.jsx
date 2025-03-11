import React, { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import Image from 'next/image';
import Link from 'next/link';


const Footercta = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;
    const [footerCta, setFooterCta] = useState(null);
    console.log("footer cta show is here", footerCta)


    useEffect(() => {
        const fetchFooterData = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/public/footer-cta`, {
                    headers: {
                     'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
                    },
                  });
                if (response.ok) {
                    const data = await response.json();
                    setFooterCta(data.data); // Save footer data to state
                }
            } catch (err) {
                console.error('Error fetching footer data:', err);
            }
        };

        fetchFooterData(); // Call function to fetch footer data
    }, [baseUrl]);
    return (
        <div>
            <div className=' overflow-hidden bg-[#003066] absolute -top-20 left-2/4 -translate-x-2/4  rounded-2xl w-[90%]'>
                <div className=" p-8 md:p-16 md:flex justify-between m-auto text-white z-20">
                    <div>
                        <Fade triggerOnce duration={2000} delay={300}>
                            <h2 className="text-h2_medium font-bold mb-4">{footerCta?.heading}</h2>
                            <p className="text-[18px] mb-6">{footerCta?.text}</p>
                        </Fade>
                    </div>
                    <div className="flex items-center">
                        <Fade triggerOnce duration={2000} delay={500}>
                            {/* <button className="flex bg-white text-black font-bold text-base md:text-lg justify-start md:justify-center p-2 md:p-4 px-4 md:px-6 rounded-full mt-6">
                                Contact Us
                            </button> */}
                            <div class="p-4 flex flex-col items-center justify-center">
                                <div class="cursor-pointer">
                                    <Link href={footerCta?.btnLink || "#"} className="relative inline-flex items-center justify-center bg-white px-6 py-3 overflow-hidden font-medium text-teal-600 transition duration-300 ease-out rounded-md shadow-md group">
                                        <span className="absolute inset-0 flex items-center justify-center w-full h-full duration-300 -translate-x-full bg-red-600 group-hover:translate-x-0 ease"></span>
                                        <span className="relative font-bold text-base md:text-lg text-[#013466] group-hover:text-white">
                                            {footerCta?.btn}
                                        </span>
                                    </Link>
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
