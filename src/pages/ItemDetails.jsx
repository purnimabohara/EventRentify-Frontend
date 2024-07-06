



// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
// import { getSingleItem, addToCartApi } from "../apis/Api";
// import Hero from "../assets/Images/ss1.png";
// import { toast } from 'react-toastify';
// import { useNavigate, useParams } from 'react-router-dom';
// import { ArrowLeftIcon, HeartIcon as OutlineHeartIcon, StarIcon, } from '@heroicons/react/outline';
// import { HeartIcon as SolidHeartIcon } from '@heroicons/react/solid';
// import "../style/itemdetails.css";

// const ItemDetails = () => {
//   const { id } = useParams();
//   const [item, setItem] = useState(null);
 

//   useEffect(() => {
//     getSingleItem(id)
//       .then((res) => {
//         if (res.data.success) {
//           setItem(res.data.item);
//         } else {
//           console.error("Error fetching item details: ", res.data.message);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching item details: ", error);
//       });
//   }, [id]);

 

//   const user = JSON.parse(localStorage.getItem('user'));
//   const [userID, setUserID] = useState(''); // Set this to the actual user ID
//   const [itemID, setitemID] = useState('');
//   const [cartQuantity, setCartQuantity] = useState('');

 
  

//   const handleRentNow = (e) => {
//     e.preventDefault();
//     const rentalPrice = parseFloat(item.itemPrice);
//     const securityDeposit = parseFloat(item.itemSecurityDeposit);
//     const cartQuantity = parseInt(item.quantity, 10);
//     const totalPrice = securityDeposit + rentalPrice * cartQuantity;

//     const formData = new FormData();
//     formData.append('userID', user._id);
//     formData.append('itemID', id);

   
//     formData.append('totalPrice', totalPrice);
//     formData.append('cartQuantity', cartQuantity);
//     console.log(userID, itemID, totalPrice, cartQuantity);
//     addToCartApi(formData).then((res) => {
//       if (res.data.success === false) {
//         toast.error(res.data.message);
//       } else {
//         toast.success(res.data.message);
//       }
//     }).catch(err => {
//       toast.error("Server Error");
//       console.log(err.message);
//     });
//   };

//   const navigate = useNavigate();
//   // const handleBackClick = () => {
//   //   navigate(-1);
//   //   if (!item) return <div>Loading...</div>;
//   // };

//   const [quantity, setQuantity] = useState(1)

//   const handleIncrease = () => {
//     setQuantity((prevQuantity) => {
//       if (prevQuantity < item.quantity) {
//         return prevQuantity + 1;
//       } else {
//         toast.warning('Please check the number of quantity available and choose');
//         return prevQuantity;
//       }
//     });
//   };

//   const handleDecrease = () => {
//     setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="item-details-container">
//         {item && (
//           <>
//             <div className="image-contained">
//               <img className="item-imager"style={{ height: '500px' }} src={item.itemImage} alt={item.itemName}  />
//             </div>
            
              
               
             
//               <div className="details-contained">
//               {/* <button
//                   onClick={handleBackClick}
//                   className="add-quantity-button"
//                 >
//                   <ArrowLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                 </button> */}
//             <h1 className="item-name">{item.itemName}</h1>
//             <div className="description">
//               <div className="description-column">
//                 <p className="description-title">Description</p>
//                 <div className="short-line"></div>
//                 <p style={{marginTop: '2.1%'}}>Size & Package</p>
//                 <p>Seat Height</p>
//                 <p>Materials</p>
//                 <p>Color</p>
//                 <p>Weight</p>
//                 <p>Quantity</p>
//               </div>
//               <div className="details-column">
//                 <p className="details-title">Details</p>
                
//                 <p style={{marginTop: '7%'}}>{item.size}</p>
//                 <p>{item.seatHeight}</p>
//                 <p>{item.material}</p>
//                 <p>{item.colour}</p>
//                 <p>{item.weight} lbs</p>
//                 <p>{item.quantity}</p>
//               </div>
//             </div>
//             <div className="price-quantity">
//               <div className="price-contained">
//                 <p className="total-price">Price</p>
//                 <p className="price">Rs.{item.itemPrice}</p>
                
//               </div>
//               <div style={{marginLeft: '36%'}}>
//             <p className="vendor-name">Security Deposit</p>
//             <p className="vendor-email">Rs.{item.itemSecurityDeposit}</p>
//             </div>
              
             
//             </div>
//             <div className="price-quantityy">
            
//             <div className="quantity-contained">
//                 <button onClick={handleDecrease} className="quantityAdd-button">-</button>
//                 <span className="quantity-display">{cartQuantity}</span>
//                 <input
//                                         onChange={(e) => setQuantity(e.target.value)}
//                                         type="number"
//                                         name="Quantity"
//                                         id="Quantity"
//                                         value={cartQuantity}
//                                         className="w-10 h-8 text-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-none focus:ring-blue-500 focus:border-blue-500 block text-center"
//                                     />
//                 <button onClick={handleIncrease} className="quantityAdd-button">+</button>
//               </div>
    
//             <button style={{marginTop:'1%'}} className="add-quantity-button" onClick={handleRentNow}>Add to Cart</button>
//          </div>
           
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default ItemDetails;
// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import { StarIcon } from '@heroicons/react/outline';
// import { FaStar } from 'react-icons/fa';
// import { upsertRatingApi, getSingleItem, addToCartApi } from "../apis/Api";
// import { toast } from 'react-toastify';
// import { useNavigate, useParams } from 'react-router-dom';
// import "../style/itemdetails.css";

// const ItemDetails = () => {
//   const [rating, setRating] = useState(null);
//   const [hover, setHover] = useState(null);
//   const [averageRating, setAverageRating] = useState(0);
//   const [ratingCount, setRatingCount] = useState(0);
//   const [item, setItem] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const { id } = useParams();
//   const user = JSON.parse(localStorage.getItem('user'));

//   useEffect(() => {
//     getSingleItem(id)
//       .then((res) => {
//         if (res.data.success) {
//           setItem(res.data.item);
//         } else {
//           console.error("Error fetching item details: ", res.data.message);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching item details: ", error);
//       });
//   }, [id]);

//   const handleRentNow = (e) => {
//     e.preventDefault();
//     const rentalPrice = parseFloat(item.itemPrice);
//     const securityDeposit = parseFloat(item.itemSecurityDeposit);
//     const cartQuantity = quantity;

//     const totalPrice = rentalPrice * cartQuantity;

//     const formData = new FormData();
//     formData.append('userID', user._id);
//     formData.append('itemID', id);
//     formData.append('totalPrice', totalPrice);
//     formData.append('cartQuantity', cartQuantity);

//     addToCartApi(formData)
//       .then((res) => {
//         if (res.data.success === false) {
//           toast.error(res.data.message);
//         } else {
//           toast.success(res.data.message);
//         }
//       })
//       .catch((err) => {
//         toast.error("Server Error");
//         console.log(err.message);
//       });
//   };

//   const handleIncrease = () => {
//     setQuantity((prevQuantity) => {
//       if (prevQuantity < item.quantity) {
//         return prevQuantity + 1;
//       } else {
//         toast.warning('Please check the number of quantity available and choose');
//         return prevQuantity;
//       }
//     });
//   };

//   const handleDecrease = () => {
//     setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
//   };

//   const handleRatingSubmit = async () => {
//     const user = JSON.parse(localStorage.getItem('user'));

//     const data = {
//       itemID: id,
//       userID: user._id,
//       rating: rating,
//     };

//     try {
//       const response = await upsertRatingApi(data);

//       if (response.data.success) {
//         setAverageRating(response.data.averageRating);
//         setRatingCount(response.data.ratingCount);
//         toast.success(response.data.message);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error('Rating Submission Error:', error);
//       toast.error('Server Error');
//     }
//   };

//   const validAverageRating = Number.isFinite(averageRating) && averageRating >= 0 && averageRating <= 5 ? averageRating : 0;

//   return (
//     <>
//       <Navbar />
//       <div className="item-details-container">
//         {item && (
//           <>
//             <div className="image-contained"style={{display:'flex',flexDirection:'column'}}>
//               <img className="item-imager" style={{ height: '400px' }} src={item.itemImage} alt={item.itemName} />
//               <div className="star-rating">
//               <div className="flex items-center mb-2" >
//                 {[...Array(5)].map((_, index) => {
//                   const ratingValue = index + 1;
//                   return (
//                     <label key={index} className="cursor-pointer">
//                        <FaStar
//                       size={24}
//                       className={`star-icon ${
//                         (ratingValue <= rating && 'selected') || (ratingValue <= hover && 'hovered')
//                       }`}
//                       onClick={() => setRating(ratingValue)}
//                       onMouseEnter={() => setHover(ratingValue)}
//                       onMouseLeave={() => setHover(null)}
//                     />
//                     </label>
//                   );
//                 })}
//                 <div>
//                 <button
//                   className="rating-button"
//                   onClick={handleRatingSubmit}
//                 >
//                   Submit Rating
//                 </button>
//                 </div>
                
//               </div>
              
//             </div>
//             </div>
            
//             <div className="details-contained">
//               <h1 className="item-name">{item.itemName}</h1>
//               <div className="description">
//                 <div className="description-column">
//                   <p className="description-title">Description</p>
//                   <div className="short-line"></div>
//                   <p style={{ marginTop: '2.1%' }}>Size & Package</p>
//                   <p>Seat Height</p>
//                   <p>Materials</p>
//                   <p>Color</p>
//                   <p>Weight</p>
//                   <p>Quantity</p>
//                 </div>
//                 <div className="details-column">
//                   <p className="details-title">Details</p>
//                   <p style={{ marginTop: '7%' }}>{item.size}</p>
//                   <p>{item.seatHeight}</p>
//                   <p>{item.material}</p>
//                   <p>{item.colour}</p>
//                   <p>{item.weight} lbs</p>
//                   <p>{item.quantity}</p>
//                 </div>
//               </div>
//               <div className="price-quantity">
//                 <div className="price-contained">
//                   <p className="total-price">Price</p>
//                   <p className="price">Rs.{item.itemPrice}</p>
//                 </div>
//                 <div style={{ marginLeft: '36%' }}>
//                   <p className="vendor-name">Security Deposit</p>
//                   <p className="vendor-email" value="number">Rs.{item.itemSecurityDeposit}</p>
//                 </div>
//               </div>
//               <div className="price-quantityy">
//                 <div className="quantity-contained">
//                   <button onClick={handleDecrease} className="quantityAdd-button">-</button>
//                   <input
//                     style={{ color: '#9A5865', border: 'none' }}
//                     className="quantity-display"
//                     onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
//                     type="number"
//                     name="Quantity"
//                     id="Quantity"
//                     value={quantity}
//                     min="1"
//                     max={item.quantity}
//                   />
//                   <button onClick={handleIncrease} className="quantityAdd-button">+</button>
//                 </div>
//                 <button style={{ marginTop: '1%' }} className="add-quantity-button" onClick={handleRentNow}>Add to Cart</button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default ItemDetails;
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FaStar } from 'react-icons/fa';
import { upsertRatingApi ,getSingleItem, addToCartApi,fetchUserRatingsApi } from "../apis/Api";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import "../style/itemdetails.css";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [userID, setUserID] = useState('');
  const [rating, setRating] = useState(() => {
    // Initialize rating from local storage or default to null
    const storedRating = localStorage.getItem(`rating_${id}`);
    return storedRating ? parseInt(storedRating, 10) : null;
  });
  const [hover, setHover] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [userRatings, setUserRatings] = useState([]);

  useEffect(() => {
    // Function to fetch item details
    const fetchItemDetails = async () => {
      try {
        const response = await getSingleItem(id);
        if (response.data.success) {
          setItem(response.data.item);
          setAverageRating(response.data.averageRating);
          setRatingCount(response.data.ratingCount);
        } else {
          console.error("Error fetching item details: ", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching item details: ", error);
      }
    };
    // fetchUserRatings();
    fetchItemDetails();
   
  }, [id]);

  const user = JSON.parse(localStorage.getItem('user'));

//   const fetchUserRatings = () => {
//       // Ensure userID is available before making the API call
//       if (user && user._id) {
//           fetchUserRatingsApi(user._id)
//               .then((res) => {
//                   if (res.data.success) {
//                       setUserRatings(res.data.data); // Assuming data structure matches expectations
//                   } else {
//                       console.error("Error fetching user ratings: ", res.data.message);
//                   }
//               })
//               .catch((error) => {
//                   console.error("Error fetching user ratings: ", error);
//               });
//       }
//   };
// // Fetch ratings when item ID changes



  const handleRentNow = (e) => {
    e.preventDefault();
    const rentalPrice = parseFloat(item.itemPrice);
   
    const cartQuantity =  quantity; // Use the updated quantity state here

    // Calculate total price as (rental price + security deposit) * quantity
    const totalPrice = rentalPrice  * cartQuantity;

    const formData = new FormData();
    formData.append('userID', user._id);
    formData.append('itemID', id);
    formData.append('totalPrice', totalPrice);  // Correctly use the calculated total price
    formData.append('cartQuantity', cartQuantity);  // Correctly use the cart quantity

    addToCartApi(formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
        }, 2000); 
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      });
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity < item.quantity) {
        return prevQuantity + 1;
      } else {
        toast.warning('Please check the number of quantity available and choose');
        return prevQuantity;
      }
    });
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleRatingSubmit = async () => {
    const user = JSON.parse(localStorage.getItem('user')); // Ensure user is stored in localStorage

    const data = {
        itemID: id,
        userID: user._id,
        rating: rating,
    };

    try {
        const response = await upsertRatingApi(data);

        if (response.data.success) {
            setAverageRating(response.data.averageRating);
            setRatingCount(response.data.ratingCount);
            toast.success(response.data.message);
            // Save rating and hover state to local storage
            localStorage.setItem(`rating_${id}`, rating.toString());
            localStorage.removeItem(`hover_${id}`);
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.error('Rating Submission Error:', error);
        toast.error('Server Error');
    }
};

const validAverageRating = Number.isFinite(averageRating) && averageRating >= 0 && averageRating <= 5 ? averageRating : 0;

  return (
    <>
      <Navbar />
      <div className="item-details-container">
        {item && (
          <>
            <div className="image-contained">
              <img className="item-imager" style={{ height: '500px' }} src={item.itemImage} alt={item.itemName} />
              <div className='star-rating'>
              <div className="flex items-center mb-2" style={{display:'flex',flexDirection:'column'}}>
                <div>
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={index} className="cursor-pointer">
                      <FaStar
                        size={24}
                        className={`star-icon ${ratingValue <= (hover || rating) ? 'selected' : ''}`}
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  );
                })}
                </div>
                <button
                  className="rating-button"
                  onClick={handleRatingSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
            </div>
            <div className="details-contained">
              <h1 className="item-name">{item.itemName}</h1>
              <div className="description">
                <div className="description-column">
                  <p className="description-title">Description</p>
                  <div className="short-line"></div>
                  <p style={{ marginTop: '2.1%' }}>Size & Package</p>
                  <p>Seat Height</p>
                  <p>Materials</p>
                  <p>Color</p>
                  <p>Weight</p>
                  <p>Quantity</p>
                </div>
                <div className="details-column">
                  <p className="details-title">Details</p>
                  <p style={{ marginTop: '7%' }}>{item.size}</p>
                  <p>{item.seatHeight}</p>
                  <p>{item.material}</p>
                  <p>{item.colour}</p>
                  <p>{item.weight} lbs</p>
                  <p>{item.quantity}</p>
                </div>
              </div>
              <div className="price-quantity">
                <div className="price-contained">
                  <p className="total-pricee">Price</p>
                  <p className="price">Rs.{item.itemPrice}</p>
                </div>
                <div style={{ marginLeft: '36%' }}>
                  <p className="vendor-name">Security Deposit</p>
                  <p className="vendor-email" value="number">Rs.{item.itemSecurityDeposit}</p>
                </div>
              </div>
              <div className="price-quantityy">
                <div className="quantity-contained">
                  <button onClick={handleDecrease} className="quantityAdd-button">-</button>
                  
                  <input style={{color:'#9A5865',border:'none',width:'20%'}} className="quantity-display"
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                    type="number"
                    name="Quantity"
                   
                    value={quantity}
                    min="1"
                    max={item.quantity}
                   
                  />
                  <button onClick={handleIncrease} className="quantityAdd-button">+</button>
                </div>
                <button style={{ marginTop: '1%' }} className="add-quantityy-button" onClick={handleRentNow}>Add to Cart</button>
              </div>
            </div>
            
          </>
        )}
      </div>
    </>
  );
};

export default ItemDetails;
