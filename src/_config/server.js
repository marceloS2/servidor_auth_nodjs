const Koa = require('koa')
const Router = require('koa-router')
const applyRoutes = require('./routes')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')

const app = new Koa()
const router = new Router()

module.exports = () => {
    console.log('[Koa] Creating a new server')

    applyRoutes(router)

    app.use(cors()).use(bodyParser()).use(router.routes()).use(router.allowedMethods())

    // Use seu endereço IPv4 local
    const ip = '192.168.3.6'
    const port = 8080

    app.listen(port, ip, () => {
        console.log(`[Koa] Server running at http://${ip}:${port}`)
    })
}
