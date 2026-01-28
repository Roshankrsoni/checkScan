import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.largeTitle}>CheckScan</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          {/* Simulating SF Symbol 'doc.viewfinder' style with Image or simple View shapes for now since we avoid external icons if possible, 
              but typically we'd use expo-symbols or Ionicons. Using a placeholder for simplicity and zero-deps compliance. */}
          <View style={styles.scannerIcon}>
            <View style={styles.scanLine} />
          </View>
        </View>
        
        <Text style={styles.instruction}>
          Scan checks securely with bank-grade accuracy.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => router.push('/scan')}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Scan Check</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7', // iOS System Gray 6
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20, // Reduced from 40
    paddingBottom: 10, // Reduced from 20
  },
  largeTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 0.37,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  scannerIcon: {
    width: 120,
    height: 120,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  scanLine: {
    width: '60%',
    height: 4,
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  instruction: {
    fontSize: 17,
    lineHeight: 22,
    color: '#3C3C4399', // Secondary Label Color
    textAlign: 'center',
    maxWidth: 300,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    height: 56,
    borderRadius: 14, // Human Interface Guidelines often use 12-14 for large buttons
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
