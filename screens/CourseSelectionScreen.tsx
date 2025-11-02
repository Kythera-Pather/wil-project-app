import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Pressable, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp, RootStackParamList } from '../navigation/Navigation';
import { sixWeekCourses, sixMonthCourses } from '../types/courses';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderComponent from '../HeaderComponent';
import BottomNav from '../BottomNav';

// Define a type for our course objects for consistency
type Course = {
  id: string;
  title: string;
  description: string;
};

const CourseSelectionScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();

  // Form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  // Fee calculation state
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  const coursePrices = {
    ...sixMonthCourses.reduce((acc, course) => ({ ...acc, [course.id]: 1500 }), {} as { [key: string]: number }),
    ...sixWeekCourses.reduce((acc, course) => ({ ...acc, [course.id]: 750 }), {} as { [key: string]: number }),
  };

  useEffect(() => {
    const newSubtotal = selectedCourses.reduce((sum, courseId) => sum + (coursePrices[courseId] || 0), 0);
    const courseCount = selectedCourses.length;
    let discountPercentage = 0;
    if (courseCount >= 4) {
      discountPercentage = 0.15;
    } else if (courseCount === 3) {
      discountPercentage = 0.10;
    } else if (courseCount === 2) {
      discountPercentage = 0.05;
    }

    const newDiscount = newSubtotal * discountPercentage;
    const newTotal = newSubtotal - newDiscount;

    setSubtotal(newSubtotal);
    setDiscount(newDiscount);
    setTotal(newTotal);
  }, [selectedCourses]);

  const handleNavigation = (screen: keyof RootStackParamList, params?: any) => {
    navigation.navigate({ name: screen, params: params } as any);
  };

  const handleCalculateFees = () => {
    if (selectedCourses.length === 0) {
      Alert.alert('No Courses Selected', 'Please select at least one course to calculate the fees.');
      return;
    }
    Alert.alert(
      'Fee Calculation',
      `Subtotal: R${subtotal.toFixed(2)}\nDiscount: -R${discount.toFixed(2)}\n\nTotal: R${total.toFixed(2)}`,
      [{ text: 'OK' }]
    );
  };

  const toggleCourseSelection = (courseId: string) => {
    setSelectedCourses(prev => prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]);
  };

  const navLinks = [
    { label: 'Home', screen: 'Home' as keyof RootStackParamList },
    { label: 'Six Week Courses', screen: 'SixWeekCourses' as keyof RootStackParamList },
    { label: 'Six Month Courses', screen: 'SixMonthCourses' as keyof RootStackParamList },
    { label: 'Course Selection', screen: 'CourseSelection' as keyof RootStackParamList },
    { label: 'Contact Us', screen: 'Contact' as keyof RootStackParamList },
  ];

  const renderCourseItem = (course: Course, price: number) => (
    <Pressable
      key={course.id}
      style={({ pressed }) => [
        styles.courseButton,
        selectedCourses.includes(course.id) && styles.courseButtonSelected,
        pressed && styles.courseButtonPressed,
      ]}
      onPress={() => toggleCourseSelection(course.id)}>
      <Text style={[styles.courseButtonText, selectedCourses.includes(course.id) && styles.courseButtonTextSelected]}>{course.title} - R{price}</Text>
    </Pressable>
  );

  return (
    <View style={styles.fullScreenContainer}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <HeaderComponent />

        {/* Mobile Navigation */}
        <View style={styles.mobileNavContainer}>
          {navLinks.map((link) => (
            <TouchableOpacity key={link.screen} style={styles.mobileNavLink} onPress={() => handleNavigation(link.screen)}>
              <Text style={styles.mobileNavLinkText}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Page Title */}
        <View style={styles.titleSection}>
          <Text style={styles.mainHeading}>Course Selection & Fee Calculator</Text>
          <Text style={styles.introText}>
            Select your desired courses below to calculate your total fees. Discounts are automatically applied for multiple courses.
          </Text>
        </View>

        {/* Discount Information */}
        <View style={styles.discountContainer}>
          <Text style={styles.discountHeading}>Discount Information</Text>
          <Text style={styles.discountIntro}>Enroll in multiple courses and save!</Text>
          <View style={styles.discountGrid}>
            <View style={styles.discountCard}><Text style={styles.discountCardText}>5% OFF{'\n'}2 Courses</Text></View>
            <View style={styles.discountCard}><Text style={styles.discountCardText}>10% OFF{'\n'}3 Courses</Text></View>
            <View style={styles.discountCard}><Text style={styles.discountCardText}>15% OFF{'\n'}4+ Courses</Text></View>
          </View>
          <Text style={styles.finePrint}>*All prices are exclusive of VAT.</Text>
        </View>

        {/* Your Information */}
        <View style={styles.formSection}>
          <Text style={styles.sectionHeading}>Your Information</Text>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput style={styles.input} placeholder="Enter your full name" value={fullName} onChangeText={setFullName} />
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput style={styles.input} placeholder="Enter your phone number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput style={styles.input} placeholder="Enter your email address" value={email} onChangeText={setEmail} keyboardType="email-address" />
        </View>

        {/* Course Selection Lists */}
        <View style={styles.formSection}>
          <Text style={styles.sectionHeading}>Six-Month Courses (R1500 each)</Text>
          <View style={styles.courseList}>
            {sixMonthCourses.map(course => renderCourseItem(course, 1500))}
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionHeading}>Six-Week Courses (R750 each)</Text>
          <View style={styles.courseList}>
            {sixWeekCourses.map(course => renderCourseItem(course, 750))}
          </View>
        </View>

        {/* Fee Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionHeading}>Fee Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>R{subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Discount ({selectedCourses.length} courses)</Text>
            <Text style={styles.summaryValue}>- R{discount.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>R{total.toFixed(2)}</Text>
          </View>
        </View>

        {/* CTA Button */}
        <View style={styles.ctaSection}>
          <Pressable
            style={styles.ctaButton}
            onPress={handleCalculateFees}
          >
            <Text style={styles.ctaButtonText}>CALCULATE TOTAL FEES</Text>
          </Pressable>
        </View>

        <View style={{ height: 40 }} />

      </ScrollView>

      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 100, // For BottomNav
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
  titleSection: {
    padding: 20,
    alignItems: 'center',
  },
  mainHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
  },
  discountContainer: {
    backgroundColor: 'rgba(207, 181, 59, 0.1)',
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  discountHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 10,
  },
  discountIntro: {
    fontSize: 16,
    color: '#002a18',
    marginBottom: 20,
    textAlign: 'center',
  },
  discountCardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
  },
  finePrint: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 15,
    fontStyle: 'italic',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#004225',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    fontSize: 16,
    marginBottom: 15,
  },
  sectionHeading: {
    fontSize: 22,
    color: '#004225',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#CFB53B',
  },
  courseList: {
    marginBottom: 20,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  checkboxIcon: {
    marginRight: 15,
  },
  summarySection: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#333',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalRow: {
    borderTopWidth: 2,
    borderTopColor: '#004225',
    marginTop: 10,
    paddingTop: 10,
    borderBottomWidth: 0,
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
  ctaSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  ctaButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 4,
    width: '100%',
    alignItems: 'center',
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  courseButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  courseButtonSelected: {
    backgroundColor: '#dc3545',
    borderColor: '#CFB53B',
  },
  courseButtonPressed: {
    backgroundColor: '#e0e0e0',
  },
  courseButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  courseButtonTextSelected: {
    color: '#fff',
  },
  courseName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#002a18',
  },
  coursePrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#CFB53B',
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
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 80, // Increased from 60
    height: 80, // Increased from 60
    marginRight: 15,
  },
  orgName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#004225',
  },
  navMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    flex: 2,
  },
  navLinkContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginHorizontal: 4,
    marginVertical: 2,
  },
  navLinkHoverActive: {
    backgroundColor: '#e6f0f7',
  },
  navLink: {
    fontSize: 20, // Reduced from 18
    color: '#000000ff',
    fontWeight: '500',
    textAlign: 'center',
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
    color: '#004225',
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
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
    alignSelf: 'center',
    width: '50%',
  },
  introText: {
    fontSize: 18,
    color: '#002a18',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 26,
    maxWidth: 800,
  },
  formSection: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  formSectionTitle: {
    fontSize: 22,
    color: '#004225',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#CFB53B',
  },
  formInput: {
    width: '100%',
    padding: 15,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    fontSize: 18,
    marginBottom: 15,
  },
  // Button Styles
  buttonContainer: {
    alignItems: 'center',
  },
  calculateButton: {
    backgroundColor: '#004225',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 300,
    height: 60,
  },
  calculateButtonHover: {
    backgroundColor: '#002a18',
  },
  buttonIcon: {
    marginRight: 12,
  },
  calculateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  // Discount Section - MOVED INSIDE FORM CONTAINER
  discountSection: {
    backgroundColor: 'rgba(207, 181, 59, 0.1)',
    padding: 30,
    marginBottom: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  discountSectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000ff',
    textAlign: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
    alignSelf: 'center',
    width: '100%',
  },
  discountText: {
    fontSize: 16,
    color: '#002a18',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
    maxWidth: 800,
  },
  discountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 20,
    width: '100%',
  },
  discountCard: {
    backgroundColor: '#004225',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minWidth: 150,
    flex: 1,
    maxWidth: 200,
  },
  discountPercent: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#CFB53B',
    marginBottom: 8,
  },
  discountDesc: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 20,
  },
  discountNote: {
    fontSize: 14,
    color: '#002a18',
    textAlign: 'center',
    fontStyle: 'italic',
    maxWidth: 800,
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
  // Dropdown styles - UPDATED TO MATCH HOMESCREEN
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

export default CourseSelectionScreen;