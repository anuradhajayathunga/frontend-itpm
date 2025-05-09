import React from "react";
import { MdDelete } from "react-icons/md";
import { MdClose } from "react-icons/md";

const DeleteModal = ({ isOpen, onClose, onConfirm, userName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 pt-12  w-full h-full z-10 flex justify-center items-center bg-white/10 p-2 backdrop-blur-md">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-red-600 flex items-center gap-2">
            <MdDelete /> Confirm Deletion
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <MdClose size={20} />
          </button>
        </div>

        <p className="text-gray-800 mb-6">
          Are you sure you want to delete the request for{" "}
          <strong>{userName}</strong>? This action cannot be undone.
        </p>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 mr-3"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
