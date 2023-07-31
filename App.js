/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, Text, SafeAreaView, NativeModules} from 'react-native';
import {API_KEY} from './src/app/util/WeatherAPI';
import styles from './src/app/feature/weather.style';
import Weather from './src/app/feature/weather.component';
import {checkPermissionLocation} from './src/app/util/PermissionUtils';

// const {PermissionModule} = NativeModules;

class App extends React.Component {
  _isMounted = false;

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
    this._isMounted = true;
    this.checkPermission();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  checkPermission = async () => {
    let lat = 0,
      lon = 0;
    try {
      const position = await checkPermissionLocation();
      this.fetchWeather(position.coords.latitude, position.coords.longitude);
    } catch (error) {
      console.log(`Permission error: ${error}`);
    }
  };

  fetchWeather(lat, lon) {
    let reqStr = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`;

    console.log(reqStr);

    fetch(reqStr)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);

        if (this._isMounted)
          this.setState({
            temperature: json.main.temp,
            weatherCondition: json.weather[0].main,
            isLoading: false,
          });
      })
      .catch((error) => {
        if (this._isMounted)
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
        <SafeAreaView style={styles.container}>
          <Weather
            weatherCondition={weatherCondition}
            temperature={temperature}
          />
        </SafeAreaView>
      );
    }
  }
}
export default App;
