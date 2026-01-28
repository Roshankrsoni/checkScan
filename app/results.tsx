import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { processImageForGemini } from '../services/imageUtils';
import { extractCheckData } from '../services/gemini';
import { CheckData } from '../types';
import { ResultCard } from '../components/ResultCard';
import * as Clipboard from 'expo-clipboard';
import { StatusBar } from 'expo-status-bar';

export default function ResultsScreen() {
  const { imageUri } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CheckData | null>(null);
  const router = useRouter();

  useEffect(() => {
    analyzeCheck();
  }, [imageUri]);

  const analyzeCheck = async () => {
    if (!imageUri || typeof imageUri !== 'string') {
      setError('No image provided');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const base64 = await processImageForGemini(imageUri);
      const checkData = await extractCheckData(base64);
      
      setData(checkData);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to analyze check');
    } finally {
      setLoading(false);
    }
  };

  const copyJson = async () => {
    if (data) {
      await Clipboard.setStringAsync(JSON.stringify(data, null, 2));
      Alert.alert('Copied', 'JSON data copied to clipboard');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Stack.Screen options={{ 
        title: 'Results',
        headerLargeTitle: false, // Switch to standard to save space if requested
        headerStyle: { backgroundColor: '#F2F2F7' },
        headerShadowVisible: true,
      }} />

      <ScrollView contentContainerStyle={styles.content}>
        
        {imageUri && typeof imageUri === 'string' && (
          <View style={styles.imageContainer}>
             <Image 
                source={{ uri: imageUri }} 
                style={styles.previewImage} 
                resizeMode="cover" 
              />
          </View>
        )}

        {loading && (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#8E8E93" />
            <Text style={styles.loadingText}>Reading check securely...</Text>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>Analysis Failed</Text>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={analyzeCheck}>
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}

        {!loading && data && (
          <>
            <ResultCard data={data} />
            
            <TouchableOpacity style={styles.copyButton} onPress={copyJson}>
              <Text style={styles.copyButtonText}>Copy JSON</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    paddingBottom: 40,
  },
  imageContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 12,
    overflow: 'hidden',
    height: 160,
    backgroundColor: '#E5E5EA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  centerContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500',
    color: '#8E8E93',
  },
  errorContainer: {
    margin: 16,
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  errorText: {
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  copyButton: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: '#E5E5EA',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  copyButtonText: {
    color: '#007AFF',
    fontSize: 17,
    fontWeight: '600',
  }
});
