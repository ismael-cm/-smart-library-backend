const User = require('../models/User')

const userProfile = async (req, res) => {
    const body = req.body

    try {
        const user = await User.findOne({carnet: body.carnet})
        console.log(user)
        if(!user) {
            return res.status(404).json({message: "Forbidden"})
        }

        res.json({success: true, user: user})
    } catch (error) {
        console.error('Error in query:', error);
        res.status(500).json({ mensaje: error.message });

    }
}

module.exports = {userProfile}