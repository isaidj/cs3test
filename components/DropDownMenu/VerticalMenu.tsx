import React, { useEffect } from "react";
import { CategoryItem, CategoryInfo } from "@/types/CategoriesInterface";
import DropDownMenu from "./DropDownMenu";
import { BASE_API_URL } from "@/utils/constants";

//se puede renderizar desde el servidor y queda mucho mejor pero no me dio tiempo de corregir un error en el despliegue de vercel con la url del api,
//asi que renderice el componente desde el cliente con useEffect
const fetchCategories = async (): Promise<CategoryItem[]> => {
  const res = await fetch(`${BASE_API_URL}/api/categories`);
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  const { data } = await res.json();
  return data;
};

const VerticalMenu = async () => {
  const categories = await fetchCategories();

  return <DropDownMenu categories={categories} />;
};

export default VerticalMenu;
