import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Fade, Zoom } from 'react-awesome-reveal';
import Image from 'next/image';

function ContactInfo({ data, baseUrl }) {
    const svg1 = data.Images.find(
        (image) => image.referenceId === 2
    );
    const svg2 = data.Images.find(
        (image) => image.referenceId === 3
    );
    const svg3 = data.Images.find(
        (image) => image.referenceId === 4
    );

    return (
        <div className="bg-gray-50 py-12">
            <div className="container mx-auto text-center">
                <Fade triggerOnce delay={100}>
                    <h2 className="font-bold mb-2">{data.getInTouchData[0].heading}</h2>
                </Fade>
                <Fade triggerOnce delay={300}>
                    <p className="text-gray-600 mb-8">
                        {data.getInTouchData[0].content}
                    </p>
                </Fade>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Head Office Address Card */}
                    <div className="bg-white p-8 rounded-lg shadow-md text-center py-12 flex  justify-center">
                        <Fade triggerOnce delay={500} direction='up'>
                            <div className=''>
                                <Image className='bg-black w-14 h-14 rounded-full p-2 m-auto' src={baseUrl + svg1.filePath} alt="" />

                                <h3 className="text-lg font-semibold">{data.getInTouchData[0].card[0].title}</h3>
                                <p className="text-gray-700 mt-2 text-base md:text-lg">
                                    {data.getInTouchData[0].card[0].content}
                                </p>
                            </div>
                        </Fade>
                    </div>

                    {/* Email Us Card */}
                    <div className="bg-white p-8 rounded-lg shadow-md text-center py-12 flex  justify-center">
                        <Fade triggerOnce delay={700} direction='up'>
                            <div>
                                <Image className='bg-black w-14 h-14 rounded-full p-2 m-auto' src={baseUrl + svg2.filePath} alt="" />
                                <h3 className="text-lg font-semibold">{data.getInTouchData[0].card[1].title}</h3>
                                <p className="text-gray-700 mt-2 text-base md:text-lg">
                                    {data.getInTouchData[0].card[1].content}
                                    {/* <strong>EXISTING CUSTOMER -</strong> customersupport@paramotordt.com<br />
                                    <strong>NEW CUSTOMER -</strong> sales@paramotordt.com<br />
                                    <strong>JOIN US -</strong> hr@paramotordt.com */}
                                </p>
                            </div>
                        </Fade>
                    </div>

                    {/* Call Us Card */}
                    <div className="bg-white p-8 rounded-lg shadow-md text-center text-base md:text-lg py-12 flex  justify-center">
                        <Fade triggerOnce delay={800} direction='up'>
                            <div >
                                <Image className='bg-black w-14 h-14 rounded-full p-2 m-auto ' src={baseUrl + svg2.filePath} alt="" />
                                <h3 className="text-lg font-semibold">{data.getInTouchData[0].card[2].title}</h3>
                                <p className="text-gray-700 mt-2">{data.getInTouchData[0].card[2].content}</p>
                            </div>
                        </Fade>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactInfo;