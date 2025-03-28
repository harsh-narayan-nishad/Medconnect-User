
import { resourcesLinks, platformLinks, communityLinks } from "../constants";
import Search from "../ui/Search3";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="mt-20 text-sm text-gray-400 ">
        <div className="space-x-2">
          <button onClick={() => navigate("/")} className="hover:underline">
            Home
          </button>
          <span> &gt; </span>
          <button onClick={() => navigate("/page2")} className="hover:underline">
            Appointment
          </button>
          <span> &gt; </span>
          <button onClick={() => navigate("/page3")} className="hover:underline">
            Research
          </button>
        </div>
      </div>

      <footer className="border-t py-12 border-gray-300 ">
        <div className="text-gray-400 text-sm  mx-auto ">
          Healthcare today faces significant challenges due to fragmented patient data, where medical history is scattered across platforms, making it difficult for providers to retrieve comprehensive information.
        </div>

        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <h1 className="text-4xl mb-5 font-bold text-gray-700">Your Health, Our Priority...</h1>
            <Search />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left max-w-4xl mx-auto px-4">
          <div>
            <h3 className="text-md font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resourcesLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 text-sm hover:text-gray-900">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              {platformLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 text-sm hover:text-gray-900">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              {communityLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 text-sm hover:text-gray-900">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>

      <div className="mt-1 border-t border-gray-300"></div>
      <p className="text-gray-400 text-sm  py-4">India<br />Copyright © 2024 Medconnect. All rights reserved.</p>
    </>
  );
};

export default Footer;