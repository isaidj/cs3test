"use client";
import { CategoryInfo, CategoryItem } from "@/types/CategoriesIterface";
import "./DropDownMenu.css";
import { useEffect, useState } from "react";
import Link from "next/link";
export const DropDownMenu = ({
  categories,
}: {
  categories: CategoryItem[];
}) => {
  return (
    <nav className="dropdown">
      {categories.map((category) => (
        <DropDownMenuItem key={category.id} category={category} />
      ))}
    </nav>
  );
};

export default DropDownMenu;

const DropDownMenuItem = ({ category }: { category: CategoryItem }) => {
  const [categoryInfo, setCategoryInfo] = useState<CategoryInfo | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchCategory = async (id: string) => {
    const res = await fetch(`api/categories/category?id=${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch category");
    }
    const data = await res.json();
    setCategoryInfo(data.product);

    return data;
  };

  useEffect(() => {
    if (isOpen) {
      if (!categoryInfo) {
        fetchCategory(category.id);
      }
    }
  }, [isOpen]);

  return (
    <>
      <button
        className={`main-item ${isOpen ? "main-item--open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {<span className="icon">{isOpen ? "-" : "+"}</span>}
        <span>{category.name}</span>
      </button>
      <ul>
        {categoryInfo &&
          categoryInfo.children_categories.map((child) => (
            <li key={child.id}>
              <Link href={`/category/${child.id}`}>{child.name}</Link>
            </li>
          ))}
      </ul>
    </>
  );
};
