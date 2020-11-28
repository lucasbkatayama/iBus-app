import * as React from 'react';
import axios from 'axios';
import { Button, Icon } from 'react-native-elements';
import { TextInput, View, Text, TouchableOpacity, Keyboard  } from 'react-native';

export default function SignIn({ navigation, setUser }) {
  const [inputs, setInputs] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const handleInputChange = (text, input) => {
    setInputs({ ...inputs, [input]: text });
  }

  const handleSignIn = () => {
    setLoading(true);
    Keyboard.dismiss();
    axios.post('https://api-ibus.herokuapp.com/auth', inputs).then((response) => {
      if (response.data.valid) setUser(response.data);
      setLoading(false);
    })
    .catch(err => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>iBus</Text>
        <Icon name='bus' type='material-community' size={40} />
      </View>
      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <TextInput onChangeText={(text) => handleInputChange(text, 'email')} style={styles.input} />
        <Text>Senha</Text>
        <TextInput onChangeText={(text) => handleInputChange(text, 'password')} style={[ styles.input, { marginBottom: 25 } ]} secureTextEntry />
        <Button loading={loading} title='Entrar' onPress={() => handleSignIn()} />
      </View>
      <TouchableOpacity style={styles.signUpContainer} onPress={() => navigation.push('Cadastro')}>
        <Text>Não possuí conta? </Text>
        <Text style={styles.signUpText}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#e3f2fd'
  },
  title: {
    fontSize: 40,
    marginRight: 10
  },
  titleContainer: {
    flexDirection: 'row',
    marginTop: 50,
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10
  },
  signUpContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  signUpText: {
    color: 'blue',
    fontWeight: 'bold'
  }
};
