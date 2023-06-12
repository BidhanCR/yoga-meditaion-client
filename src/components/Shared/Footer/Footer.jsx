import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLocationArrow,
} from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <footer data-aos="fade-up" className="bg-black py-8">
      <div className="container mx-auto flex flex-wrap">
        <div className="w-full lg:w-1/3 px-4 mb-4 md:mb-0">
          <div className="flex items-center mb-4">
          <img
              src="https://i.ibb.co/MDbg7D8/2.jpg"
              alt="logo"
              className="w-16 h-16 rounded-full"
            />
            <span className="ml-2 text-white text-lg">
              Inner Peace Yoga Meditation Center
            </span>
          </div>
          <p className="text-gray-400 mb-4">
            Discover the transformative power of yoga and meditation with our
            comprehensive courses. Our experienced instructors guide you on a
            journey of self-discovery, helping you cultivate inner peace,
            physical strength, and mental clarity.
          </p>
          <div className="flex flex-col text-white">
            <p className="text-white hover:text-[#98c619] mr-2 flex items-center">
              <FaLocationArrow className="mr-2" />
              123 High Street, London, SW1A 1AA UK
            </p>
            <p className="text-white hover:text-[#98c619] mr-2 flex items-center">
              <MdAlternateEmail className="mr-2" /> Email:
              innerpeaseyoga@gmail.com
            </p>
            <p className="text-white hover:text-[#98c619] mr-2 flex items-center">
              <FiPhoneCall className="mr-2" /> Phone: (013) 846 8451
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/3 px-4 mb-4 md:mb-0">
          <h3 className="text-white text-lg mb-4">Quick Links</h3>
          <div className="flex flex-col">
            <Link href="#" className="text-white hover:text-[#98c619]">
          
              Help Center
            </Link>
            <Link href="#" className="text-white hover:text-[#98c619]">
              About us
            </Link>
            <Link href="#" className="text-white hover:text-[#98c619]">
              Contact us
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4 md:mb-0">
          <h3 className="text-white text-lg mb-4">Follow Us On</h3>
          <div className="flex flex-col">
            <Link
              href="#"
              className="text-white hover:text-[#98c619] mr-2 flex items-center"
            >
              <FaFacebook className="mr-1" /> Facebook
            </Link>
            <Link
              href="#"
              className="text-white hover:text-[#98c619] mr-2 flex items-center"
            >
              <FaTwitter className="mr-1" /> Twitter
            </Link>
            <Link
              href="#"
              className="text-white hover:text-[#98c619] flex items-center"
            >
              <FaInstagram className="mr-1" /> Instagram
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 text-center">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} Inner Peace Yoga Meditation Center.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
