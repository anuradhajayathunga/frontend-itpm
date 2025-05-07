import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../../../common';
import { toast } from "react-toastify";
const Feedbackdeleteform = ({ onClose, packageData, fetchData }) => {
    const [data, setData] = useState({
        ...packageData,
        name: packageData?.name,
        suggestions: packageData?.suggestions,
        rating: packageData?.rating,

    });
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(SummaryApi.delete_feedback.url, {
            method: SummaryApi.delete_feedback.method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (responseData.success) {
            toast.success(responseData?.message);
            onClose();
            fetchData();
        }

        if (responseData.error) {
            toast.error(responseData?.message);
        }
    };
    return (
        <div>
            <div className='fixed top-0 bottom-0 left-0 right-0 pt-80 pl-80 w-full h-full z-10 flex justify-center items-center bg-blue-200 bg-opacity-30'>
                <div className='text-black p-4 rounded w-full max-w-2xl h-full max-h-[90%] overflow-hidden'>
                    <div className="w-full max-w-md">

                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                            <div className='flex justify-between items-center pb-2 -mr-5 -mt-4'>
                                <div
                                    className='w-fit ml-auto text-2xl bg-red-500 hover:bg-red-600 hover:scale-110 aspect-square hover:text-white cursor-pointer'
                                    onClick={onClose}
                                >
                                    <IoMdClose />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-navy-600 text-3xl font-bold mb-2" htmlFor="firstName">
                                    Are You sure?
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-navy-400 hover:bg-navy-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"

                                >
                                    Yes
                                </button>
                            </div>
                        </form>
                        <p className="text-center text-red-800 text-xs">
                            © 2024 <Link to={'/admin/default'}>ElephantBay</Link> All rights reserved
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feedbackdeleteform
