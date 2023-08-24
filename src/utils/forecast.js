const constant=require('./../constants/constants.js');
const request=require('request');
let url='http://api.weatherstack.com/current?access_key='+constant.apiKey+'&query=';

const getData=(cityName,callback)=>{
 let finalUrl=url+encodeURIComponent(cityName);
 request({url:finalUrl,json:true},(error,response)=>{
    if(error){
        callback('Unable to call api',undefined);
    }
    else if(response.body.error){
        callback('Please enter a valid city name',undefined)
    }
    else if(response.body.current){
        let data=response.body.current;
        let temperature=data.temperature;
        let description=data.weather_descriptions[0];
        let rainChance=data.precip;
        callback(undefined,{temperature,description,rainChance})
    }
 })
}

module.exports={getData:getData}