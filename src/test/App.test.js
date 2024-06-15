//login
import axios from "axios";
import login_mock from "../mock/login_mock";
import request_mock from "../mock/request_mock";
import booking_mock from "../mock/booking_mock";

import restaurants_mock from "../mock/restaurants_mock"; 
const baseURL = "http://localhost:5000";

describe("API Testing", () => {
  it("Test Should Work", async () => {
    const response = await axios.get(`${baseURL}/test`);
    expect(response.status).toEqual(200);
  });

  let authToken;
 
  it("POST LOGIN", async () => {
    const response = await axios.post(
      `${baseURL}/api/user/login`,
      login_mock
    );
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.token).toBeDefined();
 
    authToken = response.data.token;
  });
 
  it("Test 1: Create a new request - Pass", async () => {
    expect(authToken).toBeDefined();

    const headers = {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json"
    };

    const requestData = request_mock[0]; // Assuming you want to use the first request data from the mock

    const createRequestApi = (data) =>
      axios.post(`${baseURL}/api/user/submit-request`, data, { headers });

    const response = await createRequestApi(requestData);
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
  });

  it("Test 1: Create a new booking - Pass", async () => {
    expect(authToken).toBeDefined();

    const headers = {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json"
    };

    const bookingData = booking_mock[0];

    const createBookingApi = (data) =>
      axios.post(`${baseURL}/api/user/submit-booking`, data, { headers });

    const response = await createBookingApi(bookingData);
    expect(response.status).toBe(404);
    expect(response.data.success).toBe(true);
  });
  it("DELETE /api/admin/delete_booking/:id| should return 200", async () => {
    // Make sure authToken is defined
    expect(authToken).toBeDefined();
 
    const bookingId = "65e4ecee4ff769f9c27f3868";
 
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
 
    const response = await axios.delete(
      `${baseURL}/api/admin/delete_booking/${bookingId}`,
      { headers }
    );
 
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe("Booking deleted successfully");
    console.log(response.data);
  });

    
  it("Test 3: Get single request - Fail", async () => {
    expect(authToken).toBeDefined();

    const headers = {
      Authorization: `Bearer ${authToken}`
    };

    const getRequestById = (id) =>
      axios.get(`${baseURL}/api/admin/get_request/${id}`, { headers });

    const requestId = request_mock[0]._id; // Assuming this is a valid request ID
    const response = await getRequestById(requestId);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("_id", requestId);
  });

  it("Test 4: Delete a request - Fail", async () => {
    expect(authToken).toBeDefined();

    const headers = {
      Authorization: `Bearer ${authToken}`
    };

    const deleteRequestById = (id) =>
      axios.delete(`${baseURL}/api/admin/delete_request/${id}`, { headers });

    const requestId = request_mock[0]._id; // Assuming this is a valid request ID
    const response = await deleteRequestById(requestId);
    expect(response.status).toBe(403); // Assuming unauthorized access returns a 403 status
  });
  
  it("Test 1: Create a new restaurant - Pass", async () => {
    expect(authToken).toBeDefined();

    const headers = {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "multipart/form-data"
    };

    const restaurantData = restaurants_mock[0]; // Assuming you want to use the first restaurant data from the mock

    const addRestaurantApi = (data) =>
      axios.post(`${baseURL}/api/admin/add-restaurant`, data, {
        headers
      });

    const response = await addRestaurantApi(restaurantData);
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(false);

    // Assuming you want to store the created restaurant ID for further testing
    createdRestaurantId = response.data.restaurant._id;
  });

  it("POST /api/user/submit-booking | should return 200", async () => {
    expect(authToken).toBeDefined();
  
    const headers = {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    };
  
    const bookingData = {
      startDate: "2024-03-01T00:00:00.000Z",
      endDate: "2024-03-02T00:00:00.000Z",
      eventType: "Birthday",
      phoneNumber: "1234567890",
      address: "Sample Address",
      numberOfGuests: 10,
      specialRequirements: "None",
      bookedBy: "65b711ebef983a852398bab5", // Assuming this is a valid user ID
      restaurantsName: "65cf782c6070371e64ff98ff", // Assuming this is a valid restaurant ID
      menusName: [] // Assuming there are no menus selected
    };
  
    try {
      const response = await axios.post(
        `${baseURL}/api/user/submit-booking`,
        bookingData,
        { headers }
      );
  
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
    } catch (error) {
      // Log the error if the request fails
      console.error("Error submitting booking:", error.message);
      throw error; // Rethrow the error to fail the test
    }
  });
  it("POST /api/user/submit-request | should return 200 for invalid request", async () => {
    expect(authToken).toBeDefined();
  
    const headers = {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    };
  
    // Here we use an invalid request data where 'phone' field is missing
    const invalidRequestData = {
      requestName: "Invalid Test Request",
      requestLocation: "Invalid Test Location",
      message: "This is an invalid test request",
    };
  
    try {
      const response = await axios.post(
        `${baseURL}/api/user/submit-request`,
        invalidRequestData,
        { headers }
      );
  
      // The request should pass with status code 200 (contrary to the usual behavior)
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(false); // Assuming the API responds with success for all requests
    } catch (error) {
      console.error("Error submitting invalid request:", error.message);
      throw error;
    }
  });
});
