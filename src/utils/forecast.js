const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=410314c11823ba8ccc22863bbf986efc&query=' + longitude + ',' + latitude+ '&units=f'

 request({url : url, json: true},(error, response) => {
    if(error){
        callback('Unable to connect to location services!', undefined)
    }
    else if(response.body.error){
        
        callback('Unable to find location. Try another search', undefined)
    }
    else{

    callback(undefined,response.body.current.weather_descriptions[0]+" It is currently " + response.body.current.temperature  +  " degress out. It feels like " + response.body.current.feelslike + " degrees out" )
    }
 })

}

module.exports = forecast