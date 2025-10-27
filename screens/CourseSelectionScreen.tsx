import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Pressable, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp, RootStackParamList } from '../navigation/Navigation';
import { sixWeekCourses, sixMonthCourses } from '../types/courses';
import Icon from 'react-native-vector-icons/FontAwesome';


// Define a type for our course objects for consistency
type Course = {
  id: string;
  title: string;
  description: string;
};

const CourseSelectionScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const [showDropdown, setShowDropdown] = useState(false);

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
    ...sixMonthCourses.reduce((acc, course) => ({ ...acc, [course.id]: 1500 }), {}),
    ...sixWeekCourses.reduce((acc, course) => ({ ...acc, [course.id]: 750 }), {}),
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
    navigation.navigate(screen, params);
  };

  const handleLogin = () => {
    setShowDropdown(false);
    navigation.navigate('Login');
  };

  const handleSignup = () => {
    setShowDropdown(false);
    navigation.navigate('Signup');
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
    <TouchableOpacity key={course.id} style={styles.courseItem} onPress={() => toggleCourseSelection(course.id)}>
      <Icon
        name={selectedCourses.includes(course.id) ? 'check-square-o' : 'square-o'}
        size={24}
        color={selectedCourses.includes(course.id) ? '#CFB53B' : '#333'}
        style={styles.checkboxIcon}
      />
      <Text style={styles.courseName}>{course.title}</Text>
      <Text style={styles.coursePrice}>R{price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.fullScreenContainer}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerIconContainer}>
            <Icon name="bars" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Image source={require('../assets/images/LOGO.png')} style={styles.logo} />
            <Text style={styles.orgName}>Empowering the Nation</Text>
          </View>
          <View style={styles.headerIconContainer}>
            <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
              <Icon name="user" size={24} color="#000" />
            </TouchableOpacity>
            {showDropdown && (
              <View style={styles.dropdownMenu}>
                <TouchableOpacity style={styles.dropdownItem} onPress={handleLogin}><Text style={styles.dropdownItemText}>Login</Text></TouchableOpacity>
                <View style={styles.dropdownSeparator} />
                <TouchableOpacity style={styles.dropdownItem} onPress={handleSignup}><Text style={styles.dropdownItemText}>Sign Up</Text></TouchableOpacity>
              </View>
            )}
          </View>
        </View>

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

      {/* Persistent Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.bottomNavItem} onPress={() => handleNavigation('Home')}>
          <Icon name="home" size={24} color="#004225" />
          <Text style={styles.bottomNavText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem} onPress={() => handleNavigation('CourseSelection')}>
          <Icon name="file-text-o" size={24} color="#004225" />
          <Text style={styles.bottomNavText}>Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem} onPress={() => handleNavigation('CourseSelection')}>
          <Icon name="quote-right" size={24} color="#004225" />
          <Text style={styles.bottomNavText}>Quotes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem} onPress={() => handleNavigation('Contact')}>
          <Icon name="phone" size={24} color="#004225" />
          <Text style={styles.bottomNavText}>Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
  contentContainer: { paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee', zIndex: 1000 },
  headerIconContainer: { width: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitleContainer: { flex: 1, alignItems: 'center' },
  logo: { width: 50, height: 50, borderRadius: 25 },
  orgName: { fontSize: 16, fontWeight: '700', color: '#004225', marginTop: 4 },
  mobileNavContainer: { paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#f8f9fa', borderBottomWidth: 1, borderBottomColor: '#eee' },
  mobileNavLink: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e9ecef' },
  mobileNavLinkText: { fontSize: 16, fontWeight: '500', color: '#004225' },
  titleSection: { alignItems: 'center', padding: 20, marginBottom: 10 },
  mainHeading: { fontSize: 26, fontWeight: 'bold', color: '#000', textAlign: 'center', marginBottom: 15 },
  introText: { fontSize: 16, color: '#333', textAlign: 'center' },
  discountContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  discountHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  discountIntro: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 15,
  },
  discountGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  discountCard: {
    backgroundColor: '#343a40',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountCardText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  finePrint: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 15,
  },
  formSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#CFB53B',
    paddingBottom: 5,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  courseList: {
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  checkboxIcon: {
    marginRight: 15,
  },
  courseName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  coursePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#CFB53B',
  },
  summarySection: {
    paddingHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#f8f9fa',
    paddingVertical: 20,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#333',
  },
  summaryValue: {
    fontSize: 16,
    color: '#333',
  },
  totalRow: {
    borderTopWidth: 2,
    borderColor: '#CFB53B',
    paddingTop: 10,
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  ctaSection: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  ctaButton: {
    backgroundColor: '#CFB53B',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee', paddingVertical: 8, height: 70 },
  bottomNavItem: { alignItems: 'center', justifyContent: 'center' },
  bottomNavText: { fontSize: 12, color: '#004225', marginTop: 4 },
  dropdownMenu: { position: 'absolute', top: 40, right: 0, backgroundColor: '#fff', borderRadius: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 6, elevation: 8, minWidth: 120, borderWidth: 1, borderColor: '#eee', zIndex: 1001 },
  dropdownItem: { paddingVertical: 10, paddingHorizontal: 15 },
  dropdownSeparator: { height: 1, backgroundColor: '#eee' },
  dropdownItemText: { fontSize: 14, color: '#002a18', fontWeight: '500' },
});

export default CourseSelectionScreen;