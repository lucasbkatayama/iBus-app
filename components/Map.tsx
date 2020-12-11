import * as React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';

import html_script from '../html_script_leaflet';

export default function Map() {
  const mapRef = React.useRef();

  React.useEffect(() => {
    axios.get('https://api-ibus.herokuapp.com/stops').then((res) => {
      let jsString = '';
      res.data.map(marker => {
        jsString += `
          L.marker([${marker.latitude}, ${marker.longitude}]).addTo(mymap)
          .bindPopup("${marker.address}").openPopup();
          `
      });

      mapRef.current.injectJavaScript(jsString);
    });
  }, []);

  return (
      <WebView
        ref={mapRef}
        source={{ html: html_script }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  }
});
