const authRoutes = require('../features/auth/routes')
const userRoutes = require('../features/user/routes')
const recoverRoutes = require('../features/recover/routes')

module.exports = router => {
    authRoutes(router)
    userRoutes(router)
    recoverRoutes(router)
}