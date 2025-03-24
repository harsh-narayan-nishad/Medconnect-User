import React from 'react';


const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center mt-11 mb-11">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Apply for a Job</h1>

        <form className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input type="text" placeholder="John Doe" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
            <input type="email" placeholder="example@example.com" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">New password</label>
            <input type="password" placeholder="Enter password" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea rows="4" placeholder="Your message..." className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
          </div>

          {/* Upload CV */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Upload CV</label>
            <input type="file" className="w-full border p-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <p className="text-xs text-gray-500 mt-1">Max file size: 50MB</p>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition">Send Application</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
