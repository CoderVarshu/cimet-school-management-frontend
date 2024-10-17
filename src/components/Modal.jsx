/* eslint-disable react/prop-types */
import { IoMdCloseCircleOutline } from 'react-icons/io';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-screen-md overflow-y-auto relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-1xl font-bold mb-6 focus:outline-none"><IoMdCloseCircleOutline size={28} /></button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
