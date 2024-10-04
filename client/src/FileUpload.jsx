import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const allowedFormats = ['image/jpeg', 'application/x-iso', 'application/hpgl', 'application/dxf'];

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (allowedFormats.includes(selectedFile.type)) {
                setFile(selectedFile);
                setError('');
            } else {
                setError('File format not supported. Please upload an ISO, JPG, HPGL, or DXF file.');
                setFile(null);
            }
        }
    };

    const handleUpload = () => {
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        axios.post('/upload', formData)
            .then((response) => {
                console.log(response.data);
                // Optionally reset the form after successful upload
                setFile(null);
                setError('');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="container mt-5">
            <h2>Upload File</h2>
            <input type="file" onChange={handleFileChange} />
            {error && <div className="alert alert-danger mt-2">{error}</div>}
            <button onClick={handleUpload} className="btn btn-primary mt-3">Upload</button>
        </div>
    );
}

export default FileUpload;
