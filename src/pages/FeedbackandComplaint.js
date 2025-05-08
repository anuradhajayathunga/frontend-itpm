import { useState } from 'react';
import { ThumbsUp, AlertTriangle, BarChart2 } from 'lucide-react';
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function EcoBinFeedbackSystem() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      {/* Hero Banner */}
      <div className="w-full max-w-4xl bg-emerald-400 rounded-lg shadow-md p-8 mb-6 text-center text-white">
        <h1 className="text-3xl font-bold mb-4">Welcome to EcoBin Feedback System</h1>
        <p className="mb-6">
          Help us improve our waste management services by sharing your experiences and
          reporting issues
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/feedbackform" // Replace with the actual route for the Add Feedback page
            className="flex items-center bg-white text-emerald-500 px-4 py-2 rounded-md hover:bg-emerald-50"
          >
            <ThumbsUp className="mr-2" size={20} />
            Give Feedback
          </Link>
          <Link
            to="/complaintform" // Replace with the actual route for the Submit Complaint page
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            <AlertTriangle className="mr-2" size={20} />
            Submit Complaint
          </Link>
          <Link
            to="/reviewdashboard" // Replace with the actual route for the Dashboard page
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            <BarChart2 className="mr-2" size={20} />
            View Dashboard
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <FeatureCard 
          icon={<ThumbsUp className="text-emerald-500" size={30} />}
          title="Provide Feedback"
          description="Share your positive experiences with our waste management services to help us understand what works well."
        />
        <FeatureCard 
          icon={<AlertTriangle className="text-red-500" size={30} />}
          title="Report Issues"
          description="Encountered a problem? Let us know so we can address it promptly and improve our service for everyone."
        />
        <FeatureCard 
          icon={<BarChart2 className="text-blue-500" size={30} />}
          title="Track Progress"
          description="Administrators can view and analyze all submissions to identify patterns and implement improvements."
        />
      </div>

      {/* How It Works Section */}
      <div className="w-full max-w-4xl mb-10">
        <h2 className="text-2xl font-bold text-center mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StepCard 
            number="1"
            title="Submit Your Input"
            description="Choose between providing feedback or submitting a complaint based on your experience."
          />
          <StepCard 
            number="2"
            title="We Review"
            description="Our team reviews all submissions and categorizes them for appropriate action."
          />
          <StepCard 
            number="3"
            title="We Improve"
            description="Your input helps us make data-driven decisions to enhance our waste management services."
          />
        </div>
      </div>

      {/* Call to Action */}
      <div className="w-full max-w-4xl text-center mb-10">
        <h2 className="text-2xl font-bold mb-4">Ready to Help Us Improve?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Your feedback is invaluable in our mission to create more efficient, user-friendly, and
          environmentally responsible waste management services.
        </p>
        <button className="bg-emerald-500 text-white px-6 py-3 rounded-md hover:bg-emerald-600 transition-colors">
          Start Now
        </button>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
      <div className="mb-3">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative">
      <div className="absolute -top-4 -left-4 bg-emerald-100 w-10 h-10 rounded-full flex items-center justify-center text-emerald-600 font-bold">
        {number}
      </div>
      <h3 className="text-lg font-semibold mb-2 mt-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}