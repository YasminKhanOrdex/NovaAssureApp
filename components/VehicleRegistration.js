import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  Linking,
  Text,
  View,
  Dimensions,
  PermissionsAndroid,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  FlatList,
  AppState,
} from 'react-native';
import theme from '../styling';
import {CameraScreen} from 'react-native-camera-kit';
import RNQRGenerator from 'rn-qr-generator';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Modal from 'react-native-modal';
const VehicleRegistration = ({navigation, route}) => {
  const [vehicle, setVehicle] = useState('');
  const [vin, setVin] = useState('');
  const [qrvalue, setQrvalue] = useState('');
  const [opneScanner, setOpneScanner] = useState(false);
  const [openDeviceScanner, setOpenDeviceScanner] = useState(false);
  const [opneVinScanner, setOpneVinScanner] = useState(false);
  const [device, setDevice] = useState('');
  const [images, setImages] = useState([]);
  const [picforDevise, setPicforDevise] = useState(null);
  const [picforVehicle, setPicforVehicle] = useState(null);
  const [picforinstallDevice, setPicforinstallDevice] = useState(null);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const openScanner = id => {
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            if (id == 'vin') {
              setVin('');
              setOpneScanner(true);
              setOpneVinScanner(true);
            } else if (id == 'device') {
              setDevice('');
              setOpneScanner(true);
              setOpenDeviceScanner(true);
            } else {
              return;
            }
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
      setVin('');
      setOpneScanner(true);
      setOpneVinScanner(true);
    }
    console.log('setOpneVinScanner----------------', opneVinScanner);
  };
  const onBarcodeScanForVIN = qrval => {
    // Called after te successful scanning of QRCode/Barcode
    setVin(qrval);
    setOpneScanner(false);
    setOpneVinScanner(false);
  };
  const onBarcodeScanForDevice = qrvalue => {
    // Called after te successful scanning of QRCode/Barcode
    setDevice(qrvalue);
    setOpneScanner(false);
    setOpenDeviceScanner(false);
  };
  const openGallery = id => {
    const options3 = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
      usedCameraButton: false,
    };
    if (id == 'AlbumDevice') {
      launchImageLibrary(options3, setPicforDevise);
    } else if (id == 'AlbumVehicle') {
      launchImageLibrary(options3, setPicforVehicle);
    } else if (id == 'AlbumInstall') {
      launchImageLibrary(options3, setPicforinstallDevice);
    } else {
      launchImageLibrary(options3, setImages);
      setIsModalVisible(() => !isModalVisible);
    }
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
            if (id == 'cameraDevice') {
              launchCamera(options3, response => {
                setPicforDevise(response);
              });
            } else if (id == 'cameraVehicle') {
              launchCamera(options3, response => {
                setPicforVehicle(response);
              });
            } else if (id == 'cameraInstall') {
              launchCamera(options3, response => {
                setPicforinstallDevice(response);
              });
            } else {
              launchCamera(options3, response => {
                setImages(response);
                setIsModalVisible(() => !isModalVisible);
              });
            }
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
  const renderItem = ({item, index}) => {
    console.log('------render images------', item?.crop?.cropPath ?? item.path);
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          margin: 1,
        }}>
        {console.log(
          '------render images------',
          item?.crop?.cropPath ?? item.path,
        )}
        <Image
          // width={IMAGE_WIDTH}
          source={{
            uri: images.assets[0].uri,
            //  item?.type === 'video'
            //    ? item?.thumbnail ?? ''
            //    : 'file://' + (item?.crop?.cropPath ?? item.path),
          }}
          style={styles.media}
        />
        <TouchableOpacity
          onPress={() => onDelete(item)}
          activeOpacity={0.9}
          style={styles.buttonDelete}>
          <Text style={styles.titleDelete}>DEL</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const vehicleUri = picforVehicle?.assets && picforVehicle.assets[0].uri;
  const DeviceUri = picforDevise?.assets && picforDevise.assets[0].uri;
  const installDeviceUri =
    picforinstallDevice?.assets && picforinstallDevice.assets[0].uri;
  const onSubmitClicked = () => {
    const data = {
      vehicle: vehicle,
      vin: vin,
      device: device,
    };
    console.log('----data-----', data);
    navigation.navigate('Worklist');
  };
  // const appState = useRef(AppState.currentState);
  // const [appStateVisible, setAppStateVisible] = useState(appState.current);
  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === 'active'
  //     ) {
  //       console.log('App has come to the foreground!');
  //       navigation.navigate('splash');
  //     }

  //     appState.current = nextAppState;
  //     setAppStateVisible(appState.current);
  //     console.log('AppState', appState.current);
  //     if (appState.current === 'background') {
  //     }
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);
  return (
    <SafeAreaView style={styles.container}>
      {!opneScanner ? (
        <ScrollView style={{marginHorizontal: 2}}>
          <View>
            <View style={styles.logoContainer}>
              <View style={{justifyContent: 'flex-start', marginTop: 5}}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <Image
                    style={{width: 30, height: 30}}
                    source={require('../Images/Menu.png')}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={styles.logo}
                  source={require('../Images/logo_nova.png')}
                />
              </View>
            </View>
            <Text style={styles.textTitle}>Vehicle Registration</Text>
            <Text>{route.params ? route.params.id : ''}</Text>
            <View
              style={{
                padding: 15,
                marginTop: 40,
              }}>
              <Text style={styles.inputText}>Vehicle</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={e => setVehicle(e)}
                defaultValue={
                  vehicle ? vehicle : route.params ? route.params.id : ''
                }
              />
              <Text style={styles.inputText}>
                Vehicle Identification Number
              </Text>
              <View
                style={[
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: theme.colors.white,
                  },
                  styles.textInput,
                ]}>
                <TextInput
                  style={[{flex: 1, marginRight: 10}]}
                  defaultValue={
                    vin ? vin : route.params ? route.params.userId : ''
                  }
                  onChangeText={e => setVin(e)}
                />
                <TouchableOpacity onPress={() => openScanner('vin')}>
                  <Image
                    style={styles.inputLogo}
                    source={require('../Images/Scanner.png')}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.inputText}>Device</Text>
              <View
                style={[
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: theme.colors.white,
                  },
                  styles.textInput,
                ]}>
                <TextInput
                  style={[{flex: 1, marginRight: 10}]}
                  defaultValue={
                    device ? device : route.params ? route.params.title : ''
                  }
                  onChangeText={e => setDevice(e)}
                />
                <TouchableOpacity onPress={() => openScanner('device')}>
                  <Image
                    style={styles.inputLogo}
                    source={require('../Images/Scanner.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{padding: 10}}>
              <Text style={styles.addPicture}>Add Pictures</Text>

              <View style={styles.boxContainer}>
                <View style={{flex: 2, marginRight: 15}}>
                  <Text style={styles.textImages}>Device</Text>
                  <View style={styles.imageContainer}>
                    {DeviceUri && (
                      <Image
                        resizeMode="cover"
                        source={{uri: DeviceUri}}
                        style={{
                          position: 'absolute',
                          height: 160,
                          width: 180,
                        }}></Image>
                    )}
                    <TouchableOpacity
                      onPress={() => openCamera('cameraDevice')}
                      style={{marginBottom: 10, marginRight: 10}}>
                      <Image source={require('../Images/Camera.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => openGallery('AlbumDevice')}
                      style={{marginBottom: 10, marginRight: 10}}>
                      <Image source={require('../Images/Album.png')}></Image>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{flex: 2}}>
                  <Text style={styles.textImages}>vehicle</Text>
                  <View style={styles.imageContainer}>
                    {vehicleUri && (
                      <Image
                        source={{uri: vehicleUri}}
                        style={{
                          position: 'absolute',
                          height: 160,
                          width: 180,
                        }}></Image>
                    )}
                    <TouchableOpacity
                      onPress={() => openCamera('cameraVehicle')}
                      style={{marginBottom: 10, marginRight: 10}}>
                      <Image source={require('../Images/Camera.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => openGallery('AlbumVehicle')}
                      style={{marginBottom: 10, marginRight: 10}}>
                      <Image source={require('../Images/Album.png')}></Image>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.boxContainer}>
                <View style={{flex: 2, marginRight: 15}}>
                  <Text style={styles.textImages}>Install Device</Text>
                  <View style={styles.imageContainer}>
                    {installDeviceUri && (
                      <Image
                        resizeMode="cover"
                        source={{uri: installDeviceUri}}
                        style={{
                          position: 'absolute',
                          height: 160,
                          width: 180,
                        }}></Image>
                    )}
                    <TouchableOpacity
                      onPress={() => openCamera('cameraInstall')}
                      style={{marginBottom: 10, marginRight: 10}}>
                      <Image source={require('../Images/Camera.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => openGallery('AlbumInstall')}
                      style={{marginBottom: 10, marginRight: 10}}>
                      <Image source={require('../Images/Album.png')}></Image>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{flex: 2}}>
                  <Text style={styles.textImages}>Picture</Text>
                  <View
                    style={{
                      backgroundColor: theme.colors.white,
                      borderColor: '#AEAEAE',
                      borderWidth: 1,
                      height: 160,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      onPress={() => setIsModalVisible(() => !isModalVisible)}>
                      <Image source={require('../Images/add.png')} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* {console.log('----images------', images.assets[0].uri)} */}
              {/* <FlatList
                style={{position: 'relative', paddingTop: 6}}
                data={images}
                key={'#'}
                keyExtractor={(item, index) =>
                  (item?.filename ?? item?.path) + index
                }
                renderItem={renderItem}
                numColumns={2}
              /> */}
              <Modal isVisible={isModalVisible}>
                <View
                  style={{backgroundColor: theme.colors.white, padding: 15}}>
                  <Text style={styles.titleMode}>Select Image</Text>
                  <TouchableOpacity
                    style={{
                      marginTop: 10,
                    }}
                    onPress={() => openCamera('abc')}>
                    <Text style={styles.textModel}>Take Photo..</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginTop: 10,
                    }}
                    onPress={() => openGallery('aabd')}>
                    <Text style={styles.textModel}>Choos from Library</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{alignItems: 'flex-end'}}
                    onPress={() => setIsModalVisible(() => !isModalVisible)}>
                    <Text style={styles.titleMode}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
            <View style={styles.submit}>
              {vehicle !== '' && vin !== '' && device !== '' ? (
                <TouchableOpacity
                  onPress={() => onSubmitClicked()}
                  bg={theme.colors.blue}
                  style={{
                    height: 51,
                    //   alignContent: 'center',
                    borderRadius: 5,
                    backgroundColor: theme.colors.blue,
                    color: theme.colors.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // marginTop: 150,
                  }}>
                  <Text style={styles.btn}>Submit</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  op={0.8}
                  style={{
                    height: 51,
                    opacity: 0.5,
                    //   alignContent: 'center',
                    borderRadius: 5,
                    backgroundColor: theme.colors.blue,
                    color: theme.colors.white,
                    alignItems: 'center',
                    // marginTop: 150,
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
      ) : openDeviceScanner && !opneVinScanner ? (
        <View style={{flex: 1}}>
          <CameraScreen
            showFrame={true}
            // Show/hide scan frame
            scanBarcode={true}
            // Can restrict for the QR Code only
            laserColor={'blue'}
            // Color can be of your choice
            frameColor={'yellow'}
            // If frame is visible then frame color
            // colorForScannerFrame={'white'}
            // Scanner Frame color

            onReadCode={event =>
              onBarcodeScanForDevice(event.nativeEvent.codeStringValue)
            }
          />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <CameraScreen
            showFrame={true}
            // Show/hide scan frame
            scanBarcode={true}
            // Can restrict for the QR Code only
            laserColor={'blue'}
            // Color can be of your choice
            frameColor={'yellow'}
            // If frame is visible then frame color
            // colorForScannerFrame={'white'}
            // Scanner Frame color

            onReadCode={event =>
              onBarcodeScanForVIN(event.nativeEvent.codeStringValue)
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};
const {width} = Dimensions.get('window');
const IMAGE_WIDTH = (width - 24) / 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lightGrey,
  },
  logoContainer: {
    flex: 1,
    padding: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  logo: {
    width: 180,
    height: 60,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#757575',
    marginTop: 40,
    textAlign: 'center',
  },
  addPicture: {color: '#757575', fontSize: 14, fontWeight: '600'},
  boxContainer: {marginTop: 10, flexDirection: 'row', flex: 1, padding: 5},
  textImages: {
    backgroundColor: '#999999',
    fontSize: 13,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    paddingLeft: 9,
  },
  imageContainer: {
    backgroundColor: theme.colors.white,
    borderColor: '#AEAEAE',
    borderWidth: 1,
    height: 160,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  textModel: {fontSize: 16, fontWeight: '300', color: theme.colors.black},
  titleMode: {fontSize: 20, fontWeight: '600', color: theme.colors.black},
  btn: {
    fontSize: 16,
    color: theme.colors.lightGrey,
    fontWeight: '600',
  },
  form: {
    flex: 2,
    padding: 15,
    marginTop: 20,
    // justifyContent: 'center',
  },
  inputText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#040707',
    marginBottom: 10,
  },
  textInput: {
    paddingLeft: 10,
    height: 42,
    borderRadius: 2,
    borderWidth: 1.5,
    borderColor: '#999999',
    fontSize: 15,
    marginBottom: 20,
    backgroundColor: theme.colors.white,
  },
  inputLogo: {
    width: 22,
    height: 20,
    marginTop: 10,
    marginRight: 10,
  },
  picture: {
    padding: 15,
    justifyContent: 'center',
  },
  media: {
    width: 180,
    height: 160,
    marginRight: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  bottom: {
    padding: 24,
  },
  buttonDelete: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#ffffff92',
    borderRadius: 4,
  },
  titleDelete: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#000',
  },
  submit: {
    padding: 15,
    flex: 1,
    justifyContent: 'center',
  },
});
export default VehicleRegistration;
