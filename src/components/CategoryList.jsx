import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  // Fetch categories from the server
  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/blog/category",{
        headers: {
         'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add a new category
  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      try {
        const response = await fetch("/api/blog/category", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
          },
          body: JSON.stringify({ category: newCategory }),
        });

        if (response.ok) {
          const newCat = await response.json();
          setCategories([...categories, newCat]);
          setNewCategory(""); // Clear input box
        } else {
          console.error("Failed to add category");
        }
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };

  // Update category name
  const handleUpdateCategory = async (id) => {
    const updatedName = newCategory.trim();
    if (updatedName) {
      try {
        const response = await fetch(
          `/api/blog/category?id=${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
            },
            body: JSON.stringify({ category: updatedName }),
          }
        );

        if (response.ok) {
          const updatedCategory = await response.json();
          setCategories(
            categories.map((cat) =>
              cat.id === id ? { ...cat, category: updatedCategory.category } : cat
            )
          );
          setEditingCategoryId(null); // Stop editing
          setNewCategory(""); // Clear input box
        } else {
          console.error("Failed to update category name");
        }
      } catch (error) {
        console.error("Error updating category name:", error);
      }
    }
  };

  // Delete category
  const handleDeleteCategory = async (id) => {
    // Ask the user for confirmation
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    
    if (confirmDelete) {
      try {
        const response = await fetch(`/api/blog/category?id=${id}`, {
          method: "DELETE",
          headers: {
            'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
           },
        });
  
        if (response.ok) {
          setCategories(categories.filter((cat) => cat.id !== id));
        } else {
          console.error("Failed to delete category");
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    } else {
      alert("Category deletion was canceled.");
    }
  };
  

  return (
    <div className="p-6  bg-white rounded-lg shadow-md w-full mx-auto">
      <h3 className="text-3xl font-bold text-center mb-6">Manage Blog Categories</h3>

      <div className="flex flex-col sm:flex-row items-center gap-2 mb-6">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder={editingCategoryId ? "Edit category name" : "Enter category name"}
          className="p-3 flex-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() =>
            editingCategoryId
              ? handleUpdateCategory(editingCategoryId)
              : handleAddCategory()
          }
          className="p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2 mt-2 sm:mt-0"
        >
          <FiPlus className="text-lg" />
          {editingCategoryId ? "Update" : "Add"}
        </button>
      </div>

      <ul className="space-y-4 max-h-[300px] overflow-y-auto">
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex flex-row justify-between items-center p-4 border rounded-lg shadow-sm hover:shadow-md"
          >
            <span className="text-md font-medium text-gray-800">{category.category}</span>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <button
                onClick={() => {
                  setEditingCategoryId(category.id);
                  setNewCategory(category.category); // Set input value to the current category's name
                }}
                className="text-black hover:text-green-800"
              >
                <FiEdit className="text-xl" />
              </button>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="text-black hover:text-red-800"
              >
                <FiTrash2 className="text-xl" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
