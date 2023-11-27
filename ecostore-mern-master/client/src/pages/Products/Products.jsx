import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCategory } from "../../api/requests";
import Product from "./Product/Product";

import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const catId = searchParams.get("id");
    const fetchProducts = async () => {
      const { data } = await getCategory(catId);
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, [searchParams]);

  return (
    <div className="products-page">
      <h1>{products.title}.</h1>
      {!isLoading && (
        <>
          <div className="products">
            {products.products.map((product, idx) => (
              <Product key={idx} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
