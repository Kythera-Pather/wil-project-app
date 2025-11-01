import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Image, Pressable } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { AppNavigationProp, RootStackParamList } from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import HeaderComponent from '../HeaderComponent';
import BottomNav from '../BottomNav';

type FeeCalculationResultsScreenRouteProp = RouteProp<RootStackParamList, 'FeeCalculationResults'>;

interface Props {
  route: FeeCalculationResultsScreenRouteProp;
}

const FeeCalculationResultsScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<AppNavigationProp>();

  const {
    personalInfo,
    selectedCourses,
    subtotal,
    discount,
    discountAmount,
    discountedSubtotal,
    vatAmount,
    total
  } = route.params;

  const navLinks: { name: keyof RootStackParamList, label: string }[] = [
    { name: 'Home', label: 'Home' },
    { name: 'SixMonthCourses', label: 'Six-Month Courses' },
    { name: 'SixWeekCourses', label: 'Six-Week Courses' },
    { name: 'AboutScreen', label: 'About Us' },
    { name: 'CourseSelection', label: 'Course Selection' },
    { name: 'Contact', label: 'Contact Us' },
  ];

  const handleNavigation = <RouteName extends keyof RootStackParamList>(screen: RouteName, params?: RootStackParamList[RouteName]) => {
    navigation.navigate({ name: screen, params: params } as any);
  };

  return (
    <View style={styles.fullScreenContainer}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContentContainer}>
      {/* Header */}
      <HeaderComponent />

        {/* Mobile Navigation */}
        <View style={styles.mobileNavContainer}>
          {navLinks.map((link) => (
            <TouchableOpacity key={link.name} style={styles.mobileNavLink} onPress={() => handleNavigation(link.name)}>
              <Text style={styles.mobileNavLinkText}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.mainContent}>
          <Text style={styles.sectionTitle}>Fee Calculation Results</Text>

          {/* Personal Information */}
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Personal Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={styles.infoValue}>{personalInfo.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone:</Text>
              <Text style={styles.infoValue}>{personalInfo.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{personalInfo.email}</Text>
            </View>
          </View>
          
          {/* Selected Courses */}
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Selected Courses</Text>
            {selectedCourses.map((course: { id: string; name: string; price: number }) => (
              <View key={course.id} style={styles.courseRow}>
                <Text style={styles.courseName}>{course.name}</Text>
                <Text style={styles.coursePrice}>R{course.price.toFixed(2)}</Text>
              </View>
            ))}
          </View>
          
          {/* Fee Breakdown */}
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Fee Breakdown</Text>
            
            <View style={styles.calculationRow}>
              <Text style={styles.calculationLabel}>Subtotal</Text>
              <Text style={styles.calculationValue}>R{subtotal.toFixed(2)}</Text>
            </View>
            
            {discount > 0 && (
              <>
                <View style={[styles.calculationRow, styles.discountRow]}>
                  <Text style={styles.calculationLabel}>Discount ({discount * 100}%)</Text>
                  <Text style={[styles.calculationValue, styles.discountValue]}>-R{discountAmount.toFixed(2)}</Text>
                </View>
                
                <View style={styles.calculationRow}>
                  <Text style={styles.calculationLabel}>Discounted Subtotal</Text>
                  <Text style={styles.calculationValue}>R{discountedSubtotal.toFixed(2)}</Text>
                </View>
              </>
            )}
            
            <View style={styles.calculationRow}>
              <Text style={styles.calculationLabel}>VAT (15%)</Text>
              <Text style={styles.calculationValue}>R{vatAmount.toFixed(2)}</Text>
            </View>
            
            <View style={[styles.calculationRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total Fee</Text>
              <Text style={styles.totalValue}>R{total.toFixed(2)}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>BACK TO COURSE SELECTION</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      {/* Persistent Bottom Navigation */}
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    height: '100%', // Explicitly set height to ensure flex context
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContentContainer: {
    paddingBottom: 100, // Space for bottom nav
  },
  mobileNavContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  mobileNavLink: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  mobileNavLinkText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#004225',
  },
  mainContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
    paddingBottom: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
    alignSelf: 'center',
  },
  // Info Cards
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 25,
    marginBottom: 25,
    width: '100%',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#004225',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#CFB53B',
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#002a18',
  },
  infoValue: {
    fontSize: 15,
    color: '#002a18',
    fontWeight: '500',
  },
  courseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  courseName: {
    fontSize: 15,
    color: '#002a18',
    flex: 1,
    marginRight: 10,
  },
  coursePrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#CFB53B',
    minWidth: 80,
    textAlign: 'right',
  },
  calculationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  calculationLabel: {
    fontSize: 15,
    color: '#002a18',
    fontWeight: '500',
  },
  calculationValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#002a18',
  },
  discountRow: {
    backgroundColor: 'rgba(207, 181, 59, 0.1)',
    borderRadius: 4,
    marginHorizontal: 5,
  },
  discountValue: {
    color: '#CFB53B',
    fontWeight: 'bold',
  },
  totalRow: {
    borderTopWidth: 2,
    borderTopColor: '#004225',
    marginTop: 15,
    paddingTop: 15,
    backgroundColor: 'rgba(0, 66, 37, 0.05)',
    borderRadius: 4,
    marginHorizontal: 5,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#004225',
  },
  totalValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#004225',
  },
  // Buttons
  buttonsContainer: {
    marginTop: 20,
    width: '100%',
  },
  backButton: {
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#004225',
    width: '100%',
  },
  backButtonText: {
    color: '#004225',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default FeeCalculationResultsScreen;
