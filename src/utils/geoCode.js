const request = require('postman-request')

const geoCode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURI(address) +'.json?access_token=pk.eyJ1IjoicGFuc2h1bGppbmRhbCIsImEiOiJja3I4dWxtamY0MzNvMnZxYXlqYmwwbWJsIn0.W2ORfwhKzGDAf5T9Qh38PQ&limit=1'
    request({ url : url, json:true },(error,response)=>{
        if(error){
            callback('Unable to connect to location services!', undefined)
        }
        else if(response.body.features.length==0){
            
            callback('Unable to find location. Try another search', undefined)
        }
        else{
               const bata = {
                latitude: response.body.features[0].geometry.coordinates[0],
                longitude: response.body.features[0].geometry.coordinates[1],
                location: response.body.features[0].place_name
                }

                callback(undefined,bata)
        
        }
    })
}

module.exports = geoCode
