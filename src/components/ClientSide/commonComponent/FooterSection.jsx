import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faLinkedinIn, faPinterestP } from '@fortawesome/free-brands-svg-icons';
import { Fade, Slide } from 'react-awesome-reveal';
import Footercta from './Footercta';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaPinterestP, FaInstagram } from "react-icons/fa";


export default function FooterSection() {
  const [productList, setProductList] = useState(null); // State to store API data
  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;
  const [footerData, setFooterData] = useState(null);
  const [pageData, setPageData] = useState(null);
  console.log("page list show is here", pageData)


  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/public/footer`, {
          headers: {
            'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFooterData(data); // Save footer data to state
        }
      } catch (err) {
        console.error('Error fetching footer data:', err);
      }
    };

    fetchFooterData(); // Call function to fetch footer data
  }, [baseUrl]);
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/public/create-pages/list`, {
          headers: {
            'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPageData(data); // Save footer data to state
        }
      } catch (err) {
        console.error('Error fetching footer data:', err);
      }
    };

    fetchPageData(); // Call function to fetch footer data
  }, [baseUrl]);


  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('/api/public/product/list', {
          headers: {
            'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setProductList(result); // Save data to state

      } catch (err) {
        console.warn(err.message); // Save error message
      }
    };

    fetchData();
  }, []);

  const [logo, setlogo] = useState(); // State to store admin settings
  const [feviconIcon, setfeviconIcon] = useState(); // State to store avatar images

  console.log("logo show is here", logo)


  useEffect(() => {
    // Function to fetch admin setting data
    const fetchAdminSetting = async () => {
      try {
        const response = await fetch('/api/public/logo', {
          headers: {
            'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
          },
        });
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


  return (
    <div className="relative mt-20">
      <Footercta />
      <div className="bg-[#D4D4D4] py-10 pt-48 md:pt-40 -z-10">
        <div className="container m-auto  md:place-content-start  md:text-start grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-14 mt-10">
          <Slide triggerOnce direction="left" className='lg:col-span-2'>
            <div className="mt-4">
              <Link href={baseUrl} className=''>
                <Image
                  src={`${baseUrl}${logo?.filePath}`}
                  alt={logo?.altText || 'logo'}
                  className="w-[10rem] "
                  width={100}
                  height={100}
                />
              </Link>
              <div
                className="footer-content mt-2"
                dangerouslySetInnerHTML={{ __html: footerData?.content }}
              ></div>
            </div>
          </Slide>

          <Fade triggerOnce delay={200}>
            <div className="mt-4">
              <h5 className="text-h5 font-semibold">Quick Links </h5>
              <ul className="text-muted-foreground flex flex-col gap-5 mt-5">
                <li className='text-p'><Link href="/about">About</Link></li>
                <li className='text-p'><Link href="/partner">Partner with Us</Link></li>
                <li className='text-p'><Link href="/blog">Resources</Link></li>
                <li className='text-p'><Link href="/contact">Contact</Link></li>
                <li className='text-p'><Link href="/transaction-document">Transaction Document</Link></li>
                {pageData?.data
                  ?.filter((item) => item.sectionType === "footer" && item.status === "active") 
                  .map((item, index) => (
                    <h3 key={index}>
                      <Link href={`/${item.slug}`} className="text-p">
                        <li className="text-p">{item.nickname}</li>
                      </Link>
                    </h3>
                  ))}

              </ul>
            </div>
          </Fade>

          <Fade triggerOnce delay={600}>
            <div className="mt-4">
              <h5 className="text-h5 font-semibold">Products</h5>
              <ul className="text-muted-foreground flex flex-col gap-5 mt-5">
                {productList
                  ?.sort((a, b) => new Date(b.time) - new Date(a.time))
                  ?.slice(0, 4)
                  ?.map((product) => (
                    <li
                      key={product.id}
                      className="cursor-pointer hover:text-slate-800"
                    >
                      <Link href={`${process.env.NEXT_PUBLIC_BASE_PATH}product/${product?.link}`}>
                        {product.nickname}
                      </Link>
                    </li>
                  ))}

              </ul>
            </div>
          </Fade>

          <Fade triggerOnce delay={400}>
            <div className="mt-4">
              <h5 className="text-h5 font-semibold">{footerData?.heading}</h5>
              <ul className="text-muted-foreground flex flex-col gap-5 mt-5">
                <li className='text-p'><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li className='text-p'><Link href="/term-and-condition">Term and Condition</Link></li>
                <li className='text-p'><Link href="/refund-policy">Refund Policy</Link></li>
                <li className='text-p'><Link href="/sitemap">Sitemap</Link></li>
                {footerData?.buttons?.map((item, index) => (
                  <li key={index}>
                    <Link href={item.btnlink || '/'}>{item.btnname}</Link>
                  </li>
                ))
                }
              </ul>
            </div>
          </Fade>

        </div>

        <div className="container m-auto mt-8 text-sm text-muted-foreground">
          <hr />
          <div className="md:flex justify-between items-center mt-5">
            <Fade triggerOnce delay={800}>
              <p className="text-p md:text-start text-center">{footerData?.copyright}</p>
            </Fade>

            <div className="flex space-x-4 justify-center mt-3 md:mt-0">
              {footerData?.socialLinks.twitter && (
                <Fade triggerOnce delay={1000}>
                  <div className="border border-slate-700 group hover:border-red-600 rounded-full p-2 flex items-center justify-center w-8 h-8">
                    <a href={footerData?.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                      <FaTwitter size={18} className="text-[#334155] group-hover:text-red-600" />
                    </a>
                  </div>
                </Fade>
              )}

              {footerData?.socialLinks.facebook && (
                <Fade triggerOnce delay={1100}>
                  <div className="border border-slate-700 group hover:border-red-600 rounded-full p-2 flex items-center justify-center w-8 h-8">
                    <a href={footerData?.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                      <FaFacebookF size={18} className="text-[#334155] group-hover:text-red-600" />
                    </a>
                  </div>
                </Fade>
              )}

              {footerData?.socialLinks.linkedin && (
                <Fade triggerOnce delay={1200}>
                  <div className="border border-slate-700 group hover:border-red-600 rounded-full p-2 flex items-center justify-center w-8 h-8">
                    <a href={footerData?.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedinIn size={18} className="text-[#334155] group-hover:text-red-600" />
                    </a>
                  </div>
                </Fade>
              )}

              {footerData?.socialLinks.instagram && (
                <Fade triggerOnce delay={1300}>
                  <div className="border border-slate-700 group hover:border-red-600 rounded-full p-2 flex items-center justify-center w-8 h-8">
                    <a href={footerData?.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                      <FaInstagram size={18} className="text-[#334155] group-hover:text-red-600" />
                    </a>
                  </div>
                </Fade>
              )}

              {footerData?.socialLinks.pinterest && (
                <Fade triggerOnce delay={1400}>
                  <div className="border border-slate-700 group hover:border-red-600 rounded-full p-2 flex items-center justify-center w-8 h-8">
                    <a href={footerData?.socialLinks.pinterest} target="_blank" rel="noopener noreferrer">
                      <FaPinterestP size={18} className="text-[#334155] group-hover:text-red-600" />
                    </a>
                  </div>
                </Fade>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





