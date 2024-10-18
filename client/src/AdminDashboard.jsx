import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/admin/getfiles')
            .then((response) => {
                console.log(response);
                
                setFiles(response.data);
            })
            .catch((error) => {
                console.error('Error fetching uploaded files:', error);
            });
    }, []);

    // const handleDownload = (filePath) => {
    //     const baseUrl = 'http://localhost:5000';  // Your server URL
    //     const completeUrl = `${baseUrl}/${filePath}`;  // Ensure there's a / between baseUrl and filePath
    //     window.open(completeUrl, '_blank');
    // };
    const handleDownload = (filePath) => {
        const baseUrl = 'http://localhost:5000'; // Your server URL
        const completeUrl = `${baseUrl}/${filePath}`; // Complete file URL
    
        const link = document.createElement('a'); // Create an anchor element
        link.href = completeUrl; // Set the href to the complete URL
        link.download = ''; // Optional: specify a filename
        document.body.appendChild(link); // Append to the body
        link.click(); // Programmatically click the link to trigger download
        document.body.removeChild(link); // Remove the link after download
    }

    return (
        <div className="admin-dashboard" style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: '20px' }}>
            <h2>Uploaded Files</h2>
            <table className="table" style={{ backgroundColor: 'black', color: 'white', width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th style={{ backgroundColor: '#333', color: 'white' }}>Company Name</th>
                    <th style={{ backgroundColor: '#333', color: 'white' }}>File Name</th>
                    <th style={{ backgroundColor: '#333', color: 'white' }}>Upload Date</th>
                    <th style={{ backgroundColor: '#333', color: 'white' }}>Action</th>
                </tr>
            </thead>
               
                <tbody>
    {files.map((file) => (
        <tr key={file._id} tyle={{ backgroundColor: '#444' }}>
            {/* Display available fields */}
            <td>{file.companyName}</td>
            <td>{file.fileName}</td>
            <td>{new Date(file.uploadDate).toLocaleDateString()}</td>
            <td>
            <button 
    onClick={() => handleDownload(file.filePath)} 
    className="btn" 
    style={{ backgroundColor: 'grey', color: 'white' }} // Change the text color if needed
>
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


 {/* <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Company Name</th>
                        <th>Requirement</th>
                        <th>Description</th>
                        <th>Expected Date</th>
                        <th>Action</th>
                    </tr>
                </thead> */}
   {/* <tbody>
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
                </tbody> */}

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
