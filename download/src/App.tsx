import React, { useState } from 'react';
import { Download, Lock } from 'lucide-react';
import * as XLSX from 'xlsx';

interface FormData {
  name: string;
  contactNumber: string;
  email: string;
  isBitsStudent: boolean;
  bitsId: string;
  slotPreference: string;
}

function App() {
  const [formData, setFormData] = useState<FormData[]>([]);
  const [currentForm, setCurrentForm] = useState<FormData>({
    name: '',
    contactNumber: '',
    email: '',
    isBitsStudent: false,
    bitsId: '',
    slotPreference: ''
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData([...formData, currentForm]);
    setCurrentForm({
      name: '',
      contactNumber: '',
      email: '',
      isBitsStudent: false,
      bitsId: '',
      slotPreference: ''
    });
    setSuccess('Registration successful!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDownload = () => {
    if (password === 'MHSG_Art2025') {
      const ws = XLSX.utils.json_to_sheet(formData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Registrations');
      XLSX.writeFile(wb, 'art_therapy_registrations.xlsx');
      setShowPasswordModal(false);
      setPassword('');
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center space-x-8">
            <img src="https://imgur.com/TVrLOZ6.png" alt="Logo 1" className="h-16 object-contain" />
            <img src="https://imgur.com/XvSrYmA.png" alt="Logo 2" className="h-16 object-contain" />
            <img src="https://imgur.com/TnFzLtR.png" alt="Logo 3" className="h-16 object-contain" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Art Therapy Registration - Pearl 2025
            </h1>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Registrations
            </button>
          </div>

          {success && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={currentForm.name}
                onChange={(e) => setCurrentForm({ ...currentForm, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                Contact Number *
              </label>
              <input
                type="tel"
                id="contactNumber"
                required
                value={currentForm.contactNumber}
                onChange={(e) => setCurrentForm({ ...currentForm, contactNumber: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email ID *
              </label>
              <input
                type="email"
                id="email"
                required
                value={currentForm.email}
                onChange={(e) => setCurrentForm({ ...currentForm, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isBitsStudent"
                  checked={currentForm.isBitsStudent}
                  onChange={(e) => setCurrentForm({ ...currentForm, isBitsStudent: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isBitsStudent" className="ml-2 block text-sm text-gray-700">
                  BITS Student?
                </label>
              </div>
            </div>

            {currentForm.isBitsStudent && (
              <div>
                <label htmlFor="bitsId" className="block text-sm font-medium text-gray-700">
                  BITS ID *
                </label>
                <input
                  type="text"
                  id="bitsId"
                  required
                  value={currentForm.bitsId}
                  onChange={(e) => setCurrentForm({ ...currentForm, bitsId: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            )}

            <div>
              <label htmlFor="slotPreference" className="block text-sm font-medium text-gray-700">
                Slot Preference *
              </label>
              <select
                id="slotPreference"
                required
                value={currentForm.slotPreference}
                onChange={(e) => setCurrentForm({ ...currentForm, slotPreference: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select a slot</option>
                <option value="12:30 - 2:30 PM">12:30 - 2:30 PM</option>
                <option value="3:30 - 5:30 PM">3:30 - 5:30 PM</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <div className="mb-4 flex items-center">
              <Lock className="h-5 w-5 text-gray-500 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Enter Password</h3>
            </div>
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter password"
            />
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPassword('');
                  setError('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;