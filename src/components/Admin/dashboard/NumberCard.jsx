import { useEffect, useState } from "react";
import { FaBloggerB } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa";
import { GrDocumentUser } from "react-icons/gr";
import { AiOutlineProduct } from "react-icons/ai";


const DashboardNumberCardSection = () => {
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalContacts, setTotalContacts] = useState(0);
  const [totalPartners, setTotalPartners] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [startCounting, setStartCounting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsRes, contactsRes, partnersRes, productsRes] = await Promise.all([
          fetch("/api/blog/idgenerate", { headers: { "x-system-key": process.env.NEXT_PUBLIC_SYSTEM_KEY } }),
          fetch("/api/contactpage/contactform", { headers: { "x-system-key": process.env.NEXT_PUBLIC_SYSTEM_KEY } }),
          fetch("/api/partnerpage/partner-contact", { headers: { "x-system-key": process.env.NEXT_PUBLIC_SYSTEM_KEY } }),
          fetch("/api/product/productpage/getsection", { headers: { "x-system-key": process.env.NEXT_PUBLIC_SYSTEM_KEY } }),
        ]);

        const [blogsData, contactsData, partnersData, productsData] = await Promise.all([
          blogsRes.json(),
          contactsRes.json(),
          partnersRes.json(),
          productsRes.json(),
        ]);

        if (blogsRes.ok) setTotalBlogs(blogsData.length);
        if (contactsRes.ok) setTotalContacts(contactsData.data?.length || 0);
        if (partnersRes.ok) setTotalPartners(partnersData.length);
        if (productsRes.ok) setTotalProducts(productsData.length);

        setStartCounting(true); // Start counting animation after fetching
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const useCountUp = (finalValue) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!startCounting) return;

      let start = 0;
      const duration = 1500; // Animation duration (in ms)
      const increment = Math.ceil(finalValue / (duration / 30));

      const interval = setInterval(() => {
        start += increment;
        if (start >= finalValue) {
          setCount(finalValue);
          clearInterval(interval);
        } else {
          setCount(start);
        }
      }, 30);

      return () => clearInterval(interval);
    }, [finalValue, startCounting]);

    return count;
  };

  const cards = [
    {  svg:<FaBloggerB size={20} className="text-white"/>,title: useCountUp(totalBlogs), description: "Total number of blogs" },
    {  svg:<FaWpforms size={20} className="text-white"/>,title: useCountUp(totalContacts), description: "Total number of contact form submissions" },
    {  svg:<GrDocumentUser size={20} className="text-white"/>,title: useCountUp(totalPartners), description: "Total number of partners form submissions" },
    {  svg:<AiOutlineProduct size={20} className="text-white"/>,title: useCountUp(totalProducts), description: "Total number of products" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="w-full sm:w-[300px] border-l-2 border-[#F80E13] bg-white cursor-pointer shadow-lg rounded-2xl p-6 transition-transform hover:scale-105"
        >
            <div className="flex">
                <span className="bg-black rounded-full p-1 border-green-500">{card.svg}</span>
            </div>
          <h2 className="mt-4 text-2xl text-center font-bold text-blue-900">
            {card.title}
          </h2>
          <p className="text-gray-600 mt-2 text-[14px] text-center">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardNumberCardSection;
