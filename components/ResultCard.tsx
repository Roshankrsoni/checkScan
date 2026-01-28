import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckData } from '../types';

interface ResultCardProps {
  data: CheckData;
}

export const ResultCard = ({ data }: ResultCardProps) => {
  const renderRow = (label: string, value: string | number | null, confidence?: number, isLast?: boolean) => (
    <View style={[styles.row, isLast && styles.lastRow]}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, !value && styles.placeholder]}>
          {value !== null ? value.toString() : 'Not detected'}
        </Text>
      </View>
      {/* {confidence !== undefined && (
        <View style={[styles.badge, getConfidenceStyle(confidence)]}>
           <Text style={[styles.badgeText, getConfidenceTextStyle(confidence)]}>
             {confidence}%
           </Text>
        </View>
      )} */}
    </View>
  );

  const getConfidenceStyle = (score: number) => {
    if (score >= 90) return { backgroundColor: '#E8F5E9' }; // Light Green
    if (score >= 70) return { backgroundColor: '#FFF3E0' }; // Light Orange
    return { backgroundColor: '#FFEBEE' }; // Light Red
  };

  const getConfidenceTextStyle = (score: number) => {
     if (score >= 90) return { color: '#2E7D32' }; 
     if (score >= 70) return { color: '#EF6C00' };
     return { color: '#C62828' };
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.sectionHeader}>FINANCIAL DETAILS</Text>
      <View style={styles.group}>
        {renderRow('Amount', data.amount_numeric, data.confidence_score.amount)}
        {renderRow('Formatted Amount', data.amount_words)}
        {renderRow('Currency', data.currency, undefined, true)}
      </View> */}

      <Text style={styles.sectionHeader}>PARTIES</Text>
      <View style={styles.group}>
        {renderRow('Payer', data.payer_name, data.confidence_score.payer_name)}
        {renderRow('Payee', data.payee_name, data.confidence_score.payee_name)}
        {renderRow('Bank', data.bank_name, data.confidence_score.bank_name, true)}
      </View>

      <Text style={styles.sectionHeader}>MICR DATA</Text>
      <View style={styles.group}>
        <View style={[styles.row, styles.micrRow]}>
             <Text style={styles.micrText}>{data.micr_line}</Text>
        </View>
        <View style={styles.divider} />
        {renderRow('Check Number', data.check_number)}
        {renderRow('Routing Number', data.routing_number)}
        {renderRow('Account Number', data.account_number, data.confidence_score.micr_line, true)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    marginLeft: 16,
    marginBottom: 8,
    marginTop: 24,
  },
  group: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#C6C6C8',
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 15,
    color: '#000',
    marginBottom: 4,
    fontWeight: '500',
  },
  value: {
    fontSize: 15, // Reduced from 17
    color: '#666', // Muted color for value
  },
  placeholder: {
    color: '#999',
    fontStyle: 'italic',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    minWidth: 44,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  micrRow: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    justifyContent: 'center',
  },
  micrText: {
    fontFamily: 'Courier',
    fontSize: 16,
    letterSpacing: 1,
    textAlign: 'center',
    width: '100%',
  },
  divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: '#C6C6C8',
      marginLeft: 16,
  }
});
