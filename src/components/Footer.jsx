import {
  FaInstagramSquare,
  FaGithubSquare,
  FaFacebookSquare,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="p-[50px] text-white bg-[#020c1b] position: relative">
      <div className=" flex justify-center items-center flex-col w-full gap-5">
        <div className="flex justify-center items-center text-center">
          <p className="p-2 text-white hover:text-pink-700 hover:underline transition duration-300">
            Terms of Use

            
          </p>

          <p className="p-2 text-white hover:text-pink-700 hover:underline transition duration-300">
            Privacy-Policy
          </p>
          <p className="p-2 text-white hover:text-pink-700 hover:underline transition duration-300">
            About
          </p>
          <p className="p-2 text-white hover:text-pink-700 hover:underline transition duration-300">
            Blog
          </p>
          <p className="p-2 text-white hover:text-pink-700 hover:underline transition duration-300">
            FAQ
          </p>
        </div>
        <div className="flex justify-center items-center text-[#757a83] text-sm text-center max-w-[800px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </div>
        <div className="flex justify-center items-center gap-3">
          <div className="w-[50px] h-[50px] rounded-full text-white bg-[#04152d] flex justify-center items-center">
            <FaInstagramSquare />
          </div>

          <div className="w-[50px] h-[50px] rounded-full text-white bg-[#04152d] flex justify-center items-center">
            {" "}
            <FaGithubSquare />
          </div>

          <div className="w-[50px] h-[50px] rounded-full text-white bg-[#04152d] flex justify-center items-center">
            <FaFacebookSquare />
          </div>

          <div className="w-[50px] h-[50px] rounded-full text-white bg-[#04152d] flex justify-center items-center">
            {" "}
            <FaLinkedin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;