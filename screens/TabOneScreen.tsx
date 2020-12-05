import * as React from 'react';
import axios from 'axios';
import { StyleSheet, TextInput, Dimensions, Keyboard, SafeAreaView } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import { WebView } from 'react-native-webview';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Map from '../components/Map';

const windowWidth = Dimensions.get('window').width;

export default function TabOneScreen({ user, setUser }) {
  const [visible, setVisible] = React.useState(false);
  const [line, setLine] = React.useState('');
  const [lineErr, setLineErr] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
    setLineErr('');
  };

  const handleInputChange = (text) => {
    setLine(text);
  }

  const purchaseLine = () => {
    Keyboard.dismiss();

    const sender = {
      description: line,
      user: user.email
    };
    setLoading(true);

    axios.post('https://api-ibus.herokuapp.com/purchase', sender).then((res) => {
      setUser({ ...user, balance: res.data.new_balance });
      toggleOverlay();
      setLoading(false);
    })
    .catch((err) => {
      setLine('');
      setLineErr('Código de linha inválida');
      setLoading(false);
    });
  };

  return (
    <>
      <Map />
      <SafeAreaView style={styles.container}>
        <Button title='Comprar passagem' onPress={toggleOverlay} />
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <View style={styles.inputContainer}>
            <Text>Código da linha:</Text>
            <TextInput onChangeText={handleInputChange} style={styles.input} />
            <Text style={styles.lineError}>{lineErr}</Text>
            <Button loading={loading} title='Comprar' onPress={purchaseLine} />
          </View>
        </Overlay>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  inputContainer: {
    width: windowWidth * 0.8,
    padding: 20,
    borderRadius: 5,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 5
  },
  lineError: {
    color: 'red',
    marginBottom: 20
  },
  webview: {
    flex: 1,
  }
});
