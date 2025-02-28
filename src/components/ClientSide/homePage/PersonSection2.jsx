import Image from 'next/image';
import { Fade, Slide, Zoom } from 'react-awesome-reveal';

export default function PersonSection2({ apidata }) {
    // Extract images from the API data
    const primaryImage = apidata?.images?.find(img => img.referenceType === 'homepage_section_8_primary');
    const shape1Image = apidata?.images?.find(img => img.filePath.includes('shape-1'));
    const shape2Image = apidata?.images?.find(img => img.filePath.includes('shape-2'));

    return (
        <div className='bg-[#F3F3F5] py-20'>
            <div className="container overflow-hidden m-auto grid md:grid-cols-2 gap-5 items-center">
                <div className="order-last md:order-none">
                    {/* Fade In Animation for Heading */}
                    <Fade triggerOnce direction="up">
                        <h2 className="font-bold mb-4 text-h2_large">{apidata?.heading}</h2>
                    </Fade>

                    {/* Fade In Animation for Paragraph */}
                    <Fade triggerOnce direction="up" delay={300}>
                        <p className="mb-6 text-paragraph text-p">{apidata?.content}</p>
                    </Fade>

                    {/* Slide In Animation for Button */}
                    <Slide triggerOnce direction="up" delay={600}>
                        <a href={apidata?.btnLink || '#'} target="_blank" rel="noopener noreferrer">
                            <button className="flex bg-[#013466] hover:bg-red-600 text-white text-base md:text-lg justify-start md:justify-center p-2 md:p-4 px-4 md:px-6 rounded-full mt-6">
                                {apidata?.btn}
                            </button>
                        </a>
                    </Slide>
                </div>

                <div className="w-full mt-6 md:mt-0 flex justify-center md:justify-end relative">
                    <div className='lg:max-w-[497px] w-full'>
                        <div className='flex lg:justify-end w-full'>
                            <Zoom triggerOnce className='w-full'>
                                {primaryImage && (
                                    <Image
                                        src={`/${primaryImage.filePath}`}
                                        alt={primaryImage.altText || 'Image'}
                                        className="rounded-xl bg-slate-200 w-full object-cover"
                                        width={693}
                                        height={100}
                                    />
                                )}
                            </Zoom>
                        </div>
                    </div>

                    {/* Animations for images */}
                    <div className="mt-4 absolute hidden lg:block bottom-10 left-10">
                        <div className="bg-card p-4 mb-2">
                            {/* Slide In Animation for Shape 1 */}
                            {shape1Image && (
                                <div className='shadow-md animate-left-right rounded-lg flex w-72'>
                                    <Image
                                        src={`/${shape1Image.filePath}`}
                                        alt={shape1Image.altText || 'Shape 1'}
                                        className="rounded-xl bg-slate-200 w-[314px] h-[75px] object-cover"
                                        width={314}
                                        height={75}
                                    />
                                </div>
                            )}

                            {/* Slide In Animation for Shape 2 */}
                            {shape2Image && (
                                <div className='shadow-md animate-right-left rounded-lg flex w-72 mt-10'>
                                    <Image
                                        src={`/${shape2Image.filePath}`}
                                        alt={shape2Image.altText || 'Shape 2'}
                                        className="rounded-xl bg-slate-200 w-[314px] h-[75px] object-cover"
                                        width={314}
                                        height={75}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
