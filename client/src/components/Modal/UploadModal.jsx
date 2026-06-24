import { useState } from 'react';
import { Button } from '../Common/Button';

export const UploadModal = ({ isOpen, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setError('');
    
    if (!file) {
      setSelectedFile(null);
      return;
    }

    // Validate file type
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setError('Please select a CSV file only');
      setSelectedFile(null);
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      await onUpload(selectedFile);
      setSelectedFile(null);
      onClose();
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Upload CSV File</h2>
          <p className="mt-1 text-sm text-gray-600">Import your data from a CSV file</p>
        </div>

        {/* File Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Select CSV File
          </label>
          <div className="relative">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              disabled={loading}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* File Selected Indicator */}
          {selectedFile && (
            <div className="mt-3 flex items-center rounded-md bg-green-50 p-3 border border-green-200">
              <svg className="h-5 w-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">File selected</p>
                <p className="text-xs text-green-700 truncate">{selectedFile.name}</p>
                <p className="text-xs text-green-600 mt-1">
                  Size: {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-3 flex items-center rounded-md bg-red-50 p-3 border border-red-200">
              <svg className="h-5 w-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={!selectedFile || loading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Upload
              </>
            )}
          </button>
          <button
            onClick={handleClose}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Close
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
          <p className="font-semibold mb-1">📋 File Requirements:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>CSV format only (.csv)</li>
            <li>Maximum file size: 10 MB</li>
            <li>First row should contain column headers</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
