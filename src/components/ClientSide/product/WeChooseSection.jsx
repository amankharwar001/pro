import React from 'react';
import { Fade, Zoom } from 'react-awesome-reveal';
import { FaArrowRightLong } from "react-icons/fa6";

const WeChooseSection = ({ section7 }) => {
    return (
        <div className='py-16'>
            <div className="container mx-auto  lg:grid grid-cols-2 gap-5 place-items-center grid_center">
                {/* Section Heading and Button */}
                <div className="m-auto text-center lg:text-start place-content-start w-[100%]  p-4">
                    <Fade triggerOnce delay={100}>
                        <h2 className="font-bold mb-4 text-h2_large">{section7.heading}</h2>
                    </Fade>

                    <Fade triggerOnce delay={400}>
                        {section7.text && (
                            <>
                                <p className="text-p mb-6">{section7.text}</p>
                                {section7.btn && section7.btnLink && (
                                    <a href={section7.btnLink} className="flex justify-center lg:justify-start items-center text-blue-900 gap-2 group text-primary font-semibold hover:underline">
                                        {section7.btn}
                                        <FaArrowRightLong />
                                    </a>
                                )}
                            </>
                        )}

                    </Fade>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-4 mt-0 whychoose_boxes">
                    {section7.info
                        .filter((item) => item.title.trim() !== "" && item.content.trim() !== "")
                        .map((item, index) => (
                            <Zoom triggerOnce delay={500 + index * 100} key={index}>
                                <div className="bg-card h-100 whychoosebox_card p-6 lg:p-8 rounded-lg hover:shadow-custom hover:bg-white bg-[#F6F6F6]">
                                    <h5 className="text-[#003066] text-h2_large font-semibold">
                                        {String(index + 1).padStart(2, "0")}
                                    </h5>
                                    <h3 className="text-h5 font-bold mt-2 mb-2">{item.title}</h3>
                                    <p className="text-p">{item.content}</p>
                                </div>
                            </Zoom>
                        ))}

                </div>
            </div>
        </div>
    );
};

export default WeChooseSection;
