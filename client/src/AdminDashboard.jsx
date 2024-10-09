import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/admin/uploads')
            .then((response) => {
                setFiles(response.data);
            })
            .catch((error) => {
                console.error('Error fetching uploaded files:', error);
            });
    }, []);

    const handleDownload = (filePath) => {
        window.open(`http://localhost:5000${filePath}`, '_blank');
    };

    return (
        <div className="admin-dashboard">
            <h2>Uploaded Files</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Company Name</th>
                        <th>Requirement</th>
                        <th>Description</th>
                        <th>Expected Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map((file) => (
                        <tr key={file.id}>
                            <td>{file.userName}</td>
                            <td>{file.companyName}</td>
                            <td>{file.requirement}</td>
                            <td>{file.description}</td>
                            <td>{file.expectedDate}</td>
                            <td>
                                <button onClick={() => handleDownload(file.filePath)} className="btn btn-primary">
                                    Download
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboard;

