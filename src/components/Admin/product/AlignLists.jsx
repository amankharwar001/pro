
// import { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const ProductAlignLists = () => {
//     const [availableProducts, setAvailableProducts] = useState([]);
//     const [selectedProducts, setSelectedProducts] = useState([]);
//     const [mounted, setMounted] = useState(false);

//     console.log("Available Products:", availableProducts);
//     console.log("Selected Products:", selectedProducts);

//     useEffect(() => {
//         setMounted(true);
//     }, []);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const savedResponse = await fetch("/api/product/drag");
//                 const savedData = await savedResponse.json();
//                 const savedArrangement = savedData?.data || [];

//                 console.log("Saved Arrangement Data:", savedData);

//                 const savedIds = new Set(savedArrangement.map((item) => item.id));

//                 const sectionResponse = await fetch("/api/product/productpage/getsection", {
//                     headers: { "x-system-key": process.env.NEXT_PUBLIC_SYSTEM_KEY },
//                 });
//                 const sectionData = await sectionResponse.json();

//                 const newProducts = sectionData
//                     .filter((product) => product.status === "active" && !savedIds.has(product.id))
//                     .map((product, index) => ({
//                         id: product.id,
//                         content: product.nickname || `Unnamed ${index + 1}`,
//                         status: product.status,
//                         seo: product.seo,
//                     }));

//                 // ✅ Ensuring correct structure for selected products
//                 setSelectedProducts(
//                     savedArrangement.map((product) => ({
//                         id: product.id,
//                         content: product.nickname, // ✅ Ensuring correct field is mapped
//                         status: product.status,
//                         seo: product.seo,
//                     }))
//                 );

//                 setAvailableProducts(newProducts);
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//             }
//         };

//         fetchData();
//     }, []);

//     if (!mounted) return null;

//     const onDragEnd = (result) => {
//         if (!result.destination) return;

//         const sourceList = result.source.droppableId === "available" ? availableProducts : selectedProducts;
//         const destinationList = result.destination.droppableId === "available" ? availableProducts : selectedProducts;

//         const movedItem = sourceList[result.source.index];

//         const updatedSourceList = sourceList.filter((_, idx) => idx !== result.source.index);
//         const updatedDestinationList = [...destinationList];
//         updatedDestinationList.splice(result.destination.index, 0, movedItem);

//         if (result.source.droppableId === "available") {
//             setAvailableProducts(updatedSourceList);
//             setSelectedProducts(updatedDestinationList);
//         } else {
//             setSelectedProducts(updatedSourceList);
//             setAvailableProducts(updatedDestinationList);
//         }
//     };

//     const handleSubmit = async () => {
//         try {
//             const response = await fetch("/api/product/drag", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ info: selectedProducts.map(product => product.id) }),
//             });

//             if (!response.ok) throw new Error("Failed to save");

//             alert("Product arrangement saved successfully!");
//         } catch (error) {
//             console.error("Error:", error);
//             alert("Failed to save product arrangement");
//         }
//     };

//     return (
//         <div className="p-6 bg-white rounded-lg shadow-md w-full mx-auto">
//             <h3 className="text-3xl font-bold text-center mb-6">Header Product Arrangement</h3>
//             <DragDropContext onDragEnd={onDragEnd}>
//                 <div className="flex space-x-4">
//                     {/* Available Products */}
//                     <div className="w-1/2 bg-gray-100 p-4 rounded-lg shadow-md">
//                         <h4 className="text-xl font-semibold mb-2">Available Products</h4>
//                         <Droppable droppableId="available">
//                             {(provided) => (
//                                 <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[200px]">
//                                     {availableProducts.map((task, index) => (
//                                         <Draggable key={task.id} draggableId={task.id} index={index}>
//                                             {(provided, snapshot) => (
//                                                 <div
//                                                     ref={provided.innerRef}
//                                                     {...provided.draggableProps}
//                                                     {...provided.dragHandleProps}
//                                                     className={`p-3 rounded-md mb-2 shadow cursor-grab active:cursor-grabbing bg-blue-500 text-white`}
//                                                     style={{ ...provided.draggableProps.style }}
//                                                 >
//                                                     {task.content}
//                                                 </div>
//                                             )}
//                                         </Draggable>
//                                     ))}
//                                     {provided.placeholder}
//                                 </div>
//                             )}
//                         </Droppable>
//                     </div>

//                     {/* Selected Products */}
//                     <div className="w-1/2 bg-green-100 p-4 rounded-lg shadow-md">
//                         <h4 className="text-xl font-semibold mb-2">Selected Products</h4>
//                         <Droppable droppableId="selected">
//                             {(provided) => (
//                                 <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[200px]">
//                                     {selectedProducts.map((task, index) => (
//                                         <Draggable key={task.id} draggableId={task.id} index={index}>
//                                             {(provided, snapshot) => (
//                                                 <div
//                                                     ref={provided.innerRef}
//                                                     {...provided.draggableProps}
//                                                     {...provided.dragHandleProps}
//                                                     className={`p-3 rounded-md mb-2 shadow cursor-grab active:cursor-grabbing text-white ${task.status === "active" ? "bg-green-500" : "bg-red-500"
//                                                         }`}
//                                                     style={{ ...provided.draggableProps.style }}
//                                                 >
//                                                     {task.content}
//                                                 </div>
//                                             )}
//                                         </Draggable>
//                                     ))}

//                                     {provided.placeholder}
//                                 </div>
//                             )}
//                         </Droppable>
//                     </div>
//                 </div>
//             </DragDropContext>
//             <button
//                 onClick={handleSubmit}
//                 className="mt-4 bg-green-500 w-full text-white px-4 py-2 rounded-md shadow hover:bg-green-600"
//             >
//                 Submit
//             </button>
//         </div>
//     );
// };

// export default ProductAlignLists;












import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ProductAlignLists = () => {
    const [availableProducts, setAvailableProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [mounted, setMounted] = useState(false);

    console.log("Available Products:", availableProducts);
    console.log("Selected Products:", selectedProducts);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const savedResponse = await fetch("/api/product/drag");
                const savedData = await savedResponse.json();
                const savedArrangement = savedData?.data || [];

                console.log("Saved Arrangement Data:", savedData);

                const savedIds = new Set(savedArrangement.map((item) => item.id));

                const sectionResponse = await fetch("/api/product/productpage/getsection", {
                    headers: { "x-system-key": process.env.NEXT_PUBLIC_SYSTEM_KEY },
                });
                const sectionData = await sectionResponse.json();

                const newProducts = sectionData
                    .filter((product) => product.status === "active" && !savedIds.has(product.id))
                    .map((product, index) => ({
                        id: product.id,
                        content: product.nickname || `Unnamed ${index + 1}`,
                        status: product.status,
                        seo: product.seo,
                    }));

                // ✅ Ensuring correct structure for selected products
                setSelectedProducts(
                    savedArrangement.map((product) => ({
                        id: product.id,
                        content: product.nickname, // ✅ Ensuring correct field is mapped
                        status: product.status,
                        seo: product.seo,
                    }))
                );

                setAvailableProducts(newProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchData();
    }, []);

    if (!mounted) return null;

    // const onDragEnd = (result) => {
    //     if (!result.destination) return;

    //     const sourceList = result.source.droppableId === "available" ? availableProducts : selectedProducts;
    //     const destinationList = result.destination.droppableId === "available" ? availableProducts : selectedProducts;

    //     const movedItem = sourceList[result.source.index];

    //     const updatedSourceList = sourceList.filter((_, idx) => idx !== result.source.index);
    //     const updatedDestinationList = [...destinationList];
    //     updatedDestinationList.splice(result.destination.index, 0, movedItem);

    //     if (result.source.droppableId === "available") {
    //         setAvailableProducts(updatedSourceList);
    //         setSelectedProducts(updatedDestinationList);
    //     } else {
    //         setSelectedProducts(updatedSourceList);
    //         setAvailableProducts(updatedDestinationList);
    //     }
    // };

    const onDragEnd = (result) => {
        if (!result.destination) return;
    
        const sourceList = result.source.droppableId === "available" ? availableProducts : selectedProducts;
        const destinationList = result.destination.droppableId === "available" ? availableProducts : selectedProducts;
    
        // ✅ Step 1: If dragged within same list (reorder)
        if (result.source.droppableId === result.destination.droppableId) {
            const updatedList = Array.from(sourceList);
            const [moved] = updatedList.splice(result.source.index, 1);
            updatedList.splice(result.destination.index, 0, moved);
    
            if (result.source.droppableId === "available") {
                setAvailableProducts(updatedList);
            } else {
                setSelectedProducts(updatedList);
            }
            return; // ✅ Important: Stop here, don't go to cross-list logic
        }
    
        // ✅ Step 2: If dragged between lists
        const movedItem = sourceList[result.source.index];
        const updatedSourceList = sourceList.filter((_, idx) => idx !== result.source.index);
        const updatedDestinationList = [...destinationList];
        updatedDestinationList.splice(result.destination.index, 0, movedItem);
    
        if (result.source.droppableId === "available") {
            setAvailableProducts(updatedSourceList);
            setSelectedProducts(updatedDestinationList);
        } else {
            setSelectedProducts(updatedSourceList);
            setAvailableProducts(updatedDestinationList);
        }
    };
    

    const handleSubmit = async () => {
        try {
            const response = await fetch("/api/product/drag", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ info: selectedProducts.map(product => product.id) }),
            });

            if (!response.ok) throw new Error("Failed to save");

            alert("Product arrangement saved successfully!");
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to save product arrangement");
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md w-full mx-auto">
            <h3 className="text-3xl font-bold text-center mb-6">Header Product Arrangement</h3>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex space-x-4">
                    {/* Available Products */}
                    <div className="w-1/2 bg-gray-100 p-4 rounded-lg shadow-md">
                        <h4 className="text-xl font-semibold mb-2">Available Products</h4>
                        <Droppable droppableId="available">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[200px]">
                                    {availableProducts.map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`p-3 rounded-md mb-2 shadow cursor-grab active:cursor-grabbing bg-blue-500 text-white`}
                                                    style={{ ...provided.draggableProps.style }}
                                                >
                                                    {task.content}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>

                    {/* Selected Products */}
                    <div className="w-1/2 bg-green-100 p-4 rounded-lg shadow-md">
                        <h4 className="text-xl font-semibold mb-2">Selected Products</h4>
                        <Droppable droppableId="selected">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[200px]">
                                    {selectedProducts.map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`p-3 rounded-md mb-2 shadow cursor-grab active:cursor-grabbing text-white ${task.status === "active" ? "bg-green-500" : "bg-red-500"
                                                        }`}
                                                    style={{ ...provided.draggableProps.style }}
                                                >
                                                    {task.content}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}

                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>
            </DragDropContext>
            <button
                onClick={handleSubmit}
                className="mt-4 bg-green-500 w-full text-white px-4 py-2 rounded-md shadow hover:bg-green-600"
            >
                Submit
            </button>
        </div>
    );
};

export default ProductAlignLists;









