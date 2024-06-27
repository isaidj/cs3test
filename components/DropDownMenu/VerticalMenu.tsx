import React from "react";
import { CategoryItem } from "@/types/CategoriesInterface";
import DropDownMenu from "./DropDownMenu";
import { BASE_API_URL } from "@/utils/constants";

const fetchCategories = async (): Promise<CategoryItem[]> => {
  const res = await fetch(`${BASE_API_URL}/api/categories`);
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  const { data } = await res.json();
  return data;
};

const VerticalMenu = async () => {
  if (!BASE_API_URL) {
    return null;
  }
  const categories = await fetchCategories();

  return <DropDownMenu categories={categories} />;
};

export default VerticalMenu;
