

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi'; // Import eye icons

const ChangeCredentials = () => {
  const [isUsername, setIsUsername] = useState(false); // Toggle between username and password change
  const [currentUsername, setCurrentUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false); // State for toggling current password visibility
  const [showNewPassword, setShowNewPassword] = useState(false); // State for toggling new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for toggling confirm password visibility

  const [passwordError, setPasswordError] = useState(''); // To hold password-specific error
  const [adminUsername, setAdminUsername] = useState(""); 
  console.log("admin usernamae show is here......",adminUsername)
  
  
  useEffect(() => {
      const fetchAdminUsername = async () => {
        try {
          const response = await fetch("/api/adminpassword/change-credentials",{
            headers: {
              'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
            },
          }); // API to get admin email
          const data = await response.json();
          // console.log("admin usernamae show is here",data)
          if (response.ok) {
            setAdminUsername(data.username); // Store the fetched email
          } else {
            setError(data.error || "Failed to fetch admin email");
          }
        } catch (err) {
          setError("Network error while fetching email.");
        }
      };
  
      fetchAdminUsername();
    }, []);


const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Clear previous messages
    setError('');
    setSuccess('');
    setPasswordError('');
  
    // Basic validation for both fields
    if (isUsername) {
      if (!currentUsername || !newUsername) {
        setError('Current and New Username are required');
        return;
      }
  
      // API call to change the username
      try {
        const response = await fetch('/api/adminpassword/change-credentials', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
          },
          body: JSON.stringify({
            currentUsername,
            newUsername,
            isUsername,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setSuccess('Username changed successfully');
          // Reset the form
          setCurrentUsername('');
          setNewUsername('');
        } else {
          setError(data.message || 'Something went wrong');
        }
      } catch (error) {
        setError('Failed to change username');
      }
    } else {
      // Password validation
      if (!currentPassword || !newPassword || !confirmPassword) {
        setPasswordError('All password fields are required');
        return;
      }
  
      // API call to change the password
      try {
        const response = await fetch('/api/adminpassword/change-credentials', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
          },
          body: JSON.stringify({
            password: currentPassword, // Send currentPassword as 'password'
            newPassword,
            confirmPassword,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setSuccess('Password changed successfully');
          // Reset the form
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
        } else {
          setError(data.message || 'Something went wrong');
        }
      } catch (error) {
        setError('Failed to change password');
      }
    }
  };
  
  

  return (
    <div>

      <div className="max-w-md mx-auto mt-5 p-6 border rounded-lg shadow-inner bg-gray-50">
        <h2 className="text-2xl font-bold mb-6 text-center">Change {isUsername ? 'Username' : 'Password'}</h2>
        {isUsername&&(
          <div className="flex items-center justify-center mb-6 gap-3">
            <span>current username: </span>
            <span className="text-blue-950 text-[13px]">{adminUsername}</span>
          </div>
        )}

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        {passwordError && <p className="text-red-500 mb-4">{passwordError}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {isUsername ? (
              <>
                <label className="block text-sm font-medium text-gray-700">Current Username</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border rounded-md"
                  value={currentUsername}
                  onChange={(e) => setCurrentUsername(e.target.value)}
                  required
                />
              </>
            ) : (
              <>
                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    className="mt-1 block w-full p-2 border rounded-md pr-10"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <HiEyeOff className="w-5 h-5 text-gray-500" /> : <HiEye className="w-5 h-5 text-gray-500" />}
                  </button>
                </div>
              </>
            )}
          </div>

          {isUsername ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">New Username</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border rounded-md"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    className="mt-1 block w-full p-2 border rounded-md pr-10"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <HiEyeOff className="w-5 h-5 text-gray-500" /> : <HiEye className="w-5 h-5 text-gray-500" />}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="mt-1 block w-full p-2 border rounded-md pr-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <HiEyeOff className="w-5 h-5 text-gray-500" /> : <HiEye className="w-5 h-5 text-gray-500" />}
                  </button>
                </div>
              </div>
            </>
          )}
          <Link href="/admin/account/forgot-password">
          <span className='text-sm text-indigo-600  hover:text-blue-600'>Forgot Password?</span></Link>

          <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Change {isUsername ? 'Username' : 'Password'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setIsUsername(!isUsername)}
            className="text-indigo-600 hover:underline"
          >
            {isUsername ? 'Change Password' : 'Change Username'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeCredentials;
