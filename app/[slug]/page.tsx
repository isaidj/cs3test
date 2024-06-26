import React from "react";
import TableComponent from "../../components/TableComponent";

const CategoryPage = ({ params }: { params: { slug: string } }) => {
  return <TableComponent idCategory={params.slug} />;
};

export default CategoryPage;
