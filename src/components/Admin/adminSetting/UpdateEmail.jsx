import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import eye icons
import { HiEye, HiEyeOff } from 'react-icons/hi'; // Import eye icons

const UpdateEmailForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newEmail) {
      setError("Both current password and new email are required");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/email-change/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setCurrentPassword("");
        setNewEmail("");
      } else {
        setError(data.error || "An error occurred");
      }
    } catch (err) {
      setError("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center  mt-5">
      <div className="w-full max-w-md bg-gray-50 p-6 rounded-lg shadow-inner border  ">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Update Admin Email
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-md">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 mb-4 rounded-md">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} >
          <div className="mb-4 ">
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle input type based on visibility
                id="currentPassword"
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-7 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)} // Toggle the showPassword state
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="text-gray-500 w-5 h-5" />
                ) : (
                  <HiEyeOff className="text-gray-500 w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="newEmail"
              className="block text-sm font-medium text-gray-700"
            >
              New Email Address
            </label>
            <input
              type="email"
              id="newEmail"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmailForm;
