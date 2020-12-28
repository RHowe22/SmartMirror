const WeatherAPIKEY='92669a4761ec50350d45d34f008f59cd';
const ipAPIKEY='d871d4255fd86f148891841661ad2c97';
const CityApiKey='1300916496db49c20536e87e6e85b967'
const request = require('request');
const publicIP= require('public-ip')
const units ='Imperial'


exports.getLocationFromIP = async () =>{

    var ip=  await publicIP.v4()
    return new Promise(( resolve, reject)=>{
    const GetCity =encodeURI('http://api.ipstack.com/'+ip+ '?access_key='+ ipAPIKEY );
    request(GetCity,(error, response, body) => {
        if (!error && response.statusCode == 200) {
            resolve(JSON.parse(body))
       }
       else reject(error)
    });
}).catch(error=>console.log(error))
}
            

exports.getLocationFromCity = async (cityName) =>{

    return new Promise(( resolve, reject)=>{
    const GetCity ='http://api.positionstack.com/v1/forward?access_key='+ ipAPIKEY + "&query="+encodeURIComponent(cityName);
    request(GetCity,(error, response, body) => {
        if (!error && response.statusCode == 200) {
            resolve(JSON.parse(body))
       }
       else reject(error)
    });
})
}


exports.GetForecast = async(location, forecastTypes) =>{
    return new Promise((resolve,reject)=>{
        var url= 'https://api.openweathermap.org/data/2.5/onecall?lat='+location.latitude+'&lon='+location.longitude+"&exclude=minutely"+encodeURIComponent(forecastTypes) +"&appid="+WeatherAPIKEY;
        request(url,(error, response, body) => {
            if (!error && response.statusCode == 200) {
                resolve(body)
        }
        else reject(error)
        });
    }).catch(()=>null);

}
