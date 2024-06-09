import React, { useEffect, useState } from "react";
import Modal from "./meForm";
import MrForm from "./mrForm"; // Import the new component
import MData from "./mData";

const MDisplay = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isMrFormOpen, setIsMrFormOpen] = useState(false); // State for MrForm
  const [data, setData] = useState([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchMatchingData();
    console.log("Modal closed")
  };

  const handleFormSubmission = () => {
    console.log("Form submitted, fetching metching data...");
    fetchMatchingData();
    setIsFormSubmitted(true);
    setIsModalOpen(false);
  };

  const handleMrFormOpen = () => {
    setIsMrFormOpen(true);
  };

  const handleMrFormClose = () => {
    setIsMrFormOpen(false);
  };

  const handleMrFormSubmit = (formData) => {
    // Logic to handle form submission from MrForm
    console.log(formData);
    setIsMrFormOpen(false);
    fetchData();
  };

  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/mentor-data");
    const datas = await response.json();

    console.log("fetchdata",datas);
    setData(datas);
  }

  const fetchMatchingData = async () => {
    const response = await fetch("http://localhost:8000/matching-mentors-data");
    const datas = await response.json();

    console.log("fetchmatchdata",datas);
    setData(datas);
  }

  useEffect(() => {
    fetchData();
  },[])



  return (
    <>
    <div>
      <div className="pl-32 pt-52 pb-10 bg-[#673147] opacity-[0.95] font-extrabold text-white">
        <div className="flex flex-row">
          <h1 className="text-5xl mb-3">MENTORS</h1> 
          <button className="btn btn-circle border-2 rounded-full w-8 h-8 bg-black border-black mt-2 ml-4" onClick={handleMrFormOpen}>
            +
          </button>
        </div>
        <p className="text-s font-thin">Empowering Your Growth: Discover, Connect, and Thrive with the Right Mentor by Your Side!</p>
      </div>
      
      <div className="flex justify-center bg-gradient-to-b from-[#673147] opacity-[0.95] to-white">
        <div className="flex items-center " style={{ width: '52rem', maxWidth: '52rem' }}>
          <select className="select select-bordered  w-1/2 h-20 rounded-l-full rounded-r-none bg-white border border-gray-300 px-4 py-2 text-base">
            <option disabled selected>Which Industry?</option>
            <option>Business</option>
            <option>Education</option>
            <option>Finance</option>
            <option>Retail</option>
            <option>Transport</option>
            <option>Information Technology</option>
          </select>
          <button
            className="rounded-r-full rounded-l-none w-1/2 h-20 border border-gray-300 px-4 py-2 text-base text-black font-bold"
            style={{ backgroundColor: 'white', opacity: 0.95 }}
            onClick={handleOpenModal}
          >
            Click here to fasten your matchmaking progress
          </button>
        </div>
      </div>

      <div className="flex items-center mt-4">
        <div className="ml-4 pl-32 mb-4 text-[#939393] text-[2rem] font-extrabold">
          {isFormSubmitted ? "Your Recommended Mentor" : "Finding a mentor? Don't worry we got you!!!"}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onFormSubmit={handleFormSubmission} />
      
      {/* Render MrForm if isMrFormOpen is true */}
      {isMrFormOpen && (
        <MrForm isOpen={isMrFormOpen} onClose={handleMrFormClose} onFormSubmit={handleMrFormSubmit} />
        )}


    </div>
      <MData data={data} />
    </>
  );
};

export default MDisplay;
