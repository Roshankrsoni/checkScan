import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

export const CameraOverlay = () => {
  return (
    <View style={styles.overlay}>
      <View style={styles.topMask} />
      
      <View style={styles.centerRow}>
        <View style={styles.sideMask} />
        <View style={styles.scanFrame}>
          {/* Refined Corner Markers */}
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
          
          <View style={styles.guideContainer}>
            <Text style={styles.guideText}>Align check within frame</Text>
            <Text style={styles.subText}>Ensure good lighting</Text>
          </View>
        </View>
        <View style={styles.sideMask} />
      </View>

      <View style={styles.bottomMask} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  topMask: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  centerRow: {
    flexDirection: 'row',
    height: 250, 
  },
  sideMask: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  scanFrame: {
    width: '90%', 
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  bottomMask: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  corner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: '#fff',
    borderWidth: 4,
    borderRadius: 2,
    opacity: 0.9,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 12,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 12,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 12,
  },
  guideContainer: {
    position: 'absolute',
    bottom: -40,
    width: '100%',
    alignItems: 'center',
  },
  guideText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  subText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    fontWeight: '400',
  }
});
