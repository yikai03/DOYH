import React, { useState, useRef } from 'react';

function Form() {
  const [name, setName] = useState("John Doe");
  const [entitle, setEntitle] = useState("McDonalds");
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
    }
  };

  return (
    <form onSubmit={postForm} className="space-y-5">
      <div className="flex flex-col justify-start space-x-4">
        <div className="w-[20rem] flex items-center justify-center h-12 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 relative">
          <div>Upload your resume</div>
          <input type="file" accept=".pdf" name="resume" ref={resumeRef} className="border-2 absolute h-12 w-[20rem] opacity-0" />
        </div>
        <div className="w-[20rem] flex items-center justify-center h-12 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 relative">
          <div>Upload your image</div>
          <input type="file" accept="image/*" name="image" ref={imageRef} className="border-2 absolute h-12 w-[20rem] opacity-0" />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="name" className='text-1xl font-bold'>Name:</label>
          <input className='border border-black rounded w-96' id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="entitle" className='text-1xl font-bold'>Entitle:</label>
          <input className='border border-black rounded w-96' id="entitle" name="entitle" value={entitle} onChange={(e) => setEntitle(e.target.value)} />
        </div>
        <button type="submit" className="ml-8 flex items-center justify-center w-[6rem] py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
          Submit
        </button>
      </div>
    </form>
  );
}

export default Form;