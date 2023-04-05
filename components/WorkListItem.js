/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import theme from '../styling';

function WorkListItem({userId, id, title, completed, onDetailClick}) {
  const containerStyle = options => {
    return {
      borderWidth: 1.5,
      borderColor: '#999999',
      padding: 10,
      borderRadius: 3,
      marginTop: 10,
      backgroundColor: theme.colors.white,
    };
  };

  return (
    <TouchableOpacity
      onPress={() => onDetailClick()}
      // onPress={() =>
      //   navigation.navigate('SecondPage', {
      //     paramKey: userName,
      //   })
      // }
    >
      <View style={containerStyle()}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 16,
                  marginBottom: 5,
                  //marginRight: 20,
                  color: theme.colors.black,
                }}>
                Vehicle ID:
              </Text>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 16,
                  marginBottom: 5,
                  //marginRight: 20,
                  color: theme.colors.black,
                }}>
                VIN:
              </Text>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 16,
                  marginBottom: 5,
                  //marginRight: 20,
                  color: theme.colors.black,
                }}>
                Device ID:
              </Text>
            </View>
            <View
              style={{
                marginLeft: 10,
                marginRight: 10,
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 16,
                  marginBottom: 5,
                  //marginRight: 20,
                  color: theme.colors.black,
                }}>
                {id}
              </Text>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 16,
                  marginBottom: 5,
                  //marginRight: 20,
                  color: theme.colors.black,
                }}>
                {userId}
              </Text>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 16,
                  marginBottom: 5,
                  //marginRight: 20,
                  color: theme.colors.black,
                }}>
                Hello
              </Text>
            </View>
          </View>

          <View
            style={{
              padding: 5,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#39D13E',
                height: 19,
                width: 19,
                borderRadius: 15,
                borderColor: '#707070',
                borderWidth: 1.5,
                // marginLeft: 90,
              }}></TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default WorkListItem;
