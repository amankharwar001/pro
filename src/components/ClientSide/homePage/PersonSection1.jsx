import Image from 'next/image';
import Link from 'next/link';
import { Fade, Zoom } from 'react-awesome-reveal';

export default function PersonSection1({ apidata }) {
    // Extract the images from the API data
    const primaryImage = apidata?.images?.find(img => img.referenceType === 'homepage_section7_primary');
    const secondaryImage = apidata?.images?.find(img => img.referenceType === 'homepage_section7_1');

    return (
        <div className="container m-auto grid md:grid-cols-2 gap-5 -mt-10 md:mt-20 mb-10 md:mb-20">
            <div className="' order-last md:order-none w-full mb-6 md:mb-0 relative md:pt-0 pt-5">
                <div className="lg:max-w-[497px] w-full">
                    <Zoom triggerOnce delay={300}>
                        <div className="flex justify-end w-full">
                            {primaryImage && (
                                <Image
                                    src={`/${primaryImage.filePath}`}
                                    alt={primaryImage.altText || 'Primary Image'}
                                    className="rounded-xl bg-slate-200 w-full object-cover"
                                    width={693}
                                    height={100}
                                />
                            )}
                        </div>
                    </Zoom>
                </div>
                <div className="animate-left-right -pb-20 relative hidden lg:block w-[350px] lg:-right-[45%]">
                    {secondaryImage && (
                        <Image
                            width={550}
                            height={100}
                            className="w-full absolute -top-32 shadow-xl rounded-xl"
                            src={`/${secondaryImage.filePath}`}
                            alt={secondaryImage.altText || 'Secondary Image'}
                        />
                    )}
                </div>
            </div>
            <div className="mt-28">
                <Fade triggerOnce direction="up">
                    <h2 className="font-bold text-h2_large">{apidata?.heading}</h2>
                </Fade>
                <Fade triggerOnce>
                    {/* <p className="mt-4 text-p text-paragraph">{apidata?.content}</p> */}
                    <div
                        className="mt-4 text-p text-paragraph  "
                        dangerouslySetInnerHTML={{ __html: apidata?.content }}
                    />
                    <div className="mt-6">
                        <button
                            onClick={() => {
                                if (apidata?.btnLink) {
                                    window.location.href = apidata.btnLink;
                                }
                            }}
                            className="flex bg-[#013466] hover:bg-red-600 text-white text-base md:text-lg justify-start md:justify-center p-2 md:p-4 px-4 md:px-6 rounded-full mt-6"
                        >
                            {apidata?.btn}
                        </button>
                    </div>
                </Fade>
            </div>
        </div>
    );
}
