import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { Fade, Zoom } from 'react-awesome-reveal';
import DropDown from './DropDown';
import Sidebar from './ToogleSlidebar';
import Head from 'next/head';
import { FaBars } from 'react-icons/fa';
const Header = ({data}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;

  const [productList, setProductList] = useState(null); // State to store API data
  const [logo, setlogo] = useState(); // State to store admin settings
  const [feviconIcon, setfeviconIcon] = useState(); // State to store avatar images


  useEffect(() => {
    // Function to fetch admin setting data
    const fetchAdminSetting = async () => {
      try {
        const response = await fetch('/api/public/logo');
        if (response.ok) {
          const data = await response.json();
          setlogo(data.logo || {}); // Set admin settings or empty object
          setfeviconIcon(data.fevicon || []); // Set avatar images or empty array
        } else {
          setlogo({});
          setfeviconIcon([]);
        }
      } catch (err) {
        console.error('Error fetching admin settings:', err);
        setlogo({});
        setfeviconIcon([]);
      }
    };

    fetchAdminSetting(); // Fetch data on component mount
  }, []); // Empty dependency array ensures it runs only on mount



  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('/api/public/product/list');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setProductList(result); // Save data to state

      } catch (err) {
        response.json(err.message); // Save error message
      }
    };

    fetchData();
  }, []);
  return (
    <div className=''>
      <Head>
        <link rel="icon" href={`${baseUrl}${feviconIcon?.filePath}`} />
      </Head>
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-10 ">
          {/* Logo with animation */}
          <div className="flex items-center">
            <Image
              src={`${baseUrl}${logo?.filePath}`}
              alt={logo?.altText || 'logo'}
              className="w-54"
              width={100}
              height={100}
            />
          </div>


          {/* User type selection with animation */}
        </div>
        <div className='hidden md:flex md:justify-end items-center justify-end gap-5 sm:justify-between ml-5 w-full evenly'>
          <div className='z-10'>
            <DropDown data={productList} />
          </div>

        </div>
        <div className='block md:hidden'>
          <Sidebar data={productList}/>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/public/logo`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    const result = await response.json();
    return { props: { data: result.data, error: null } };
  } catch (err) {
    console.error("Failed to fetch home data:", err);
    return { props: { data: null, error: err.message } };
  }
}

export default Header;