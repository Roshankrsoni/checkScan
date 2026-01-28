import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter, useFocusEffect } from 'expo-router';
import { CameraOverlay } from '../components/CameraOverlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  // Lock to landscape removed as per user request (restore "like before")
  // Default orientation (Portrait) will be used.

  useFocusEffect(() => {
    setIsProcessing(false);
  });

  const takePicture = async () => {
    if (cameraRef.current && !isProcessing) {
      try {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setIsProcessing(true);
        
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1, // Higher quality for OCR
          base64: false, // We will process URI
          exif: false,
          skipProcessing: false,
        });

        if (photo?.uri) {
           router.push({
            pathname: '/results',
            params: { imageUri: photo.uri } 
          });
        }
      } catch (error) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert('Error', 'Failed to capture image');
        console.error(error);
        setIsProcessing(false);
      }
    }
  };

  if (!permission) return <View style={styles.container} />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Camera permission is required</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Access</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <CameraView 
        ref={cameraRef}
        style={styles.camera} 
        facing="back"
        flash="off"
      >
        <CameraOverlay />
        
        <View style={styles.bottomControls}>
           <TouchableOpacity 
              style={[styles.captureBtn, isProcessing && styles.captureBtnDisabled]}
              onPress={takePicture}
              disabled={isProcessing}
              activeOpacity={0.7}
            >
              <View style={styles.captureBtnInner} />
           </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <View style={styles.closeIcon}>
             <View style={[styles.xLine, { transform: [{ rotate: '45deg' }] }]} />
             <View style={[styles.xLine, { transform: [{ rotate: '-45deg' }] }]} />
          </View>
        </TouchableOpacity>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  message: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
    fontSize: 16,
  },
  camera: {
    flex: 1,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 50,
    alignItems: 'center', // Center horizontally
    justifyContent: 'center',
    zIndex: 10,
  },
  captureBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  captureBtnDisabled: {
    opacity: 0.5,
  },
  captureBtnInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#fff',
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 50, // Adjusted for safe area roughly
    left: 20,
    padding: 10,
    zIndex: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
  },
  closeIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  xLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: '#fff',
  }
});
