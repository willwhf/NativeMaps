import { Text, View } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps'
import React from 'react';

export default class App extends React.Component {
  state = {
    position: {
      latitude: -16.47174293488215,
      longitude: -48.723814049503794,
      latitudeDelta: 40.9,
      longitudeDelta: 40.4
    },
    status: Boolean
  }

  async componentDidMount() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      this.setState({
        status: false
      })
      return;
    } else {
      this.setState({
        status: true
      })
    }

    if (this.state.status == true) {
      const location = await Location.getCurrentPositionAsync({});
      console.log(location)
      this.setState({
        position: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
      })
    }
  }

  render() {
    const { position, status } = this.state
    // console.log(position.latitude, position.longitude)
    // console.log(status)

    if (status == true) {
      return (
        <View style={{ flex: 1, marginTop: 32 }}>
          <MapView
            style={{ flex: 1 }}
            showsUserLocation={true}
            userLocationPriority='high'
            userLocationUpdateInterval={3000}
            initialRegion={{
              latitude: position.latitude,
              longitude: position.longitude,
              latitudeDelta: position.latitudeDelta,
              longitudeDelta: position.longitudeDelta
            }}
          />
        </View >
      )
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Sem Permissoes</Text>
        </View>
      )
    }

  }
}
