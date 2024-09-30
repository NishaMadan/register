import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', file);
        axios.post('/upload', formData)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="container mt-5">
            <h2>Upload File</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} className="btn btn-primary mt-3">Upload</button>
        </div>
    );
}

export default FileUpload;
