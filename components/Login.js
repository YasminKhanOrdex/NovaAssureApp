import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import theme from '../styling';
const Login = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [job, setJob] = useState('');
  const [address, setAdress] = useState('');
  const [stayLogin, setstayLogin] = useState(false);
  const onSubmitClicked = () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      job: job,
      address: address,
      stayLogin: stayLogin,
    };
    console.log('----data-----', data);
    navigation.navigate('Home');
  };
  const login = () => {
    setstayLogin(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{marginHorizontal: 2}}>
        <View>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../Images/logo_new.png')}
            />
          </View>
          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.descText}>Sign In</Text>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.inputText}>First Name</Text>
              <TextInput
                onChangeText={e => setFirstName(e)}
                style={styles.input}
                value={firstName}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.inputText}>Last name </Text>
              <TextInput
                onChangeText={e => setLastName(e)}
                value={lastName}
                style={styles.input}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.inputText}>Job</Text>
              <TextInput
                onChangeText={e => setJob(e)}
                value={job}
                style={styles.input}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.inputText}>Address </Text>
              <TextInput
                onChangeText={e => setAdress(e)}
                multiline={true}
                editable={true}
                numberOfLines={5}
                keyboardType="default"
                value={address}
                style={{
                  paddingLeft: 10,
                  height: 95,
                  borderRadius: 5,
                  backgroundColor: '#E4E4E4',
                  borderWidth: 1.5,
                  borderColor: '#AEAEAE',
                }}
              />
              {/* <TouchableOpacity
                onPress={login}
                style={{
                  height: 40,
                  width: 360,
                  backgroundColor: 'blue',
                  marginTop: 20,
                }}>
                <Text style={{textAlign: 'center', color: 'white'}}>
                  Stay Login
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
          <View style={styles.submit}>
            {firstName !== '' &&
            lastName !== '' &&
            job !== '' &&
            address !== '' ? (
              <TouchableOpacity
                onPress={() => onSubmitClicked()}
                bg={theme.colors.blue}
                style={{
                  height: 48,
                  //   alignContent: 'center',
                  borderRadius: 6,
                  backgroundColor: theme.colors.blue,
                  color: theme.colors.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.btn}>Submit</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                op={0.8}
                style={{
                  height: 48,
                  opacity: 0.5,
                  //   alignContent: 'center',
                  borderRadius: 6,
                  backgroundColor: theme.colors.blue,
                  color: theme.colors.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                disabled
                onPress={() => onSubmitClicked()}>
                <Text style={styles.btn}>Submit</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    // <SafeAreaView style={styles.container}>

    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    marginTop: 70,
    width: 310,
    height: 90,
  },
  descContainer: {
    flex: 0.5,
    padding: 15,
    justifyContent: 'center',
  },
  input: {
    paddingLeft: 10,
    height: 42,
    borderRadius: 5,
    backgroundColor: '#E4E4E4',
    borderWidth: 1.5,
    borderColor: '#AEAEAE',
  },
  btn: {
    fontSize: 16,
    color: theme.colors.white,
    fontWeight: '600',
  },
  descText: {
    color: theme.colors.green,
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
  },
  form: {
    flex: 2,
    padding: 15,

    // justifyContent: 'center',
  },
  inputText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.black,
    marginBottom: 10,
  },
  submit: {
    padding: 15,
    flex: 1,
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 40,
    // backgroundColor: 'red',
  },
  formGroup: {
    marginTop: 20,
  },
});
export default Login;
