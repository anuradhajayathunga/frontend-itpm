import { useState } from "react";
import {
  ThumbsUp,
  AlertTriangle,
  BarChart2,
  ArrowRight,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// const Header = () => (
//   <header className="bg-white shadow-sm sticky top-0 z-10">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="flex justify-between items-center h-16">
//         <div className="flex items-center">
//           <span className="text-gray-600 font-bold text-xl">EcoBin</span>
//         </div>
//         <nav className="hidden md:flex space-x-8">
//           <a href="#" className="text-gray-700 hover:text-gray-600">Home</a>
//           <a href="#" className="text-gray-700 hover:text-gray-600">Services</a>
//           <a href="#" className="text-gray-700 hover:text-gray-600">About</a>
//           <a href="#" className="text-gray-700 hover:text-gray-600">Contact</a>
//         </nav>
//         <div>
//           <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
//             Login
//           </button>
//         </div>
//       </div>
//     </div>
//   </header>
// );

// const Footer = () => (
//   <footer className="bg-gray-800 text-white">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//         <div>
//           <h3 className="text-lg font-semibold mb-4">EcoBin</h3>
//           <p className="text-gray-400 text-sm">
//             Innovative waste management solutions for a sustainable future.
//           </p>
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//           <ul className="space-y-2">
//             <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
//             <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
//             <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
//             <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold mb-4">Resources</h3>
//           <ul className="space-y-2">
//             <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
//             <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
//             <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
//             <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
//           <div className="flex space-x-4">
//             <a href="#" className="text-gray-400 hover:text-white">
//               <span className="sr-only">Facebook</span>
//               <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
//               </svg>
//             </a>
//             <a href="#" className="text-gray-400 hover:text-white">
//               <span className="sr-only">Twitter</span>
//               <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
//               </svg>
//             </a>
//             <a href="#" className="text-gray-400 hover:text-white">
//               <span className="sr-only">Instagram</span>
//               <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
//               </svg>
//             </a>
//           </div>
//         </div>
//       </div>
//       <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
//         <p>&copy; {new Date().getFullYear()} EcoBin. All rights reserved.</p>
//       </div>
//     </div>
//   </footer>
// );

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center group">
      <div className="mb-4 p-3 rounded-full bg-gray-50 text-gray-800 transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg relative">
      <div className="absolute -top-5 -left-5 bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-3 mt-3 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default function EcoBinFeedbackSystem() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-c-green-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  Help Us Create a Greener Tomorrow
                </h1>
                <p className="text-xl mb-8 text-gray-50">
                  Your feedback shapes our waste management services. Share your
                  thoughts and help us build a more sustainable future.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/feedback-form"
                    className="bg-white text-gray-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 shadow-md hover:shadow-lg transition-all flex items-center"
                  >
                    <ThumbsUp className="mr-2" size={20} />
                    Give Feedback
                  </Link>
                  <Link
                    to="/complaint-form"
                    className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 shadow-md hover:shadow-lg transition-all flex items-center"
                  >
                    <AlertTriangle className="mr-2" size={20} />
                    Submit Complaint
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="w-64 h-64 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <div className="w-56 h-56 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <div className="w-48 h-48 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg
                        className="w-32 h-32 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 2a1 1 0 00-1 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Feedback System
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're committed to continuous improvement through your valuable
                input
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<ThumbsUp size={32} />}
                title="Provide Feedback"
                description="Share your positive experiences with our waste management services to help us understand what works well."
              />
              <FeatureCard
                icon={<AlertTriangle size={32} />}
                title="Report Issues"
                description="Encountered a problem? Let us know so we can address it promptly and improve our service for everyone."
              />
              <FeatureCard
                icon={<BarChart2 size={32} />}
                title="Track Progress"
                description="Administrators can view and analyze all submissions to identify patterns and implement improvements."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your feedback drives our improvement cycle
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-gray-100">Resolution Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24h</div>
                <div className="text-gray-100">Average Response Time</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">5,000+</div>
                <div className="text-gray-100">Feedback Submissions</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">12</div>
                <div className="text-gray-100">Service Improvements</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Our Users Say
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real stories from community members who have used our feedback
                system
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xl">
                    S
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Sarah Johnson</h4>
                    <p className="text-gray-500 text-sm">Local Resident</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "I reported an issue with bin collection in my area, and it
                  was resolved within 48 hours. Very impressed with the quick
                  response!"
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xl">
                    M
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Michael Rodriguez</h4>
                    <p className="text-gray-500 text-sm">Business Owner</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The feedback system has made it so much easier to communicate
                  with waste management. Our business has benefited greatly from
                  the improvements."
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xl">
                    A
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Aisha Patel</h4>
                    <p className="text-gray-500 text-sm">Community Organizer</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Thanks to EcoBin's willingness to listen to community
                  feedback, we've seen major improvements in recycling rates
                  across our neighborhood."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Help Us Improve?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-300">
              Your feedback is invaluable in our mission to create more
              efficient, user-friendly, and environmentally responsible waste
              management services.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-gray-0 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all flex items-center">
                Share Your Feedback
                <ArrowRight className="ml-2" size={20} />
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 shadow-lg hover:shadow-xl transition-all">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
