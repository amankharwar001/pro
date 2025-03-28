import Image from "next/image";
import { Fade, Zoom } from "react-awesome-reveal";

export default function FeatureGrid({ data = {}, baseUrl = "" }) {
    // Safely access images and ensure valid references
    const images = Array.from({ length: 6 }, (_, i) =>
        data?.images?.find((image) => image.referenceId === i + 1) || null
    );

    return (
        <div className="bg-[#F4F8FB] py-16">
            {/* Section Heading */}
            <div className="text-center mb-8">
                <Fade triggerOnce delay={100}>
                    <h2 className="md:max-w-[750px] m-auto font-bold about-heading">
                        {data?.heading || "Default Heading"}
                    </h2>
                </Fade>
            </div>

            {/* Feature Cards Grid */}
            {/* <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
                {data?.card?.map((feature, index) => {
                    const currentImage = images[index];

                    return (
                        <Zoom triggerOnce key={index} delay={100 * index + 100}>
                            <div className="bg-white rounded-3xl shadow-md p-6 md:p-12 text-center md:text-start">
                                
                                <div className="flex items-end justify-between mb-5">
                                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                                        {currentImage ? (
                                            <Image
                                                src={`${baseUrl}${currentImage.filePath}`}
                                                alt={currentImage.altText || "Feature Icon"}
                                                className="object-contain"
                                                width={25}
                                                height={25}
                                            />
                                        ) : (
                                            <span className="text-gray-400">N/A</span>
                                        )}
                                    </div>
                                    <div className="text-gray-500 font-medium">0{index + 1}</div>
                                </div>

                               
                                <h3 className="font-semibold text-lg">{feature?.title || "Feature Title"}</h3>
                                <p className="text-gray-600 mt-2">
                                    {feature?.description || "Default description for the feature."}
                                </p>
                            </div>
                        </Zoom>
                    );
                })}
            </div> */}
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
  {data?.card?.map((feature, index) => {
    const currentImage = images[index];
    const hasContent = currentImage || feature?.title || feature?.description;

    if (!hasContent) return null; // Skip rendering if all are empty

    return (
      <Zoom triggerOnce key={index} delay={100 * index + 100}>
        <div className="bg-white rounded-3xl shadow-md p-6 md:p-12 text-center md:text-start mob_number">
          {/* Icon and Index */}
          <div className="flex items-end justify-between mb-5">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              {currentImage ? (
                <Image
                  src={`${baseUrl}${currentImage.filePath}`}
                  alt={currentImage.altText || "Feature Icon"}
                  className="object-contain"
                  width={25}
                  height={25}
                />
              ) : (
                <span className="text-gray-400">N/A</span>
              )}
            </div>
            <div className="text-gray-500 font-medium rightpos_numb">0{index + 1}</div>
          </div>

          {/* Feature Title and Description */}
          {feature?.title && <h3 className="font-semibold text-lg">{feature.title}</h3>}
          {feature?.description && <p className="text-gray-600 mt-2">{feature.description}</p>}
        </div>
      </Zoom>
    );
  })}
</div>

        </div>
    );
}
