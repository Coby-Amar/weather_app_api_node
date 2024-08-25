import axios from "axios";

const instance = axios.create({
    baseURL: 'http://api.weatherapi.com/v1/forecast.json',
    params: {
        'key': process.env.WEATHER_ACCESS_KEY,
        'days': 7
    },
})

export const HttpService = instance