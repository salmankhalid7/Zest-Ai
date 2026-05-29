import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, AlertCircle, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* Animated 404 Illustration */}
        <div className="mb-8 relative">
          <div className="text-9xl font-black text-gray-900 tracking-tighter animate-pulse">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <AlertCircle size={180} className="text-gray-900" />
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="h-1 w-20 bg-black mx-auto rounded-full"></div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
          >
            <Home size={18} />
            Back to Home
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-3">Need help? Try these links:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Dashboard
            </button>
            <span className="text-gray-300">•</span>
            <button
              onClick={() => navigate('/documents')}
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Documents
            </button>
            <span className="text-gray-300">•</span>
            <button
              onClick={() => navigate('/contactus')}
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Contact Support
            </button>
          </div>
        </div>

        {/* Fun Easter Egg (Optional) */}
        <p className="mt-8 text-xs text-gray-400">
          Error 404 • The page you seek is in another castle 🏰
        </p>
      </div>
    </div>
  );
};

export default NotFound;