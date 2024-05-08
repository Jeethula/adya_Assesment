const Booking = require("../model/booking");
const House = require("../model/house");
const  User = require("../model/user");

const createbook = async(req, res) => {
    try {
        const { userId, houseId, startDateTime, endDateTime } = req.body;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const house = await House.findByPk(houseId);
        if (!house) {
            return res.status(404).json({ message: "House not found" });
        }
        const book = await Booking.create({
            startDate: startDateTime,
            endDate: endDateTime,
            UserId: user.id,
            HouseId: house.id,
        });
        res.status(201).json({ message: "Booking created successfully", book });
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
}

const getBooking = async (req, res) => {
    try {
        const books = await Booking.findAll();
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

const getBookingByUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const books = await Booking.findAll({ where: { UserId: userId } });
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
}

module.exports = {
    createbook,
    getBooking,
    getBookingByUser
}