import React, { useState } from "react";
import { toast } from "react-toastify";
import { submitRequest } from "../apis/Api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../style/contact.css";


const ContactPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userName, setFullName] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [colour, setColour] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");

  const [phone, setPhone] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(productName, phone,size,material,colour,weight,quantity, price, productImage);

    // Constructing FormData
    const formData = new FormData();
    formData.append("userName", `${user.firstName} ${user.lastName}`);
    formData.append("productName", productName);
    formData.append("phone", phone);
   
    formData.append("size", size);
    formData.append("material", material);
    formData.append("colour", colour);
    formData.append("weight", weight);
    formData.append("price", price);
    formData.append("quantity", quantity);


    formData.append("productImage", productImage);

    // API call
    submitRequest(formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 1000); // Delay to ensure the toast message is shown
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <Navbar />
      <div className="whole">
        <div className="background-images"></div>
        <div className="contact-sections">
          <div className="details-container">
            <h2>Rent your product</h2>
            <h6>
              Questions, comments, or suggestions?
              <br /> Simply fill in the form and we'll be in touch shortly.
            </h6>
            <p>1055 Arthur ave Elk Groot, 67. New Palmas South Carolina.</p>
            <p>+1 234 678 9108 39</p>
            <p>Eventique@morailzer.com</p>
          </div>
          <div className="form-containerr">
            <h2>Become renter</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                placeholder="Name of the product"
              />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="Estimated price in Rs"
              />
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Phone number"
              />
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                placeholder="Quantity"
              />
               <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
                placeholder="e.g: 12h X 14w"
              />
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                placeholder="Weight in kg"
              />
              <input
                type="text"
                value={colour}
                onChange={(e) => setColour(e.target.value)}
                required
                placeholder="Colour"
              />
               <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                required
                placeholder="Material"
              />
              
              <input
                onChange={handleImageUpload}
                type="file"
                required
                placeholder="Upload image"
              ></input>
              {previewImage && (
                <img
                  src={previewImage}
                  className="img-fluid rounded object-fit-cover"
                  alt="product image"
                />
              )}
              <button type="submit">Send Request</button>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ContactPage;

