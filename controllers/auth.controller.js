const bcrypt = require('bcrypt')
const { usuario, rol, Sequelize } = require ('../models')
const { GeneraToken, TiempoRestanteToken } = require ('../services/jwttoken.service')

let self = {}

// Post api/auth
self.login = async (req, res) => {
    try{
        let data = await usuario.findOne({ 
            where: { email: req.body.email },
            raw: true,
            attributes: ['id', 'email', 'nombre', 'passwordhash', [Sequelize.col('rol.nombre'), 'rol']],
            include: [{ model: rol, attributes: [] }]
         })

         if(data === null)
            return res.status(401).json({ message: 'Usuario o contraseña incorrectas.' })

        const passwordMatch = await bcrypt.compare(req.body.password, data.passwordhash)

        if(!passwordMatch)
            return res.status(401).json({ message: 'Usuario o contraseña incorrectas.' })

        token = GeneraToken(data.email, data.nombre, data.rol)

        return res.status(200).json({
            email: data.email,
            nombre: data.nombre,
            rol: data.rol,
            jwt: token
         })
    }catch(error){
        console.log(error)
    }

}

// GET api/auth/tiempo
self.tiempo = async function (req, res) {
    const tiempo = TiempoRestanteToken(req)
    if(tiempo == null)
        return res.status(401).send()

    return res.status(200).send(tiempo)
}

module.exports = self