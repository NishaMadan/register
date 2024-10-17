import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/auth/upload')
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





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function AdminDashboard() {
//     const [files, setFiles] = useState([]);

//     // Dummy data for testing
//     const dummyData = [
//         {
//             id: 1,
//             userName: 'John Doe',
//             companyName: 'Company A',
//             requirement: 'Fabric Quality Check',
//             description: 'Check for defects in the fabric samples.',
//             expectedDate: '2024-10-20',
//             filePath: '/uploads/sample1.pdf',
//         },
//         {
//             id: 2,
//             userName: 'Jane Smith',
//             companyName: 'Company B',
//             requirement: 'Design Review',
//             description: 'Review the designs submitted for approval.',
//             expectedDate: '2024-10-22',
//             filePath: '/uploads/sample2.pdf',
//         },
//         {
//             id: 3,
//             userName: 'Mike Johnson',
//             companyName: 'Company C',
//             requirement: 'Material Specification',
//             description: 'Provide specifications for new materials.',
//             expectedDate: '2024-10-25',
//             filePath: '/uploads/sample3.pdf',
//         },
//     ];

//     // Simulating fetching data from an API
//     useEffect(() => {
//         // In a real application, you would fetch from the API
//         // Uncomment below line to fetch from your backend
//         // axios.get('http://localhost:5000/admin/uploads')
//         //     .then((response) => {
//         //         setFiles(response.data);
//         //     })
//         //     .catch((error) => {
//         //         console.error('Error fetching uploaded files:', error);
//         //     });

//         // Using dummy data for now
//         setFiles(dummyData);
//     }, []);

//     const handleDownload = (filePath) => {
//         window.open(`http://localhost:5000${filePath}`, '_blank');
//     };

//     return (
//         <div className="admin-dashboard">
//             <h2>Uploaded Files</h2>
//             <table className="table">
//                 <thead>
//                     <tr>
//                         <th>User Name</th>
//                         <th>Company Name</th>
//                         <th>Requirement</th>
//                         <th>Description</th>
//                         <th>Expected Date</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {files.map((file) => (
//                         <tr key={file.id}>
//                             <td>{file.userName}</td>
//                             <td>{file.companyName}</td>
//                             <td>{file.requirement}</td>
//                             <td>{file.description}</td>
//                             <td>{file.expectedDate}</td>
//                             <td>
//                                 <button onClick={() => handleDownload(file.filePath)} className="btn btn-primary">
//                                     Download
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default AdminDashboard;
