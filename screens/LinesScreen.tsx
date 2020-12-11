import * as React from 'react';
import axios from 'axios';
import { StyleSheet, FlatList, ActivityIndicator  } from 'react-native';
import { ListItem, Icon, Overlay, Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

const type = {
  recharge: 'Recarga',
  purchase: 'Compra'
}

const data = [
  {
    "line": "01",
    "agency": "Valônia",
    "name": "SANTA ROSA X VILA ISABEL"
  },
  {
    "line": "02",
    "agency": "Valônia",
    "name": "CRUZEIRO X SANTA ROSA"
  },
  {
    "line": "03",
    "agency": "Valônia",
    "name": "REBOURGEON X SANTA ROSA"
  },
  {
    "line": "06",
    "agency": "Valônia",
    "name": "JARDIM DAS NACOES X SANTA ROSA"
  },
  {
    "line": "11A",
    "agency": "Valônia",
    "name": "NOVO HORIZONTE X SANTA ROSA"
  }
];

export default function LinesScreen({ navigation }) {
  const [visible, setVisible] = React.useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleNavigateButton = (path) => {
    toggleOverlay();
    navigation.navigate(path);
  }

  const keyExtractor = (item, index) => index.toString()
  const renderItem = ({ item }) => (
    <ListItem bottomDivider onPress={toggleOverlay}>
      <ListItem.Content>
        <ListItem.Title>{item.agency}</ListItem.Title>
        <ListItem.Subtitle>{`Linha ${item.line} - ${item.name}`}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  )

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem}
      />
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={styles.overlayContainer}>
          <Button title='Exibir Rota' onPress={() => handleNavigateButton('Path')} />
          <Button title='Exibir Horários' onPress={() => handleNavigateButton('Hours')} />
        </View>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    alignItems: 'center',
    padding: 20
  },
  error: {
    color: '#aaa'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  overlayContainer: {
    height: 150,
    padding: 20,
    justifyContent: 'space-between'
  }
});
