const express = require('express')
const app = express()
const chalk = require('chalk')
const config = require('./config')
const ip = require('request-ip');


app.use(express.json())
app.use(ip.mw())


app.get('*', (req, res) => {
    let ip = req.clientIp;
    if (ip && ip.includes('::ffff:')) {
        ip = ip.split('::ffff:')[1]
        res.send({ ip: ip })
    } else {
        res.send({ ip: false })
    }
})

app.listen(config.port, () => {
    console.log(chalk.green `[ONLINE]` + chalk.white ` IP API is now online and listening to API calls from port: ${config.port}`)
})