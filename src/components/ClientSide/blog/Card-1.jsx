
import Image from 'next/image';
import React, { useState } from 'react';
import { FaClock, FaUser } from 'react-icons/fa';

const Card1 = ({ blogData, baseUrl }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 4; // Number of cards per page

    // Ensure blogData is an array, defaulting to an empty array
    const data = Array.isArray(blogData) ? blogData : [];

    // Filter the data to only include active cards
    const activeData = data.filter(card => card.status === 'active');

    // Calculate the index of the first and last card on the current page
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;

    // Slice the active data to get the cards to display for the current page
    const currentCards = activeData.slice(indexOfFirstCard, indexOfLastCard);

    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate the total number of pages
    const totalPages = Math.ceil(activeData.length / cardsPerPage);

    return (
        <div className='md:mb-0 pb-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {currentCards.length > 0 ? (
                    currentCards.map((card, index) => (
                        <div key={index} className="max-w-[380px] md:w-full mx-auto bg-white dark:bg-card rounded-lg shadow-md overflow-hidden">
                            {card.image.length > 0 && (
                                <Image className="w-full h-56 object-cover" src={`${baseUrl}${card.image[0].filePath}`} width={100} height={100} alt={`${card.image[0].altText}`} />
                            )}
                            <div className="p-4 relative">
                                <h5 className="text-h5 mt-2 md:text-xl  font-semibold text-black  line-clamp-2">{card.heading || "No Title"}</h5>
                                <div className="absolute bg-[#DE6773] rounded-full w-5/6 -top-5 -translate-x-2/4 left-2/4">
                                    <div className='flex justify-between px-2 py-2'>
                                        <div className='flex gap-2 items-center'>
                                            <FaUser size={15} color='white' />
                                            <span className="text-sm text-white">By Admin</span>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <FaClock size={15} color='white'/>
                                            <span className="text-sm text-white">Today</span>
                                        </div>
                                    </div>
                                </div>
                                <hr className='mt-4' />
                                <a href={`/blog/${card.seo}`} className="mt-4  inline-block bg-[#013466] hover:bg-red-600 text-white px-2 hover:bg-secondary/80 py-2 rounded-lg">
                                    Read More
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No active blog data available</div>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-10">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-black text-white rounded-l-lg hover:bg-secondary/80"
                >
                    Pre
                </button>
                <span className="px-4 py-2">{currentPage} / {totalPages}</span>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-black text-white rounded-r-lg hover:bg-secondary/80"
                >
                    Nex
                </button>
            </div>
        </div>
    );
};

export default Card1;
