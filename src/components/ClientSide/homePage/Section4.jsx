// import React from "react";
// import Image from 'next/image';
// import { Fade, Zoom } from 'react-awesome-reveal';

// const BoxCard = ({ box, image }) => (
//   <Zoom triggerOnce delay={300} className="min-w-[360px] md:max-w-full grow ">
//     <div className="bg-card bg-white  p-6 rounded-lg shadow-md hover:shadow-xl flex gap-2">
//       <div className="">
//         {/* Image for Box */}
//         {image ? (
//           <div className="bg-black rounded-full p-1 w-10 h-10 flex items-center justify-center">
//             <Image
//               width={100}
//               height={100}
//               aria-hidden="true"
//               alt="icon"
//               src={image?.filePath || "/default-image.jpg"}
//             />
//           </div>
//         ) : (
//           <div className="bg-black rounded-full p-1 w-10 h-10 flex items-center justify-center">
//             <Image
//               width={100}
//               height={100}
//               aria-hidden="true"
//               alt="default-image"
//               src="/default-image.jpg"
//             />
//           </div>
//         )}
//       </div>
//       <div>
//         <h3 className="text-xl font-bold mb-2">{box?.heading}</h3>
//         <p className="text-muted-foreground">
//           {box?.content}
//         </p>
//       </div>
//     </div>
//   </Zoom>
// );

// const Section4 = ({ apidata }) => {
//   return (
//     <div className="bg-gray-100 py-20">
//       <div className="container  mx-auto px-4">
//         <div className="md:flex items-center gap-8">
//           {/* Fade In Animation for Heading */}
//           <Fade triggerOnce direction="up">
//             <h2 className="font-bold text-center md:text-start w-full">
//               {apidata?.heading}
//             </h2>
//           </Fade>

//           <div className="relative">
//             {/* Fade In Animation for Paragraph */}
//             <Fade triggerOnce direction="up" delay={200}>
//               <p className="text-center md:text-start pb-5">
//                 {apidata?.content}
//               </p>
//             </Fade>

//             <span className="m-auto flex md:absolute w-32 h-[3px] bg-blue-900"></span>
//           </div>
//         </div>

//         {/* Grid with Card Animations */}
//         <div className="flex flex-wrap justify-between  gap-6 mt-10">
//           {/* Rendering Boxes */}
//           {apidata?.boxes?.map((box, index) => (
//             <BoxCard
//               key={index}
//               box={box}
//               image={apidata?.images[index]}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Section4;







import React from "react";
import Image from "next/image";
import { Fade, Zoom } from "react-awesome-reveal";

const BoxCard = ({ box, image }) => (
  <Zoom triggerOnce delay={300} className="md:w-full  flex-grow">
    <div className="bg-card bg-white p-6 rounded-lg shadow-md hover:shadow-xl flex flex-col sm:flex-row gap-4">
      {/* Image Section */}
      <div className="flex-shrink-0 flex items-center justify-center">
        <div className="bg-black rounded-full p-1 w-16 h-16 flex items-center justify-center">
          <Image
            width={100}
            height={100}
            aria-hidden="true"
            alt="icon"
            src={image?.filePath || "/default-image.jpg"}
          />
        </div>
      </div>
      {/* Content Section */}
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-2">{box?.heading}</h3>
        <p className="text-muted-foreground">{box?.content}</p>
      </div>
    </div>
  </Zoom>
);

const Section4 = ({ apidata }) => {
  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <div className="md:flex items-center justify-between ">
          <Fade triggerOnce direction="up" className="max-w-md">
            <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4 lg:mb-0  text-center md:text-start w-full ">{apidata?.heading}</h2>
          </Fade>
          <div className="relative max-w-3xl">
            <Fade triggerOnce direction="up" delay={200}>
              <p className="text-center md:text-start pb-5">{apidata?.content}</p>
            </Fade>
            <span className="m-auto flex md:absolute w-32 h-[3px] bg-blue-900"></span>
          </div>
        </div>
        {/* Responsive Grid */}
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-7 mt-10">
          {apidata?.boxes?.map((box, index) => (
            <BoxCard key={index} box={box} image={apidata?.images[index]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section4;
