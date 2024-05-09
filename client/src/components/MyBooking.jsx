import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiOutlineHomeModern } from "react-icons/hi2";
import { ImLocation2 } from "react-icons/im";
import { GiReceiveMoney } from "react-icons/gi";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";
import { FaPersonWalkingArrowLoopLeft } from "react-icons/fa6";
import Api from '../Api';


function MyBooking() {
  const username = sessionStorage.getItem("username");
  const [bookings, setBookings] = useState([]);
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingResponse = await Api.get(`/booking/get/${username} `);
        const bookingData = bookingResponse.data.books;

        const houseResponse = await Api.get('/house/get');
        const houseData = houseResponse.data.houses;

        setBookings(bookingData);
        setHouses(houseData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [username]);

  const getHouseDetails = (houseId) => {
    return houses.find((house) => house.id === houseId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  if(bookings.length === 0) {
    return (
      <div className='p-3 px-10'>
        <h1 className='flex font-bold h-16 items-center justify-start text-[30px] gap-x-3' ><FaHistory /> Bookings History </h1>
        <p>No bookings found</p>
      </div>
    );
  }


  return (
    <div className='p-3 px-10'>
      <h1 className='flex font-bold h-16 items-center justify-start text-[30px] gap-x-3' ><FaHistory /> Bookings History </h1>
      {bookings.map((booking) => {
        const houseDetails = getHouseDetails(booking.HouseId);
        return (
          <div key={booking.id} className='bg-slate-100 w-full h-fit p-3 flex gap-x-10 gap-y-1 mt-2 rounded-lg'>
            <div className='w-[70%]'>
            {houseDetails && (
            <div className='flex'>
                <div>
                <img src={houseDetails.imgUrl} alt="iamge" className='h-64 w-72 rounded-lg' />
              </div>
              <div className='flex flex-col p-2 px-5 gap-y-2 '>
                <p className='font-bold text-[25px]'>{houseDetails.title}</p>
                <p className='flex items-center gap-x-2'><span className='bg-gray-400 text-white font-semibold p-1 h-fit w-fit rounded-md'> {houseDetails.furnishing}</span> <span className='font-medium text-[13px] flex items-center gap-x-1 '><HiOutlineHomeModern /> {houseDetails.area} Sq.ft </span> </p>
                <p className='flex gap-x-2 items-center font-semibold '><ImLocation2 /> {houseDetails.address}</p>
                <div className='bg-white rounded-md p-3 h-fit w-fit mt-2'>
                <p className='flex gap-x-2 items-center '><RiMoneyRupeeCircleLine /> Rent&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;<span className='font-bold'>{houseDetails.rent} / Day</span></p>
                <p className='flex gap-x-2 items-center '><GiReceiveMoney />Adavnce &nbsp;&nbsp;: &nbsp;<span className='font-bold'>{houseDetails.Advance}</span></p>
                <p className='flex gap-x-2 items-center '><BsFillPersonVcardFill />Owner&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   :&nbsp; <span className='font-bold'>{houseDetails.sellerName}</span></p>
                </div>
              </div>
             </div>
            )}
            </div> 
            <div className='w-[30%]'>
            <h1 className='text-[20px] font-semibold'>Booking Details</h1>
              <div className='bg-white p-3 rounded-md mt-2'>
                <p className='flex items-center gap-x-2'><BsCalendar2DateFill /> Booked on:<span className='font-bold'> {formatDate(booking.createdAt)}</span></p>
                <p className='flex items-center gap-x-2'><FaPersonWalkingArrowRight />From: <span className='font-semibold'>{formatDate(booking.startDate)}</span> </p>
                <p className='flex items-center gap-x-2'><FaPersonWalkingArrowLoopLeft />To: <span className='font-semibold'> {formatDate(booking.endDate)}</span> </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MyBooking;