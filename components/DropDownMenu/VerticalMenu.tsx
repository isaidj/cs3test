"use client";
import React, { useEffect } from "react";
import { CategoryItem, CategoryInfo } from "@/types/CategoriesInterface";
import DropDownMenu from "./DropDownMenu";

//se puede renderizar desde el servidor y queda mucho mejor pero no me dio tiempo de corregir un error en el despliegue de vercel con la url del api,
//asi que renderice el componente desde el cliente con useEffect
const fetchCategories = async (): Promise<CategoryItem[]> => {
  const res = await fetch(`${process.env.API_URLAPI_URL}/api/categories`);
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  const { data } = await res.json();
  return data;
};

const VerticalMenu = () => {
  // const categories = await fetchCategories();
  const [categories, setCategories] = React.useState<CategoryItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/categories`);
        const { data } = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);
  if (loading) {
    return (
      <div className="h-full flex flex-col p-4">
        {[...Array(15)].map((_, index) => (
          <div
            key={index}
            className="mt-2 bg-gray-600 animate-pulse rounded-lg w-full h-6 flex-1"
          ></div>
        ))}
      </div>
    );
  }
  if (categories.length === 0) {
    return <div>No hay categorias</div>;
  }
  return <DropDownMenu categories={categories} />;
};

export default VerticalMenu;
