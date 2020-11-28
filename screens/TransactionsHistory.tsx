import * as React from 'react';
import axios from 'axios';
import { StyleSheet, FlatList, ActivityIndicator  } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

const type = {
  recharge: 'Recarga',
  purchase: 'Compra'
}

export default function TabTwoScreen({ user }) {
  const [loading, setLoading] = React.useState(true);
  const [history, setHistory] = React.useState([]);
  const [nonHistory, setNonHistory] = React.useState('');

  React.useEffect(() => {
    axios.get(`https://api-ibus.herokuapp.com/transactions/${user.email}`).then((res) => {
      setHistory(res.data.reverse());
      setLoading(false);
    })
    .catch((err) => {
      setNonHistory('Não há transações.')
      setLoading(false);
    });
  }, []);

  const keyExtractor = (item, index) => index.toString()

  const renderIcon = (type) => {
    if (type === 'purchase') return (
      <Ionicons size={30} name='ios-trending-down' color='red' />
    ); else return (<Ionicons size={30} name='ios-trending-up' color='green' />);
  }

  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      {renderIcon(item.type)}
      <ListItem.Content>
        <ListItem.Title>{item.value + ' ' + type[item.type]}</ListItem.Title>
        <ListItem.Subtitle>{item.done_at}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )

  return (
    <View style={styles.container}>
      {loading ?
        (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color='blue' size='large' />
          </View>
        ) : history.length === 0 ?
        (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>Não há transações.</Text>
          </View>
        ) :
        (
          <FlatList
            keyExtractor={keyExtractor}
            data={history}
            renderItem={renderItem}
          />
        )
      }
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
  }
});
