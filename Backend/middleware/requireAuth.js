const jwt = require('jsonwebtoken')
const User = require('../model/user')

const requireAuth = async (req, res, next) => {
    // verify user is authenticated
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    }

    const token = authorization.split(' ')[1]

    try {
        const { name } = jwt.verify(token, "mnmkjkbkjbkjbknjnl")

        req.user = await User.findOne({ name}).select('_id')
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Request is not authorized' })
    }
}

module.exports = requireAuth