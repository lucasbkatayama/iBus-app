import * as React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import html_script from '../html_script_leaflet';

export default function Map({ user, setUser }) {

  return (
      <WebView
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
