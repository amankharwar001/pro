import { useState, useEffect } from "react";

const BlogActivation = () => {
  const [isOn, setIsOn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/blog/blog-activation");
        const data = await res.json();
        setIsOn(data.status === "active");
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };

    fetchStatus();
  }, []);

  const toggleStatus = async () => {
    const userInput = prompt(`Type "yes" to ${isOn ? "disable" : "enable"} the blog`);
    if (userInput?.toLowerCase() !== "yes") return;

    setLoading(true);
    try {
      const newStatus = isOn ? "draft" : "active";
      const res = await fetch("/api/blog/blog-activation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setIsOn(!isOn);
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleStatus}
      className={`px-4 py-2 rounded-md transition-all duration-300 ${
        isOn ? "bg-green-500 text-white" : "bg-gray-300 text-black"
      }`}
      disabled={loading}
    >
      {loading ? "Updating..." : isOn ? "Blog Activate" : "Blog OFF"}
    </button>
  );
};

export default BlogActivation;
