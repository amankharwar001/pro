
import React from "react";
import Image from "next/image";
import { Fade, Zoom } from "react-awesome-reveal";

const CardSection2 = ({ section4, baseUrl }) => {
    console.log("section 4 data:", section4);

    return (
        <div className="relative bg-white py-20 lg:px-20  pb-10">
            <div className="container mx-auto flex flex-col gap-16">
                {section4.section4Data.section4.map((item, index) => {
                    // Find image by referenceId (starting from 41)
                    const imageIndex = index + 41;
                    const image = section4.Images.find((img) => img.referenceId === imageIndex);

                    // Alternate layouts: even indexes → text left, image right; odd indexes → image left, text right
                    const isTextLeft = index % 2 === 0;

                    return (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row pb-20 mb-10 sm-pb-0 items-center py-0 gap-10 ${isTextLeft ? "md:flex-row" : "md:flex-row-reverse"
                                }`}
                        >
                            {/* Left Side - Text */}
                            <div className="flex-1 text-center md:text-start z-10">
                                <Fade triggerOnce delay={100}>
                                    <h2 className="font-bold text-gray-900 text-h2_large">{item.heading}</h2>
                                </Fade>
                                <Fade triggerOnce delay={300}>
                                    <p className="mt-4 text-gray-600 text-p">{item.text}</p>
                                </Fade>
                            </div>

                            {/* Right Side - Image */}
                            <div className="tabmb_30 flex-shrink-0 w-full md:w-1/2 flex justify-center relative">
                                {/* Background Circle - Conditional Rendering */}
                                {isTextLeft ? (
                                    // Jab Image RIGHT side ho, toh ye background dikhaye
                                    <div className="absolute top-1/2 -translate-y-2/4 lg:right-0 lg:top-2/4 lg:-translate-y-2/4 flex justify-center items-center">
                                        <div className="w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px] bg-gradient-to-r from-[#fff2d7] to-[#f8d9d5] opacity-50 custom-border-radius-2"></div>
                                    </div>
                                ) : (
                                    // Jab Image LEFT side ho, toh ye background dikhaye
                                    <div className="absolute top-1/2 -translate-y-2/4  lg:left-2 lg:top-2/4 lg:-translate-y-2/4 flex justify-center items-center">
                                        <div className="w-[220px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] bg-gradient-to-r from-[#fff2d7] to-[#f8d9d5] opacity-50 custom-border-radius-1"></div>
                                    </div>
                                )}

                                {/* Responsive Image */}
                                {image && (
                                    <div className={`relative w-full max-w-[320px] lg:max-w-[450px] ${!isTextLeft?"xl:-left-16":""} `}>
                                        <Zoom triggerOnce delay={50}>
                                            <Image
                                                src={`${baseUrl}${image.filePath}`}
                                                alt={image.altText || "Section Image"}
                                                layout="responsive"
                                                width={550}
                                                height={350}
                                                className="rounded-lg"
                                            />
                                        </Zoom>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CardSection2;
