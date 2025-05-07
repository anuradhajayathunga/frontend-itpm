import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import axios from 'axios';
import StarRating from '../components/feedback-star/StarRating';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify';
function FeedbackForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        duration: '',
        howDidYouHear: '',
        quality: '',
        cleanliness: '',
        food: '',
        staff: '',
        suggestions: '',
        rating: 0,
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    };

    const handleRatingChange = (rating) => {
        setFormData({ ...formData, rating });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(SummaryApi.send_feedback.url, {
            method: SummaryApi.send_feedback.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        const responseData = await response.json()

        if (responseData.success) {
            toast.success(responseData?.message)
            navigate(`/`)

        }


        if (responseData.error) {
            toast.error(responseData?.message)
        }
    };


    return (

        <div className="bg-blueGray-50 py-8 px-8 md:px-0">
            <h2 className="text-center text-lg font-bold text-green-500 mb-2">Feedback Form</h2>

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-12 bg-white w-full mb-6 shadow-lg rounded">
                <div className="mb-2">
                    <label htmlFor="name" className="block font-semibold text-gray-700">Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input border-2" />
                </div>

                <div className="mb-2">
                    <label htmlFor="email" className="block font-semibold text-gray-700">Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input border-2" />
                </div>

                <div className="mb-2">
                    <label htmlFor="duration" className="block font-semibold text-gray-700">Duration of Your Stay (in days):</label>
                    <input type="number" name="duration" value={formData.duration} onChange={handleChange} min="1" required className="form-input border-2" />
                </div>

                <div className="mb-2">
                    <label htmlFor="howDidYouHear" className="block font-semibold text-gray-700">How Did You Hear About Our Hotel:</label>
                    <input type="text" name="howDidYouHear" value={formData.howDidYouHear} onChange={handleChange} required className="form-input border-2" />
                </div>

                <div className="mb-2">
                    <table className="w-full table-fixed">
                        <thead>
                            <tr>
                                <th className="w-1/6"></th>
                                <th className="w-1/6">Poor</th>
                                <th className="w-1/6"> Excellent</th>
                                <th className="w-1/6">Good</th>
                                <th className="w-1/6">Very Good</th>
                                <th className="w-1/6">Satisfactory</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><label className="block font-semibold text-gray-700">Quality:</label></td>
                                <td><input type="radio" name="quality" value="poor" onChange={handleChange} required /></td>
                                <td><input type="radio" name="quality" value="satisfactory" onChange={handleChange} required /></td>
                                <td><input type="radio" name="quality" value="good" onChange={handleChange} required /></td>
                                <td><input type="radio" name="quality" value="very_good" onChange={handleChange} required /></td>
                                <td><input type="radio" name="quality" value="excellent" onChange={handleChange} required /></td>
                            </tr>
                            <tr>
                                    <td><label>Cleanliness:</label></td>
                                    <td><input type="radio" name="cleanliness" value="poor" onChange={handleChange} required /></td>
                                    <td><input type="radio" name="cleanliness" value="satisfactory" onChange={handleChange} required /></td>
                                    <td><input type="radio" name="cleanliness" value="good" onChange={handleChange} required /></td>
                                    <td><input type="radio" name="cleanliness" value="very_good" onChange={handleChange} required /></td>
                                    <td><input type="radio" name="cleanliness" value="excellent" onChange={handleChange} required /></td>
                                </tr>
                                <tr>
                                    <td><label>Food:</label></td>
                                    <td><input type="radio" name="food" value="poor" onChange={handleChange} required /></td>
                                    <td><input type="radio" name="food" value="satisfactory" onChange={handleChange} required /></td>
                                    <td><input type="radio" name="food" value="good" onChange={handleChange} required /></td>
                                    <td><input type="radio" name="food" value="very_good" onChange={handleChange} required /></td>
                                    <td><input type="radio" name="food" value="excellent" onChange={handleChange} required /></td>
                                </tr>
                                <tr>
                                    <td><label>Staff:</label></td>
                                    <td><input type="radio" name="staff" value="poor" onChange={handleChange} required /></td>
                                    <td><input type="radio" name="staff" value="satisfactory" onChange={handleChange} required /></td>
                                    <td><input type="radio" name="staff" value="good" onChange={handleChange} required /></td>
                                    <td><input type="radio" name="staff" value="very_good" onChange={handleChange} required /></td>
                                    <td><input type="radio" name="staff" value="excellent" onChange={handleChange} required /></td>
                                </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mb-2">
                    <label className="block font-semibold text-gray-700">Overall Rating:</label>
                    <StarRating rating={formData.rating} onChange={handleRatingChange} />
                </div>

                <div className="mb-2">
                    <label className="block font-semibold text-gray-700">Any Suggestions:</label>
                    <textarea name="suggestions" value={formData.suggestion} onChange={handleChange} rows="3" className="form-textarea border-2 min-w-full"></textarea>
                </div>

                <button className="btn btn-fill-type mb-30 py-2 px-4">Send</button>
            </form>
        </div>

    );
}

export default FeedbackForm;
