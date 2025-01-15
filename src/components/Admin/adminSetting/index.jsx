

import { useState } from 'react';
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
    <div className="max-w-md mx-auto mt-5 p-6 border rounded-lg shadow-inner bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">Change {isUsername ? 'Username' : 'Password'}</h2>

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

        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Change {isUsername ? 'Username' : 'Password'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => setIsUsername(!isUsername)}
          className="text-blue-500 hover:underline"
        >
          {isUsername ? 'Change Password' : 'Change Username'}
        </button>
      </div>
    </div>
  );
};

export default ChangeCredentials;
