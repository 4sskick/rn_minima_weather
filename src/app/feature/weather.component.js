import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {weatherConditions} from '../util/WeatherConditions';
import styles from './weather.style';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherCondition: this.props.weatherCondition,
      temperature: this.props.temperature,
    };
  }

  render() {
    return (
      <View
        style={[
          styles.weatherContainer,
          {
            backgroundColor:
              weatherConditions[this.state.weatherCondition].color,
          },
        ]}>
        <View style={styles.headerContainer}>
          <Icon
            name={weatherConditions[this.state.weatherCondition].icon}
            size={72}
            color="#fff"
            onPress={() => console.log('hello')}
          />
          <Text style={styles.tempText}>{this.state.temperature}</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.title}>
            {weatherConditions[this.state.weatherCondition].title}
          </Text>
          <Text style={styles.subtitle}>
            {weatherConditions[this.state.weatherCondition].subtitle}
          </Text>
        </View>
      </View>
    );
  }
}

export default Weather;
