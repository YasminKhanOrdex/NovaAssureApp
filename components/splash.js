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
const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(function () {
      navigation.navigate('Home');
    }, 1000);
  });
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../Images/logo_new.png')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
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
export default Splash;
