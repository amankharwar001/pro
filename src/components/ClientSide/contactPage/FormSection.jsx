import React, { useState } from "react";

function FormSection() {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    companyName: "",
    address: "",
    city: "",
    country: "India",  // Default value
    state: "Delhi",   // Default value
    pinCode: "",
    phone: "",
    email: "",
    enquiryType: "",
    queryComment: "",
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.consent) {
      alert("Please accept the consent to proceed.");
      return;
    }

    try {
      const response = await fetch("/api/public/contactt/contactform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Your information has been submitted successfully!");
        setFormData({
          name: "",
          designation: "",
          companyName: "",
          address: "",
          city: "",
          country: "India",  // Reset to default
          state: "Delhi",   // Reset to default
          pinCode: "",
          phone: "",
          email: "",
          enquiryType: "",
          queryComment: "",
          consent: false,
        });
      } else {
        alert("Failed to submit your information. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container overflow-hidden px-4 md:max-w-[80%] sm:px-6 lg:px-8 mx-auto">
      <div className="m-auto p-4 mb-10 bg-white rounded-lg border shadow-md mt-10 ">
        <h2 className=" text-h2 font-semibold mb-6">Feel free to drop us a message</h2>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name*"
            required
            className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Designation*"
            required
            className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Company Name*"
            required
            className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address*"
            required
            className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City*"
            required
            className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="India">India</option>
          </select>

          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Delhi">Delhi</option>
          </select>
          <input
            type="text"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            placeholder="Pin/Zip Code*"
            required
            className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone*"
            required
            className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email*"
            required
            className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="enquiryType"
            value={formData.enquiryType}
            onChange={handleChange}
            required
            className="w-full sm:col-span-2 p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Type Of Enquiry*</option>
            <option value="New Sales Enquiry">New Sales Enquiry</option>
            <option value="Existing Customer Enquiry">Existing Customer Enquiry</option>
          </select>

          <textarea
            name="queryComment"
            value={formData.queryComment}
            onChange={handleChange}
            placeholder="Query/Comment*"
            required
            className="w-full sm:col-span-2 p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          ></textarea>

          <div className="flex items-start space-x-2 sm:col-span-2">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              id="consent"
              required
              className="mt-1"
            />
            <label htmlFor="consent" className="text-sm text-gray-600">
              I authorize Paramotor Digital Technology Private Limited and its
              representatives to contact me by telephone, email, or SMS with
              reference to my enquiry/application. This consent will override
              any registration for DND/DNC/NDNC.*
            </label>
          </div>

          <div className="text-center sm:col-span-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 text-white text-base bg-[#013466] hover:bg-red-600 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormSection;
