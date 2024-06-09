// src/components/meForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import ConfirmationModal from './meFeedback';
import { useNavigate } from 'react-router-dom';

const Modal = ({ isOpen, onClose, onFormSubmit }) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [request, setRequest] = useState("");
  const fileRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setIsFormVisible(true);
      setIsConfirmationModalOpen(false);
    }
  }, [isOpen]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const generatedKeywords = ['apple', 'orange', 'grape'];
    setKeywords(generatedKeywords);
    setIsFormVisible(false);
    setIsConfirmationModalOpen(true);
    onFormSubmit();
  };


  const postForm = async (e) => {
    e.preventDefault();

    console.log('submitting form');

    const fileInput = fileRef.current;
    console.log("file: ", fileInput.files);

    const formData = new FormData();

    if (fileInput && fileInput.files.length > 0) {
      formData.append('businessPlan', fileInput.files[0]);
      formData.append('mentorRequest', request);


      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await fetch('http://localhost:8000/mentorship-matching-request', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      console.log(data);
      console.log("Data Tags: ", data.tag)
      setKeywords(data.tag);
      setIsConfirmationModalOpen(true);
      setIsFormVisible(false);
    }
  };

  const handleConfirmation = () => {
    setIsConfirmationModalOpen(false);
    onClose();
  };

  const handleCancellation = () => {
    setIsConfirmationModalOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div>
      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Submit Your Data</h2>
            <form onSubmit={postForm}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="pdfFile">
                  PDF File
                </label>
                <input
                  id="pdfFile"
                  type="file"
                  accept=".pdf"
                  ref={fileRef}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-red-500 text-white p-2 rounded mr-2"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isConfirmationModalOpen && (
        <ConfirmationModal
          keywords={keywords}
          onConfirm={handleConfirmation}
          onCancel={handleCancellation}
        />
      )}
    </div>
  );
};

export default Modal;
