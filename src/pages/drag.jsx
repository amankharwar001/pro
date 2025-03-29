

import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedResponse = await fetch("/api/product/drag");
        const savedData = await savedResponse.json();
        const savedArrangement = savedData?.data?.info || [];
  
        console.log("Saved Data from DB:", savedArrangement); 
       
      
        const savedIds = new Set(savedArrangement.map((item) => item.id));
        console.log("Saved IDs Set:", savedIds); 
  
        const sectionResponse = await fetch("/api/product/productpage/getsection", {
          headers: { "x-system-key": process.env.NEXT_PUBLIC_SYSTEM_KEY },
        });
        const sectionData = await sectionResponse.json();
        console.log("Fetched Section Data:", sectionData);
  
       
        const newProducts = sectionData
          .filter((product) => product.status === "active" && !savedIds.has(product.id))
          .map((product, index) => ({
            id: product.id,
            content: product.nickname || `Unnamed ${index + 1}`,
            status: product.status,
            seo: product.seo,
            isNew: true, 
          }));
  
        console.log("New Products (Not in DB):", newProducts);
  
       
        const updatedTasks = [
          ...savedArrangement.map((task) => ({ ...task, isNew: false })),
          ...newProducts, 
        ];
  
        console.log("Final Task List:", updatedTasks);
  
        setTasks(updatedTasks);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchData();
  }, []);
  

  if (!mounted) return null;

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = Array.from(tasks);
    const [movedItem] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, movedItem);

    setTasks(updatedTasks);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/product/drag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ info: tasks }),
      });

      if (!response.ok) throw new Error("Failed to save");

      alert("Product arrangement saved successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save product arrangement");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="bg-white p-4 w-64 min-h-[300px] rounded-lg shadow-md"
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Product Arrangement
              </h2>
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`p-3 rounded-md mb-2 shadow cursor-grab active:cursor-grabbing
                        ${snapshot.isDragging ? "bg-blue-700 text-white" : "bg-blue-500 text-white"}
                        ${task.isNew ? "border-2 border-red-500" : ""}
                      `}
                      style={{ ...provided.draggableProps.style }}
                    >
                      {task.content} {task.isNew && "(New unsaved)"}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600"
      >
        Submit
      </button>
    </div>
  );
};

export default KanbanBoard;
