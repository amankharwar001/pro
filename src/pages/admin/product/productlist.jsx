import Layout from "@/components/Admin/common/Layout";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/product/productpage/getsection",{
      headers: {
       'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
      },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleAddProductClick = () => {
    router.push("/admin/product");
  };

  const handleEditClick = (productId) => {
    router.push(`/admin/product/${productId}?edit=1`);
  };

  
  const handleDeleteClick = async (productId) => {
    // Show prompt for confirmation
    const userConfirmation = prompt("Type 'yes' to confirm deletion:");
  
    if (userConfirmation === null || userConfirmation.trim().toLowerCase() !== "yes") {
      return;
    }
  
    try {
      // Proceed with DELETE request if 'yes' is typed
      const response = await fetch(`/api/product/productpage/deletesection?id=${productId}`, {
        method: "DELETE",
        headers: {
          'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
         },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert("Failed to delete product.");
      } else {
        // If deletion is successful, update the product list state
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
        alert("Product successfully deleted!");
      }
    } catch (error) {
      alert("An error occurred while deleting the product.");
    }
  };
  

  // code

  return (
    <>
      <div className="container mx-auto mt-4 md:p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">Product List</h2>
          <button
            onClick={handleAddProductClick}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow  hover:bg-blue-700 transition-all duration-300"
          >
            + Add Product
          </button>
        </div>

        {/* Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left text-gray-600">
            {/* Table Header */}
            <thead className="bg-blue-50 text-gray-700 uppercase">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {products && Array.isArray(products) && products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-100 transition-all duration-200"
                >
                  <td className="px-6 py-4 border-b border-gray-200">
                    <div className="text-gray-800 font-medium">
                      {product.nickname || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    <span className={`${product.status == "active" ? "bg-green-500" : "bg-red-500"} text-white text-xs px-3 py-1 rounded-full shadow`}>
                      {product.status == "active" ? "active" : "draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    {/* Action Buttons */}
                    <button
                      onClick={() => handleEditClick(product.id)}
                      className="text-blue-500 hover:text-blue-600 mx-2"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product.id)}
                      className="text-red-500 hover:text-red-600 mx-2"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {products.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No products found. Add a new product to get started!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
