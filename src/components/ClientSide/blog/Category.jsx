import React from 'react'

const categoryData = [
    { name: 'Finance', count: 6, },
    { name: 'Accounting', count: 3, },
    { name: 'CFO Services', count: 2, },
    { name: 'Compliances', count: 0, }
];
const Category = () => {
    return (
        <div className=''>
            <div className=" bg-[#F5F5F5] border p-6 rounded-lg shadow-xl overflow-hidden">
                <h2 className="flex items-center text-xl font-bold text-foreground">
                    <span className="mr-2 text-primary">—</span> Categories
                </h2>
                <div className="flex flex-col space-y-4 mt-5">
                    {categoryData.map((category, index) => (

                        <div key={index} className="flex justify-between hover:bg-[#003167] items-center overflow-hidden text-white  rounded-lg shadow-md bg-[#295a92]">
                            <span className="font-semibold p-4">{category.category}</span>
                            <div className='bg-[#03274f] h-[100%] p-4'>
                                <span className="font-bold text-lg">{blogIds.length}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Category