import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: '#f5f5f5',
          }
        }}
      >
        <Stack.Screen name="index" options={{ title: 'CheckScan', headerLargeTitle: true }} />
        <Stack.Screen name="scan" options={{ title: 'Scan Check', presentation: 'fullScreenModal' }} />
        <Stack.Screen name="results" options={{ title: 'Analysis Results' }} />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
