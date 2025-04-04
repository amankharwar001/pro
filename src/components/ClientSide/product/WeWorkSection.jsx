import React from 'react'
import Image from "next/image";
import { Fade, Zoom } from 'react-awesome-reveal';
const WeWorkSection = ({section6,baseUrl}) => {
    const svg1 = section6.Images.find(
        (image) => image.referenceId === 61
      );
      const svg2 = section6.Images.find(
        (image) => image.referenceId === 62
      );
      const svg3 = section6.Images.find(
        (image) => image.referenceId === 63
      );
    return (
        <div className='bg-[#003066]  text-white overflow-hidden py-16'>
            <div className="container bg-background ">
                <div className="text-center mb-8">
                    <Fade triggerOnce delay={100} >
                        <h2 className=" font-bold text-h2_large">{section6.section6Data.heading}</h2>
                    </Fade>
                    <Fade triggerOnce delay={300}>
                        <p className="text-p md:max-w-[60%] m-auto">{section6.section6Data.text}</p>
                    </Fade>
                </div>
                <div className="relative grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 gap-5 py-10">
                    <div className="text-center relative mb-8 md:mb-0">
                        <div className='flex items-center justify-center'>
                            <Zoom triggerOnce delay={400}>
                                <Image
                                    src={`${baseUrl}${svg1?.filePath}`}
                                    alt={svg1?.altText}
                                    className=" mb-5 "
                                    width={80}
                                    height={20}
                                />

                            </Zoom>

                        </div>
                        <h3 className="text_h3 font-semibold text-primary">{section6.section6Data.info[0].title}</h3>
                        <p className="text-muted-foreground">{section6.section6Data.info[0].content}</p>
                    </div>
                    <div className="text-center mb-0 md:mb-0">

                        <Image
                            src="/product/line-shape.png"
                            alt="Paramotor Logo"
                            className="hideon_tab hideon_tabwave max-w-[50vw] lg:min-w-[5vw] xl:min-w-[50vw] top-2/4 -translate-y-20 absolute right-2/4 translate-x-2/4 "
                            width={520}
                            height={20}
                        />
                        <div className=''>
                            <div className='   flex items-center justify-center'>
                                <Zoom triggerOnce delay={500}>

                                    <Image
                                        src={`${baseUrl}${svg2?.filePath}`}
                                        alt={svg2?.altText}
                                        className=" mb-10 "
                                        width={80}
                                        height={20}
                                    />
                                </Zoom>

                            </div>
                        </div>
                        <h3 className="text_h3 font-semibold text-primary">{section6.section6Data.info[1].title}</h3>
                        <p className="text-muted-foreground">{section6.section6Data.info[1].content}</p>
                    </div>
                    <div className="text-center">
                        <div className='flex items-center justify-center'>
                            <Zoom triggerOnce delay={600}>
                                <Image
                                    src={`${baseUrl}${svg3?.filePath}`}
                                    alt={svg3?.altText}
                                    className="mb-10 "
                                    width={80}
                                    height={20}
                                />
                            </Zoom>

                        </div>
                        <h3 className="text_h3 font-semibold text-primary">{section6.section6Data.info[2].title}</h3>
                        <p className="text-muted-foreground">{section6.section6Data.info[2].content}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeWorkSection
