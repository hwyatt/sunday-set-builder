import React, { useState } from "react";

export function calculateKey(baseKey: any, offset: any) {
  const musicalAlphabet = [
    "C",
    "Db",
    "D",
    "Eb",
    "E",
    "F",
    "F#",
    "G",
    "Ab",
    "A",
    "Bb",
    "B",
  ];

  // Find the index of the base key in the musical alphabet
  const baseIndex = musicalAlphabet.indexOf(baseKey);

  // Calculate the target index considering the offset
  const targetIndex =
    (baseIndex + offset + musicalAlphabet.length) % musicalAlphabet.length;

  // Return the key at the target index
  return musicalAlphabet[targetIndex];
}

const EditSongModal = ({ onClose, onEditSong, song }: any) => {
  const [editedBPM, setEditedBPM] = useState(song.bpm);
  const [editedKey, setEditedKey] = useState(song.key);

  const handleEditSong = () => {
    onEditSong(song.id, editedBPM, editedKey);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 w-96 rounded-md">
        <h2 className="text-2xl text-gray-600 font-bold mb-5">
          Edit {song.name}
        </h2>

        <div className="mb-5">
          <label
            htmlFor="editedBPM"
            className="block text-sm font-semibold text-gray-600"
          >
            BPM:
          </label>
          <input
            type="number"
            id="editedBPM"
            className="w-full text-gray-600 border p-2 mt-1 rounded-md"
            placeholder={editedBPM}
            value={editedBPM}
            onChange={(e) => setEditedBPM(Number(e.target.value))}
          />
        </div>

        {song.clips.length > 0 && (
          <div className="mb-5">
            <label
              htmlFor="editedKey"
              className="block text-sm font-semibold text-gray-600"
            >
              Key:
            </label>
            <select
              id="editedKey"
              className="w-full text-gray-600 border p-2 mt-1 rounded-md"
              value={editedKey}
              onChange={(e) => setEditedKey(e.target.value)}
            >
              <option value="-6">
                -6 ({calculateKey(song.displayKey, -6)})
              </option>
              <option value="-5">
                -5 ({calculateKey(song.displayKey, -5)})
              </option>
              <option value="-4">
                -4 ({calculateKey(song.displayKey, -4)})
              </option>
              <option value="-3">
                -3 ({calculateKey(song.displayKey, -3)})
              </option>
              <option value="-2">
                -2 ({calculateKey(song.displayKey, -2)})
              </option>
              <option value="-1">
                -1 ({calculateKey(song.displayKey, -1)})
              </option>
              <option value="0">0 ({song.displayKey})</option>
              <option value="1">+1 ({calculateKey(song.displayKey, 1)})</option>
              <option value="2">+2 ({calculateKey(song.displayKey, 2)})</option>
              <option value="3">+3 ({calculateKey(song.displayKey, 3)})</option>
              <option value="4">+4 ({calculateKey(song.displayKey, 4)})</option>
              <option value="5">+5 ({calculateKey(song.displayKey, 5)})</option>
              <option value="6">+6 ({calculateKey(song.displayKey, 6)})</option>
            </select>
            <label
              htmlFor="editedKey"
              className="block text-xs text-gray-600 mt-2"
            >
              Edit in half-steps ( 0 is the uploaded key )
            </label>
          </div>
        )}

        <div className="flex justify-end mt-7">
          <button
            className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
            onClick={handleEditSong}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSongModal;
