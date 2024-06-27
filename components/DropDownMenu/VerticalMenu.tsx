import React from "react";
import { CategoryItem, CategoryInfo } from "@/types/CategoriesInterface";
import DropDownMenu from "./DropDownMenu";

const fetchCategories = async (): Promise<CategoryItem[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_DOMAIN}/api/categories`
  );

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
