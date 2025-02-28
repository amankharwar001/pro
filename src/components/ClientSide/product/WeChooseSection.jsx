import React from 'react';
import { Fade, Zoom } from 'react-awesome-reveal';

const WeChooseSection = ({ section7 }) => {
    return (
        <div className='py-16'>
            <div className="container mx-auto   lg:grid grid-cols-2 gap-5 place-items-center">
                {/* Section Heading and Button */}
                <div className="m-auto md:text-start place-content-start w-[80%]  p-4">
                    <Fade triggerOnce delay={100}>
                        <h2 className="font-bold mb-4 text-h2_large">{section7.heading}</h2>
                    </Fade>
                    <Fade triggerOnce delay={400}>
                        <p className="text-p mb-6">{section7.text}</p>
                        <a href={section7.btnLink} className="text-primary font-semibold hover:underline">
                            {section7.btn}
                        </a>
                    </Fade>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {section7.info.map((item, index) => (
                        <Zoom triggerOnce delay={500 + index * 100} key={index}>
                            <div className={`bg-card p-6 lg:p-8 rounded-lg shadow-xl ${index  === 0 ? '' : 'bg-[#F6F6F6]'}`}>
                                <h3 className="text-[#003066] text_h3 font-semibold">{String(index + 1).padStart(2, '0')}</h3>
                                <h5 className="text_h5 font-bold mt-2 mb-2">{item.title}</h5>
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
