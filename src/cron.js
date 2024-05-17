const fetch = require("node-fetch");

module.exports.handler = async (event) => {
    console.log('INICIO DE EXECUÇÃO DO CRON');

    /*await fetch("http://localhost:3000/dev/test", {
        "method": "GET",
    })*/

    console.log('FIM DA EXECUÇÃO DO CRON');
    return {};
}