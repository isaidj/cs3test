import { Result } from "@/types/ProductInterface";
import formatCurrency from "@/utils/formatCurrency";
import { Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export const ProductCard: React.FC<{ product: Result }> = ({ product }) => (
  <Card
    className="mb-4 bg-gray-800 text-white"
    variant="elevation"
    elevation={4}
  >
    <CardContent>
      <div className="flex items-center mb-2">
        <Image
          width={80}
          height={80}
          src={product.thumbnail}
          alt={product.title}
          className="w-20 h-20 object-cover rounded-xl mr-4"
          unoptimized
          loading="lazy"
        />
        <div>
          <Typography variant="h6">{product.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            ID: {product.id}
          </Typography>
          <Link
            target="_blank"
            href={product.permalink}
            className="text-blue-300 hover:text-blue-200 underline"
          >
            Mercado Enlace
          </Link>
        </div>
      </div>
      <Typography variant="body1" className="mb-2">
        {formatCurrency(product.price, product.currency_id)}
      </Typography>
    </CardContent>
  </Card>
);
export default ProductCard;
