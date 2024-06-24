import React from "react";

const page = ({ params }: { params: { slug: string } }) => {
  return <div>My category page is {params.slug}</div>;
};

export default page;
