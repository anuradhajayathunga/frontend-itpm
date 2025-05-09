import React, { useState, useEffect } from "react";
import { Mic, Camera, X, Star, StarIcon } from "lucide-react";
import SummaryApi from "../common"; // Adjust as needed
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    userType: "",
    category: "",
    description: "",
    rating: 0,
    picture: null,
    picturePreview: null,
    pictureBase64: null,
  });
  const navigate = useNavigate();

  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Initialize speech recognition
    if ("webkitSpeechRecognition" in window) {
      const speechRecognition = new window.webkitSpeechRecognition();
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;
      speechRecognition.lang = "en-US";

      speechRecognition.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript;
          }
        }
        setFormData((prev) => ({
          ...prev,
          description: prev.description + " " + transcript,
        }));
      };

      speechRecognition.onerror = (e) => {
        console.error("Speech recognition error:", e.error);
        setIsListening(false);
        toast.error(
          "Speech recognition failed. Please try again or type manually."
        );
      };

      speechRecognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(speechRecognition);
    }

    return () => {
      if (recognition) {
        try {
          recognition.stop();
        } catch (e) {
          console.error("Error stopping speech recognition:", e);
        }
      }
    };
  }, []);

  // Convert image file to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSpeech = () => {
    if (!recognition) {
      toast.error("Speech recognition is not supported in your browser.");
      return;
    }

    try {
      if (isListening) {
        recognition.stop();
        setIsListening(false);
      } else {
        recognition.start();
        setIsListening(true);
        toast.info("Listening... Speak now.");
      }
    } catch (error) {
      console.error("Speech recognition error:", error);
      setIsListening(false);
      toast.error("Speech recognition failed to start. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB.");
        e.target.value = "";
        return;
      }

      // Create an object URL for preview
      const previewUrl = URL.createObjectURL(file);

      try {
        // Convert to Base64
        const base64 = await convertToBase64(file);

        setFormData({
          ...formData,
          picture: file,
          picturePreview: previewUrl,
          pictureBase64: base64,
        });
      } catch (error) {
        console.error("Error converting image to Base64:", error);
        toast.error("Failed to process the image. Please try another image.");
        e.target.value = "";
      }
    }
  };

  const removeImage = () => {
    // Revoke the object URL to avoid memory leaks
    if (formData.picturePreview) {
      URL.revokeObjectURL(formData.picturePreview);
    }

    setFormData({
      ...formData,
      picture: null,
      picturePreview: null,
      pictureBase64: null,
    });

    // Reset file input
    const pictureInput = document.getElementById("picture-upload");
    if (pictureInput) pictureInput.value = "";
  };

  const handleRating = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Using JSON payload with Base64 image instead of FormData
    const submissionData = {
      type: "Feedback",
      userType: formData.userType,
      category: formData.category,
      description: formData.description,
      rating: formData.rating,
      picture: formData.pictureBase64, // Send the Base64 string
    };

    try {
      // Validate API configuration
      if (!SummaryApi.createFeedback || !SummaryApi.createFeedback.url) {
        throw new Error("API endpoint not properly configured");
      }

      const response = await fetch(SummaryApi.createFeedback.url, {
        method: SummaryApi.createFeedback.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", errorText);
        throw new Error(
          `Server responded with ${response.status}: ${errorText}`
        );
      }

      const result = await response.json();

      if (result.success) {
        toast.success("Feedback submitted successfully!");
        handleCancel(); // Reset form
        navigate("/feedbackand-complaint");
      } else {
        toast.error(
          result.message || "Error submitting feedback. Please try again."
        );
      }
    } catch (err) {
      console.error("Form submission error:", err);
      toast.error(`An error occurred: ${err.message || "Please try again."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (formData.picturePreview) {
      URL.revokeObjectURL(formData.picturePreview);
    }

    if (isListening && recognition) {
      try {
        recognition.stop();
        setIsListening(false);
      } catch (e) {
        console.error("Error stopping speech recognition:", e);
      }
    }

    setFormData({
      userType: "",
      category: "",
      description: "",
      rating: 0,
      picture: null,
      picturePreview: null,
      pictureBase64: null,
    });

    const pictureInput = document.getElementById("picture-upload");
    if (pictureInput) pictureInput.value = "";
  };

  // Custom Star Rating Component
  const StarRating = ({ rating, onRatingChange }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="focus:outline-none"
            onClick={() => onRatingChange(star)}
          >
            {star <= rating ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#FFCA28"
                className="w-8 h-8"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#FFCA28"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
          <h1 className="text-3xl font-bold mb-1">Share Your Feedback</h1>
          <p className="text-blue-100">
            Help us improve our services with your valuable input
          </p>
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Rate Your Experience
            </h2>
            <StarRating
              rating={formData.rating}
              onRatingChange={handleRating}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="userType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  User Type
                </label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm"
                >
                  <option value="">Select User Type</option>
                  <option value="Resident">Resident</option>
                  <option value="Collector">Collector</option>
                  <option value="Company">Recycling Company</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm"
                >
                  <option value="">Select Category</option>
                  <option value="Operational">
                    Operational (Pickup & Material)
                  </option>
                  <option value="Technical">Technical (App Usability)</option>
                  <option value="Interpersonal">
                    Interpersonal (Coordination)
                  </option>
                  <option value="Environmental">Environmental Awareness</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Comment
              </label>
              <div className="relative">
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Share your thoughts with us..."
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 min-h-32 resize-y"
                  rows={4}
                />
                <div className="absolute bottom-3 right-3 flex space-x-2">
                  <button
                    type="button"
                    className={`p-2 rounded-full ${
                      isListening
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                    } hover:bg-gray-200 transition-colors`}
                    onClick={handleSpeech}
                    disabled={!recognition}
                    title="Voice input"
                  >
                    <Mic size={18} />
                  </button>
                  <label
                    htmlFor="picture-upload"
                    className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
                    title="Upload image"
                  >
                    <Camera size={18} />
                    <input
                      id="picture-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {formData.picturePreview && (
              <div className="mt-4 border rounded-lg overflow-hidden bg-gray-50">
                <div className="flex justify-between items-center p-2 bg-gray-100 border-b">
                  <span className="text-sm font-medium text-gray-600">
                    Attached Image
                  </span>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="p-2">
                  <img
                    src={formData.picturePreview}
                    alt="Preview"
                    className="max-h-48 mx-auto object-contain"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-medium hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Feedback"
                )}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="flex-1 sm:flex-initial border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-sm transition-all disabled:opacity-50"
              >
                <Link to={"/feedbackand-complaint"}> Cancel</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
