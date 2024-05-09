import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Api from '../Api';

function Booking() {

  const navigate = new useNavigate();

  const endDateTime = useSelector((state) => state.booking.endDate)
  const startDateTime = useSelector((state) => state.booking.startDate)
  const houseId = useSelector((state) => state.booking.HouseId)
  const userName = sessionStorage.getItem('username')

  const handlePayment = async (e) => {
    e.preventDefault(); 
    console.log("entering")
    const result = await Api.post('/booking/create', { userName, houseId, startDateTime, endDateTime })
    console.log(result.data)
    if(result.data.message === "Booking created successfully"){
    navigate('/home')
    }else{

    }

  }

  return (
    <form className="max-w-2xl mx-auto p-4 sm:p-6 md:p-8" onSubmit={handlePayment}>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Rental Application Payment</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Complete your rental application by providing your payment information.
        </p>
        <p className="font-medium">
          Paymet of <span className='font-bold'>Rs 1000</span>  will be deducted from your account. 
        </p>
      </div>
      <div className="mt-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" for="name">
                Name
              </label>
              <input
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                id="name"
                placeholder="Enter your full name"
                type="text"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" for="email">
                Email
              </label>
              <input
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                id="email"
                placeholder="Enter your email"
                type="email"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" for="address">
              Rental Address
            </label>
            <input
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              id="address"
              placeholder="Enter the rental address"
              type="text"
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" for="card-number">
                Card Number
              </label>
              <input
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                id="card-number"
                placeholder="Enter your card number"
                type="text"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" for="expiration">
                Expiration
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                  id="expiration-month"
                  required
                >
                  <option value="">Month</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                  id="expiration-year"
                  required
                >
                  <option value="">Year</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" for="cvv">
                CVV
              </label>
              <input
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                id="cvv"
                placeholder="Enter your CVV"
                type="text"
                required
              />
            </div>
          </div>
          <button
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            type="submit"
          >
            Complete Payment
          </button>
        </div>
      </div>
      </form>
  )
}

export default Booking
