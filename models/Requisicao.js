var request = require('request');

const AJX = function(url){
    return new Promise((resolve, reject)=>{

        request(url, function (error, response, body) {
            resolve(response.body);
            reject(error);
        });

    });

}
module.exports = AJX;
