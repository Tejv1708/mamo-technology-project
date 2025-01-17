import React from "react";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Meeting Scheduler
        </h1>
        <p className="text-gray-600 mb-6">
          Plan, organize, and manage your meetings effortlessly.
        </p>
        <div className="mt-8"></div>
        <div className="mt-6 text-sm text-gray-500"></div>
      </div>
    </div>
  );
}

export default Home;
