import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, FlashMode, CameraType } from 'expo-camera';
import Slider from '@react-native-community/slider';
import { Entypo, Feather, AntDesign, FontAwesome5 } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';



export const Home = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [scannedData, setScannedData] = useState(null);
  const [valueZoom, setValueZoom] = useState(0);
  const cameraRef = useRef(null);
  const [image, setImage] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    console.log(flashMode);
    
  }, []);

  // useEffect(() => {
  //   if (hasPermission) {
  //     cameraRef.current?.resumePreview();
  //   }
  // }, [hasPermission]);

  const handleBarCodeScanned = ({ data }: { data: any }) => {
    setScannedData(data);
  };

  const toggleFlashMode = () => {
    setFlashMode(
      flashMode === FlashMode.off
        ? FlashMode.on
        : FlashMode.off
    );
    console.log(flashMode);
    
  };

  const toggleCameraType = () => {
    setCameraType(
      cameraType === CameraType.back
        ? CameraType.front
        : CameraType.back
    );
  };

  const handleValueChange = (newValue : number) => {
    setValueZoom(newValue);
  };

  const handleScanAgain = () => {
    setScannedData(null);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!result.canceled) {
        let decodedBarcodeImage : any = await BarCodeScanner.scanFromURLAsync(result.assets[0].uri);
        // Handle result data
        console.log(decodedBarcodeImage);
        setScannedData(decodedBarcodeImage[0].data);
      } else {
        // Handle canceled result
        console.log('You did not select any image.');
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {
        isFocused && <Camera
        style={styles.camera}
        type={cameraType}
        flashMode={flashMode}
        onBarCodeScanned={scannedData ? undefined : handleBarCodeScanned}
        ref={cameraRef}
        zoom={valueZoom}
      />
      }
      {scannedData ? (
        <View style={styles.overlay}>
          <Text style={styles.scannedText}>{scannedData}</Text>
          <Button title="Scan Again" onPress={handleScanAgain} />
        </View>
      ) : (
        <View style={styles.overlay}>
          <View style={styles.containerZoom}>
            <AntDesign name="minus" size={24} color="white" />
            <Slider
              style={styles.sliderZoom}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#F2F1EB"
              maximumTrackTintColor="#11235A"
              value={valueZoom}
              onValueChange={handleValueChange}
            />
            <AntDesign name="plus" size={24} color="white" />
          </View>

          <View style={styles.modeScan}>
            <TouchableOpacity onPress={toggleFlashMode} style={styles.buttonMode}>
              <Entypo name="flash" size={24} color="white" />
              <Text style={{ marginLeft: 8, color: "white" }}>Flash</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleCameraType} style={[styles.buttonMode, { borderLeftWidth: 0.7 }]}>
              <Feather name="rotate-ccw" size={24} color="white" />
              <Text style={{ marginLeft: 8, color: "white" }}>Toggle</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage} style={[styles.buttonMode, { borderLeftWidth: 0.7 }]}>
              <FontAwesome5 name="image" size={24} color="white" />
              <Text style={{ marginLeft: 8, color: "white" }}>Image</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    // alignItems: 'center',
  },
  camera: {
    flex: 1,
  },
  containerZoom: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 2,

  },
  sliderZoom: {
    flex: 1,
    height: 40,
  },
  buttonMode: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 15,
  },
  modeScan: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#337FB6',
    paddingVertical: 10,
    borderRadius: 10,
  },
  overlay: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    position: 'absolute',
    bottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '100%',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scannedText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
