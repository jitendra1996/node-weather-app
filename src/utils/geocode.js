const request = require('request');

const geocode = (address , callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoiaml0ZW5kcmExOTk2IiwiYSI6ImNrcWFvc2V0eDAwNmYydnA2a2FsM29xdHEifQ.9DjiuIo0S3j_PhI1Ql0VBQ&limit=1`;

    request({url , json : true}, (error ,  {body}) => {
        if(error){
            callback('Unable to connect please check your network connection!!!!',undefined);
        }else if(body.features.length === 0){
            callback('Unable to connect with database please try after some time!!!',undefined);
        }else{
            callback(undefined , {
                latitude: body.features[0].center[0],
                longitude : body.features[0].center[1],
                location : body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;