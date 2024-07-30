const Boom = require('boom')
const Validator = require('fastest-validator')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

const services = require('./services')

const v = new Validator()

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'celu.mar23@gmail.com',
        pass: '12345678'
    }
})

module.exports = {
    recoverPassword: async ctx => {
        const { request: { body }, response } = ctx

        const schema = {
            email: { max: 255, min: 5, type: 'string' }
        }
        const errors = v.validate(body, schema)

        if (Array.isArray(errors) && errors.length) {
            response.status = 400
            return response.body = Boom.badRequest(null, errors)
        }

        const user = await services.findUserByEmail(body.email)
        if (!user) {
            response.status = 404
            return response.body = Boom.notFound('Usuário não encontrado')
        }

        const token = crypto.randomBytes(20).toString('hex')
        await services.saveResetToken(user.id, token)

        const mailOptions = {
            to: user.email,
            from: 'celu.mar23@gmail.com',
            subject: 'Redefinição de Senha',
            text: `Você está recebendo este email porque você (ou alguém) solicitou a redefinição da senha da sua conta.\n\n
            Por favor, clique no seguinte link ou cole-o no seu navegador para completar o processo:\n\n
            http://localhost:8080/reset/${token}\n\n
            Se você não solicitou esta ação, por favor ignore este email e sua senha permanecerá inalterada.\n`
        }

        await transporter.sendMail(mailOptions)
        response.body = { message: 'Um email foi enviado para ' + user.email + ' com mais instruções.' }
    }
}
