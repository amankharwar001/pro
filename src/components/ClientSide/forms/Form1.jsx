
import React, { useState } from "react";
import { Zoom } from "react-awesome-reveal";

const Form1 = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    email: "",
    companyName: "",
    designation: "",
    city: "",
    state: "",
    partnerType: "",
    query: "",
    authorization: false,
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.authorization) {
      alert("Please authorize to proceed.");
      return;
    }

    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch("/api/public/partner/partner-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setResponseMessage("Form submitted successfully!");
        // Reset form after submission
        setFormData({
          name: "",
          contactNo: "",
          email: "",
          companyName: "",
          designation: "",
          city: "",
          state: "",
          partnerType: "",
          query: "",
          authorization: false,
        });
      } else {
        setResponseMessage(`Error: ${result.message || "Submission failed"}`);
      }
    } catch (error) {
      setResponseMessage(`Error: ${error.message || "An error occurred"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" container md:max-w-[80%] border my-20 mx-auto   bg-card rounded-lg shadow-md">
      <Zoom triggerOnce delay={100} className="p-6">
        <div className="">
          <h2 className="font-semibold mb-4 text-h2_large">Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name*"
                  className="border border-border rounded p-2"
                  required
                />
                <input
                  type="text"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  placeholder="Contact No.*"
                  className="border border-border rounded p-2"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Id*"
                  className="border border-border rounded p-2"
                  required
                />
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className="border border-border rounded p-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="Designation"
                  className="border border-border rounded p-2"
                />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="border border-border rounded p-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="border border-border rounded p-2"
                />
                <select
                  name="partnerType"
                  value={formData.partnerType}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Type Of Partner*</option>
                  <option value="Bank Partners">Bank Partners</option>
                  <option value="Referral Partners">Referral Partners</option>
                  <option value="Distributor Partners">Distributor Partners</option>
                  <option value="Lending Partners">Lending Partners</option>
                </select>
              </div>
              <div className="grid grid-cols-1">
                <textarea
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  placeholder="Query*"
                  className="border border-border rounded p-2 h-32"
                  required
                ></textarea>
              </div>
            </div>
            <div className="flex mb-4">
              <input
                type="checkbox"
                name="authorization"
                checked={formData.authorization}
                onChange={handleChange}
                id="authorization"
                className="mr-2"
                required
              />
              <label htmlFor="authorization" className="text-muted-foreground text-sm">
                I authorize Paramotor Digital Technology Private Limited and its
                representatives to contact me by telephone, email, or SMS with
                reference to my enquiry/application. This consent will override
                any registration for DND/DNC / NDNC.*
              </label>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 text-white bg-[#013466] hover:bg-red-600 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? "Submitting..." : "SEND MESSAGE"}
            </button>
          </form>
          {responseMessage && (
            <p className="mt-4 text-sm text-center text-green-600">{responseMessage}</p>
          )}
        </div>
      </Zoom>
    </div>
  );
};

export default Form1;
