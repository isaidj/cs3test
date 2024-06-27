import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Result } from "../types/ProductInterface";
import { BASE_API_URL } from "@/utils/constants";

export const useProductTable = (idCategory: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const [page, setPage] = useState<number>(
    searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 0
  );
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    searchParams.get("limit")
      ? parseInt(searchParams.get("limit") as string)
      : 10
  );
  const [products, setProducts] = useState<Result[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleParamsChange = () => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", rowsPerPage.toString());
    router.push(`${pathName}?${params.toString()}`);
  };

  useEffect(() => {
    handleParamsChange();
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_API_URL}/api/products?category=${idCategory}&page=${page}&limit=${rowsPerPage}`
        );
        const data = await response.json();
        setProducts(data.product.results);
        setTotalCount(data.product.paging.total);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [idCategory, page, rowsPerPage]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return {
    page,
    rowsPerPage,
    products,
    totalCount,
    loading,
    isMobile,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};
