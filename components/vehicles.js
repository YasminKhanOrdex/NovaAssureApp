import React, {useState, useEffect} from 'react';
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
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  FlatList,
  Touchable,
} from 'react-native';
import theme from '../styling';
import {CameraScreen} from 'react-native-camera-kit';
import RNQRGenerator from 'rn-qr-generator';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const options = {
  title: 'photoUpload',
  takePhotoButtonTitle: 'photoTake',
  chooseFromLibraryButtonTitle: 'photoLibrary',
  cancelButtonTitle: 'cancel',
  quality: 0.7,
  base64: true,
  maxWidth: 728,
};
const VehicleRegistration = ({navigation}) => {
  const [vehicle, setVehicle] = useState('');
  const [vin, setVin] = useState('');
  const [qrvalue, setQrvalue] = useState('');
  const [opneScanner, setOpneScanner] = useState(false);
  const [qrdata, setQrdata] = useState('');
  const [barcodeValue, setBarcodeValue] = useState('');
  const [openDeviceScanner, setOpenDeviceScanner] = useState(false);
  const [opneVinScanner, setOpneVinScanner] = useState(false);
  const [device, setDevice] = useState('');
  const [images, setImages] = useState([]);

  const [picforDevise, setPicforDevise] = useState(null);
  const [picforVehicle, setPicforVehicle] = useState(null);
  const [picforinstallDevice, setPicforinstallDevice] = useState(null);
  const [ImageSource, setImageSource] = useState(null);
  const [pic, setPic] = useState([
    (pictur1 = {a: false, mandatory: true, uri: [], id: 123}),
    (pictur2 = {a: false, mandatory: true, uri: [], id: 1123}),
    (pictur3 = {a: false, mandatory: true, uri: [], id: 1223}),
  ]);
  const [loading, setLoading] = useState(false);

  const onPick = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        RNQRGenerator.detect({uri: response.assets[0].uri})
          .then(res => {
            console.log('Detected value', res);
            if (res.values.length === 0) {
              console.log('Code not found');
            } else {
              setDevice(res.values);
              // console.log('value:--- ');
              // console.log(barcodeValue);
            }
          })
          .catch(err => {
            console.log('Cannot detect', err);
          });
      }
    });
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
      return;
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
    }
  };
  const vehicleUri = picforVehicle?.assets && picforVehicle.assets[0].uri;
  const DeviceUri = picforDevise?.assets && picforDevise.assets[0].uri;
  const installDeviceUri =
    picforinstallDevice?.assets && picforinstallDevice.assets[0].uri;

  const openPicker = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        selectedAssets: images,
        isExportThumbnail: false,
        maxVideo: 11,
        usedCameraButton: false,
        isCrop: true,
        isCropCircle: true,
      });
      console.log('response:------> ', response);
      setImages(response);
    } catch (e) {
      console.log(e.code, e.message);
    }
  };
  const onDelete = value => {
    const data = images.filter(
      item =>
        item?.localIdentifier &&
        item?.localIdentifier !== value?.localIdentifier,
    );
    setImages(data);
  };
  const openPopup = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri};
        setImageSource(source);
      }
    });
    // return (
    //   <View
    //     style={{
    //       flex: 1,
    //       alignItems: 'center',
    //       justifyContent: 'center',
    //       padding: 10,
    //       backgroundColor: theme.colors.red,
    //     }}>
    //     <Text style={{fontSize: 18, fontWeight: '600'}}>Select Image</Text>
    //     <TouchableOpacity>
    //       <Text style={{fontSize: 14}}>Take Photo</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity>
    //       <Text style={{fontSize: 14}}>Choose from Library</Text>
    //     </TouchableOpacity>
    //   </View>
    // );
  };
  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          margin: 1,
        }}>
        <Image
          // width={IMAGE_WIDTH}
          source={{
            uri: item?.crop?.cropPath ?? item.path,
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
  const onOpenlink = () => {
    // If scanned then function to open URL in Browser
    Linking.openURL(device);
    //    Linking.openURL(qrvalue);
  };
  const onOpneScannerForVIN = () => {
    // setOpneVinScanner(true);
    // To Start Scanning
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            setVin('');
            setOpneScanner(true);
            setOpneVinScanner(true);
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

  const onOpneScannerForDevice = () => {
    // setOpenDeviceScanner(true);
    // To Start Scanning
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            setDevice('');
            setOpneScanner(true);
            setOpenDeviceScanner(true);
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
      setDevice('');
      setOpneScanner(true);
      setOpenDeviceScanner(true);
    }
    console.log('setOpenDeviceScanner------------>>>>>>>', openDeviceScanner);
  };

  const onBarcodeScanForDevice = qrvalue => {
    // Called after te successful scanning of QRCode/Barcode
    setDevice(qrvalue);
    setOpneScanner(false);
    setOpenDeviceScanner(false);
  };
  const onBarcodeScanForVIN = qrval => {
    // Called after te successful scanning of QRCode/Barcode
    setVin(qrval);
    setOpneScanner(false);
    setOpneVinScanner(false);
  };
  const onSubmitClicked = () => {
    const data = {
      vehicle: vehicle,
      vin: vin,
      device: device,
    };
    console.log('----data-----', data);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{marginHorizontal: 2}}>
        {!opneScanner ? (
          <View style={{flex: 2}}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require('../Images/logo_nova.png')}></Image>
            </View>
            <View style={{alignItems: 'center', marginTop: 40}}>
              <Text style={{fontSize: 16, fontWeight: '600', color: '#757575'}}>
                Vehicle Registration
              </Text>
            </View>
            <View style={styles.form}>
              <View style={styles.formGroup}>
                <Text style={styles.inputText}>Vehicle</Text>
                <TextInput
                  onChangeText={e => setVehicle(e)}
                  value={vehicle}
                  style={styles.textInput}></TextInput>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.inputText}>
                  Vehicle Identification Number (VIN)
                </Text>
                <View
                  style={[
                    {flexDirection: 'row', alignItems: 'center'},
                    styles.textInput,
                  ]}>
                  <TextInput
                    defaultValue={vin ? vin : ''}
                    onChangeText={e => setVin(e)}
                    style={{
                      width: 325,
                      marginRight: 10,
                      fontSize: 15,
                    }}
                  />
                  <TouchableOpacity onPress={onOpneScannerForVIN}>
                    <Image
                      style={styles.inputLogo}
                      source={require('../Images/Scanner.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.inputText}>Device</Text>
                <View
                  style={[
                    {flexDirection: 'row', alignItems: 'center'},
                    styles.textInput,
                  ]}>
                  <TextInput
                    defaultValue={device ? device : ''}
                    onChangeText={e => setDevice(e)}
                    style={{
                      width: 325,
                      fontSize: 15,
                      marginRight: 10,
                    }}
                  />
                  <TouchableOpacity onPress={onOpneScannerForDevice}>
                    <Image
                      style={styles.inputLogo}
                      source={require('../Images/Scanner.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <Text
                style={{
                  marginTop: 10,
                  color: '#757575',
                  fontSize: 14,
                  fontWeight: '600',
                }}>
                Add Pictures
              </Text>
              <View style={{marginTop: 10, flexDirection: 'row'}}>
                <View>
                  <Text
                    style={{
                      width: 180,
                      backgroundColor: '#999999',
                      marginRight: 10,
                      fontSize: 13,
                      borderTopLeftRadius: 2,
                      borderTopRightRadius: 2,
                      paddingLeft: 9,
                    }}>
                    Device
                  </Text>
                  <View
                    style={{
                      backgroundColor: theme.colors.white,
                      marginRight: 10,
                      borderColor: '#AEAEAE',
                      borderWidth: 1,
                      height: 180,
                      width: 180,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                      flexDirection: 'row',
                    }}>
                    {DeviceUri && (
                      <Image
                        resizeMode="cover"
                        source={{uri: DeviceUri}}
                        style={{
                          position: 'absolute',
                          height: 180,
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

                <View>
                  <Text
                    style={{
                      width: 180,
                      backgroundColor: '#999999',
                      marginRight: 10,
                      fontSize: 13,
                      borderTopLeftRadius: 2,
                      borderTopRightRadius: 2,
                      paddingLeft: 9,
                    }}>
                    vehicle
                  </Text>
                  <View
                    style={{
                      backgroundColor: theme.colors.white,
                      marginRight: 10,
                      borderColor: '#AEAEAE',
                      borderWidth: 1,
                      height: 180,
                      width: 180,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                      flexDirection: 'row',
                    }}>
                    {vehicleUri && (
                      <Image
                        source={{uri: vehicleUri}}
                        style={{
                          position: 'absolute',
                          height: 180,
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

              <View style={{marginTop: 15, flexDirection: 'row'}}>
                <View>
                  <Text
                    style={{
                      width: 180,
                      backgroundColor: '#999999',
                      marginRight: 10,
                      fontSize: 13,
                      borderTopLeftRadius: 2,
                      borderTopRightRadius: 2,
                      paddingLeft: 9,
                    }}>
                    Installed Device
                  </Text>
                  <View
                    style={{
                      backgroundColor: theme.colors.white,
                      marginRight: 10,
                      borderColor: '#AEAEAE',
                      borderWidth: 1,
                      height: 180,
                      width: 180,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                      flexDirection: 'row',
                    }}>
                    {installDeviceUri && (
                      <Image
                        source={{uri: installDeviceUri}}
                        style={{
                          position: 'absolute',
                          height: 180,
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

                <View>
                  <Text
                    style={{
                      width: 180,
                      backgroundColor: '#999999',
                      marginRight: 10,
                      fontSize: 13,
                      borderTopLeftRadius: 2,
                      borderTopRightRadius: 2,
                      paddingLeft: 9,
                    }}>
                    Picture
                  </Text>
                  <View
                    style={{
                      backgroundColor: theme.colors.white,
                      marginRight: 10,
                      borderColor: '#AEAEAE',
                      borderWidth: 1,
                      height: 180,
                      width: 180,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity onPress={openPopup}>
                      <Image source={require('../Images/add.png')} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View>
                <FlatList
                  style={{position: 'relative', paddingTop: 6}}
                  data={images}
                  key={'#'}
                  keyExtractor={(item, index) =>
                    (item?.filename ?? item?.path) + index
                  }
                  renderItem={renderItem}
                  numColumns={2}
                />
              </View>
            </View>
          </View>
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

        {/* <View style={{flex: 1, marginTop: 220}}>
        <FlatList
          style={{flex: 1, paddingTop: 6}}
          data={images}
          key={'#'}
          keyExtractor={(item, index) => (item?.filename ?? item?.path) + index}
          renderItem={renderItem}
          numColumns={2}
        />
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.openPicker} onPress={openPicker}>
          <Text style={styles.openText}>Choose Image</Text>
        </TouchableOpacity>
      </View> */}

        {/* Submit code */}

        {/* <View style={styles.submit}>
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
      </View> */}
      </ScrollView>
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
    alignItems: 'center',
    marginTop: 30,
  },
  logo: {
    width: 170,
    height: 55,
  },

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
    borderWidth: 1,
    borderColor: '#999999',
    fontSize: 15,
    backgroundColor: theme.colors.white,
  },
  inputLogo: {
    width: 22,
    height: 20,
  },
  picture: {
    padding: 15,
    justifyContent: 'center',
  },
  media: {
    width: 180,
    height: 180,
    marginRight: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  bottom: {
    padding: 24,
  },
  openPicker: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
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
  formGroup: {
    marginTop: 20,
  },
});
export default VehicleRegistration;
