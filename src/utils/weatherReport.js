const request =require("request");

const weatherReport = (city_name , callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=79001e7e87e91e03d96cb47a936acf71`;

    request({url : url , json : true}, (error , response) =>{

        if(error){
            callback('Unable to connect please check your connection!!!',undefined);
         }else if (response.body.hasOwnProperty('message')  && response.body.message.length !== 0){
             callback("Unable to fetch data due to some wrong input please try again with correct inputs",undefined);
         }else{
            callback(undefined,{
                temp : response.body.main.temp,
                temp_min : response.body.main.temp_min,
                temp_max : response.body.main.temp_max,
                pressure : response.body.main.pressure,
                humidity : response.body.main.humidity,
                wind_speed : response.body.wind.speed,
                country : response.body.sys.country,
                sky : response.body.weather[0].description,
                name : response.body.name
            });
        }
    });
}

module.exports = weatherReport ;