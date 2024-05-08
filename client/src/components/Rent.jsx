import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Rent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName:"g2",
    sellerName: '',
    address: '',
    phoneNumber: '',
    furnishing: '',
    title: '',
    description: '',
    imgUrl: '',
    rent: '',
    advance: '',
    area: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const response = await axios.post('/house/create', formData);
    console.log(response.data);
    if(response.data.message === "House created successfully"){
        navigate('/home');
    }
    setFormData({
      sellerName: '',
      address: '',
      phoneNumber: '',
      furnishing: '',
      title: '',
      description: '',
      imgUrl: '',
      rent: '',
      advance: '',
      area: ''
    });
  };

  return (
   <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">Add New House for a Rent</h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap mt-[40px]">
        <div className="w-full md:w-1/2 mb-4 md:pr-2">
          <label className="block mb-2">Seller Name:</label>
          <input type="text" name="sellerName" value={formData.sellerName} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div className="w-full md:w-1/2 mb-4 md:pl-2">
          <label className="block mb-2">Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div className="w-full md:w-1/2 mb-4 md:pr-2">
          <label className="block mb-2">Phone Number:</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div className="w-full md:w-1/2 mb-4 md:pl-2">
          <label className="block mb-2">Furnishing:</label>
          <input type="text" name="furnishing" value={formData.furnishing} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div className="w-full md:w-1/2 mb-4 md:pr-2">
          <label className="block mb-2">Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div className="w-full md:w-1/2 mb-4 md:pl-2">
          <label className="block mb-2">Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div className="w-full md:w-1/2 mb-4 md:pr-2">
          <label className="block mb-2">Image URL:</label>
          <input type="text" name="imgUrl" value={formData.imgUrl} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div className="w-full md:w-1/2 mb-4 md:pl-2">
          <label className="block mb-2">Rent:</label>
          <input type="number" name="rent" value={formData.rent} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div className="w-full md:w-1/2 mb-4 md:pr-2">
          <label className="block mb-2">Advance:</label>
          <input type="number" name="advance" value={formData.advance} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div className="w-full md:w-1/2 mb-4 md:pl-2">
          <label className="block mb-2">Area:</label>
          <input type="text" name="area" value={formData.area} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-fit">Submit</button>
      </form>
    </div>
  );
}

export default Rent;

