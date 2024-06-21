
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { getAllCategories } from "../apis/Api";
import "../style/viewItem.css";

const ViewItem = () => {
  const [items, setItems] = useState([]);
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    getAllCategories()
      .then((res) => {
        const foundCategory = res.data.categories.find(
          (category) => category._id === categoryId
        );
        if (foundCategory) {
          setItems(foundCategory.items);
          setCategory(foundCategory);
          console.log("foundCategory", foundCategory);
        } else {
          console.error("Category not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching categories: ", error);
      });
  }, [categoryId]);

  return (
    
    
    <>
  <Navbar />
 
   
  {/* Container for candle holders */}
  
  <div className="candle-holders-container">
  <div className="left-aligned-textt" style={{marginTop: 2%'2%'}}>
  {category && (
    
    <h2 className="candlee">{category.categoryName}</h2>

  )}
  </div>
  
    {/* Grid container */}
    <div className="grid-container-item">
      {items.map((item) => (
        <div key={item._id} className="menus-item cardd">
          <img src={item.itemImage} alt={item.itemName} className="card-item-img" />
          <div className="card-body-item">
            <h3 className="card-title-item">{item.itemName}</h3>
            <div className="card-rating">
              <span className="rating-star">★</span>
              <span className="rating-value">4.5</span>
              <span className="rating-count">(3200 reviews)</span>
            </div>
            <div className="price-container">
              <span className="card-price-label">Price</span>
              <span className="card-price-value">
                <span className="price-bold">Rs.{item.itemPrice}</span>
                <span className="price-dim">/week</span>
              </span>
            </div>
            <Link to={`/itemdetails/${item._id}`} className="btn btn-details-item">
              View details
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
  
</>

    
  );
};

export default ViewItem;