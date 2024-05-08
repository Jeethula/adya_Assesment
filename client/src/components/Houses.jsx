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
import {useDispatch} from 'react-redux';
import { setdata } from '../Redux/bookingSlice';

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

  useEffect(() => {
    axios.get("/house/get").then((res) => {
      setHouses(res.data.houses); 
    }).catch(error => {
      console.error("Error fetching houses:", error);
    });
  }, []);

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
        if (filters.sortByPrice === 'highToLow') {
          return b.price - a.price;
        } else if (filters.sortByPrice === 'LowToHigh') {
          return a.price - b.price;
        }
      });
    }

    if (filters.sortByFurnishing) {
      filteredHouses = filteredHouses.filter(house => house.furnishing === filters.sortByFurnishing);
    }

    if (filters.showAvailability === 'available') {
      filteredHouses = filteredHouses.filter(house => house.availability === 'available');
    }

    return filteredHouses;
  };

  const handleResetFilters = () => {
    setFilters({
      sortByPrice: null,
      sortByFurnishing: null,
      showAvailability: 'notAvailable'
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
    const response = await axios.get('/house/checkAvailability', {
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
  
  const handlebook = async () => {
    dispatch(setdata(
      {
        startDate: selectedStartDate,
        endDate: selectedEndDate
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


  return (
    <div className='flex p-3'>
      <div className='w-77% h-screen  overflow-auto flex flex-col gap-y-3 mt-3 ml-3'>
        {applyFilters().map(house => (
          <div key={house.id} className='bg-slate-200 relative rounded-lg flex w-[1000px]'>
            <div>
              <img src={house.imgUrl} alt="iamge" className='h-64 w-72' />
            </div>
            <div className='flex flex-col p-2  gap-1 '>
              <p className='font-bold text-[25px]'>{house.title}</p>
              <p className=''> {house.furnishing} <span className='font-semibold'>{house.area} Sq.ft </span> </p>
              <p className=''>{house.address}</p>
              <p>Rent :{house.rent}</p>
              <p>Adavnce :{house.Advance}</p>
              <p>Owner   : {house.sellerName}</p>
            </div>
            <h1 className='bg-white  font-bold p-2 absolute rounded-tr-lg z-9 left-0 bottom-0'>Rs {house.rent} / Day</h1>
            <button className='bg-orange-400 text-white rounded-lg font-semibold p-2 absolute z-9 right-2 bottom-2 ' onClick={handleOpen}>Show More</button>
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
               { !bookings && <button className='w-fit h-fit p-2 mt-2 ml-60 bg-orange-400 rounded-lg hover:bg-orange-500' onClick={()=>handleCheckAvailable(house.id)}>Check Availabity</button> }
               {  bookings && <p className='text-[15px] ml-60 mt-2 font-semibold bg-green-400 p-1 h-fit w-fit rounded-lg '>The slot is available</p>}
               { !bookings && <p className='text-[15px] ml-4 font-semibold'>check the  Availableity of your room on the required date to confirm  </p> }
               { bookings && <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                  <div className='flex gap-x-2 '>
                    <div className='w-[100%]' >
                      <img src={house.imgUrl} alt="iamge" className='h-72 w-72 rounded-md' />
                    </div>
                    <div className='flex flex-col p-2 gap-1 h-72 overflow-auto'>
                      <p className='font-bold text-[25px]'>{house.title}</p>
                      <p className='text-gray-400'>{house.description}</p>
                      <p className=''> {house.furnishing} <span className='font-semibold'>{house.area} Sq.ft </span> </p>
                      <p className=''>{house.address}</p>
                      <p>Rent :{house.rent}</p>
                      <p>Adavnce :{house.Advance}</p>
                      <p>Owner   : {house.sellerName}</p>
                      <p>Contact : {house.phoneNumber}</p>
                    </div>
                </div>
                </Typography>}
                <div>
                 {bookings && <button className='bg-orange-400 rounded-lg hover:bg-orange-500 text-white font-semibold p-2 ml-56 mt-3' onClick={handlebook}>Rent now</button> }
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
                defaultValue="null"
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
                defaultValue="null"
                name="sortByFurnishing"
                value={filters.sortByFurnishing}
                onChange={handleSortByFurnishingChange}
              >
                <FormControlLabel value="Fully" control={<Radio />} label="Fully furnished" />
                <FormControlLabel value="semi" control={<Radio />} label="Semi-furnished" />
                <FormControlLabel value="null" control={<Radio />} label="Not furnished" />
                <FormControlLabel value="all" control={<Radio />} label="all" />
              </RadioGroup>
            </FormControl>
            <FormControl className="mb-4">
              <FormLabel id="demo-radio-buttons-group-label">Show Houses</FormLabel>
              <RadioGroup
                className='px-5'
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="notAvailable"
                name="showAvailability"
                value={filters.showAvailability}
                onChange={handleShowAvailabilityChange}
              >
                <FormControlLabel value="available" control={<Radio />} label="Show only Available" />
                <FormControlLabel value="notAvailable" control={<Radio />} label="Show All" />
              </RadioGroup>
            </FormControl>
            </div>
        </aside>

    </div>
  );
}

export default Houses;
