/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Alert,
  Button,
  Dimensions,
  // StyleSheet,
  Vibration,
  // View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import QRCodeScanner from './QRCodeScanner';
import {Camera, CameraType} from 'react-native-camera-kit';
import {useEffect, useRef, useState} from 'react';

const App: () => Node = () => {
  const [scaned, setScaned] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    // 종료후 재시작을 했을때 초기화
    setScaned(true);
  }, []);

  const onBarCodeRead = (event: any) => {
    if (!scaned) return;
    setScaned(false);
    Vibration.vibrate();
    Alert.alert('QR Code', event.nativeEvent.codeStringValue, [
      {text: 'OK', onPress: () => setScaned(true)},
    ]);
  };

  return (
    <View>
      <Camera
        style={styles.scanner}
        ref={ref}
        cameraType={CameraType.Back} // Front/Back(default)
        zoomMode
        focusMode
        // Barcode Scanner Props
        scanBarcode
        showFrame={false}
        laserColor="rgba(0, 0, 0, 0)"
        frameColor="rgba(0, 0, 0, 0)"
        surfaceColor="rgba(0, 0, 0, 0)"
        onReadCode={onBarCodeRead}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  scanner: {flex: 1},
});

export default App;
