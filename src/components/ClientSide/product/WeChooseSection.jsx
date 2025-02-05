// import React from 'react'
// import { Fade, Zoom } from 'react-awesome-reveal';

// const WeChooseSection = ({section7}) => {
//     return (
//         <div>
//             <div className="container mx-auto  py-16 lg:grid grid-cols-2 gap-5 place-items-center ">
//                 <div className='text-center md:text-start'>
//                     <Fade triggerOnce delay={100}>
//                         <h2 className="font-bold mb-4">{section7.heading}</h2>
//                     </Fade>
//                     <Fade triggerOnce delay={400}>
//                         <p className="text-muted-foreground mb-6">{section7.text}</p>
//                         <a href={section7.btnLink} className="text-primary font-semibold hover:underline">
//                             {section7.btn}
//                         </a>
//                     </Fade>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
//                     <Zoom triggerOnce delay={500}>
//                         <div className="bg-card p-6 lg:p-8 rounded-lg shadow-xl border">
//                             <h3 className=" text-[#003066] font-semibold">01</h3>
//                             <h4 className="text-lg font-bold mt-2 mb-2">Check Eligibility</h4>
//                             <p className="text-muted-foreground text-base">Onrare ultricOrnare ultrices lorem neque per maecenas penatibus sociosqu consectetur erat.</p>
//                         </div>
//                     </Zoom>
//                     <Zoom triggerOnce delay={600}>
//                         <div className="bg-card p-6 lg:p-8 rounded-lg  bg-[#F6F6F6]">
//                             <h3 className=" text-[#003066] font-semibold">02</h3>
//                             <h4 className="text-lg font-bold mt-2 mb-2">Apply for loan</h4>
//                             <p className="text-muted-foreground text-base">Onrare ultricOrnare ultrices lorem neque per maecenas penatibus sociosqu consectetur erat.</p>
//                         </div>
//                     </Zoom>
//                     <Zoom triggerOnce delay={700}>
//                         <div className="bg-card p-6 lg:p-8 rounded-lg  bg-[#F6F6F6]">
//                             <h3 className=" text-[#003066] font-semibold">03</h3>
//                             <h4 className="text-lg font-bold mt-2 mb-2">Get Approved</h4>
//                             <p className="text-muted-foreground text-base">Onrare ultricOrnare ultrices lorem neque per maecenas penatibus sociosqu consectetur erat.</p>
//                         </div>
//                     </Zoom>
//                     <Zoom triggerOnce delay={800}>
//                         <div className="bg-card p-6 lg:p-8 rounded-lg  bg-[#F6F6F6] ">
//                             <h3 className=" text-[#003066] font-semibold">04</h3>
//                             <h4 className="text-lg font-bold mt-2 mb-2">Get your money</h4>
//                             <p className="text-muted-foreground text-base">Onrare ultricOrnare ultrices lorem neque per maecenas penatibus sociosqu consectetur erat.</p>
//                         </div>
//                     </Zoom>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default WeChooseSection;




import React from 'react';
import { Fade, Zoom } from 'react-awesome-reveal';

const WeChooseSection = ({ section7 }) => {
    return (
        <div className='py-16'>
            <div className="container mx-auto   lg:grid grid-cols-2 gap-5 place-items-center">
                {/* Section Heading and Button */}
                <div className=" md:text-start place-content-start">
                    <Fade triggerOnce delay={100}>
                        <h2 className="font-bold mb-4">{section7.heading}</h2>
                    </Fade>
                    <Fade triggerOnce delay={400}>
                        <p className="text-muted-foreground mb-6">{section7.text}</p>
                        <a href={section7.btnLink} className="text-primary font-semibold hover:underline">
                            {section7.btn}
                        </a>
                    </Fade>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {section7.info.map((item, index) => (
                        <Zoom triggerOnce delay={500 + index * 100} key={index}>
                            <div className={`bg-card p-6 lg:p-8 rounded-lg shadow-xl ${index  === 0 ? '' : 'bg-[#F6F6F6]'}`}>
                                <h3 className="text-[#003066] font-semibold">{String(index + 1).padStart(2, '0')}</h3>
                                <h4 className="text-lg font-bold mt-2 mb-2">{item.title}</h4>
                                <p className="text-muted-foreground text-base">{item.content}</p>
                            </div>
                        </Zoom>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeChooseSection;
