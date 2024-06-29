import React, { useState } from 'react';
import { createUserApi, testApi } from '../apis/Api';
import Navbar from "../components/Navbar";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import hero1 from "../assets/Images/register1.png";
import "../style/login.css";

const Register = () => {
  // useState for input values and validation errors
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});

  // Function for changing input values and clearing errors
  const handleChange = (field, value) => {
    const updateError = { ...errors };
    delete updateError[field];
    setErrors(updateError);

    switch (field) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'contactNumber':
        setContactNumber(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  // Function for input validation
  const validate = () => {
    const errors = {};
    const nameRegex = /^[A-Z][a-zA-Z]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[!@#$%^&*])/;

    if (!firstName) {
      errors.firstName = "First name is required.";
    } else if (!firstName.match(nameRegex)) {
      errors.firstName = "First name must start with a capital letter and contain only letters.";
    }

    if (!lastName) {
      errors.lastName = "Last name is required.";
    } else if (!lastName.match(nameRegex)) {
      errors.lastName = "Last name must start with a capital letter and contain only letters.";
    }

    if (!email) {
      errors.email = "Email is required.";
    } else if (!email.match(emailRegex)) {
      errors.email = "Invalid email format.";
    }

    if (!contactNumber) {
      errors.contactNumber = "Phone number is required.";
    } else if (contactNumber.length !== 10 || isNaN(contactNumber)) {
      errors.contactNumber = "Phone number must be 10 digits.";
    }

    if (!address) {
      errors.address = "Address is required.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6 || !password.match(passwordRegex)) {
      errors.password = "Password must be at least 6 characters long and contain at least 1 special character.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password is required.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Function for handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please enter all fields correctly.");
      return;
    }

    // Making JSON data object
    const data = {
      firstName,
      lastName,
      email,
      contactNumber,
      address,
      password,
      confirmPassword
    };

    // Making API call
    createUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1100);
      }
    }).catch(err => {
      toast.error("Server Error");
      console.log(err.message);
    });

    // Check test API
    testApi().then((res) => {
      console.log(res.data);
    });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="content">
          <div className="image-containerr">
            <img src={hero1} alt="Eventique" />
          </div>
          <div className="form-container">
            <h2 style={{ marginBottom: '6%', marginTop: '2%', fontWeight: 'bolder' }}>Create an account</h2>
            <form>
              <input onChange={(e) => handleChange('firstName', e.target.value)} type="text" placeholder="First Name" value={firstName} />
              {errors.firstName && <div className="error" style={{ color: 'red' }}>{errors.firstName}</div>}

              <input onChange={(e) => handleChange('lastName', e.target.value)} type="text" placeholder="Last Name" value={lastName} />
              {errors.lastName && <div className="error" style={{ color: 'red' }}>{errors.lastName}</div>}

              <input onChange={(e) => handleChange('email', e.target.value)} type="email" placeholder="Email" value={email} />
              {errors.email && <div className="error" style={{ color: 'red' }}>{errors.email}</div>}

              <input onChange={(e) => handleChange('contactNumber', e.target.value)} type="number" placeholder="Phone number" value={contactNumber} />
              {errors.contactNumber && <div className="error" style={{ color: 'red' }}>{errors.contactNumber}</div>}

              <input onChange={(e) => handleChange('address', e.target.value)} type="text" placeholder="Address" value={address} />
              {errors.address && <div className="error" style={{ color: 'red' }}>{errors.address}</div>}

              <input onChange={(e) => handleChange('password', e.target.value)} type="password" placeholder="Password" value={password} />
              {errors.password && <div className="error" style={{ color: 'red' }}>{errors.password}</div>}

              <input onChange={(e) => handleChange('confirmPassword', e.target.value)} type="password" placeholder="Confirm Password" value={confirmPassword} />
              {errors.confirmPassword && <div className="error" style={{ color: 'red' }}>{errors.confirmPassword}</div>}

              <button className='buttonn' onClick={handleSubmit} type="submit" style={{ fontSize: '20px' }}>Create account</button>
            </form>
            <div className="line" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '4%' }}>
              <div style={{ backgroundColor: '#CD8F68', height: '1px', width: '330px' }}></div>
              <span style={{ color: '#CD8F68', fontSize: '17px' }}>Or</span>
              <div style={{ backgroundColor: '#CD8F68', height: '1px', width: '330px' }}></div>
            </div>
            <div className="existing-user">
              Existing user? <Link to="/login" style={{ color: '#985157', fontWeight: 'bold', textDecoration: 'none' }}>Login</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
