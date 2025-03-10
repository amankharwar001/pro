import { useState } from "react";
import { useRouter } from "next/router";
import { FiEye, FiEyeOff } from "react-icons/fi"; // You can install this with npm install react-icons

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // To toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For confirm password
  const router = useRouter();
  const { token } = router.query;

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const response = await fetch("/api/admin/reset-password", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
        'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 

       },
      body: JSON.stringify({ token, password }),
    });

    if (response.ok) {
      setMessage("Password reset successful. You can now log in.");
    } else {
      setMessage("Error resetting password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block text-gray-700">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border px-3 py-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full border px-3 py-2 rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Reset Password
          </button>
        </form>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      </div>
    </div>
  );
}
