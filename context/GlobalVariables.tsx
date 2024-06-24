import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

import { CategoryItem, CategoryInfo } from "../types/CategoriesIterface";

export type GlobalVariablesType = {
  categories: CategoryItem[] | null;
  setCategories: Dispatch<SetStateAction<CategoryItem[] | null>>;
};

const GlobalVariablesContext = createContext<GlobalVariablesType>({
  categories: null,
  setCategories: () => {},
});

export const GlobalVariablesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [categories, setCategories] = useState<CategoryItem[] | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`${process.env.REACT_DOMAIN}/api/categories`);
      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await res.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <GlobalVariablesContext.Provider value={{ categories, setCategories }}>
      {children}
    </GlobalVariablesContext.Provider>
  );
};

export const useGlobalVariables = () => {
  return useContext(GlobalVariablesContext);
};
