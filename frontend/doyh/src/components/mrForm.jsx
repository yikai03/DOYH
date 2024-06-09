import React, { useState, useRef } from 'react';

const MrForm = ({ isOpen, onClose, onFormSubmit }) => {
  const [name, setName] = useState("");
  const [entitle, setEntitle] = useState("");
  const resumeRef = useRef(null);
  const imageRef = useRef(null);

  const postForm = async (e) => {
    e.preventDefault();

    console.log('submitting form');

    const fileInput = resumeRef.current;
    console.log("resume: ", fileInput.files);

    const imageInput = imageRef.current;
    console.log("image: ", imageInput.files);

    const uniqueID = Math.random().toString(36).substring(2, 9);
    console.log("uniqueID: ", uniqueID);

    const formData = new FormData();

    if (fileInput && imageInput && fileInput.files.length > 0 && imageInput.files.length > 0) {
      formData.append('resume', fileInput.files[0]);
      formData.append('image', imageInput.files[0]);
      formData.append('id', uniqueID);
      formData.append('name', name);
      formData.append('entitle', entitle);

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await fetch('http://localhost:8000/generate-mentor', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      console.log(data);

      onFormSubmit(formData); // Call the onFormSubmit callback function with form data
      onClose(); // Close the popup after form submission
      location.reload(); // Reload the page to display the updated data
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Fill out the form</h2>
        <form onSubmit={postForm}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder='John Doe'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="entitlement">
              Entitlement
            </label>
            <input
              id="entitlement"
              type="text"
              placeholder='Tesla Inc.'
              value={entitle}
              onChange={(e) => setEntitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="photo">
              Photo
            </label>
            <input
              id="image"
              type="file"
              accept='image/*'
              ref={imageRef}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="resume">
              Resume
            </label>
            <input
              id="resume"
              type="file"
              accept='.pdf'
              ref={resumeRef}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white p-2 rounded mr-2"
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
  );
};

export default MrForm;
