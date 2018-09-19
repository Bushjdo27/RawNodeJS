



const enviroments = {};

//staging (default) enviroments

enviroments.staging = {
    httpPort:3000,
    httpsPort : 3001,
    envName : 'staging',
    hashingSecret: 'ThisIsSecretByBushjdo'
}

enviroments.production = {
    httpPort : 5000,
    httpsPort: 5001,
    envName: 'production',
    hashingSecret: 'ThisIsSecretByBushjdoProduction'
}

const currentEnviroment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toString() : 'staging';

const enviromentToExport = typeof(enviroments[currentEnviroment]) === 'object' ? enviroments[currentEnviroment] : enviroments.staging

module.exports = enviromentToExport