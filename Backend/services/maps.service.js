const axios = require('axios')
const apiKey = process.env.MAPBOX_API
const mapService=require('./maps.service')
const captianModel= require('../models/captian.model')

module.exports.getAddressCoordinate = async (address) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${apiKey}`

    try {
        const response = await axios.get(url)
        if (response.statusText === 'OK') {
            const [lon, lat] = response.data.features[0].geometry.coordinates
            return {
                ltd: lat,
                lng: lon
            }
        } else {
            throw new Error('Unable to fetch coordinates')
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    const profile = "driving";

    try {
        const originCoords = await mapService.getAddressCoordinate(origin);
        const destCoords = await mapService.getAddressCoordinate(destination);

        const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${originCoords.lng},${originCoords.ltd};${destCoords.lng},${destCoords.ltd}.json?access_token=${apiKey}&geometries=geojson`;

        const response = await axios.get(url);
        if (response.status >= 200 && response.status < 300) {
            const route = response.data.routes[0];
            return{
                distance:(route.distance/1000).toFixed(0),
                duration:(route.duration/60).toFixed(0)
                // distance:`${(route.distance/1000).toFixed(2)} KM`,
                // duration:`${(route.duration/3600).toFixed(2)} Hours`
            }
        }else{
            throw new Error("Unable to fetch route details")
        }
        } catch (err) {
            console.error("Error in getDistanceTime:",err.message)
            throw err
        }
    }

    module.exports.getAutoCompletesuggestions=async (input)=>{
        if(!input){
            throw new Error('query is required')
        }

        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(input)}.json?access_token=${apiKey}&autocomplete=true&limit=10`;

        try {
            const response = await axios.get(url);
            if (response.status >= 200 && response.status < 300) {
                return response.data.features.map((feature) => ({
                    placeName: feature.place_name,
                    coordinates: feature.geometry.coordinates, 
                }));
            } else {
                throw new Error('Unable to fetch autocomplete suggestions');
            }
        } catch (error) {
            console.error("Error in getAutocompleteSuggestions:", error.message);
            throw error;
        }
    }

    module.exports.getCaptiansInTheRadius=async(ltd,lng,radius)=>{
        const captians=await captianModel.find({
            location:{
                $geoWithin:{
                    $centerSphere:[[ltd,lng],radius/6371]
                }
            }
        })

        return captians
    }

