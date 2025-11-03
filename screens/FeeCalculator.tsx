import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Image, Pressable } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { AppNavigationProp, RootStackParamList } from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import HeaderComponent from '../HeaderComponent';
import BottomNav from '../BottomNav';

type FeeCalculatorParams = {
  personalInfo: { name: string; phone: string; email: string };
  selectedCourses: { id: string; name: string; price: number }[];
  subtotal: number;
  discount: number;
  discountAmount: number;
  discountedSubtotal: number;
  vatAmount: number;
  total: number;
};

type FeeCalculatorScreenRouteProp = RouteProp<{ FeeCalculator: FeeCalculatorParams }, 'FeeCalculator'>;

interface Props {
  route: FeeCalculatorScreenRouteProp;
}

const FeeCalculatorScreen: React.FC<Props> = ({ route }) => {
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
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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
          <Text style={styles.sectionTitle}>Fee Calculator</Text>

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
    backgroundColor: '#f8f9fa',
  },
  scrollContentContainer: {
    paddingBottom: 100, // Space for bottom nav
  },
  mobileNavContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
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
    alignItems: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
  },
  topBar: {
    backgroundColor: '#004225',
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    minHeight: 40,
    zIndex: 1000,
  },
  topBarText: {
    color: '#fff',
    fontSize: 15,
    left: 120,
    top: 8,
  },
  topBarLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBarLinkText: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 15,
    right: 200,
    top: 8,
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 15,
    left: 10,
  },
  orgName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#004225',
    left: 10,
  },
  navMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '60%',
  },
  navLinkContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    marginRight: 10,
    marginHorizontal: 5,
    height: 25,
  },
  navLinkHoverActive: {
    backgroundColor: '#e6f0f7',
  },
  navLink: {
    fontSize: 18,
    color: '#000000ff',
    fontWeight: '500',
    marginHorizontal: 25,
  },
  navLinkTextHoverActive: {
    color: '#1F6357',
  },
  breadcrumb: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  breadcrumbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumbLink: {
    fontSize: 14,
    color: '#0055a5',
    fontWeight: '500',
  },
  breadcrumbSeparator: {
    fontSize: 14,
    color: '#6c757d',
    marginHorizontal: 5,
  },
  breadcrumbCurrent: {
    fontSize: 14,
    color: '#000000ff',
  },
  section: {
    padding: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000ff',
    textAlign: 'center',
    marginBottom: 30,
    paddingBottom: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
    alignSelf: 'center',
    width: '50%',
  },
  // Content Container for Centralization
  contentContainer: {
    width: '100%',
    maxWidth: 800,
    paddingBottom: 100,
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
    maxWidth: 600,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
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
    fontSize: 16,
    fontWeight: '600',
    color: '#002a18',
  },
  infoValue: {
    fontSize: 16,
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
    fontSize: 16,
    color: '#002a18',
    flex: 1,
    marginRight: 10,
  },
  coursePrice: {
    fontSize: 16,
    fontWeight: '600',
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
    fontSize: 16,
    color: '#002a18',
    fontWeight: '500',
  },
  calculationValue: {
    fontSize: 16,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004225',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004225',
  },
  // Buttons
  buttonsContainer: {
    marginTop: 20,
    width: '100%',
    maxWidth: 600,
    alignItems: 'center',
  },
  enrollButton: {
    backgroundColor: '#dc3545',
    padding: 16,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    width: '100%',
    maxWidth: 400,
  },
  enrollButtonHover: {
    backgroundColor: '#002a18',
  },
  buttonIcon: {
    marginRight: 10,
  },
  enrollButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#dc3545',
    width: '100%',
    maxWidth: 400,
  },
  backButtonHover: {
    backgroundColor: 'rgba(0, 66, 37, 0.1)',
  },
  backButtonText: {
    color: '#dc3545',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Footer Styles
  footer: {
    backgroundColor: '#002a18',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  footerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  footerColumn: {
    marginBottom: 20,
    flex: 1,
    minWidth: 250,
    left: 100,
    right: 100,
  },
  footerHeading: {
    color: '#fff',
    marginBottom: 20,
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomWidth: 3,
    borderBottomColor: '#CFB53B',
    width: 200,
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
    marginBottom: 5,
  },
  socialLinks: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 12,
  },
  socialLink: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialLinkHover: {
    backgroundColor: '#CFB53B',
  },
  footerLink: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  footerLinkHover: {
    color: '#CFB53B',
  },
  contactInfoItem: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
    marginBottom: 15,
  },
  copyright: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 20,
    marginTop: 10,
  },
  copyrightText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  // Dropdown styles
  dropdownContainer: {
    position: 'relative',
    zIndex: 1001,
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    right: 200,
    top: 8,
  },
  dropdownCaret: {
    marginLeft: 5,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 35,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    minWidth: 120,
    borderWidth: 1,
    borderColor: '#eee',
    zIndex: 1002,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#004225',
    fontWeight: '500',
  },
});

export default FeeCalculatorScreen;