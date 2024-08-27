import { v4 as uuidV4 } from "uuid";

import { CurrentWeatherDetails, CurrentWeatherDetailsApi, DayWeatherDetails, DayWeatherDetailsApi, ForcastWeatherDetails, ForcastWeatherDetailsApi, HourlyWeatherDetails, HourlyWeatherDetailsApi } from "$types/weather";

export function currentWeatherConverter({ 
    cloud,
    condition,
    humidity,
    is_day,
    last_updated,
    last_updated_epoch,
    wind_degree,
    wind_dir,
    uv,
    ...measurements
 }: CurrentWeatherDetailsApi): CurrentWeatherDetails {
    return {
        cloud,
        condition,
        humidity,
        is_day,
        last_updated,
        last_updated_epoch,
        wind_degree,
        wind_dir,
        uv,
        imperial: {
            dewpoint: measurements.dewpoint_f,
            feelslike: measurements.feelslike_f,
            gust: measurements.gust_mph,
            heatindex: measurements.heatindex_f,
            precip: measurements.precip_in,
            pressure: measurements.pressure_in,
            temp: measurements.temp_f,
            vis: measurements.vis_miles,
            wind: measurements.wind_mph,
            windchill: measurements.windchill_f,
        },
        metric: {
            dewpoint: measurements.dewpoint_c,
            feelslike: measurements.feelslike_c,
            gust: measurements.gust_kph,
            heatindex: measurements.heatindex_c,
            precip: measurements.precip_mm,
            pressure: measurements.pressure_mb,
            temp: measurements.temp_c,
            vis: measurements.vis_km,
            wind: measurements.wind_kph,
            windchill: measurements.windchill_c,
        }
    }
}

function dayWeatherConverter({ 
    avghumidity,
    daily_will_it_rain,
    daily_chance_of_rain,
    daily_will_it_snow,
    daily_chance_of_snow,
    condition,
    uv,
    ...measurements
}: DayWeatherDetailsApi): DayWeatherDetails {
    return {
        avghumidity,
        daily_will_it_rain,
        daily_chance_of_rain,
        daily_will_it_snow,
        daily_chance_of_snow,
        condition,
        uv,
        imperial: {
            avgtemp: measurements.avgtemp_f,
            avgvis: measurements.avgvis_miles,
            maxtemp: measurements.maxtemp_f,
            maxwind: measurements.maxwind_mph,
            mintemp: measurements.mintemp_f,
            totalprecip: measurements.totalprecip_in,
        },
        metric: {
            avgtemp: measurements.avgtemp_c,
            avgvis: measurements.avgvis_km,
            maxtemp: measurements.maxtemp_c,
            maxwind: measurements.maxwind_kph,
            mintemp: measurements.mintemp_c,
            totalprecip: measurements.totalprecip_mm,
        }
    }

}

function hourWeatherConverter({ 
    time_epoch,
    time,
    will_it_rain,
    chance_of_rain,
    will_it_snow,
    chance_of_snow,
    ...rest
}: HourlyWeatherDetailsApi): HourlyWeatherDetails {
    return {    
        time_epoch,
        time,
        will_it_rain,
        chance_of_rain,
        will_it_snow,
        chance_of_snow,
        ...currentWeatherConverter(rest)
    }
}

export function forcastWeatherConverter({ 
    location,
    alerts,
    current,
    forecast
}: ForcastWeatherDetailsApi): ForcastWeatherDetails {
    return {    
        id: uuidV4(),
        createdAt: Date(),
        location: location,
        alerts: alerts,
        current: currentWeatherConverter(current),
        forecast: {
            forecastday: forecast.forecastday.map(({day, hour, ...rest}) => ({
                    ...rest,
                    day: dayWeatherConverter(day),
                    hour: hour.map(hourWeatherConverter)
            }))
        }
    }
}