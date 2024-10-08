import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import './FileUpload.css'; // Import the CSS file for styles

function FileUpload() {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [requirement, setRequirement] = useState('');
    const [description, setDescription] = useState('');
    const [expectedDate, setExpectedDate] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    // Define allowed formats
    const allowedFormats = ['image/jpeg', 'application/x-iso', 'application/hpgl', 'application/dxf'];

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Check if the selected file format is allowed
            if (allowedFormats.includes(selectedFile.type)) {
                setFile(selectedFile);
                setError(''); // Clear error if format is correct
            } else {
                setError('File format not supported. Please upload an ISO, JPG, HPGL, or DXF file.');
                setFile(null); // Clear the file if format is incorrect
            }
        }
    };

    const handleUpload = () => {
        // Ensure all fields are filled and a file is selected
        if (!file || !companyName || !requirement || !description || !expectedDate || !name) {
            alert('Please fill in all fields and select a file to upload.');
            return;
        }

        // Prepare form data for submission
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('companyName', companyName);
        formData.append('requirement', requirement);
        formData.append('description', description);
        formData.append('expectedDate', expectedDate);

        // Make the API call to upload the file
        axios.post('/upload', formData)
            .then((response) => {
                console.log(response.data);
                // Reset form fields after successful upload
                setFile(null);
                setName('');
                setCompanyName('');
                setRequirement('');
                setDescription('');
                setExpectedDate('');
                setError('');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleLogout = () => {
        // Perform any logout logic here (if needed)
        // Redirect to home page
        navigate('/'); // Navigate to home page
    };

    return (
        <div className="upload-container">
            <button onClick={handleLogout} className="logout-button">Logout </button>
            <h2>Upload File</h2>
            <form className="upload-form">
                <div className="form-group">
                    <label htmlFor="userName">User Name:</label>
                    <input 
                        type="text" placeholder='Enter your name'
                        id="userName" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="companyName">Company Name:</label>
                    <input 
                        type="text" placeholder='Enter your company name'
                        id="companyName" 
                        value={companyName} 
                        onChange={(e) => setCompanyName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="requirement">Requirement:</label>
                    <input 
                        type="text" placeholder='Enter your Requirement'
                        id="requirement" 
                        value={requirement} 
                        onChange={(e) => setRequirement(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description of File:</label>
                    <textarea 
                        id="description" placeholder='Enter your notes shortly'
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="file">Upload File:</label>
                    <input 
                        type="file" 
                        id="file" 
                        onChange={handleFileChange} 
                        required 
                    />
                    {error && <div className="error-message">{error}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="expectedDate">Expected Date of Return:</label>
                    <input 
                        type="date" 
                        id="expectedDate" 
                        value={expectedDate} 
                        onChange={(e) => setExpectedDate(e.target.value)} 
                        required 
                    />
                </div>
                <button type="button" onClick={handleUpload} className="upload-button">Upload</button>
            </form>
        </div>
    );
}

export default FileUpload;
