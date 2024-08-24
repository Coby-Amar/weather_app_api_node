import axios from "axios";

const instance = axios.create({
    baseURL: 'http://api.weatherapi.com/v1/forecast.json',
    params: {
        'key': '371a8712e805433f8d523256242108',
        'days': 7
    },
})

export const HttpService = instance