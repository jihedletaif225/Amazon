import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchProducts } from "../../api/requests";
import SimpleBackdrop from "../../components/SimpleBackdrop/SimpleBackdrop";

import "./SearchPage.css";
const SearchPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await searchProducts(search);
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, [search]);

  return (
    <div>
      {isLoading ? (
        <SimpleBackdrop />
      ) : (
        <div className="search-page">
          {products.map((prod, idx) => (
            <div
              className="search-product"
              key={idx}
              onClick={() => navigate(`/product?id=${prod._id}`)}
            >
              <h3>{prod.title}</h3>
              <img src={prod.image} alt="" />
              <p>{prod.description}</p>
              <p>Price : {prod.price}$</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
