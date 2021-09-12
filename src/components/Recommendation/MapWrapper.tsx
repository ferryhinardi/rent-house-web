import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  GoogleAPI,
} from 'google-maps-react';
import config from 'config';
import { Text } from 'core/base';

type Props = {
  google: GoogleAPI;
};

function MapWrapper({ google }: Props) {
  const onInfoWindowClose = useCallback(() => {}, []);
  const onMarkerClick = useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      {/* @ts-ignore */}
      <Map google={google} zoom={14}>
        {/* @ts-ignore */}
        <Marker onClick={onMarkerClick} name={'Current location'} />

        {/* @ts-ignore */}
        <InfoWindow onClose={onInfoWindowClose}>
          <Text>{'this.state.selectedPlace.name'}</Text>
        </InfoWindow>
      </Map>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 580,
  },
});

export default GoogleApiWrapper({
  apiKey: config.googleAPIKey,
})(MapWrapper);
