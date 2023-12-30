import React, { useState } from "react";

const AddClickTrackModal = ({ onClose, onAddClickTrack }: any) => {
  const [trackName, setTrackName] = useState("");

  const handleAddClickTrack = () => {
    // Perform any additional validation if needed
    onAddClickTrack(trackName);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 w-96 rounded-md">
        <h2 className="text-2xl text-gray-600 font-semibold mb-5">
          Add Click Track
        </h2>
        <label htmlFor="trackName" className="block text-gray-700">
          Track Name:
        </label>
        <input
          type="text"
          id="trackName"
          className="text-black w-full border p-2 mb-4"
          value={trackName}
          onChange={(e) => setTrackName(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddClickTrack}
          >
            Add Track
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClickTrackModal;
