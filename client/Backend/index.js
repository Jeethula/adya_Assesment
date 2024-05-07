const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require("./database");
const House = require('./model/house');
const User = require('./model/user');
const Booking = require('./model/booking');


app.use(cors(
    {
        origin: '*'
    }
));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send("Adya Assesment Backend"); 
});
app.use('/user', require('./Routes/user')); 
app.use('/house',require('./Routes/house'))
app.listen(3001,async () => {
    console.log('Server is running on port 3001');
    await sequelize.authenticate();
    console.log("Database synced");
});
