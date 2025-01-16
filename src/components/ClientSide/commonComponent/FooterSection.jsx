import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faLinkedinIn, faPinterestP } from '@fortawesome/free-brands-svg-icons';
import { Fade, Slide } from 'react-awesome-reveal';
import Footercta from './Footercta';
import { useEffect, useState } from 'react';
import Link from 'next/link';


export default function FooterSection() {
  const [productList, setProductList] = useState(null); // State to store API data
  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;


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
        console.warn(err.message); // Save error message
      }
    };

    fetchData();
  }, []);

  const [logo, setlogo] = useState(); // State to store admin settings
  const [feviconIcon, setfeviconIcon] = useState(); // State to store avatar images

  console.log("logo show is here",logo)


  useEffect(() => {
    // Function to fetch admin setting data
    const fetchAdminSetting = async () => {
      try {
        const response = await fetch('/api/public/logo');
        if (response.ok) {
          const data = await response.json();
          setlogo(data.logo ||{} ); // Set admin settings or empty object
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
        <div className="container m-auto  md:place-content-start  md:text-start grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          <Slide triggerOnce direction="left">
            <div className="mt-4">
            <Link href={baseUrl} className='flex m-auto'>
              <Image
                src={`${baseUrl}${logo?.filePath}`}
                alt={logo?.altText || 'logo'}
                className="w-28 m-auto"
                width={100}
                height={100}
              />
            </Link>
              <p className="text-base mt-5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto odio cupiditate corrupti nemo blanditiis veniam
                voluptates, sunt quaerat possimus quo eligendi reiciendis magnam dicta quos enim quas magni voluptatum nam reprehenderit dignissimos!
              </p>
            </div>
          </Slide>

          <Fade triggerOnce delay={200}>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Important Links</h3>
              <ul className="text-muted-foreground flex flex-col gap-5 mt-5">
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/term-and-condition">Term and Condition</Link></li>
                <li><Link href="/refund-policy">Refund Policy</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/sitemap">Sitemap</Link></li>
              </ul>
            </div>
          </Fade>

          <Fade triggerOnce delay={400}>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Solutions</h3>
              <ul className="text-muted-foreground flex flex-col gap-5 mt-5">
                <li>Compliance Publications</li>
                <li>Annual Reports</li>
                <li>CSR Reports</li>
                <li>Financial documentation</li>
              </ul>
            </div>
          </Fade>

          <Fade triggerOnce delay={600}>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Products</h3>
              <ul className="text-muted-foreground flex flex-col gap-5 mt-5">
                {productList?.map((product) => (
                  <li
                    key={product.id} // Always use a unique key when rendering lists
                    className="cursor-pointer hover:text-slate-800"
                  >
                    <Link href={`product/${product?.seo}`}>{product.nickname}</Link>
                  </li>
                ))}
                {/* <li>Gift Card</li>
                <li>Prepaid Gift Card</li>
                <li>Our job offers</li>
                <li>Our websites</li> */}
              </ul>
            </div>
          </Fade>
        </div>

        <div className="container m-auto mt-8 text-sm text-muted-foreground">
          <hr />
          <div className="md:flex justify-between items-center mt-5">
            <Fade triggerOnce delay={800}>
              <p className="text-sm md:text-start text-center">Copyright @2024 Paramotordt. All rights reserved.</p>
            </Fade>

            <div className="flex space-x-4 justify-center mt-3 md:mt-0">
              <Fade triggerOnce delay={1000}>
                <div className="border border-slate-700 rounded-full p-2 flex items-center justify-center w-8 h-8">
                  <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} size="lg" style={{ color: '#334155' }} />
                  </a>
                </div>
              </Fade>
              <Fade triggerOnce delay={1100}>
                <div className="border border-slate-700 rounded-full p-2 flex items-center justify-center w-8 h-8">
                  <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebookF} size="lg" style={{ color: '#334155' }} />
                  </a>
                </div>
              </Fade>
              <Fade triggerOnce delay={1200}>
                <div className="border border-slate-700 rounded-full p-2 flex items-center justify-center w-8 h-8">
                  <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedinIn} size="lg" style={{ color: '#334155' }} />
                  </a>
                </div>
              </Fade>
              <Fade triggerOnce delay={1300}>
                <div className="border border-slate-700 rounded-full p-2 flex items-center justify-center w-8 h-8">
                  <a href="https://pinterest.com/yourprofile" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faPinterestP} size="lg" style={{ color: '#334155' }} />
                  </a>
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}






