const http = require('http')
const express = require('express')
const httpProxy = require('express-http-proxy')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const helmet =  require('helmet')

const authController =  require('../controllers/authController')

const options ={
    proxyReqPathResolver: (req)=>{
        return req.originalUrl;

    }
}



const app = express();

app.use(express.json())

app.post('/login',authController.validateLoginSchema,authController.doLogin)

app.use(authController.validateBlackList)
// mesma coisa 
// app.use('*',authController.validateBlackList)

app.post('/logout',authController.validateToken,authController.doLogout)

app.use(morgan('dev'))
app.use(helmet())
app.use(cookieParser())


const moviesServiceProx = httpProxy(process.env.MOVIES_API,options)
const catalogServiceProx = httpProxy(process.env.CATALOG_API,options)

app.use('/movies',moviesServiceProx)

//Expressoes regulares são somente pra verbos
app.get(/cities|cinemas/i,catalogServiceProx)




const server = app.listen(process.env.PORT,()=>{
console.log(`API Gateway started at ${process.env.PORT}`)
})

module.exports = server