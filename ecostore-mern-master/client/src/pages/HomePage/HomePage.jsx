import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import ScrollReveal from "scrollreveal";
import homeImage from "../../images/undraw_web_shopping_re_owap.svg";
import { getCategories } from "../../api/requests";

const HomePage = () => {
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // ScrollReveal settings
    ScrollReveal({ distance: "60px", duration: 2500 });

    // Scroll Beahaviour
    ScrollReveal().reveal(".homepage .bx-1", { origin: "bottom", delay: 400 });

    ScrollReveal().reveal(".homepage .bx-2", { origin: "bottom", delay: 500 });

    ScrollReveal().reveal(".homepage .bx-3", { origin: "bottom", delay: 600 });

    ScrollReveal().reveal(".homepage .bx-4", { origin: "bottom", delay: 700 });
  }, [categories]);

  return (
    <div className="homepage">
      <div className="homepage-animation">
        <div className="homepage-animation-left">
          <h1>Try new things and discover yourself every single day.</h1>
        </div>
        <div className="homepage-animation-right">
          <img src={homeImage} alt="" />
        </div>
      </div>
      <div className="homepage-products">
        {categories.map((item, idx) => (
          <div
            className="category-box bx-1"
            key={idx}
            onClick={() => navigate(`/products?id=${item._id}`)}
          >
            <h3>{item.title}</h3>
            <img src={item.image} alt="" />
            <p>Explore {item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
