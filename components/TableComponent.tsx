"use client";
import React, { useState, useEffect, Suspense } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TablePagination,
  Paper,
  TableHead,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import TablePaginationActions from "./TablePaginationActions";
import { Result } from "../types/ProductInterface";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "../utils/formatCurrency";
import ProductCard from "./ProductCard";
import { StyledTableCell, StyledTableRow } from "./StyledTableComponents";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface TableComponentProps {
  idCategory: string;
}
//Se agrega suspense para evitar que la pagina quede en blanco hasta que se obtengan los valores useSearchParams y usePathname
export const TableSuspense: React.FC<{ idCategory: string }> = ({
  idCategory,
}) => {
  return (
    <Suspense>
      <TableComponent idCategory={idCategory} />
    </Suspense>
  );
};
export default TableSuspense;

const TableComponent: React.FC<TableComponentProps> = ({ idCategory }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  //------------------- Pagination -------------------
  const [page, setPage] = useState<number>(
    searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 0
  );
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    searchParams.get("limit")
      ? parseInt(searchParams.get("limit") as string)
      : 10
  );
  //------------------- Products ----------------
  const [products, setProducts] = useState<Result[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  //------------------- Loading state -------------------
  const [loading, setLoading] = useState(true);
  //------------------- Mobile detection -------------------
  const [isMobile, setIsMobile] = useState(false);
  //------------------- Size of columns -------------------
  const columnWidths: { [key: string]: string } = {
    id: "15%",
    name: "35%",
    price: "15%",
    link: "20%",
    image: "15%",
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Check on initial render
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
          `/api/products?category=${idCategory}&page=${page}&limit=${rowsPerPage}`
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
    // setPage(0);
  };

  //------------------- Render for mobile -------------------
  if (isMobile) {
    return (
      <div className="w-full m-4 overflow-y-auto">
        {loading ? (
          [...Array(rowsPerPage)].map((_, index) => (
            <Card key={index} className="mb-4 bg-gray-800 animate-pulse">
              <CardContent>
                <div className="h-20 bg-gray-700 rounded-xl mb-2"></div>
                <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <Typography className="text-center text-white">
            No products found
          </Typography>
        )}
        <StyledTableRow>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage="Page"
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={(props) => (
              <TablePaginationActions {...props} isMobile={isMobile} />
            )}
            sx={{ color: "white" }}
          />
        </StyledTableRow>
      </div>
    );
  }

  //------------------- Render for desktop -------------------
  return (
    <div className="w-full shadow-md m-4">
      <TableContainer
        component={Paper}
        className="shadow-md rounded-2xl"
        sx={{
          color: "white",
          backgroundColor: "transparent",
          height: "calc(100% - 40px)",
        }}
      >
        <Table
          aria-label="custom pagination table"
          className="bg-gray-800 text-white "
          stickyHeader
        >
          <TableHead>
            <StyledTableRow>
              {[
                { key: "id", label: "Product ID" },
                { key: "name", label: "Name" },
                { key: "price", label: "Price" },
                { key: "link", label: "Mercado Enlace" },
                { key: "image", label: "Imagen" },
              ].map((header) => (
                <StyledTableCell
                  key={header.key}
                  className="bg-gray-900 text-slate-50 font-semibold"
                  style={{ width: columnWidths[header.key] }}
                >
                  {header.label}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>

          <TableBody sx={{ overflowY: "auto" }}>
            {loading ? (
              [...Array(rowsPerPage)].map((_, index) => (
                <StyledTableRow key={index}>
                  {Object.keys(columnWidths).map((key) => (
                    <StyledTableCell
                      key={key}
                      className="animate-pulse bg-gray-700"
                      style={{ width: columnWidths[key] }}
                    >
                      &nbsp;
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))
            ) : products.length > 0 ? (
              products.map((product) => (
                <StyledTableRow key={product.id} className="hover:bg-gray-800">
                  <StyledTableCell
                    className="text-white"
                    style={{ width: columnWidths.id }}
                  >
                    {product.id}
                  </StyledTableCell>
                  <StyledTableCell
                    className="text-white"
                    style={{ width: columnWidths.name }}
                  >
                    {product.title}
                  </StyledTableCell>
                  <StyledTableCell style={{ width: columnWidths.price }}>
                    {formatCurrency(product.price, product.currency_id)}
                  </StyledTableCell>
                  <StyledTableCell
                    className="text-white"
                    style={{ width: columnWidths.link }}
                  >
                    <Link
                      target="_blank"
                      href={product.permalink}
                      className="text-blue-300 hover:text-blue-200 underline"
                    >
                      Mercado Enlace
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell style={{ width: columnWidths.image }}>
                    <Image
                      width={80}
                      height={80}
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-20 h-20 object-cover rounded-xl aspect-square min-w-20"
                      unoptimized
                      loading="lazy"
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={5} className="text-center">
                  No products found
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>

          <TableFooter className="fixed bottom-0 w-full">
            <StyledTableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25, { label: "All", value: -1 }]}
                colSpan={5}
                count={totalCount}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage="Page"
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={(props) => (
                  <TablePaginationActions {...props} isMobile={isMobile} />
                )}
                sx={{ color: "white" }}
              />
            </StyledTableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};
