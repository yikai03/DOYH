import React from "react";

const Navbar = () => {
  return (
    <nav className="scrolled-header sticky top-0 left-0 w-full shadow-sm text-[0.8125rem] bg-[#673147] z-10 font-semibold">
        <div className="px-12 h-24 flex justify-between items-center text-white relative">
            <a href="https://www.mystartup.gov.my/home"> <img src="src/assets/logo.png" alt="logo" className="h-4"/></a>
            <div className="flex justify-end space-x-1 text-[0.8125rem]">
            <a href="https://www.mystartup.gov.my/about-us" className="p-4">About Us</a>
            <a href="https://www.mystartup.gov.my/founder" className="p-4">Founders</a>
            <a href="https://www.mystartup.gov.my/investor" className="p-4">Investors</a>
            <a href="#" className="p-4 font-extrabold">Mentors</a>
            <a href="https://www.mystartup.gov.my/tech-talent" className="p-4">Tech Talents</a>
            <a href="https://www.mystartup.gov.my/government" className="p-4">Goverment Funding</a>
            <a href="https://www.mystartup.gov.my/news-events" className="p-4">News & Event</a>
            <a href="#" className="p-4">Insights</a>
            </div>
            <div className="flex justify-end space-x-1 text-[0.8125rem] items-center">
                <a><button>BM</button></a>
                <a>|</a>
                <a><button>EN</button></a>
                <a></a>
                <a href="https://www.mystartup.gov.my/login">
                <button style={{
                    background: 'linear-gradient(90deg, #4bc8f5, #2993d0, #0055a5)',
                    borderRadius: '1.25rem',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    padding: '10px 20px'
                    }}>Login / Sign Up</button>
                </a>
            </div>
            <div>
            
            </div>
      </div>
    </nav>
  );
};

export default Navbar;