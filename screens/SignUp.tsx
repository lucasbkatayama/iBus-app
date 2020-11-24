import * as React from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';

export default function SignUp({ navigation, setUser }) {
  const [inputs, setInputs] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const handleInputChange = (text, input) => {
    setInputs({ ...inputs, [input]: text });
  }

  const handleSignUp = () => {
    setLoading(true);
    axios.post('https://api-ibus.herokuapp.com/users', inputs).then((response) => {
      if (response.data.stored) {
        axios.post('https://api-ibus.herokuapp.com/auth', inputs).then((response) => {
          if (response.data.valid) setUser(response.data);
          setLoading(false);
        })
      };
    })
    .catch(err => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Nome</Text>
        <TextInput onChangeText={(text) => handleInputChange(text, 'name')} style={styles.input} />
        <Text>Email</Text>
        <TextInput onChangeText={(text) => handleInputChange(text, 'email')} style={styles.input} />
        <Text>CPF</Text>
        <TextInput onChangeText={(text) => handleInputChange(text, 'cpf')} style={styles.input} />
        <Text>Data de nascimento</Text>
        <TextInput onChangeText={(text) => handleInputChange(text, 'birth_date')} style={styles.input} />
        <Text>Senha</Text>
        <TextInput onChangeText={(text) => handleInputChange(text, 'password')} style={[styles.input, { marginBottom: 30 }]} secureTextEntry />
        <Button loading={loading} title='Cadastrar' onPress={handleSignUp} />
      </View>
      <TouchableOpacity style={styles.backContainer} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Voltar</Text>
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
  inputContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20
  },
  backContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  backText: {
    color: 'blue',
    fontWeight: 'bold'
  }
};
