const controllers = require('./controllers')

module.exports = router => {
    router.post('/v1/api/recover', controllers.recoverPassword) // Adicione esta linha
}
