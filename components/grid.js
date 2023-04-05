import React, {useEffect, useState, useRef} from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  FlatList,
  Platform,
  Alert,
  PermissionsAndroid,
  Modal,
} from 'react-native';
import theme from '../styling';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Grid = () => {
  const [images, setimages] = useState([
    require('../Images/logo_new.png'),
    require('../Images/logo_new.png'),
    require('../Images/logo_new.png'),
  ]);
  const [initial, setInitial] = useState(true);
  const [picture, setPictures] = useState([]);
  const flatListRef = useRef();
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const [object, setObject] = useState([
    {
      id: '',
      uri: '',
      mandatory: '',
    },
    {
      id: '',
      uri: '',
      mandatory: '',
    },
    {
      id: '',
      uri: '',
      mandatory: '',
    },
  ]);
  const [add, setAdd] = useState([
    {
      id: '',
      uri: '',
      mandatory: '',
    },
  ]);
  var data = [
    {
      deviceID: '',
      deviceURI: [],
      deviceMandatory: '',
    },
    {
      VehicleID: '',
      VehicleURI: [],
      VehicleMandatory: '',
    },
    {
      InstallID: '',
      InstallURI: [],
      InstallMandatory: '',
    },
  ];
  const openGallery = id => {
    const options3 = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
      usedCameraButton: false,
    };
    launchImageLibrary(options3, setPictures);
    let url = picture?.assets && picture.assets[0].uri;
    // console.log('-------id------', id);
    const _update = async (text, index) => {
      const newArray = [...object];
      newArray[index].uri = await text;
      setObject(newArray);
    };
    _update(url, id);
    setInitial(false);
  };

  const openCamera = id => {
    const options3 = {
      selectionLimit: 1,
      mediaType: 'photo',
      saveToPhotos: true,
    };
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            launchCamera(options3, response => {
              setPictures(response);
              console.log('-------response------', response);
              const _update = async (text, index) => {
                const newArray = [...object];
                newArray[index].uri = await text;
                setObject(newArray);
              };
              let url = picture?.assets && picture.assets[0].uri;

              _update(url, id);
              setInitial(false);
            });
          } else {
            Alert.alert('CAMERA permission denied');
          }
        } catch (err) {
          Alert.alert('Camera permission err', err);
          console.warn(err);
        }
      }
      // Calling the camera permission function
      requestCameraPermission();
    } else {
    }
  };
  const renderItem = ({index, item}) => {
    console.log('------render item------', item.uri);

    return (
      <View
        style={{
          width: 180,
          height: 180,
          borderColor: '#AEAEAE',
          borderWidth: 1,
          resizeMode: 'contain',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          margin: 8,
        }}>
        {item.uri && (
          <Image
            style={{
              position: 'absolute',
              width: 180,
              height: 180,
            }}
            source={{uri: item.uri}}
          />
        )}

        <TouchableOpacity
          onPress={() => openCamera(index)}
          style={{marginBottom: 10, marginRight: 10}}>
          <Image source={require('../Images/Camera.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openGallery(index)}
          style={{marginBottom: 10, marginRight: 10}}>
          <Image source={require('../Images/Album.png')}></Image>
        </TouchableOpacity>
      </View>
    );
  };
  const renderItemForAdd = ({index, item}) => {
    console.log('------render item------', item.uri);

    return (
      <View>
        <View>
          {item.uri && (
            <Image
              style={{
                // position: 'absolute',
                width: 180,
                height: 180,
              }}
              source={{uri: item.uri}}
            />
          )}
        </View>

        <View
          style={{
            width: 180,
            height: 180,
            borderColor: '#AEAEAE',
            borderWidth: 1,
            resizeMode: 'contain',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 8,
          }}>
          <TouchableOpacity
            onPress={() => openGallery(index)}
            style={{marginBottom: 10, marginRight: 10}}>
            <Image source={require('../Images/add.png')}></Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        // style={{backgroundColor: 'red'}}
        //   horizontal={true}
        //   showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        renderItem={renderItem}
        data={object}
        key={'#'}
        numColumns={2}></FlatList>
      <FlatList
        style={{flexDirection: 'row-reverse'}}
        renderItem={renderItemForAdd}
        data={add}
        key={'###'}
        numColumns={2}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  titleMode: {fontSize: 20, fontWeight: '600', color: theme.colors.black},
  textModel: {fontSize: 16, fontWeight: '300', color: theme.colors.black},
});

export default Grid;
