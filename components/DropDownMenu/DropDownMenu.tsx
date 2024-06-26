"use client";
import {
  CategoryInfo,
  CategoryItem,
  ChildrenCategory,
} from "@/types/CategoriesInterface";
import "./DropDownMenu.css";
import { useEffect, useState } from "react";

import { CloseOutlined, MenuOutlined } from "@mui/icons-material";
import Link from "next/link";

export const DropDownMenu = ({
  categories,
}: {
  categories: CategoryItem[];
}) => {
  console.log(categories);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        className="hambuger absolute top-5 left-5  md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <CloseOutlined color="primary" />
        ) : (
          <MenuOutlined color="primary" />
        )}
      </button>
      <div className="overflow-hidden ">
        <nav className={`dropdown  md:block ${isOpen ? "dropdown--open" : ""}`}>
          {categories.map((category) => (
            <DropDownMenuItem key={category.id} category={category} level={0} />
          ))}
        </nav>
      </div>
    </>
  );
};

export default DropDownMenu;

const DropDownMenuItem = ({
  category,
  level,
}: {
  category: CategoryItem;
  level: number;
}) => {
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
  const hasChildrens = (level: number, categoryInfo: CategoryInfo | null) => {
    if (level === 0) {
      if (isOpen) {
        return "-";
      } else {
        return "+";
      }
    }
    if (level > 0) {
      if (categoryInfo) {
        if (categoryInfo.children_categories.length > 0) {
          if (isOpen) {
            return "-";
          } else {
            return "+";
          }
        }
      } else {
        return "+";
      }
    }
  };

  return (
    <>
      <div
        className={`main-item ${isOpen ? "main-item--open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="main-item__icon">
          {hasChildrens(level, categoryInfo)}
        </span>

        <Link className="main-item__text" href={`/${category.id}`}>
          {category.name}
        </Link>
      </div>
      <ul>
        {categoryInfo &&
          categoryInfo.children_categories.map((child) => (
            // <li key={child.id}>
            //   <Link href={`/${child.id}`}>{child.name}</Link>
            // </li>
            <DropDownMenuItem
              category={child}
              level={level + 1}
              key={child.id}
            />
          ))}
      </ul>
    </>
  );
};
