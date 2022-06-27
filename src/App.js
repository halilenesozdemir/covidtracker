import './App.css';
import { FormControl, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';

function App() {
  // State => How to write a variable in React
  const [countries, setCountries] = useState([]);

  //https://disease.sh/v3/covid-19/countries
  //UseEffect => Runs a piece of code based on a given condition.

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  return (
    <>
      <div className='app'>
        <div className='app__header'>
          <h1>COVID-19 TRACKER</h1>
          <FormControl className='app__dropdown'>
            <Select variant='outlined' value='abc'>
              {/*Loop through all the countries
                      and show a drop down list of the options  */}

              {countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}

              {/*               
              <MenuItem value='worlwide'>Worldwide</MenuItem>
              <MenuItem value='worlwide'>Option 1</MenuItem>
              <MenuItem value='worlwide'>Option 2</MenuItem>
              <MenuItem value='worlwide'>Option 3</MenuItem> */}
            </Select>
          </FormControl>
        </div>

        {/* Header */}
        {/* Title + Select input dropdown field */}

        {/* InfoBoxs */}
        {/* InfoBoxs */}
        {/* InfoBoxs */}

        {/* Table */}
        {/* Graph */}

        {/* Map */}
      </div>
    </>
  );
}

export default App;
