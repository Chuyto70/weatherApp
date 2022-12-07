import axios from "axios";

export const calltoApi = axios.create({
    baseURL:`https://api.openweathermap.org/geo/1.0`
})

export const calltoApiWeather = axios.create({
    baseURL:`https://api.openweathermap.org/data/2.5`
})

