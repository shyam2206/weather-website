const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=abebe15cc7a564d38745131b25ca416e&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=f`
    request({url, json : true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to forecast services!', undefined)
        }else if(body.error) {
            callback('unable to find location.Try another location', undefined)
        } 
        else {
            callback(undefined, `Currently it is ${body.current.weather_descriptions[0]} & ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degree out`)
        } 
    })
}

module.exports = forecast