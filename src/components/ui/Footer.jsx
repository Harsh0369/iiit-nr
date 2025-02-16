import {
  FaInstagram,
  FaXTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";

const SocialIcons = () => {
  return (
    <div className="flex space-x-6 p-4 rounded-lg">
      <a
        href="#"
        className="text-white bg-black p-2 rounded-full text-2xl transition-transform transform hover:scale-105 hover:text-pink-500"
      >
        <FaInstagram />
      </a>
      <a
        href="#"
        className="text-white bg-black p-2 rounded-full text-2xl transition-transform transform hover:scale-105  hover:text-blue-500"
      >
        <FaXTwitter />
      </a>
      <a
        href="#"
        className="text-white bg-black p-2 rounded-full text-2xl transition-transform transform hover:scale-105 hover:text-blue-700"
      >
        <FaLinkedin />
      </a>
      <a
        href="#"
        className="text-white bg-black p-2 rounded-full text-2xl transition-transform transform hover:scale-105 hover:text-red-500"
      >
        <FaYoutube />
      </a>
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-blue-100 text-black py-10 px-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div>
          <h2 className="text-3xl font-bold">SentiMenti</h2>
          <p className="mt-2 text-black text-md">
            Trusted all across India by 1000+ happy customers. Have any queries?
          </p>
          <button className="mt-4 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 transition rounded">
            Contact us
          </button>
        </div>

        {/* Right Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <h3 className="text-xl font-semibold">SentiMenti</h3>
            <ul className="mt-2 space-y-2 text-neutral-800">
              <li>
                <a href="#" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Products
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Resources</h3>
            <ul className="mt-2 space-y-2 text-neutral-800">
              <li>
                <a href="#" className="hover:text-white">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Quick Start
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  User Guide
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Blogs & News</h3>
            <ul className="mt-2 space-y-2 text-neutral-800">
              <li>
                <a href="#" className="hover:text-white">
                  Blogs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  News
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Tips & Tricks
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  New Updates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Events
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm mt-8">
        <div className="flex justify-center items-center text-neutral-800 mb-4 md:mb-0">
          2025 SentiMent. All rights reserved.
        </div>
        <div className="md:px-24">
          <SocialIcons />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
