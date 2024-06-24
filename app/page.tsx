// File: pages/_app.js
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

// File: styles/globals.css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

body {
  @apply bg-gray-900 text-blue-300;
}

// File: pages/index.js
import Layout from '../components/Layout';
import ProductTable from '../components/ProductTable';
import { fetchProducts } from '../utils/api';

export default function Home({ products }) {
  return (
    <Layout>
      <ProductTable products={products} />
    </Layout>
  );
}

export async function getServerSideProps() {
  const data = await fetchProducts();
  return {
    props: {
      products: data.results,
    },
  };
}

// File: components/Layout.js
import CategoryMenu from './CategoryMenu';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-900 text-blue-300">
      <CategoryMenu />
      <main className="flex-1 p-4 border-l border-blue-700">{children}</main>
    </div>
  );
}

// File: components/CategoryMenu.js
import { useState } from 'react';
import Link from 'next/link';

const categories = [
  {
    id: 'computacion',
    name: 'Computación',
    children: [
      {
        id: 'electronica-audio-video',
        name: 'Electrónica, Audio y Video',
        children: [
          {
            id: 'audio',
            name: 'Audio',
            children: [
              { id: 'auriculares', name: 'Auriculares' }
            ]
          }
        ]
      }
    ]
  },
  { id: 'celulares-telefonos', name: 'Celulares y Teléfonos' }
];

export default function CategoryMenu() {
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const renderCategory = (category, depth = 0) => (
    <li key={category.id} className={`ml-${depth * 4}`}>
      <div className="flex items-center">
        {category.children && category.children.length > 0 && (
          <button
            onClick={() => toggleCategory(category.id)}
            className="mr-2 text-sm text-blue-500"
          >
            {expandedCategories[category.id] ? '-' : '+'}
          </button>
        )}
        <Link href={`/${category.id}`}>
          <a className="hover:text-blue-500">{category.name}</a>
        </Link>
      </div>
      {category.children && category.children.length > 0 && expandedCategories[category.id] && (
        <ul className="mt-2">
          {category.children.map((child) => renderCategory(child, depth + 1))}
        </ul>
      )}
    </li>
  );

  return (
    <nav className="w-64 p-4 bg-gray-800">
      <h2 className="text-xl font-bold mb-4 text-blue-400">Cliente CS3</h2>
      <ul>{categories.map((category) => renderCategory(category))}</ul>
    </nav>
  );
}

// File: components/ProductTable.js
import Image from 'next/image';
import { useState } from 'react';

export default function ProductTable({ products }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-blue-700">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Producto Id</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Nombre producto</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Precio</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">MercadoEnlace</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Imagen</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-blue-700">
          {currentProducts.map((product) => (
            <tr key={product.id} className="hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap text-sm">{product.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{product.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">${product.price}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <a href={product.permalink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  Link
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={50}
                  height={50}
                  className="rounded"
                  loading="lazy"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bg-gray-700 px-4 py-3 flex items-center justify-between border-t border-blue-700 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="relative inline-flex items-center px-4 py-2 border border-blue-700 text-sm font-medium rounded-md text-blue-300 bg-gray-800 hover:bg-gray-700">
            Previous
          </button>
          <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastProduct >= products.length} className="ml-3 relative inline-flex items-center px-4 py-2 border border-blue-700 text-sm font-medium rounded-md text-blue-300 bg-gray-800 hover:bg-gray-700">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-blue-300">
              Showing <span className="font-medium">{indexOfFirstProduct + 1}</span> to <span className="font-medium">{Math.min(indexOfLastProduct, products.length)}</span> of{' '}
              <span className="font-medium">{products.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-blue-700 bg-gray-800 text-sm font-medium text-blue-300 hover:bg-gray-700">
                Previous
              </button>
              {/* Add page numbers here if needed */}
              <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastProduct >= products.length} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-blue-700 bg-gray-800 text-sm font-medium text-blue-300 hover:bg-gray-700">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

// File: utils/api.js
const BASE_URL = 'https://api.mercadolibre.com';
const SELLER_ID = '179571326';

export async function fetchProducts(offset = 0, limit = 50) {
  const response = await fetch(`${BASE_URL}/sites/MLA/search?seller_id=${SELLER_ID}&offset=${offset}&limit=${limit}`);
  return response.json();
}

export async function fetchProductsByCategory(categoryId, offset = 0, limit = 50) {
  const response = await fetch(`${BASE_URL}/sites/MLA/search?seller_id=${SELLER_ID}&category=${categoryId}&offset=${offset}&limit=${limit}`);
  return response.json();
}