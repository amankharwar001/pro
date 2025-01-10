// import React, { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/router";
// import Image from "next/image";
// import { FaBell, FaBars, FaEnvelope } from "react-icons/fa"; // React Icon
// import AdminSidebar from "./AdminSidebar";

// const Layout = ({ children }) => {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isMediumDevice, setIsMediumDevice] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const [breadcrumbs, setBreadcrumbs] = useState([]);
//   const sidebarRef = useRef();
//   const [adminData, setAdminData] = useState(); // State to store admin settings
//   const [avatarImages, setAvatarImages] = useState(); // State to store avatar images

//   useEffect(() => {
//     // Function to fetch admin setting data
//     const fetchAdminSetting = async () => {
//       try {
//         const response = await fetch('/api/adminsetting/info');
//         if (response.ok) {
//           const data = await response.json();
//           setAdminData(data.admin || {}); // Set admin settings or empty object
//           setAvatarImages(data.avatarImage || []); // Set avatar images or empty array
//         } else {
//           setAdminData({});
//           setAvatarImages([]);
//         }
//       } catch (err) {
//         console.error('Error fetching admin settings:', err);
//         setAdminData({});
//         setAvatarImages([]);
//       }
//     };

//     fetchAdminSetting(); // Fetch data on component mount
//   }, []); // Empty dependency array ensures it runs only on mount

//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(min-width: 768px)");
//     setIsMediumDevice(mediaQuery.matches);
//     setSidebarOpen(mediaQuery.matches); // Set sidebar open if medium device or above

//     const handleResize = () => {
//       setIsMediumDevice(mediaQuery.matches);
//       setSidebarOpen(mediaQuery.matches); // Set sidebar open if medium device or above
//     };

//     handleResize(); // Initial check

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     const pathSegments = router.asPath.split("/").filter((segment) => segment);
//     const breadcrumbs = pathSegments.map((segment, index) => {
//       const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
//       return { segment, path };
//     });
//     setBreadcrumbs(breadcrumbs);
//   }, [router.asPath]);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const logo = "/paramotor_assets/paramotor_logo.png"; // Example logo path

//   return (
//     <div className="h-screen w-full flex overflow-hidden transition-all duration-300 ease-in-out">
//       <div
//         ref={sidebarRef}
//         className={`bg-black fixed z-[9999] top-0 left-0 h-full overflow-y-auto transform transition-transform duration-300 ease-in-out  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} ${isMediumDevice ? "md:w-[210px]" : "w-[50vw]"}`}
//       >
//         {/* Sidebar Content */}
//         <AdminSidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}/>
//       </div>

//       <div
//         className={`flex-1 text-[14px] bg-slate-100 min-w-[320px] overflow-y-auto h-[100vh] transition-all duration-300 ease-in-out ${sidebarOpen ? "md:ml-[210px]" : ""}`}
//       >
//         <div className="sticky top-0 z-30 shadow-md backdrop-blur-xl bg-slate-200 py-3 px-4 flex items-center gap-5">
//           <div className="cursor-pointer" onClick={toggleSidebar}>
//             <FaBars size={26} className="mt-[7px] text-[#374151] hover:text-black" />
//           </div>
//           <div className="flex justify-between w-full">
//             <Image className="w-20" src={logo} alt="Logo" width={350} height={10} />
//             <div className="flex items-center gap-5">
//               {/* <FaBell className="text-[#939ba2] hover:text-black cursor-pointer" size={20} />
//               <FaEnvelope className="text-[#939ba2] hover:text-black cursor-pointer" size={20} /> */}
//               <div className="flex items-center gap-4 ">
//                 <div className="w-12 h-12 flex-shrink-0 rounded-full overflow-hidden ">
//                   <Image
//                     src={`${baseUrl}${avatarImages?.filePath}`}
//                     alt={avatarImages?.altText || 'Avatar'}
//                     className="w-full h-full object-cover"
//                     height={20}
//                     width={20}
//                   />
//                 </div>
//                 <div>
//                   <span className="text-md font-semibold text-orange-400  max-w-full">
//                     {adminData}
//                   </span>
//                 </div>

//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-r md:p-2 md:px-4">
//           {loading ? (
//             <div className="flex justify-center items-center w-full h-full">Loading...</div>
//           ) : (
//             <div className="pt-2">{children}</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;









































import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FaBars } from "react-icons/fa"; // React Icon
import AdminSidebar from "./AdminSidebar";

const Layout = ({ children }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMediumDevice, setIsMediumDevice] = useState(false);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const sidebarRef = useRef();
  const [adminData, setAdminData] = useState(null); // Default state set to null
  const [avatarImages, setAvatarImages] = useState(null); // Default state set to null

  // Fetch admin settings data safely
  useEffect(() => {
    const fetchAdminSetting = async () => {
      try {
        const response = await fetch('/api/adminsetting/info');
        
        // Handle non-OK responses
        if (!response.ok) {
          throw new Error('Failed to fetch admin settings');
        }
        
        const data = await response.json();
        setAdminData(data.admin || {}); // Set admin settings or empty object if data is missing
        setAvatarImages(data.avatarImage || []); // Set avatar images or empty array
      } catch (error) {
        console.error('Error fetching admin settings:', error);
        setAdminData({}); // Fallback to empty object
        setAvatarImages([]); // Fallback to empty array
      } finally {
        setLoading(false); // Stop loading when the data is fetched or error occurs
      }
    };

    fetchAdminSetting(); // Fetch data on component mount
  }, []); // Empty dependency array ensures it runs only on mount

  // Handle window resizing for sidebar
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setIsMediumDevice(mediaQuery.matches);
    setSidebarOpen(mediaQuery.matches); // Set sidebar open if medium device or above

    const handleResize = () => {
      setIsMediumDevice(mediaQuery.matches);
      setSidebarOpen(mediaQuery.matches); // Set sidebar open if medium device or above
    };

    handleResize(); // Initial check

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Update breadcrumbs based on the URL path
  useEffect(() => {
    const pathSegments = router.asPath.split("/").filter((segment) => segment);
    const breadcrumbs = pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
      return { segment, path };
    });
    setBreadcrumbs(breadcrumbs);
  }, [router.asPath]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const logo = "/paramotor_assets/paramotor_logo.png"; // Example logo path

 
  return (
    <div className="h-screen w-full flex overflow-hidden transition-all duration-300 ease-in-out">
      <div
        ref={sidebarRef}
        className={`bg-black fixed z-[9999] top-0 left-0 h-full overflow-y-auto transform transition-transform duration-300 ease-in-out  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} ${isMediumDevice ? "md:w-[210px]" : "w-[50vw]"}`}
      >
        {/* Sidebar Content */}
        <AdminSidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}/>
      </div>

      <div
        className={`flex-1 text-[14px] bg-slate-100 min-w-[320px] overflow-y-auto h-[100vh] transition-all duration-300 ease-in-out ${sidebarOpen ? "md:ml-[210px]" : ""}`}
      >
        <div className="sticky top-0 z-30 shadow-md backdrop-blur-xl bg-slate-200 py-3 px-4 flex items-center gap-5">
          <div className="cursor-pointer" onClick={toggleSidebar}>
            <FaBars size={26} className="mt-[7px] text-[#374151] hover:text-black" />
          </div>
          <div className="flex justify-between w-full">
            <Image className="w-20" src={logo} alt="Logo" width={350} height={10} />
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-4 ">
                <div className="w-12 h-12 flex-shrink-0 rounded-full overflow-hidden ">
                  <Image
                    src={avatarImages?.filePath ? `${baseUrl}${avatarImages.filePath}` : '/default-avatar.png'} // Fallback to default avatar
                    alt={avatarImages?.altText || 'Avatar'}
                    className="w-full h-full object-cover"
                    height={20}
                    width={20}
                  />
                </div>
                <div>
                  <span className="text-md font-semibold text-orange-400 max-w-full">
                    {adminData?.name || 'Admin'} {/* Fallback if admin name is not available */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r md:p-2 md:px-4">
          {children} {/* Render children content */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
