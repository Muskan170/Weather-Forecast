const WeatherInfo = ({ country }) => {
    const [weather, setWeather] = useState({});
    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=imperial`)
            .then(response => {
                console.log(response.data)
                setWeather(response.data)
            })
    }, [country])
    return (
        <div>
            <h3>Weather in {country.capital}</h3>
            <p><b>Temperature</b>{weather.main.temp}</p>
        </div>
    )
}