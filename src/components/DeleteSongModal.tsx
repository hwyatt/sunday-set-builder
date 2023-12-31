import React from "react";

const DeleteSongModal = ({ onClose, onDeleteSong }: any) => {
  const handleDeleteSong = () => {
    console.log("delete from modal");
    onDeleteSong();
    // onDeleteSong();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 w-96 rounded-md">
        <h2 className="text-2xl text-gray-600 font-bold mb-5">Delete Song</h2>
        <p className="text-md text-gray-600 mb-5">
          Are you sure you want to delete this song?
        </p>
        <div className="flex justify-end mt-7">
          <button
            className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
            onClick={handleDeleteSong}
          >
            Delete Song
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSongModal;
