
import Layout from '@/components/Admin/common/Layout';
import { useEffect, useState } from 'react';

export default function DashboardPartnerContactList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data when the component is mounted
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/partnerpage/partner-contact',{
                    headers: {
                     'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
                    },
                  });
                const result = await response.json();
                if (response.ok) {
                    setData(result);
                } else {
                    setError(result.error || 'Failed to fetch data.');
                }
            } catch (error) {
                setError('An unexpected error occurred.');
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handle the delete action
    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this contact?')) return;

        try {
            const response = await fetch(`/api/partnerpage/partner-contact?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
                   },
            });
            if (response.ok) {
                setData(data.filter(item => item.id !== id));
            } else {
                const result = await response.json();
                setError(result.error || 'Failed to delete the contact.');
            }
        } catch (error) {
            setError('An unexpected error occurred.');
            console.error('Error:', error);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <>
            <div className="md:p-6 bg-gray-50">
                {error && (
                    <div className="bg-red-100 text-red-600 p-4 mb-4 rounded">
                        {error}
                    </div>
                )}
                <h2 className='text-2xl font-bold text-gray-700'>Partner List</h2>
                <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-4"  style={{ height: '360px' }}>
                    <table className="table-auto w-full text-left border-collapse border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-2 py-2 border border-gray-300 text-[12px] font-semibold text-gray-600">ID</th>
                                <th className="px-2 py-2 border border-gray-300 text-[12px] font-semibold text-gray-600">Name</th>
                                <th className="px-2 py-2 border border-gray-300 text-[12px] font-semibold text-gray-600">Contact No</th>
                                <th className="px-2 py-2 border border-gray-300 text-[12px] font-semibold text-gray-600">Email</th>
                                <th className="px-2 py-2 border border-gray-300 text-[12px] font-semibold text-gray-600">Company Name</th>
                                <th className="px-2 py-2 border border-gray-300 text-[12px] font-semibold text-gray-600">Designation</th>
                                <th className="px-2 py-2 border border-gray-300 text-[12px] font-semibold text-gray-600">City</th>
                                <th className="px-2 py-2 border border-gray-300 text-[12px] font-semibold text-gray-600">State</th>
                                <th className="px-2 py-2 border border-gray-300 text-[12px] font-semibold text-gray-600">Partner Type</th>
                                <th className="px-2 py-2 border border-gray-300 text-[12px] font-semibold text-gray-600">Query</th>
                                <th className="px-2 py-2 border border-gray-300 text-[12px] font-semibold text-gray-600">Created At</th>
                                {/* <th className="px-2 py-2 border border-gray-300 text-[12px] font-semibold text-gray-600">Updated At</th> */}
                                <th className="px-2 py-2 border border-gray-300 text-[12px] font-semibold text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-2 py-2 border border-gray-300 text-[12px]">{item.id}</td>
                                    <td className="px-2 py-2 border border-gray-300 text-[12px]">{item.name}</td>
                                    <td className="px-2 py-2 border border-gray-300 text-[12px]">{item.contactNo}</td>
                                    <td className="px-2 py-2 border border-gray-300 text-[12px]">{item.email}</td>
                                    <td className="px-2 py-2 border border-gray-300 text-[12px]">{item.companyName}</td>
                                    <td className="px-2 py-2 border border-gray-300 text-[12px]">{item.designation}</td>
                                    <td className="px-2 py-2 border border-gray-300 text-[12px]">{item.city}</td>
                                    <td className="px-2 py-2 border border-gray-300 text-[12px]">{item.state}</td>
                                    <td className="px-2 py-2 border border-gray-300 text-[12px]">{item.partnerType}</td>
                                    <td className="px-2 py-2 border border-gray-300 text-[12px]">{item.query}</td>
                                    <td className="px-2 py-2 border border-gray-300 text-[12px]">{new Date(item.createdAt).toLocaleString()}</td>
                                    {/* <td className="px-2 py-2 border border-gray-300 text-[12px]">{new Date(item.updatedAt).toLocaleString()}</td> */}
                                    <td className="px-2 py-2 border border-gray-300 text-[12px]">
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
