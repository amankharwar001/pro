
import React from 'react';
import { Fade } from 'react-awesome-reveal';
import Image from 'next/image';

function ContactInfo({ data = {}, baseUrl = '' }) {
  // Provide default values for images and cards
  const svg1 = data?.Images?.find((image) => image.referenceId === 2) || {};
  const svg2 = data?.Images?.find((image) => image.referenceId === 3) || {};
  const svg3 = data?.Images?.find((image) => image.referenceId === 4) || {};

  const cards = data?.getInTouchData?.[0]?.card || [];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container  mx-auto text-center">
        <Fade triggerOnce delay={100}>
          <h2 className="font-bold mb-2 text-h2_large">
            {data?.getInTouchData?.[0]?.heading || 'Contact Us'}
          </h2>
        </Fade>
        <Fade triggerOnce delay={300}>
          <p className="text-gray-600 mb-8">
            {data?.getInTouchData?.[0]?.content || 'We are here to assist you.'}
          </p>
        </Fade>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Head Office Address Card */}
          <ContactCard
            title={cards[0]?.title || 'Our Office'}
            content={cards[0]?.content || '1234 Main Street, City'}
            imageUrl={baseUrl + (svg1?.filePath || '/default-image.svg')}
            altText={svg1?.altText || 'Office'}
          />

          {/* Email Us Card */}
          <ContactCard
            title={cards[1]?.title || 'Email Us'}
            content={cards[1]?.content || 'contact@example.com'}
            imageUrl={baseUrl + (svg2?.filePath || '/default-email.svg')}
            altText={svg2?.altText || 'Email'}
          />

          {/* Call Us Card */}
          <ContactCard
            title={cards[2]?.title || 'Call Us'}
            content={cards[2]?.content || '+123456789'}
            imageUrl={baseUrl + (svg3?.filePath || '/default-phone.svg')}
            altText={svg3?.altText || 'Phone'}
          />
        </div>
      </div>
    </div>
  );
}

function ContactCard({ title, content, imageUrl, altText }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md text-center py-12 flex justify-center">
      <Fade triggerOnce delay={500} direction="up">
        <div className=''>
          <Image
            className=" w-14 h-14 rounded-full object-contain m-auto bg-black"
            src={imageUrl}
            alt={altText}
            width={56}
            height={56}
          />
          <h4 className="text_h4 font-semibold mt-4">{title}</h4>
          {/* <p className="text-gray-700 mt-2 text-base md:text-lg">{content}</p> */}
          <div
                className="mt-2 text-base  lg:text-start  "
                dangerouslySetInnerHTML={{ __html: content }}
              />
        </div>
      </Fade>
    </div>
  );
}

export default ContactInfo;



// import React from 'react';
// import { Fade } from 'react-awesome-reveal';
// import Image from 'next/image';

// function ContactInfo({ data = {}, baseUrl = '' }) {
//   // Provide default values for images and cards
//   const svg1 = data?.Images?.find((image) => image.referenceId === 2) || {};
//   const svg2 = data?.Images?.find((image) => image.referenceId === 3) || {};
//   const svg3 = data?.Images?.find((image) => image.referenceId === 4) || {};

//   const cards = data?.getInTouchData?.[0]?.card || [];

//   return (
//     <div className="bg-gray-50 py-12">
//       <div className="container mx-auto text-center">
//         <Fade triggerOnce delay={100}>
//           <h2 className="font-bold mb-2 text-h2_large">
//             {data?.getInTouchData?.[0]?.heading || 'Contact Us'}
//           </h2>
//         </Fade>
//         <Fade triggerOnce delay={300}>
//           <p className="text-gray-600 mb-8">
//             {data?.getInTouchData?.[0]?.content || 'We are here to assist you.'}
//           </p>
//         </Fade>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Head Office Address Card */}
//           <ContactCard
//             title={cards[0]?.title || 'Our Office'}
//             content={cards[0]?.content || '1234 Main Street, City'}
//             imageUrl={baseUrl + (svg1?.filePath || '/default-image.svg')}
//             altText={svg1?.altText || 'Office'}
//           />

//           {/* Email Us Card */}
//           <ContactCard
//             title={cards[1]?.title || 'Email Us'}
//             content={cards[1]?.content || 'contact@example.com'}
//             imageUrl={baseUrl + (svg2?.filePath || '/default-email.svg')}
//             altText={svg2?.altText || 'Email'}
//             link={`mailto:${cards[1]?.content || 'contact@example.com'}`}
//           />

//           {/* Call Us Card */}
//           <ContactCard
//             title={cards[2]?.title || 'Call Us'}
//             content={cards[2]?.content || '+123456789'}
//             imageUrl={baseUrl + (svg3?.filePath || '/default-phone.svg')}
//             altText={svg3?.altText || 'Phone'}
//             link={`tel:${cards[2]?.content || '+123456789'}`}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// function ContactCard({ title, content, imageUrl, altText, link }) {
//   return (
//     <div className="bg-white p-8 rounded-lg shadow-md text-center py-12 flex justify-center">
//       <Fade triggerOnce delay={500} direction="up">
//         <div>
//           <a href={link} target="_blank" rel="noopener noreferrer">
//             <Image
//               className="w-14 h-14 rounded-full object-contain m-auto bg-black"
//               src={imageUrl}
//               alt={altText}
//               width={56}
//               height={56}
//             />
//           </a>
//           <h4 className="text_h4 font-semibold mt-4">{title}</h4>
//           <div
//             className="mt-2 text-base lg:text-start"
//             dangerouslySetInnerHTML={{ __html: content }}
//           />
//         </div>
//       </Fade>
//     </div>
//   );
// }

// export default ContactInfo;




// import React from 'react';
// import { Fade } from 'react-awesome-reveal';
// import Image from 'next/image';

// function ContactInfo({ data = {}, baseUrl = '' }) {
//   const svg1 = data?.Images?.find((image) => image.referenceId === 2) || {};
//   const svg2 = data?.Images?.find((image) => image.referenceId === 3) || {};
//   const svg3 = data?.Images?.find((image) => image.referenceId === 4) || {};

//   const cards = data?.getInTouchData?.[0]?.card || [];

//   return (
//     <div className="bg-gray-50 py-12">
//       <div className="container mx-auto text-center">
//         <Fade triggerOnce delay={100}>
//           <h2 className="font-bold mb-2 text-h2_large">
//             {data?.getInTouchData?.[0]?.heading || 'Contact Us'}
//           </h2>
//         </Fade>
//         <Fade triggerOnce delay={300}>
//           <p className="text-gray-600 mb-8">
//             {data?.getInTouchData?.[0]?.content || 'We are here to assist you.'}
//           </p>
//         </Fade>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Head Office Address Card */}
//           <ContactCard
//             title={cards[0]?.title || 'Our Office'}
//             content={cards[0]?.content || '1234 Main Street, City'}
//             imageUrl={baseUrl + (svg1?.filePath || '/default-image.svg')}
//             altText={svg1?.altText || 'Office'}
//           />

//           {/* Email Us Card */}
//           <ContactCard
//             title={cards[1]?.title || 'Email Us'}
//             content={cards[1]?.content || 'contact@example.com'}
//             imageUrl={baseUrl + (svg2?.filePath || '/default-email.svg')}
//             altText={svg2?.altText || 'Email'}
//           />

//           {/* Call Us Card */}
//           <ContactCard
//             title={cards[2]?.title || 'Call Us'}
//             content={cards[2]?.content || '+123456789'}
//             imageUrl={baseUrl + (svg3?.filePath || '/default-phone.svg')}
//             altText={svg3?.altText || 'Phone'}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// function ContactCard({ title, content, imageUrl, altText }) {
//   // Function to make emails and phone numbers clickable
//   const formatContent = (text) => {
//     if (!text) return '';

//     // Email Regex
//     const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
//     // Phone Number Regex (basic version)
//     const phoneRegex = /(\+?\d{1,4}[\s-]?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,9})/g;

//     return text
//       .replace(emailRegex, `<a href="mailto:$1" class="text-blue-600 underline">$1</a>`)
//       .replace(phoneRegex, `<a href="tel:$1" class="text-blue-600 underline">$1</a>`);
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-md text-center py-12 flex justify-center">
//       <Fade triggerOnce delay={500} direction="up">
//         <div>
//           <Image
//             className="w-14 h-14 rounded-full object-contain m-auto bg-black"
//             src={imageUrl}
//             alt={altText}
//             width={56}
//             height={56}
//           />
//           <h4 className="text_h4 font-semibold mt-4">{title}</h4>
//           <div
//             className="mt-2 text-base lg:text-start"
//             dangerouslySetInnerHTML={{ __html: formatContent(content) }}
//           />
//         </div>
//       </Fade>
//     </div>
//   );
// }

// export default ContactInfo;
