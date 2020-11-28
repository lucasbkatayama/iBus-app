import * as React from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';

export default function UpdateUser({ navigation, setUser, user }) {
  const [inputs, setInputs] = React.useState(user);
  const [loading, setLoading] = React.useState(false);

  const handleInputChange = (text, input) => {
    setInputs({ ...inputs, [input]: text });
  }

  const handleUpdateUser = () => {
    setLoading(true);
    axios.put(`https://api-ibus.herokuapp.com/users/${user.email}`, inputs).then((response) => {
      if (response.data.changed) {
        const { name, email, cpf, birth_date } = inputs;
        setUser({ ...user, name: inputs.name, email: inputs.email, cpf: inputs.cpf, birth_date: inputs.birth_date });
        setLoading(false);
      };
    })
    .catch(err => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Nome</Text>
        <TextInput value={inputs.name} onChangeText={(text) => handleInputChange(text, 'name')} style={styles.input} />
        <Text>Email</Text>
        <TextInput value={inputs.email} onChangeText={(text) => handleInputChange(text, 'email')} style={styles.input} />
        <Text>CPF</Text>
        <TextInput value={inputs.cpf} onChangeText={(text) => handleInputChange(text, 'cpf')} style={styles.input} />
        <Text>Data de nascimento</Text>
        <TextInput value={inputs.birth_date} onChangeText={(text) => handleInputChange(text, 'birth_date')} style={styles.input} />
        <Button loading={loading} title='Atualizar' onPress={handleUpdateUser} />
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
