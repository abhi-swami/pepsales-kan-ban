
import React, { useState } from 'react';

const TransitionModal = ({ onSubmit, onClose, fromStage, toStage }) => {
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ reason });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Transition Details</h2>
        <p className="mb-4">
          Moving from <span className="font-semibold">{fromStage}</span> to <span className="font-semibold">{toStage}</span>
        </p>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Reason for transition:
            <textarea 
              className="w-full p-2 border rounded"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </label>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransitionModal;