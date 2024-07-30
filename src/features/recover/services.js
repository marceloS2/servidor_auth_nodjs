const db = require('../../_db/models/')
const crypto = require('crypto')

module.exports = {
    auth: payload => db.User.findOne({ where: payload }),
    
    findUserByEmail: email => db.User.findOne({ where: { email } }),

    saveResetToken: async (userId, token) => {
        const user = await db.User.findByPk(userId)
        user.resetPasswordToken = token
        user.resetPasswordExpires = Date.now() + 3600000 // 1 hora
        return user.save()
    }
}
