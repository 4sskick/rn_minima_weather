/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, Text} from 'react-native';
import {API_KEY} from './src/app/util/WeatherAPI';
import styles from './src/app/feature/weather.style';
import Weather from './src/app/feature/weather.component';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      temperature: 0,
      weatherCondition: null,
      error: null,
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.fetchWeather(
            position.coords.latitude,
            position.coords.longitude,
          );
        },
        (error) => {
          this.setState({
            error: `Error getting weather conditions`,
          });
        },
      );
    } else {
      console.log(
        `Navigator not available will be retrieved from 6.18202, 106.79421`,
      );
      this.fetchWeather(6.18202, 106.79421);
    }
  }

  fetchWeather(lat, lon) {
    let reqStr = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`;

    console.log(reqStr);

    fetch(reqStr)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);

        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          error: 'Error occured while fetching data',
        });
      });
  }

  render() {
    const {isLoading, temperature, weatherCondition, error} = this.state;

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Fetching data</Text>
        </View>
      );
    } else if (error) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Error: {error}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Weather
            weatherCondition={weatherCondition}
            temperature={temperature}
          />
        </View>
      );
    }
  }
}
export default App;
