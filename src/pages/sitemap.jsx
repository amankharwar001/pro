// pages/sitemap.js
import React, { useState, useEffect } from "react";
import { parseStringPromise } from "xml2js";

// Fetch sitemap data on the server side
export async function getServerSideProps() {
  const url = process.env.NEXT_PUBLIC_BASE_PATH;
  const sitemap = [];
  
  try {
    // Fetch the sitemap XML from your API
    const response = await fetch(`${url}api/sitemap`);
    if (!response.ok) {
      throw new Error("Failed to fetch sitemap");
    }
    const text = await response.text();
    
    // Parse XML using xml2js
    const parsedData = await parseStringPromise(text);
    const urls = parsedData.urlset.url; // Assumes XML is in <urlset><url><loc>...</loc></url></urlset>

    // Extract the URLs
    const urlList = urls.map((urlElement) => urlElement.loc[0]);
    sitemap.push(...urlList);
  } catch (error) {
    console.error("Error fetching sitemap:", error.message);
  }

  return {
    props: { sitemap }, // Pass the sitemap data as a prop to the component
  };
}

const SitemapDisplay = ({ sitemap }) => {
  const [currentDate, setCurrentDate] = useState(null);

  // Set the current date after the component is mounted (only on the client)
  useEffect(() => {
    setCurrentDate(new Date().toLocaleString());
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-6 sm:mb-8">
        Website Sitemap
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 text-center mb-6 sm:mb-12">
        Explore all the pages available on our website.
      </p>

      <div className="max-w-3xl sm:max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
        <ul className="space-y-3 sm:space-y-4">
          {sitemap.map((url, index) => (
            <li
              key={index}
              className="flex justify-between items-start p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition duration-200 ease-in-out"
            >
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base md:text-lg font-medium text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out truncate"
              >
                {url}
              </a>
              <span className="text-xs sm:text-sm text-gray-500">
                {currentDate || "Loading..."} {/* Show "Loading..." until the date is set */}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SitemapDisplay;
