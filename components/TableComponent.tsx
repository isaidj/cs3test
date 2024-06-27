"use client";
import React, { Suspense } from "react";
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
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "../utils/formatCurrency";
import ProductCard from "./ProductCard";
import { StyledTableCell, StyledTableRow } from "./StyledTableComponents";
import { useProductTable } from "../hooks/useProductTable";

interface TableComponentProps {
  idCategory: string;
}

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
  const {
    page,
    rowsPerPage,
    products,
    totalCount,
    loading,
    isMobile,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useProductTable(idCategory);

  const columnWidths: { [key: string]: string } = {
    id: "15%",
    name: "35%",
    price: "15%",
    link: "20%",
    image: "15%",
  };

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

  return (
    <div className="w-full shadow-md m-4 ">
      <TableContainer
        component={Paper}
        className=""
        sx={{
          color: "white",
          height: "calc(100% - 40px)",
          borderRadius: "12px",
          backgroundColor: "transparent",
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
                  className="bg-gray-600 text-slate-50 font-semibold"
                  style={{ width: columnWidths[header.key] }}
                >
                  {header.label}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>

          <TableBody>
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
