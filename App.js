import { Text, View } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps'
import React from 'react';

export default class App extends React.Component {
  state = {
    position: {
      latitude: -16.47174293488215,
      longitude: -48.723814049503794,
      latitudeDelta: 40.9,
      longitudeDelta: 40.4
    },
    positions: [
      { latitude: -31.76260634872427, longitude: -52.32935242161718 },
      { latitude: -31.759057804342657, longitude: -52.31733612520161 },
      { latitude: -31.757288042395366, longitude: -52.30789474947888 },
      { latitude: -31.753637696001494, longitude: -52.29918755217337 },
      { latitude: -31.75299759953349, longitude: -52.29007776313109 },
      { latitude: -31.755373528457003, longitude: -52.27477995212575 },
      { latitude: -31.758432853928834, longitude: -52.262033902751384 },
      { latitude: -31.759235638931035, longitude: -52.251201674604374 },
      { latitude: -31.76341217812493, longitude: -52.2425639615042 },
      { latitude: -31.769183085725146, longitude: -52.23003481183474 },
      { latitude: -31.768412929030063, longitude: -52.22715132117129 },

    ],
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
      // console.log(location)
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
    const { position, positions, status } = this.state

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
          >
            {positions.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              />
            ))}
            <Polyline
              coordinates={positions}
              strokeColor="blue"
              strokeWidth={2}
            />
          </MapView>
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
