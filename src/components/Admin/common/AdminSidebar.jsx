import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter
import Link from "next/link";
import { FaTachometerAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import { MdQuestionAnswer, MdPrivacyTip } from "react-icons/md";
import { MdContacts } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";

import { AiFillProduct } from "react-icons/ai";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { RiNewspaperLine } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { IoMdPeople } from "react-icons/io";
import { MdCategory } from "react-icons/md";
import { FaBlog } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { AiFillFileAdd } from "react-icons/ai";
import { IoMdPhotos } from "react-icons/io";
import Image from "next/image";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";



const menuItems = [
  { name: "Dashboard", icon: <FaTachometerAlt />, link: "/admin/dashboard", key: "dashboard" },
  { name: "Home", icon: <IoHome />, link: "/admin/homepage", key: "home" },
  { name: "Partner", icon: <IoMdPeople />, link: "/admin/partner", key: "partner" },
  { name: "Contact", icon: <MdContacts />, link: "/admin/contact", key: "contact" },
  { name: "About", icon: <MdQuestionAnswer />, link: "/admin/about", key: "about" },
  { name: "Product", icon: <AiFillProduct />, link: "/admin/product/productlist", key: "product" },
  { name: "Category", icon: <MdCategory />, link: "/admin/category", key: "category" },
  { name: "Blog", icon: <FaBlog />, link: "/admin/blog/bloglist", key: "blog" },
  { name: "Gallery", icon: <IoMdPhotos />, link: "/admin/gallery", key: "gallery" },
  { name: "Footer", icon: <BsFillFileEarmarkTextFill />, link: "/admin/footer", key: "footer" },

  {
    name: "Leads",
    icon: <MdLeaderboard />,
    subMenus: [
      { name: "Partner", link: "/admin/lead/partner", key: "partner-lead" },
      { name: "Contact", link: "/admin/lead/contact", key: "contact-lead" },
    ],
    key: "leads",
  },
  {
    name: "Pages",
    icon: <AiFillFileAdd />,
    subMenus: [
      { name: "Refund Policy", icon: <HiOutlineReceiptRefund />, link: "/admin/refund-policy", key: "refund-policy" },
      { name: "Privacy Policy", icon: <MdPrivacyTip />, link: "/admin/privacy-policy", key: "privacy-policy" },
      { name: "Term Condition", icon: <RiNewspaperLine />, link: "/admin/term-condition", key: "term-condition" },
    ],
    key: "websiteFunction",
  },
  { name: "Setting", icon: <FaCog />, link: "/admin/setting", key: "setting" },
  { name: "Logout", icon: <FaSignOutAlt />, key: "logout" }, // Logout without a link
];

const Sidebar = ({ setSidebarOpen, sidebarOpen }) => {
  const [isOpen, setIsOpen] = useState({});
  const router = useRouter(); // Get router object
  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;

  const handleMenuItemClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false); // Close the sidebar on small devices
    }
  };

  const toggleMenu = (key) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [key]: !prevState[key], // Toggle the specific submenu
    }));
  };





  const handleLogout = async () => {
    const isConfirmed = confirm('Are you sure you want to log out?'); // Ask for confirmation first

    if (!isConfirmed) {
      return; // If the user cancels, exit the function
    }

    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
        headers: {
          'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
         },
      });

      if (response.ok) {
        alert("Logged out successfully!");
        router.push("/admin/account/login"); // Redirect to login page
      } else {
        alert("Failed to logout. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred. Please try again.");
    }
  };




  const [adminData, setAdminData] = useState(); // State to store admin settings
  const [avatarImages, setAvatarImages] = useState(null); // State to store avatar images

  useEffect(() => {
    // Function to fetch admin setting data
    const fetchAdminSetting = async () => {
      try {
        const response = await fetch('/api/adminsetting/info',{
          headers: {
           'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAdminData(data.admin || {}); // Set admin settings or empty object
          setAvatarImages(data.avatarImage || []); // Set avatar images or empty array
        } else {
          setAdminData({});
          setAvatarImages([]);
        }
      } catch (err) {
        console.error('Error fetching admin settings:', err);
        setAdminData({});
        setAvatarImages([]);
      }
    };

    fetchAdminSetting(); // Fetch data on component mount
  }, []); // Empty dependency array ensures it runs only on mount

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  return (
    <>

      <div className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 h-full  text-white flex flex-col shadow-lg">
        <span className="absolute top-2 right-1 md:hidden" onClick={toggleSidebar}><RxCrossCircled size={20} /></span>
        {/* Admin Header */}
        <div className="flex items-center gap-4 p-4 md:p-6 border-b border-gray-700 bg-gray-800 shadow-md">
          <div className="w-12 h-12 flex-shrink-0 rounded-full overflow-hidden border-2 border-orange-500 shadow-sm">
            {avatarImages?.filePath &&

              <Image
                src={avatarImages?.filePath ? `${baseUrl}${avatarImages.filePath}` : '/default-avatar.png'}
                // src={`${baseUrl}${avatarImages?.filePath}`}
                alt={avatarImages?.altText || 'Avatar'}
                className="w-full h-full object-cover"
                height={20}
                width={20}
              />
            }
          </div>
          <div>
            <p className="text-[10px] md:text-[12.5px]">Welcome</p>
            <span className="text-admin_name  font-semibold text-orange-400  max-w-full">
              {adminData?.length > 0 ? adminData : "Admin"}
            </span>
          </div>

        </div>


        {/* Menu List */}
        <div className="flex-1 overflow-y-auto  py-4">
          {menuItems.map((item) => (
            <div key={item.key}>
              {item.key === "logout" ? (
                // Logout Menu Item
                <div
                  className="px-6 py-2 text-admin_sidebar hover:bg-gray-700 rounded-lg cursor-pointer flex items-center gap-4"
                  onClick={handleLogout} // Logout Functionality
                >
                  <div className="text-admin_sidebar">{item.icon}</div>
                  <span>Logout</span>
                </div>
              ) : (
                <>
                  <div
                    className={`px-6 py-2 text-admin_sidebar hover:bg-gray-700 rounded-lg cursor-pointer flex items-center justify-between transition-all duration-300 ${item.subMenus ? "hover:pl-8" : "hover:pl-7"
                      }`}
                    onClick={() => item.subMenus && toggleMenu(item.key)}
                  >
                    <Link
                      onClick={(e) => {
                        if (!item.subMenus) {
                          handleMenuItemClick(e);  // Only call handleMenuItemClick if no subMenus
                        }
                      }}
                      href={item.link || "#"}
                      className={`flex items-center gap-4 w-full  hover:text-red-500 ${router.pathname === item.link ? "text-red-500 font-bold" : "text-gray-200"
                        }`}
                    >
                      <div className="text-admin_sidebar">{item.icon}</div>
                      <span>{item.name}</span>
                    </Link>
                    {item.subMenus && (
                      <span className="text-gray-400">
                        {isOpen[item.key] ? <IoIosArrowDown /> : <IoIosArrowForward />}
                      </span>
                    )}

                  </div>

                  {/* Submenu Items */}
                  {item.subMenus && (
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden pl-10 ${isOpen[item.key] ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                        }`}
                    >
                      <ul>
                        {item.subMenus.map((submenu, index) => (
                          <li key={`${item.key}-submenu-${index}`}>
                            <Link

                              href={submenu.link}
                              className={`block py-2 text-admin_sidebar rounded-md px-2 transition-all duration-200 ${router.pathname === submenu.link
                                ? "text-red-500 font-bold"
                                : "text-gray-400 hover:text-white"
                                }`}
                            >
                              <span onClick={handleMenuItemClick}>{submenu.name}</span>

                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="relative bottom-0 p-4 text-center text-admin_sidebar text-gray-500 border-t border-gray-700 bg-gray-800">
          © 2024 Admin Panel. All Rights Reserved.
        </div>
      </div>
    </>
  );
};

export default Sidebar;
















