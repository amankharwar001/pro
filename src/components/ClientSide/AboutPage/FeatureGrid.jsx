import Image from "next/image";
import { Fade, Zoom } from "react-awesome-reveal";  

export default function FeatureGrid({ data, baseUrl }) {
    // Create an array of images based on referenceId
    const images = [
        data.images.find((image) => image.referenceId === 1),
        data.images.find((image) => image.referenceId === 2),
        data.images.find((image) => image.referenceId === 3),
        data.images.find((image) => image.referenceId === 4),
        data.images.find((image) => image.referenceId === 5),
        data.images.find((image) => image.referenceId === 6),
    ];

    return (
        <div className="bg-[#F4F8FB] py-16">
            <div className="text-center mb-8">
                <Fade triggerOnce delay={100}>
                    <h2 className="md:max-w-[750px] m-auto font-bold">{data.heading}</h2>
                </Fade>
            </div>
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
                {data.card.map((feature, index) => {
                    // Get the current image dynamically
                    const currentImage = images[index];

                    return (
                        <Zoom triggerOnce key={index} delay={100 * index + 100}>
                            <div
                                key={feature.id}
                                className="bg-white rounded-3xl shadow-md p-6 md:p-12 text-center md:text-start"
                            >
                                <div className="flex items-end justify-between mb-5">
                                    <div className="w-10 object-contain bg-slate-200 rounded-full h-10 flex items-center">
                                        {currentImage && (
                                            <Image
                                                src={`${baseUrl}${currentImage.filePath}`}
                                                alt={currentImage.altText || "Image"}
                                                className="m-auto"
                                                width={25}
                                                height={25}
                                            />
                                        )}
                                    </div>
                                    <div>0{index + 1}</div>
                                </div>
                                <h3 className="font-semibold">{feature.title}</h3>
                                <p className="text-gray-600 mt-2">{feature.description}</p>
                            </div>
                        </Zoom>
                    );
                })}
            </div>
        </div>
    );
}