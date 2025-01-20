// import React from 'react';
// import { Fade, Zoom } from 'react-awesome-reveal';

// const CountingSection = ({ data }) => {
//   return (
//     <div className="container mx-auto py-16">
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
        
//         {/* Total Customers */}
//         <Fade triggerOnce left>
//           <div className="md:flex items-center gap-2 justify-center max-w-56 ">
//             <h2 className=" sm:text-5xl xl:text-6xl font-bold text-primary">{data.card[0].counting}</h2>
//             <p className="text-muted-foreground text-sm sm:text-base lg:text-xl font-bold">{data.card[0].text}</p>
//           </div>
//         </Fade>

//         {/* Countries Served */}
//         <Fade triggerOnce bottom>
//           <div className="md:flex items-center gap-2 justify-center max-w-56">
//             <h2 className=" sm:text-5xl xl:text-6xl font-bold text-primary">{data.card[1].counting}</h2>
//             <p className="text-muted-foreground text-sm sm:text-base lg:text-xl font-bold">{data.card[1].text}</p>
//           </div>
//         </Fade>

//         {/* Total Funding */}
//         <Zoom triggerOnce>
//           <div className="md:flex items-center gap-2 justify-center max-w-56 relative -left-1 md:static">
//             <h2 className=" sm:text-5xl xl:text-6xl font-bold text-primary">{data.card[2].counting}</h2>
//             <p className="text-muted-foreground text-sm sm:text-base lg:text-xl font-bold">{data.card[2].text}</p>
//           </div>
//         </Zoom>

//         {/* Years of Experience */}
//         <Zoom triggerOnce>
//           <div className="md:flex items-center gap-2 justify-center max-w-56">
//             <h2 className=" sm:text-5xl xl:text-6xl font-bold text-primary">{data.card[3].counting}</h2>
//             <p className="text-muted-foreground text-sm sm:text-base lg:text-xl font-bold">{data.card[3].text}</p>
//           </div>
//         </Zoom>

//       </div>
//     </div>
//   );
// };

// export default CountingSection;








import React from 'react';
import { Fade, Zoom } from 'react-awesome-reveal';

const CountingSection = ({ data }) => {
  // Check if `data` and `data.card` exist and are an array with at least 4 items
  if (!data || !Array.isArray(data.card) || data.card.length < 4) {
    return (
      <div className="container mx-auto py-16 text-center">
        <p className="text-red-500 text-lg">Data is missing or incomplete. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container overflow-hidden mx-auto py-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">

        {/* Total Customers */}
        <Fade triggerOnce direction="left">
          <div className="flex flex-col items-center gap-2 text-center max-w-56">
            <h2 className="sm:text-5xl xl:text-6xl font-bold text-primary">{data.card[0].counting || 'N/A'}</h2>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-xl font-bold">{data.card[0].text || 'N/A'}</p>
          </div>
        </Fade>

        {/* Countries Served */}
        <Fade triggerOnce direction="bottom">
          <div className="flex flex-col items-center gap-2 text-center max-w-56">
            <h2 className="sm:text-5xl xl:text-6xl font-bold text-primary">{data.card[1].counting || 'N/A'}</h2>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-xl font-bold">{data.card[1].text || 'N/A'}</p>
          </div>
        </Fade>

        {/* Total Funding */}
        <Zoom triggerOnce>
          <div className="flex flex-col items-center gap-2 text-center max-w-56">
            <h2 className="sm:text-5xl xl:text-6xl font-bold text-primary">{data.card[2].counting || 'N/A'}</h2>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-xl font-bold">{data.card[2].text || 'N/A'}</p>
          </div>
        </Zoom>

        {/* Years of Experience */}
        <Zoom triggerOnce>
          <div className="flex flex-col items-center gap-2 text-center max-w-56">
            <h2 className="sm:text-5xl xl:text-6xl font-bold text-primary">{data.card[3].counting || 'N/A'}</h2>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-xl font-bold">{data.card[3].text || 'N/A'}</p>
          </div>
        </Zoom>

      </div>
    </div>
  );
};

export default CountingSection;
