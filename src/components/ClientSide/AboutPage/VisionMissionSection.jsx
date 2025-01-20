// import Image from "next/image";
// import { Fade, Zoom } from 'react-awesome-reveal';



// const VisionIcon = () => (
//     <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 4.5C7.25 4.5 3.25 7.45 1 12c2.25 4.55 6.25 7.5 11 7.5s8.75-2.95 11-7.5C20.75 7.45 16.75 4.5 12 4.5zM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
//     </svg>
// );

// const MissionIcon = () => (
//     <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93V4.07c4.38.5 7.93 4.04 8.43 8.43h-8.43v8.43zM11 4.07v15.86c-4.38-.5-7.93-4.04-8.43-8.43H11z" />
//     </svg>
// );

// export default function VisionMissionSection({ data, baseUrl }) {
//     const images = [
//         data.images.find((image) => image.referenceType === "about_section4_primaryImage"),
//         data.images.find((image) => image.referenceType === "about_section4_secondaryImage"),
//         data.images.find((image) => image.referenceType === "aboutpage_section_4" && image.referenceId === 1),
//         data.images.find((image) => image.referenceType === "aboutpage_section_4" && image.referenceId === 2),
//     ];
//     return (
//         <div className="py-16">
//             <div className="container mx-auto flex flex-col lg:flex-row items-center px-6 gap-8">

//                 {/* Left Image Section */}
//                 <div className="flex-1">
//                     <div className="relative  overflow-hidden ">
//                         <Zoom triggerOnce delay={100}>
//                             <Image
//                                 src={`${baseUrl}${images[0].filePath}`}
//                                 alt={images[0].altText || "Image"}
//                                 width={500}
//                                 height={300}
//                                 className="object-cover w-full h-full rounded-lg shadow-lg"
//                             />
//                         </Zoom>
//                         <Fade triggerOnce direction="right" delay={200}>
//                             <div className=" md:flex hidden absolute bottom-40 left-4 h-28 w-72 bg-white p-4 rounded-lg shadow-md items-center space-x-4">
//                                 <Image
//                                     src={`${baseUrl}${images[1].filePath}`}
//                                     alt={images[1].altText || "Image"}
//                                     width={350}
//                                     height={100}
//                                     className="object-cover w-full h-full rounded-lg shadow-lg"
//                                 />
//                             </div>
//                         </Fade>
//                     </div>
//                 </div>

//                 {/* Right Info Section */}
//                 <div className="flex-1 flex flex-col gap-6">
//                     <div className="bg-white p-8 rounded-lg shadow-md md:flex gap-10 items-center">
//                         <div className="w-10 flex item-center mb-5 md:mb-0  ">
//                             <Zoom triggerOnce delay={100}>
//                                 <Image
//                                     src={`${baseUrl}${images[2].filePath}`}
//                                     alt={images[2].altText || "Image"}
//                                     width={38}
//                                     height={38}
//                                 />
//                             </Zoom>
//                         </div>
//                         <div>
//                             <Fade triggerOnce direction="up" delay={100}>
//                                 <div className="flex items-center mb-4">
//                                     <h3 className="font-bold ">{data.card[0].title}</h3>
//                                 </div>
//                             </Fade>
//                             <Fade triggerOnce direction="up" delay={300}>
//                                 <p className="text-gray-600 ">{data.card[0].description}</p>
//                             </Fade>
//                         </div>
//                     </div>

//                     <div className="bg-white p-8 h-full rounded-lg shadow-md md:flex gap-10 items-center">
//                         <div className="w-10 flex item-center mb-5 md:mb-0">
//                             <Zoom triggerOnce delay={500}>
//                             <Image
//                                     src={`${baseUrl}${images[3].filePath}`}
//                                     alt={images[3].altText || "Image"}
//                                     width={38}
//                                     height={38}
//                                 />
//                             </Zoom>
//                         </div>
//                         <div>
//                             <Fade triggerOnce direction="up" delay={500}>
//                                 <div className="flex items-center mb-4">
//                                     <h3 className="font-bold ">{data.card[1].title}</h3>
//                                 </div>
//                             </Fade>
//                             <Fade triggerOnce direction="up" delay={700}>
//                                 <p className="text-gray-600 ">{data.card[1].description}</p>
//                             </Fade>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }












import Image from "next/image";
import { Fade, Zoom } from "react-awesome-reveal";

const VisionIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4.5C7.25 4.5 3.25 7.45 1 12c2.25 4.55 6.25 7.5 11 7.5s8.75-2.95 11-7.5C20.75 7.45 16.75 4.5 12 4.5zM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
  </svg>
);

const MissionIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93V4.07c4.38.5 7.93 4.04 8.43 8.43h-8.43v8.43zM11 4.07v15.86c-4.38-.5-7.93-4.04-8.43-8.43H11z" />
  </svg>
);

export default function VisionMissionSection({ data, baseUrl }) {
  // Error handling for missing data
  

  const images = [
    data?.images?.find((image) => image.referenceType === "about_section4_primaryImage"),
    data?.images?.find((image) => image.referenceType === "about_section4_secondaryImage"),
    data?.images?.find((image) => image.referenceType === "aboutpage_section_4" && image?.referenceId === 1),
    data?.images?.find((image) => image.referenceType === "aboutpage_section_4" && image?.referenceId === 2),
  ];

  return (
    <div className="py-16">
      <div className="container overflow-hidden mx-auto flex flex-col lg:flex-row items-center px-6 gap-8">
        {/* Left Image Section */}
        <div className="flex-1">
          <div className="relative overflow-hidden">
            <Zoom triggerOnce delay={100}>
              {images[0]?.filePath ? (
                <Image
                  src={`${baseUrl}${images[0].filePath}`}
                  alt={images[0].altText || "Image"}
                  width={500}
                  height={300}
                  className="object-cover w-full h-full rounded-lg shadow-lg"
                />
              ) : (
                <div className="h-72 bg-gray-200 flex items-center justify-center rounded-lg">
                  No Image Available
                </div>
              )}
            </Zoom>
            <Fade triggerOnce direction="right" delay={200}>
              <div className="md:flex hidden absolute bottom-40 left-4 h-28 w-72 bg-white p-4 rounded-lg shadow-md items-center space-x-4">
                {images[1]?.filePath ? (
                  <Image
                    src={`${baseUrl}${images[1].filePath}`}
                    alt={images[1].altText || "Image"}
                    width={350}
                    height={100}
                    className="object-cover w-full h-full rounded-lg shadow-lg"
                  />
                ) : (
                  <div className="text-sm text-gray-400">No Image Available</div>
                )}
              </div>
            </Fade>
          </div>
        </div>

        {/* Right Info Section */}
        <div className="flex-1 flex flex-col gap-6">
          {data?.card?.slice(0, 2).map((card, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md md:flex gap-10 items-center"
            >
              <div className="w-10 flex item-center mb-5 md:mb-0">
                <Zoom triggerOnce delay={100 * (index + 1)}>
                  {images[index + 2]?.filePath ? (
                    <Image
                      src={`${baseUrl}${images[index + 2].filePath}`}
                      alt={images[index + 2].altText || "Image"}
                      width={38}
                      height={38}
                    />
                  ) : (
                    <div className="text-sm text-gray-400">No Image Available</div>
                  )}
                </Zoom>
              </div>
              <div>
                <Fade triggerOnce direction="up" delay={100 * (index + 1)}>
                  <div className="flex items-center mb-4">
                    <h3 className="font-bold">{card.title || "Title not available"}</h3>
                  </div>
                </Fade>
                <Fade triggerOnce direction="up" delay={300 * (index + 1)}>
                  <p className="text-gray-600">{card.description || "Description not available."}</p>
                </Fade>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
