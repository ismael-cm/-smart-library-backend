const User = require('../models/User')

const userProfile = async (req, res) => {
    const body = req.body

    try {
        const user = await User.findOne({carnet: body.carnet})
        if(!user) {
            return res.status(404).json({message: "Forbidden"})
        }
        const additionalData = {
            visits: 20,
            readingCount: 12,
            location: 'ITCA Central'

        };

        const userWithAdditionalData = {
            ...user.toObject(),
            ...additionalData
        };

        res.json({success: true, user: userWithAdditionalData })
    } catch (error) {
        console.error('Error in query:', error);
        res.status(500).json({ mensaje: error.message });

    }
}

module.exports = {userProfile}