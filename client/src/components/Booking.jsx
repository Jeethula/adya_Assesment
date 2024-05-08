import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Booking() {

  const navigate = new useNavigate();

  const data = useSelector((state) => state.booking.endDate)
  console.log(data,"jkljlkjkl")
  const handlePayment = async () => {
    console.log("Payment Done")
    navigate('/home')
  }

  return (
    <div>
     <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-900 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">Payment Information</h2>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700">
            <form className="space-y-6 px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="name">
                    Name on Card
                  </label>
                  <input
                    autoComplete="cc-name"
                    className="mt-1 focus:ring-indigo-500 h-8 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-50"
                    id="name"
                    name="name"
                    type="text"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                    Email
                  </label>
                  <input
                    autoComplete="email"
                    className="mt-1 focus:ring-indigo-500 h-8 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-50"
                    id="email"
                    name="email"
                    type="email"
                    required
                  />
                </div>
                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="address">
                    Address
                  </label>
                  <input
                    autoComplete="street-address"
                    className="mt-1 focus:ring-indigo-500 h-8 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-50"
                    id="address"
                    name="address"
                    type="text"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium  text-gray-700 dark:text-gray-300" htmlFor="card-number">
                    Card Number
                  </label>
                  <input
                    autoComplete="cc-number"
                    className="mt-1 focus:ring-indigo-500 h-8 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-50"
                    id="card-number"
                    name="card-number"
                    type="text"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="expiration-date"
                  >
                    Expiration Date
                  </label>
                  <input
                    autoComplete="cc-exp"
                    className="mt-1 focus:ring-indigo-500 h-8 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-50"
                    id="expiration-date"
                    name="expiration-date"
                    type="text"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium h-8 text-gray-700 dark:text-gray-300" htmlFor="cvv">
                    CVV
                  </label>
                  <input
                    autoComplete="cc-csc"
                    className="mt-1 focus:ring-indigo-500 h-8 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-50"
                    id="cvv"
                    name="cvv"
                    type="text"
                    required
                  />
                </div>
              </div>
              <div>
                <button
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                  onSubmit={handlePayment}
               >
                  Complete Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Booking
