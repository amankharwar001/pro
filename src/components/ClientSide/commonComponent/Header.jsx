// import React, { useEffect, useState } from 'react';
// import Image from "next/image";
// import { Fade, Zoom } from 'react-awesome-reveal';
// import DropDown from './DropDown';
// import Sidebar from './ToogleSlidebar';
// import Head from 'next/head';
// import { FaBars } from 'react-icons/fa';
// import Link from 'next/link';

// const Header = ({data,apikey,img}) => {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;
//   const apiKey = process.env.API_KEY;
//   console.log("heaer _app show is here",img)

//   const [productList, setProductList] = useState(null); // State to store API data
//   const [logo, setlogo] = useState(); // State to store admin settings
//   const [feviconIcon, setfeviconIcon] = useState(); // State to store avatar images


//   useEffect(() => {
//     // Function to fetch admin setting data
//     const fetchAdminSetting = async () => {
//       try {
//         const response = await fetch('/api/public/logo',{
//           method: 'GET',
//           headers: {
//             'api-key': apiKey,
//           },
//         });
//         if (response.ok) {
//           const data = await response.json();
//           setlogo(data.logo || {}); // Set admin settings or empty object
//           setfeviconIcon(data.fevicon || []); // Set avatar images or empty array
//         } else {
//           setlogo({});
//           setfeviconIcon([]);
//         }
//       } catch (err) {
//         console.error('Error fetching admin settings:', err);
//         setlogo({});
//         setfeviconIcon([]);
//       }
//     };

//     fetchAdminSetting(); // Fetch data on component mount
//   }, []); // Empty dependency array ensures it runs only on mount



//   useEffect(() => {
//     // Fetch data from API
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/public/product/list',{
//           method: 'GET',
//           headers: {
//             'api-key': apiKey, // Send the API key in the request header
//           },
//         });
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const result = await response.json();
//         setProductList(result); // Save data to state

//       } catch (err) {
//         console.warn(err.message); // Save error message
//       }
//     };

//     fetchData();
//   }, []);
//   return (
//     <header className='bg-[#F2F2F2] py-5 z-[9999]'>
//       <div className='container'>
//         <Head>
//           <link rel="icon" href={`${baseUrl}${feviconIcon?.filePath}`} />
//         </Head>
//         <div className="flex justify-between items-center ">
//           <div className="flex items-center gap-10 ">
//             {/* Logo with animation */}
//             <div className="flex items-center">
//               <Link href={baseUrl}>
//                 <Image
//                   src={`${baseUrl}${logo?.filePath}`}
//                   alt={logo?.altText || 'logo'}
//                   className="w-[8rem]"
//                   width={100}
//                   height={100}
//                 />
//               </Link>
//             </div>


//             {/* User type selection with animation */}
//           </div>
//           <div className='hidden md:flex md:justify-end items-center justify-end gap-5 sm:justify-between ml-5 w-full evenly'>
//             <div className='z-[9999]'>
//               <DropDown data={productList} />
//             </div>

//           </div>
//           <div className='block md:hidden'>
//             <Sidebar data={productList}/>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export async function getServerSideProps() {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/public/logo`);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch data: ${response.status}`);
//     }
//     const result = await response.json();
//     return { props: { data: result.data, error: null } };
//   } catch (err) {
//     console.error("Failed to fetch home data:", err);
//     return { props: { data: null, error: err.message } };
//   }
// }

// export default Header;



import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { Fade, Zoom } from 'react-awesome-reveal';
import DropDown from './DropDown';
import Sidebar from './ToogleSlidebar';
import Head from 'next/head';
import { FaBars } from 'react-icons/fa';
import Link from 'next/link';

const Header = ({ data, apikey, img }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;
  const apiKey = process.env.API_KEY;

  const [productList, setProductList] = useState(null); // State to store API data
  const [logo, setLogo] = useState(); // State to store admin settings
  const [feviconIcon, setFaviconIcon] = useState(); // State to store avatar images
  const [isScrolled, setIsScrolled] = useState(false); // State to track scroll position
  const [isVisible, setIsVisible] = useState(true); // State to toggle visibility
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };

  // Fetch admin settings on component mount
  useEffect(() => {
    const fetchAdminSetting = async () => {
      try {
        const response = await fetch('/api/public/logo', {
          method: 'GET',
          headers: {
            'api-key': apiKey,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setLogo(data.logo || {}); // Set admin settings or empty object
          setFaviconIcon(data.fevicon || []); // Set avatar images or empty array
        } else {
          setLogo({});
          setFaviconIcon([]);
        }
      } catch (err) {
        console.error('Error fetching admin settings:', err);
        setLogo({});
        setFaviconIcon([]);
      }
    };

    fetchAdminSetting();
  }, [apiKey]);

  // Fetch product list on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/public/product/list', {
          method: 'GET',
          headers: {
            'api-key': apiKey,
          },
        });
        if (response.ok) {
          const result = await response.json();
          setProductList(result);
        }
      } catch (err) {
        console.warn(err.message);
      }
    };

    fetchData();
  }, [apiKey]);

  // Track scroll position and visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Toggle header visibility on scroll direction
      if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Hide header when scrolling down
      } else {
        setIsVisible(true); // Show header when scrolling up
      }

      setLastScrollY(currentScrollY);

      // Change background and shadow when scrolled past threshold
      if (currentScrollY > 70) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header className='relative'>
      {/* Header Container */}
      <div
        className={`fixed top-0 left-0 w-full z-[999] transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'
          } ${isScrolled ? 'bg-[#F2F2F2] shadow-md py-2' : 'bg-[#F2F2F2] py-2'}`}
      >
        <div className="container">
          <Head>
            <link rel="icon" href={`${baseUrl}${feviconIcon?.filePath}`} />
          </Head>

          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-10">
              <div className="flex items-center">
                <Link href={baseUrl}>
                  <Image
                    src={`${baseUrl}${logo?.filePath}`}
                    alt={logo?.altText || 'logo'}
                    className="w-[7rem] md:w-[7.5rem] lg:w-[8rem] xl:w-[9rem]"
                    width={400} // Original image ka size
                    height={200}
                    layout="intrinsic"
                    priority
                  />


                </Link>
              </div>
            </div>

            {/* Dropdown Menu for Desktop */}
            <div className="hidden lg:flex md:justify-end items-center justify-end gap-5 sm:justify-between ml-5 w-full evenly">
              <div className="z-[999]">
                <DropDown data={productList} />
              </div>
            </div>
            <div className='lg:hidden'>
              <button
                onClick={toggleSidebar}
                className="text-2xl p-2 m-2 text-[#003066]"
              >
                <FaBars />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Container */}
      <div className="block lg:hidden z-[1000]">
        <div
          className=" " // Separate the sidebar with a fixed position
        >
          <Sidebar data={productList} isOpen={isOpen} closeSidebar={closeSidebar} />
        </div>
      </div>
    </header>
  );

};

export default Header;
