const House = require('../model/house')
const User = require('../model/user')
const moment = require('moment');
const { Op } = require('sequelize');
const sequelize = require('sequelize');
const Booking = require('../model/booking');

const createHouse = async(req, res) => {
    try {
        const {
            userName,
            sellerName,
            address,
            phoneNumber,
            title,
            furnishing,
            description,
            imgUrl,
            rent,
            Advance,
            area,
        } = req.body;
        const dateFormat = "YYYY-MM-DD HH:mm:ss";
        const user = await User.findOne({ where: { name: userName } });
    console.log(startDateTime,endDateTime)
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const guestHouse = await GuestHouse.create({
            sellerName,
            address,
            phoneNumber,
            title,
            furnishing,
            description,
            imgUrl,
            rent,
            Advance,
            area,
            id: user.id 
        });

        res.status(201).json({ message: "House created successfully", House: house });

    } catch (error) {
        res.status(200).json({ message: "An error occurred", error: error.message });
    }
};

const updateHouse = async (req, res) => {
    try {
        const houseId = req.params.id;
        const {
            sellerName,
            address,
            phoneNumber,
            title,
            furnishing,
            description,
            imgUrl,
            rent,
            Advance,
            area,
        } = req.body;
        const house = await House.findByPk(houseId);
        if (!house) {
            return res.status(404).json({ message: "House not found" });
        }
        house.sellerName = sellerName;
        house.address = address;
        house.phoneNumber = phoneNumber;
        house.title = title;
        house.furnishing = furnishing;
        house.description = description;
        house.imgUrl = imgUrl;
        house.rent = rent;
        house.Advance = Advance;
        house.area = area;

        await house.save();

        res.status(200).json({ message: "House updated successfully", house });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

const deleteHouse = async (req, res) => {
    try {
        const houseId = req.params.id;
        const house = await House.findByPk(houseId);
        if (!house) {
            return res.status(404).json({ message: "House not found" });
        }
        await house.destroy();
        res.status(200).json({ message: "House deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};


const checkAvailability = async(req, res) => {
    try {
        console.log(req.query);
        const { startDateTime, endDateTime } = req.query;
        console.log(startDateTime,endDateTime,"...")

        const overlappingGuestHouses = await Booking.findAll({
            where: {
                
                startDate: {
                    [Op.lte]: moment(endDateTime.toString()).format("YYYY-MM-DD HH:mm:ss"),
                },
                endDate: {
                    [Op.gte]: moment(startDateTime.toString()).format("YYYY-MM-DD HH:mm:ss"),
                },
            },
           
        });

        if (overlappingGuestHouses.length === 0) {
            res.status(200).json({ message: "The slot is available", overlappingGuestHouses: [] });
        } else {
            res.status(200).json({ message: "The slot is not available", overlappingGuestHouses });
        }
    } catch (error) {
        res.status(200).json({ message: "An error occurred", error: error.message });
    }
};


const checkAvailabilityHouse = async(req, res) => {
    try {
        console.log(req.params);
        const { startDateTime, endDateTime,id } = req.query;

        const overlappingGuestHouses = await Booking.findAll({
            where: {
                HouseId:{
                    [Op.eq] : id
                },
                startDate: {
                    [Op.lte]: moment(endDateTime.toString()).format("YYYY-MM-DD HH:mm:ss"),
                },
                endDate: {
                    [Op.gte]: moment(startDateTime.toString()).format("YYYY-MM-DD HH:mm:ss"),
                },
            },
           
        });

        if (overlappingGuestHouses.length === 0) {
            res.status(200).json({ message: "The slot is available", overlappingGuestHouses: [] });
        } else {
            res.status(200).json({ message: "The slot is not available", overlappingGuestHouses });
        }
    } catch (error) {
        res.status(200).json({ message: "An error occurred", error: error.message });
    }
};

module.exports = {
    createHouse,
    updateHouse,
    checkAvailabilityHouse,
    deleteHouse,
    checkAvailability
};
