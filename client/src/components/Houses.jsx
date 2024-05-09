import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { setdata } from '../Redux/bookingSlice';
import { HiOutlineHomeModern } from "react-icons/hi2";
import { ImLocation2 } from "react-icons/im";
import { GiReceiveMoney } from "react-icons/gi";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { FaPhone } from "react-icons/fa6";
import { SiTicktick } from "react-icons/si";
import Api from '../Api';
import CircleLoader from "react-spinners/ClipLoader";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 550,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  diaplay: 'flex',
  flexDirection: 'column',
  gap: '10px'

};

function Houses() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [houses, setHouses] = useState([]);
  const [bookings, setBookings] = useState(false); 
  const [filters, setFilters] = useState({
    sortByPrice: null,
    sortByFurnishing: null,
    showAvailability: 'notAvailable'
  });
  const [open, setOpen] = React.useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    Api.get("/house/get").then((res) => {
      setHouses(res.data.houses); 
      setLoading(false)
    }).catch(error => {
      console.error("Error fetching houses:", error);
      setLoading(true)
    });
    handleResetFilters()
  }, [loading]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleStartDateChange = (newValue) => {
    setSelectedStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setSelectedEndDate(newValue);
  };

  const applyFilters = () => {

    let filteredHouses = [...houses];

    if (filters.sortByPrice) {
      filteredHouses.sort((a, b) => {
        const rentA = a.rent; 
        const rentB = b.rent;
        if (filters.sortByPrice === 'highToLow') {
          return rentB - rentA;
        } else if (filters.sortByPrice === 'LowToHigh') {
          return rentA - rentB;
        }
      });
    }
    

    if (filters.sortByFurnishing === 'all') {
      return filteredHouses;
    }
    filteredHouses = filteredHouses.filter(house => house.furnishing === filters.sortByFurnishing);
    
    if (filters.showAvailability === 'greaterThan500') {
      filteredHouses = filteredHouses.filter(house => house.area > 500);
    } else if (filters.showAvailability === 'lessThan500') {
      filteredHouses = filteredHouses.filter(house => house.area < 500);
    }
  

    return filteredHouses;
  };

  const handleResetFilters = () => {
    setFilters({
      sortByPrice: "null",
      sortByFurnishing: "all",
      showAvailability: null
    });
  };

  const handleSortByPriceChange = (event) => {
    setFilters({...filters, sortByPrice: event.target.value});
  };

  const handleSortByFurnishingChange = (event) => {
    setFilters({...filters, sortByFurnishing: event.target.value});
  };

  const handleShowAvailabilityChange = (event) => {
    setFilters({...filters, showAvailability: event.target.value});
  };

  const handleCheckAvailable = async (id) => {
    console.log("Checking availability for house ID:", id);
    if(selectedEndDate === null || selectedStartDate === null){
      alert("Please select start and end date");
      setBookings(false)
      return;
    }
    const response = await Api.get('/house/checkAvailability', {
      params: {
        startDateTime: selectedStartDate,
        endDateTime: selectedEndDate,
        id: id
      }
    });
    if(response.data.message === "The slot is available"){
      console.log("Available", response.data);
      setBookings(true);
    }else{
      console.log("Not Available", response.data);
      alert("The slot is not available")
      setBookings(false);
    }
  };
  
  const handlebook = async (ID) => {
    dispatch(setdata(
      {
        startDate: selectedStartDate,
        endDate: selectedEndDate,
        HouseId: ID
      }
    ))
   bookings && navigate('/home/booking');
  }

  const handleRent = () => {
    navigate("/home/rent");
 }

 const handleMyBookings = () => {
  navigate("/home/MyBookings");
}

  const handleDelete = async (Id) => {
    console.log("clicked",Id)
    const id = Id;
    const response = await Api.delete(`/house/delete/${id}`);

    console.log(response.data);
    if(response.data.message === "House deleted successfully"){
      const newHouses = houses.filter(house => house.id !== Id);
      setHouses(newHouses);
    }else{
      console.log("error in deleting house")
    }
  }

const id = useSelector(state => state.booking.id); 



  return (
    <div className={`${ loading ? "flex flex-col justify-center items-center h-screen" : ""}`}>
    {loading ? (
       <div className='flex flex-col justify-center items-center  gap-10 '>
        <CircleLoader
          color='#000ff'
          loading={loading}
          size={150}
          aria-label="Loading "
          data-testid="loader"
        />
        <h1>Loading..</h1>
     </div>
    ) : (
    <div className='flex p-3 '>
      <div className='w-77% h-screen  overflow-auto flex flex-col gap-y-3 mt-3 ml-10 '>
        {applyFilters().map(house => (
          <div key={house.id} className='bg-slate-100 relative rounded-lg flex w-[1000px]'>
            <div>
              <img src={house.imgUrl} alt="iamge" className='h-64 w-72 rounded-lg' />
            </div>
            <div className='flex flex-col p-2 px-5 gap-y-2 '>
              <p className='font-bold text-[25px]'>{house.title}</p>
              <p className='flex items-center gap-x-2'><span className='bg-gray-400 text-white font-semibold p-1 h-fit w-fit rounded-md'> {house.furnishing}</span> <span className='font-medium text-[13px] flex items-center gap-x-1 '><HiOutlineHomeModern /> {house.area} Sq.ft </span> </p>
              <p className='flex gap-x-2 items-center font-semibold '><ImLocation2 /> {house.address}</p>
              <div className='bg-white rounded-md p-3 h-fit w-fit mt-2'>
              <p className='flex gap-x-2 items-center '><RiMoneyRupeeCircleLine /> Rent&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;<span className='font-bold'>{house.rent} / Day</span></p>
              <p className='flex gap-x-2 items-center '><GiReceiveMoney />Adavnce &nbsp;&nbsp;: &nbsp;<span className='font-bold'>{house.Advance}</span></p>
              <p className='flex gap-x-2 items-center '><BsFillPersonVcardFill />Owner&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   :&nbsp; <span className='font-bold'>{house.sellerName}</span></p>
              </div>
            </div>
            <h1 className='bg-white  font-bold p-2 absolute rounded-tr-lg z-9 left-0 bottom-0'>Rs {house.rent} / Day</h1>
            { (house.UserId == sessionStorage.getItem('id')) && <h1 className='absolute z-9 right-5 top-2 bg-red-500 hover:bg-red-600 rounded-md h-fit w-fit p-2 text-white font-bold' onClick={()=>handleDelete(house.id)}>Delete Post</h1>}
            <button className='bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold p-2 absolute z-9 right-5 bottom-8  h-fit w-36' onClick={handleOpen}>Show More & Book</button>
            <Modal
              keepMounted
              open={open}
              onClose={handleClose}
              aria-labelledby="keep-mounted-modal-title"
              aria-describedby="keep-mounted-modal-description"
            >
              <Box sx={style}>
                <h1 className='font-bold text-[20px]'>Book your rental house</h1>
                <div className='flex flex-row gap-x-5 mt-2 ml-10'>
                  <Typography >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker 
                          label="Basic date time picker"
                          value={selectedStartDate}
                          onChange={handleStartDateChange}
                         />
                      </DemoContainer>
                    </LocalizationProvider>
                    </Typography>
                     <Typography >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker 
                         label="Basic date time picker"
                         value={selectedEndDate}
                         onChange={handleEndDateChange}
                          />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Typography>
                </div>
               { !bookings && <button className='w-fit h-fit p-2 mt-2 ml-60 font-medium bg-orange-400 rounded-lg hover:bg-orange-500' onClick={()=>handleCheckAvailable(house.id)}>Check Availability</button> }
               {  bookings && <p className='text-[15px] ml-60 mt-3 font-semibold bg-green-400 p-1 h-fit w-fit rounded-lg flex items-center gap-x-2'>The house is available <SiTicktick /></p>}
               { !bookings && <p className='text-[15px] ml-16 mt-2 font-semibold'>check the Availability of your house on the required date to confirm  </p> }
               { bookings && <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                  <div className='flex gap-x-2 '>
                    <div className='w-[100%]' >
                      <img src={house.imgUrl} alt="iamge" className='h-72 w-72 rounded-md' />
                    </div>                     
                    <div className='flex flex-col p-2 gap-y-2 h-72 overflow-auto'>
                     <p className='font-bold text-[25px]'>{house.title}</p>
                      <p className='flex items-center gap-x-2'><span className='bg-gray-400 text-white font-bold p-1 h-fit w-fit rounded-md'> {house.furnishing}</span> <span className='font-medium text-[13px] flex items-center gap-x-1 '><HiOutlineHomeModern /> {house.area} Sq.ft </span> </p>
                      <p className='text-gray-400'>{house.description}</p>
                      <p className='flex gap-x-2 items-center font-semibold '><ImLocation2 /> {house.address}</p>
                      <p className='flex gap-x-2 items-center font-semibold bg-black text-white h-fit w-fit p-1 rounded-md'><FaPhone /> {house.phoneNumber}</p>
                      <div className='bg-slate-200 rounded-md p-3 h-fit w-fit mt-2'>
                      <p className='flex gap-x-2 items-center '><RiMoneyRupeeCircleLine /> Rent&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;<span className='font-bold'>{house.rent} / Day</span></p>
                      <p className='flex gap-x-2 items-center '><GiReceiveMoney />Adavnce &nbsp;&nbsp;: &nbsp;<span className='font-bold'>{house.Advance}</span></p>
                      <p className='flex gap-x-2 items-center '><BsFillPersonVcardFill />Owner&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   :&nbsp; <span className='font-bold'>{house.sellerName}</span></p>
                      </div>
                    </div>
                </div>
                </Typography>}
                <div>
                 {bookings && <button className='bg-orange-500 rounded-lg hover:bg-orange-600 text-white font-semibold p-2 ml-64 mt-3' onClick={()=>handlebook(house.id)}>Rent now</button> }
                </div>
              </Box>
            </Modal>
          </div>
        ))}
      </div>
      <aside className="w-[23%] bg-slate-200 fixed right-2 rounded-l-lg flex flex-col p-4 mt-5">
          <div className='flex flex-col '>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mb-4" onClick={handleRent}>Rent Property</button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mb-4" onClick={handleMyBookings}>My Bookings</button>
          </div>
            <div className='bg-white p-2 flex flex-col rounded-lg'>
            <button onClick={handleResetFilters} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4">Reset filters</button>
            <FormControl className="mb-4">
              <FormLabel className='font-told'>Sort by price</FormLabel>
              <RadioGroup
                className='px-5'
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="highToLow"
                name="sortByPrice"
                value={filters.sortByPrice}
                onChange={handleSortByPriceChange}
              >
                <FormControlLabel value="highToLow" control={<Radio />} label="High First " />
                <FormControlLabel value="LowToHigh" control={<Radio />} label="Low First" />
                <FormControlLabel value="null" control={<Radio />} label="Null" />
              </RadioGroup>
            </FormControl>
            <FormControl className="mb-4">
              <FormLabel id="demo-radio-buttons-group-label">Sort by furnishing</FormLabel>
              <RadioGroup
                className='px-5'
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="all"
                name="sortByFurnishing"
                value={filters.sortByFurnishing}
                onChange={handleSortByFurnishingChange}
              >
                <FormControlLabel value="Furnished" control={<Radio />} label="Fully furnished" />
                <FormControlLabel value="Semi-furnished" control={<Radio />} label="Semi-furnished" />
                <FormControlLabel value="Not-furnished" control={<Radio />} label="Not furnished" />
                <FormControlLabel value="all" control={<Radio />} label="all" />
              </RadioGroup>
            </FormControl>
            <FormControl className="mb-4">
              <FormLabel id="demo-radio-buttons-group-label">Show Houses</FormLabel>
              <RadioGroup
                className='px-5'
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue=""
                name="showAvailability"
                value={filters.showAvailability}
                onChange={handleShowAvailabilityChange}
              >
                <FormControlLabel value="lessThan500" control={<Radio />} label="< 500 sq.ft" />
                <FormControlLabel value="greaterThan500" control={<Radio />} label="> 500 sq.ft" />
              </RadioGroup>
            </FormControl>
            </div>
        </aside>

    </div>)}
    </div>
  );
}

export default Houses;
