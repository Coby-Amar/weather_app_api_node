declare interface WeatherCondition {
    text: string,
    icon: string,
    code: number
}

declare interface WeatherAstro {
    sunrise: string
    sunset: string
    moonrise: string
    moonset: string
    moon_phase: string
    moon_illumination: number
}

declare interface WeatherAlert {
    headline: string
    msgtype: string
    severity: string
    urgency: string
    areas: string
    category: string
    certainty: string
    event: string
    note: string
    effective: string | Date
    expires: string | Date
    desc: string
    instruction: string
}

declare interface CurrentWeatherDetailsApi {
    cloud: number
    condition: WeatherCondition
    dewpoint_c: number
    dewpoint_f: number
    feelslike_c: number
    feelslike_f: number
    gust_kph: number
    gust_mph: number
    heatindex_c: number
    heatindex_f: number
    humidity: number
    is_day: number
    last_updated: string
    last_updated_epoch: number
    precip_in: number
    precip_mm: number
    pressure_in: number
    pressure_mb: number
    temp_c: number
    temp_f: number
    uv: number
    vis_km: number
    vis_miles: number
    wind_degree: number
    wind_dir: string
    wind_kph: number
    wind_mph: number
    windchill_c: number
    windchill_f: number
}

declare interface CurrentWeatherDetailsMeasurements {
    dewpoint: number
    feelslike: number
    gust: number
    heatindex: number
    precip: number
    pressure: number
    temp: number
    vis: number
    wind: number
    windchill: number
}
declare interface CurrentWeatherDetails {
    cloud: number
    condition: WeatherCondition
    uv: number
    wind_degree: number
    wind_dir: string
    humidity: number
    is_day: number
    last_updated: string
    last_updated_epoch: number
    imperial: CurrentWeatherDetailsMeasurements
    metric: CurrentWeatherDetailsMeasurements
}

declare interface HourlyWeatherDetailsApi extends CurrentWeatherDetailsApi {
    time_epoch: number
    time: string | Date
    will_it_rain: number
    chance_of_rain: number
    will_it_snow: number
    chance_of_snow: number
}

declare interface HourlyWeatherDetails extends CurrentWeatherDetails {
    time_epoch: number
    time: string | Date
    will_it_rain: number
    chance_of_rain: number
    will_it_snow: number
    chance_of_snow: number
}

declare interface WeatherDetailLocation {
    country: string
    lat: number
    lon: number
    localtime: string
    localtime_epoch: number
    name: string
    region: string
    tz_id: string
}

export declare interface WeatherDetailsApi {
    location: WeatherDetailLocation
    current: CurrentWeatherDetailsApi
}
export declare interface WeatherDetails {
    location: WeatherDetailLocation
    current: CurrentWeatherDetails
}

declare interface DayWeatherDetailsApi {
    avghumidity: number
    daily_will_it_rain: number
    daily_chance_of_rain: number
    daily_will_it_snow: number
    daily_chance_of_snow: number
    condition: WeatherCondition
    uv: number
    maxtemp_c: number
    maxtemp_f: number
    mintemp_c: number
    mintemp_f: number
    avgtemp_c: number
    avgtemp_f: number
    maxwind_mph: number
    maxwind_kph: number
    totalprecip_mm: number
    totalprecip_in: number
    avgvis_km: number
    avgvis_miles: number
}

declare interface DayWeatherDetailsMesurments {
    maxtemp: number
    mintemp: number
    avgtemp: number
    maxwind: number
    totalprecip: number
    avgvis: number
}
declare interface DayWeatherDetails {
    avghumidity: number
    daily_will_it_rain: number
    daily_chance_of_rain: number
    daily_will_it_snow: number
    daily_chance_of_snow: number
    condition: WeatherCondition
    uv: number
    imperial: DayWeatherDetailsMesurments
    metric: DayWeatherDetailsMesurments
}

declare interface ForcastDayWeatherDetailsApi {
    date: string
    date_epoch: number
    day: DayWeatherDetailsApi,
    astro: WeatherAstro
    hour: HourlyWeatherDetailsApi[]
}
export declare interface ForcastWeatherDetailsApi {
    location: WeatherDetailLocation
    current: CurrentWeatherDetailsApi
    forecast: {
        forecastday: ForcastDayWeatherDetailsApi[]
    }
    alerts: {
        alert: WeatherAlert[]
    }
}

declare interface ForcastDayWeatherDetails {
    date: string
    date_epoch: number
    day: DayWeatherDetails,
    astro: WeatherAstro
    hour: HourlyWeatherDetails[]
}
export declare interface ForcastWeatherDetails {
    id: string
    createdAt: string
    location: WeatherDetailLocation
    current: CurrentWeatherDetails
    forecast: {
        forecastday: ForcastDayWeatherDetails[]
    }
    alerts: {
        alert: WeatherAlert[]
    }
}