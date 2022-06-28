import './App.css'
import { Card, CardContent, FormControl, MenuItem, Select } from '@mui/material'
import { useEffect, useState } from 'react'
import InfoBox from './components/InfoBox'
import Map from './components/Map'

function App() {
  // State => How to write a variable in React
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})

  const onCountryChange = async (e) => {
    const countryCode = e.target.value

    setCountry(countryCode)

    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode)
        // All of the data from the country response
        setCountryInfo(data)
      })
  }

  console.log('Country Info', countryInfo)
  //disease.sh/v3/covid-19/all
  //https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
  //UseEffect => Runs a piece of code based on a given condition.

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }))
          setCountries(countries)
        })
    }

    getCountriesData()
  }, [])

  return (
    <>
      <div className='app'>
        <div className='app__left'>
          <div className='app__header'>
            <h1>COVID-19 TRACKER</h1>
            <FormControl className='app__dropdown'>
              <Select variant='outlined' value={country} onChange={onCountryChange}>
                <MenuItem value='worldwide'>Worldwide</MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className='app__stats'>
            <InfoBox title='Coronavirus Cases' cases={countryInfo.todayCases} total={countryInfo.cases}></InfoBox>
            <InfoBox title='Recovered' cases={countryInfo.todayRecovered} total={countryInfo.recovered}></InfoBox>
            <InfoBox title='Deaths' cases={countryInfo.todayDeaths} total={countryInfo.deaths}></InfoBox>
          </div>

          <Map />
        </div>
        <Card className='app__right'>
          <CardContent>
            <h3>Live Cases by Country</h3>
            <h3>Worldwide new cases</h3>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default App
