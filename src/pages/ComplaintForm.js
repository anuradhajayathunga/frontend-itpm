import React, { useState } from "react";
import { AlertCircle, Camera, X } from "lucide-react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    userType: "",
    category: "",
    urgency: "Low",
    description: "",
    picture: null,
    picturePreview: null,
    pictureBase64: null,
  });
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const handleUrgencySelect = (urgency) => {
    setFormData({ ...formData, urgency });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Using JSON payload with Base64 image instead of FormData
    const payloadData = {
      type: "Complaint",
      userType: formData.userType,
      category: formData.category,
      urgency: formData.urgency,
      description: formData.description,
      picture: formData.pictureBase64, // Send the Base64 string
    };

    try {
      // Make sure your API endpoint is correct
      if (!SummaryApi.createFeedback || !SummaryApi.createFeedback.url) {
        throw new Error("API endpoint not properly configured");
      }

      const response = await fetch(SummaryApi.createFeedback.url, {
        method: SummaryApi.createFeedback.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadData),
      });

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", errorText);
        throw new Error(
          `Server responded with ${response.status}: ${errorText}`
        );
      }

      const result = await response.json();

      if (result.success) {
        toast.success("Complaint submitted successfully!");
        handleCancel(); // Reset form
        navigate("/")
      } else {
        toast.error(
          result.message || "Error submitting complaint. Please try again."
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
    // Revoke object URL if exists
    if (formData.picturePreview) {
      URL.revokeObjectURL(formData.picturePreview);
    }

    setFormData({
      userType: "",
      category: "",
      urgency: "Low",
      description: "",
      picture: null,
      picturePreview: null,
      pictureBase64: null,
    });

    const pictureInput = document.getElementById("picture-upload");
    if (pictureInput) pictureInput.value = "";
  };

  // Different styling for each urgency level
  const getUrgencyColor = (level) => {
    switch (level) {
      case "Low":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          border: "border-green-200",
          active: "bg-green-600 text-white",
        };
      case "Medium":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          border: "border-yellow-200",
          active: "bg-yellow-600 text-white",
        };
      case "High":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          border: "border-red-200",
          active: "bg-red-600 text-white",
        };
      default:
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          border: "border-green-200",
          active: "bg-green-600 text-white",
        };
    }
  };

  // Custom loading spinner component
  const LoadingSpinner = () => (
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
  );

  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-pink-600 p-6 text-white">
          <h1 className="text-3xl font-bold mb-1">Submit a Complaint</h1>
          <p className="text-red-100">
            We're sorry to hear you had an issue. Let us know what happened.
          </p>
        </div>

        <div className="p-6 md:p-8">
          {/* Alert Message */}
          <div className="flex items-start p-4 mb-6 bg-blue-50 border border-blue-100 rounded-lg">
            <AlertCircle
              className="text-blue-600 mt-0.5 mr-3 flex-shrink-0"
              size={20}
            />
            <p className="text-blue-700 text-sm">
              Please provide as much detail as possible so we can address your
              complaint effectively.
            </p>
          </div>

          <div onSubmit={handleSubmit} className="space-y-6">
            {/* User Type & Category */}
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white shadow-sm"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white shadow-sm"
                >
                  <option value="">Select Category</option>
                  <option value="Operational">
                    Operational (Pickup & Material)
                  </option>
                  <option value="Technical">Technical (App Usability)</option>
                  <option value="Interpersonal">
                    Interpersonal (Stakeholder Coordination)
                  </option>
                  <option value="Environmental">
                    Environmental Impact & Awareness
                  </option>
                </select>
              </div>
            </div>

            {/* Urgency Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Urgency Level
              </label>
              <div className="flex flex-wrap gap-3">
                {["Low", "Medium", "High"].map((level) => {
                  const colors = getUrgencyColor(level);
                  return (
                    <div
                      key={level}
                      onClick={() => handleUrgencySelect(level)}
                      className={`
                      flex items-center px-4 py-2 rounded-full cursor-pointer border transition-all
                      ${
                        formData.urgency === level
                          ? colors.active
                          : `${colors.bg} ${colors.text} ${colors.border}`
                      }
                    `}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                          formData.urgency === level ? "bg-white" : colors.text
                        }`}
                      />
                      <span className="text-sm font-medium">
                        {level} Urgency
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Complaint Details
              </label>
              <div className="relative">
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Please describe your complaint in detail..."
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 min-h-32 resize-y"
                  rows={4}
                />
                <label
                  htmlFor="picture-upload"
                  className="absolute bottom-3 right-3 p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
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

            {/* Image Preview */}
            {formData.picturePreview && (
              <div className="border rounded-lg overflow-hidden bg-gray-50">
                <div className="flex justify-between items-center p-2 bg-gray-100 border-b">
                  <span className="text-sm font-medium text-gray-600">
                    Image Preview
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

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-red-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-md transition-all disabled:opacity-50 flex justify-center items-center"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner />
                    <span>Submitting...</span>
                  </>
                ) : (
                  "Submit Complaint"
                )}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="flex-1 sm:flex-initial border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-sm transition-all disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;
