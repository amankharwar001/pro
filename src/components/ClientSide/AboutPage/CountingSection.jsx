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
    <div className='pb-16 py-10'>
      <div className="container overflow-hidden mx-auto countingtitle">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">

          {/* Total Customers */}
          <Fade triggerOnce direction="left">
            <div className="flex  items-center gap-2 text-center max-w-56">
              <h2 className="text-h1 font-bold">{data.card[0].counting || 'N/A'}</h2>
              <h5 className="text-h5 text-start font-bold">{data.card[0].text || 'N/A'}</h5>
            </div>
          </Fade>

          {/* Countries Served */}
          <Fade triggerOnce direction="bottom">
            <div className="flex  items-center gap-2 text-center max-w-56">
              <h2 className="text-h1 font-bold">{data.card[1].counting || 'N/A'}</h2>
              <h5 className="text-h5 text-start font-bold">{data.card[1].text || 'N/A'}</h5>
            </div>
          </Fade>

          {/* Total Funding */}
          <Zoom triggerOnce>
            <div className="flex  items-center gap-2 text-center max-w-56">
              <h2 className="text-h1 font-bold">{data.card[2].counting || 'N/A'}</h2>
              <h5 className="text-h5 text-start font-bold">{data.card[2].text || 'N/A'}</h5>
            </div>
          </Zoom>

          {/* Years of Experience */}
          <Zoom triggerOnce>
            <div className="flex  items-center gap-2 text-center max-w-56">
              <h2 className="text-h1 font-bold">{data.card[3].counting || 'N/A'}</h2>
              <h5 className="text-h5 text-start font-bold">{data.card[3].text || 'N/A'}</h5>
            </div>
          </Zoom>

        </div>
      </div>
    </div>
      
  );
};

export default CountingSection;
