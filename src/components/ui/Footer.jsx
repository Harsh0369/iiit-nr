import React from "react";
import {
  FaInstagram,
  FaXTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";

const SocialIcons = () => {
  const socialLinks = [
    { Icon: FaInstagram, color: "hover:text-pink-400", href: "#" },
    { Icon: FaXTwitter, color: "hover:text-cyan-400", href: "#" },
    { Icon: FaLinkedin, color: "hover:text-blue-500", href: "#" },
    { Icon: FaYoutube, color: "hover:text-red-400", href: "#" },
  ];

  return (
    <div className="flex space-x-4">
      {socialLinks.map(({ Icon, color, href }, index) => (
        <a
          key={index}
          href={href}
          className={`relative text-gray-300 p-2 rounded-full text-xl transition-all duration-300 ${color} group`}
        >
          <Icon className="relative z-10" />
          {/* Hover glow */}
          <span className="absolute inset-0 bg-current opacity-0 group-hover:opacity-20 rounded-full blur-sm transition-opacity duration-300" />
          {/* Click ripple */}
          <span className="absolute inset-0 scale-0 group-active:scale-150 bg-current opacity-0 group-active:opacity-10 rounded-full transition-transform duration-200 ease-out" />
        </a>
      ))}
    </div>
  );
};

export const Footer = () => {
  const footerSections = [
    {
      title: "SentiMent",
      links: ["Home", "About", "Pricing", "Features", "Products"],
    },
    {
      title: "Resources",
      links: ["FAQs", "Quick Start", "Documentation", "User Guide"],
    },
    {
      title: "Blogs & News",
      links: ["Blogs", "News", "Tips & Tricks", "New Updates", "Events"],
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-gray-200 py-12 px-6 w-full border-t border-indigo-600/20">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
              SentiMent
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering over 1,000 happy customers across India with
              cutting-edge sentiment analysis. Got questions? Reach out!
            </p>
            <button className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600/90 rounded-md overflow-hidden group">
              <span className="relative z-10">Contact Us</span>
              {/* Hover slide effect */}
              <span className="absolute inset-0 bg-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              {/* Click pulse */}
              <span className="absolute inset-0 bg-white/20 scale-0 group-active:scale-125 rounded-md transition-transform duration-150 ease-out" />
            </button>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-100">
                {section.title}
              </h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="relative text-gray-400 hover:text-cyan-300 transition-colors duration-200 group"
                    >
                      <span className="relative z-10">{link}</span>
                      {/* Hover underline effect */}
                      <span className="absolute left-0 bottom-0 w-full h-px bg-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-indigo-600/30 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <div className="mb-4 md:mb-0">
            © 2025 SentiMent. All rights reserved.
          </div>
          <SocialIcons />
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      </div>
    </footer>
  );
};

export default Footer;
