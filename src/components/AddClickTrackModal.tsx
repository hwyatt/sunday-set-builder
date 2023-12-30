import React, { useState } from "react";

const AddClickTrackModal = ({ onClose, onAddClickTrack }: any) => {
  const [clickName, setClickName] = useState<string>("");
  const [clickBPM, setClickBPM] = useState<string>("");
  const [clickTime, setClickTime] = useState<string>("");

  const handleAddClickTrack = () => {
    // Perform any additional validation if needed
    onAddClickTrack({ clickName, clickBPM, clickTime });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 w-96 rounded-md">
        <h2 className="text-2xl text-gray-600 font-semibold mb-5">
          Add Click Track
        </h2>
        <label htmlFor="songName" className="font-bold block text-gray-700">
          Song Name
        </label>
        <input
          type="text"
          id="songName"
          placeholder="Days of Elijah"
          className="text-black w-full border p-2 mb-4"
          value={clickName}
          onChange={(e) => setClickName(e.target.value)}
        />
        <label htmlFor="songBPM" className="font-bold block text-gray-700">
          BPM
        </label>
        <input
          type="number"
          id="songBPM"
          placeholder="120.00"
          className="text-black w-full border p-2 mb-4"
          value={clickBPM}
          onChange={(e) => setClickBPM(e.target.value)}
        />
        <label htmlFor="songTime" className="font-bold block text-gray-700">
          Time Signature
        </label>
        <select
          id="songTime"
          className="text-black w-full border p-2 mb-4"
          defaultValue={"4/4"}
          onChange={(e) => setClickTime(e.target.value)}
        >
          <option value="4/4">4/4</option>
          <option value="6/8">6/8</option>
        </select>
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