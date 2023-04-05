import React, {useEffect, useState} from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import theme from '../styling';
function SideBar({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'column'}}>
        <View style={styles.logoContainer}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={styles.logo}
              source={require('../Images/logo_nova.png')}
            />
          </View>
          <View style={{justifyContent: 'flex-end', backgroundColor: 'red'}}>
            <TouchableOpacity
              style={{width: 30, height: 30}}
              onPress={() => navigation.closeDrawer()}>
              <Image
                style={styles.inputLogo}
                source={require('../Images/Menu.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.itemText}>Registration</Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: '#BEBEBE',
              marginBottom: 20,
            }}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Worklist')}>
          <Text style={styles.itemText}>WorkList</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  images: {
    flexDirection: 'row',
    // justifyContent: 'center',
    backgroundColor: 'yellow',
  },
  logo: {
    width: 180,
    height: 60,
  },
  logoContainer: {
    flex: 1,
    padding: 10,
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    marginTop: 50,
  },
  itemText: {fontSize: 22, color: '#040707', fontWeight: '600'},
  logo_text: {
    width: 110,
    height: 70,
  },
  inputLogo: {
    width: 30,
    height: 30,
    // alignItems: 'flex-end',
  },
  menu: {
    paddingLeft: 25,
    flex: 3,
    justifyContent: 'center',
  },
  profile: {
    paddingLeft: 25,
    justifyContent: 'center',
  },
  welcomeText: {
    color: theme.colors.black,
    fontWeight: '200',
  },
  profileText: {
    color: theme.colors.blue,
    fontWeight: '400',
  },
  logout: {
    justifyContent: 'flex-end',
    paddingLeft: 25,
  },
});
export default SideBar;
