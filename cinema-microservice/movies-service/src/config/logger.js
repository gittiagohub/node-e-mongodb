const winston = require('winston')
const path = require('path')

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({
            filename: path.join(__dirname, '..', 'logs', "erros.txt"),
            level: 'error'
        })
        ,
        // logger é cumulativo, esse arquivo vai ter error e info  
        new winston.transports.File({
            filename: path.join(__dirname, '..', 'logs', "info.txt"),
            level: 'info'
        })
    ]
})

if (process.env.NODE_ENV == ! 'production') {
    logger.add(new winston.transports.Console({ format: winston.format.simple() }))
}

module.exports = logger