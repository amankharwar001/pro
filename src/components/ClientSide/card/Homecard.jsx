import React from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Homecard = ({ apidata }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: index * 0.3 } // stagger by index
        })
    };

    return (
        <div ref={ref}>
            <div className="container overflow-hidden text-center py-20">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{apidata?.heading}</h2>
                <p className="mt-2 text-base md:text-xl">{apidata?.content}</p>
            </div>
            <div className="flex flex-wrap justify-center mt-10 md:mt-28 container overflow-hidden md:px-0 m-auto gap-y-36 lg:px-10">
                {apidata?.card.map((card, index) => (
                    <motion.div
                        key={index}
                        className={`${index === 1 ? 'bg-[#013466] text-white relative md:-top-10 ' : 'bg-white'} grow lg:max-w-[360px] relative pb-10 max-w-sm mx-auto bg-card border rounded-lg shadow-lg`}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={cardVariants}
                        custom={index} // custom prop to control stagger
                    >
                        <div>
                            <div className="px-8 relative -top-10">
                                <Image
                                    src={`/${apidata?.images[index]?.filePath}`}
                                    alt={apidata?.images[index]?.altText || 'Card Image'}
                                    className="rounded-xl bg-slate-200 w-full object-cover border border-slate-400"
                                    width={320}
                                    height={150}
                                />
                            </div>
                            <div className="px-6">
                                <h2 className="text-2xl font-bold text-center text-primary">{card.title}</h2>
                                <div
                                    className="text-muted-foreground text-center mt-2"
                                    dangerouslySetInnerHTML={{ __html: card.content }}
                                ></div>
                                <hr className="my-4 border-border" />
                                <div
                                    className="text-center text-muted"
                                    dangerouslySetInnerHTML={{ __html: card.info }}
                                ></div>
                                <div className="w-full absolute right-2/4 translate-x-2/4 -bottom-5">
                                    <button
                                        className={`${index === 1 ? "bg-white text-black shadow-md"  :"bg-[#013466] hover:bg-red-600 text-white "}  flex m-auto items-center justify-center py-3 px-5 rounded-full`}
                                        onClick={() => window.open(card.btnlink, '_blank')}
                                    >
                                        {card.btnname}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div
                className="container w-full flex justify-center mt-8 text-xs"
                dangerouslySetInnerHTML={{ __html: apidata?.bottomtext }}
                
            ></div>
        </div>
    );
};

export default Homecard;
