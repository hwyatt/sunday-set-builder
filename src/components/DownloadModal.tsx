import React from "react";

const DownloadModal = ({ id, onClose, onDownloadSet }: any) => {
  const handleDownloadSet = () => {
    onDownloadSet(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 w-96 rounded-md">
        <h2 className="text-2xl text-gray-600 font-bold mb-5">
          Your Ableton Set is Finished
        </h2>
        <p className="text-md text-gray-600 mb-5">
          Please allow pop-ups in the future for an automatic download. For now
          you can hit the download button!
        </p>
        <div className="flex justify-end mt-7">
          <button
            className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
            onClick={handleDownloadSet}
          >
            Download Set
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
