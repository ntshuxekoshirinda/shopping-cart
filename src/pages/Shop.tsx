import { useEffect, useState } from 'react';
import type { Product } from '../types/product';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  console.log("Current Products:", products);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  if (loading) return <div className="loader">Loading Collection...</div>;

  return (
    <div className="shop-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Shop;