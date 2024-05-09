import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../Api';

function Rent() {

  const username = sessionStorage.getItem("username");
  const [clicked, setclicked] = useState(false)

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName:username,
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
    setclicked(true)
    e.preventDefault();
    if (formData.sellerName.trim() === '' || formData.address.trim() === '' || formData.phoneNumber.trim() === '' || formData.furnishing.trim() === '' || formData.title.trim() === '' || formData.description.trim() === '' || formData.imgUrl.trim() === '' || formData.rent.trim() === '' || formData.advance.trim() === '' || formData.area.trim() === '') {
      alert('Complete all the fields.');
      setclicked(false)
      return;
    }
    if(formData.rent < 0 || formData.advance < 0 || formData.area < 0){
      alert('Rent, Advance and Area should be positive values');
      setclicked(false)
      return;
    }
    if(formData.phoneNumber.length !== 10){
      alert('Phone number should be 10 digits');
      setclicked(false)
      return;
    }

    const response = await Api.post('/house/create', formData);
    console.log(response.data);
    if(response.data.message === "House created successfully"){
        setclicked(false)
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
        navigate('/home');
    }else{
      setclicked(false)
      console.log("error in rent house creation")
    }
    
  };

  return (
   <div className="p-10 px-24">
      <h2 className="text-2xl font-bold mb-4">Add New House for a Rent</h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap mt-[40px]">
        <div className="w-full md:w-1/2 mb-4 md:pr-2">
          <label className="block mb-2">Seller Name:</label>
          <input type="text" placeholder='Your name' name="sellerName" value={formData.sellerName} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div className="w-full md:w-1/2 mb-4 md:pl-2">
          <label className="block mb-2">Address:</label>
          <input type="text" placeholder='Renting house address' name="address" value={formData.address} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div className="w-full md:w-1/2 mb-4 md:pr-2">
          <label className="block mb-2">Phone Number:</label>
          <input type="text" placeholder='Your phone number' name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div className="w-full md:w-1/2 mb-4 md:pl-2">
          <label className="block mb-2">Furnishing:</label>
          <select name="furnishing" value={formData.furnishing} onChange={handleChange} className="w-full border border-gray-300 rounded p-2">
            <option value="">Select furnishing</option>
            <option value="Furnished">Furnished</option>
            <option value="Semi-furnished">Semi-furnished</option>
            <option value="Not-furnished">Not-furnished</option>
          </select>
        </div>
        <div className="w-full md:w-1/2 mb-4 md:pr-2">
          <label className="block mb-2">Title:</label>
          <input type="text" placeholder='Title to be displayed for buyers' name="title" value={formData.title} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div className="w-full md:w-1/2 mb-4 md:pl-2">
          <label className="block mb-2">Description:</label>
          <input type="text" placeholder='Description to be displayed for buyers' name="description" value={formData.description} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div className="w-full md:w-1/2 mb-4 md:pr-2">
          <label className="block mb-2">Image URL:</label>
          <input type="text" placeholder='Your house images as  URLS' name="imgUrl" value={formData.imgUrl} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div className="w-full md:w-1/2 mb-4 md:pl-2">
          <label className="block mb-2">Rent:</label>
          <input type="number" placeholder='Rent per Day' name="rent" value={formData.rent} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div className="w-full md:w-1/2 mb-4 md:pr-2">
          <label className="block mb-2">Advance:</label>
          <input type="number" placeholder='Advance amount' name="advance" value={formData.advance} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div className="w-full md:w-1/2 mb-4 md:pl-2">
          <label className="block mb-2">Area:</label>
          <input type="text" placeholder='total house area in sq.ft' name="area" value={formData.area} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" />
        </div>
        <button type="submit"  className={`${clicked ?"bg-gray-400" :"bg-blue-500 hover:bg-blue-600"} text-white font-bold py-2 px-4 rounded w-fit`}>{clicked ?"Submitting" : "Submit"}</button>
      </form>
    </div>
  );
}

export default Rent;

