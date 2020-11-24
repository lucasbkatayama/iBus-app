import * as React from 'react';
import axios from 'axios';
import { StyleSheet, TextInput, Dimensions } from 'react-native';
import { ListItem, Button, Overlay, Icon } from 'react-native-elements'

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

const windowWidth = Dimensions.get('window').width;

export default function TabTwoScreen({ user, setUser, navigation }) {
  const [visible, setVisible] = React.useState(false);
  const [voucher, setVoucher] = React.useState('');
  const [voucherErr, setVoucherErr] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
    setVoucherErr('');
  };

  const handleInputChange = (text) => {
    setVoucher(text);
  }

  const redeemVoucher = () => {
    const sender = {
      voucher,
      user: user.email
    };
    setLoading(true);

    axios.post('https://api-ibus.herokuapp.com/voucher/redeem', sender).then((res) => {
      setUser({ ...user, balance: res.data.new_balance });
      toggleOverlay();
      setLoading(false);
    })
    .catch((err) => {
      setVoucher('');
      setVoucherErr('Voucher inválido');
      setLoading(false);
    });
  };

  return (
    <View style={styles.container}>
      <ListItem bottomDivider>
        <Icon name='person' />
        <ListItem.Content>
          <ListItem.Title>{`Nome: ${user.name}`}</ListItem.Title>
        </ListItem.Content>
      </ListItem>

      <ListItem bottomDivider>
        <Icon name='mail' />
        <ListItem.Content>
          <ListItem.Title>{`Email: ${user.email}`}</ListItem.Title>
        </ListItem.Content>
      </ListItem>

      <ListItem bottomDivider>
        <Icon name='today' />
        <ListItem.Content>
          <ListItem.Title>{`Data de nascimento: ${user.birth_date}`}</ListItem.Title>
        </ListItem.Content>
      </ListItem>

      <ListItem bottomDivider>
        <Icon name='description' />
        <ListItem.Content>
          <ListItem.Title>{`CPF: ${user.cpf}`}</ListItem.Title>
        </ListItem.Content>
      </ListItem>

      <ListItem bottomDivider>
        <Icon name='payment' />
        <ListItem.Content>
          <ListItem.Title>{`Créditos: ${user.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}</ListItem.Title>
          <ListItem.Subtitle>Utilize para comprar passagens</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>

      <ListItem bottomDivider onPress={() => navigation.push('Transactions')}>
        <Icon name='history' />
        <ListItem.Content>
          <ListItem.Title>Histórico de transações</ListItem.Title>
          <ListItem.Subtitle>Clique aqui para ver seu histórico</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      <View style={styles.buttonsContainer}>
        <Button buttonStyle={styles.button} title='Adicionar Créditos' onPress={toggleOverlay} />
        <Button title='Sair' buttonStyle={styles.exitButton} onPress={() => setUser(null)} />
      </View>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={styles.inputContainer}>
          <Text>Código do Voucher:</Text>
          <TextInput onChangeText={handleInputChange} style={styles.input} />
          <Text style={styles.voucherError}>{voucherErr}</Text>
          <Button loading={loading} title='Adicionar' onPress={redeemVoucher} />
        </View>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f2fd'
  },
  buttonsContainer: {
    padding: 20,
    marginTop: 10,
    backgroundColor: '#e3f2fd'
  },
  button: {
    marginBottom: 20
  },
  exitButton: {
    backgroundColor: '#f44336'
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
  voucherError: {
    color: 'red',
    marginBottom: 20
  }
});
