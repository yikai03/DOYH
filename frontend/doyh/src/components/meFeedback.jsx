// src/components/meFeedback.jsx
import React from 'react';

const ConfirmationModal = ({ keywords, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Confirm Generated Keywords</h2>
        <div className="mb-4">
          <p className="font-bold">Your generated labels/taggings are:</p>
          <div className="flex flex-wrap">
            {keywords.map((keyword, index) => (
              <div
                key={index}
                className="bg-black text-white px-4 py-2 rounded-full mr-2 mt-2"
              >
                {keyword}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="bg-red-500 text-white p-2 rounded mr-2"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white p-2 rounded"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
