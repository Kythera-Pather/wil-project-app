import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Pressable, PressableStateCallbackType, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp, RootStackParamList } from '../navigation/Navigation';
import { sixMonthCourses } from '../types/courses';
import Icon from 'react-native-vector-icons/FontAwesome';

type PressableState = PressableStateCallbackType & { hovered?: boolean };

// Mapping course IDs to images
const courseImages: { [key: string]: any } = {
  'first-aid': require('../assets/images/first-aid-course.jpg'),
  'sewing': require('../assets/images/sewing-course.jpg'),
  'landscaping': require('../assets/images/landscaping-course.jpg'),
  'life-skills': require('../assets/images/life-skills-course.jpg'),
};

// Define a type for our course objects
type Course = {
  id: string;
  title: string;
  description: string;
};

const SixMonthCoursesScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const [showDropdown, setShowDropdown] = useState(false);

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

  const navLinks = [
    { label: 'Home', screen: 'Home' as keyof RootStackParamList },
    { label: 'Six Week Courses', screen: 'SixWeekCourses' as keyof RootStackParamList },
    { label: 'Six Month Courses', screen: 'SixMonthCourses' as keyof RootStackParamList },
    { label: 'Course Selection', screen: 'CourseSelection' as keyof RootStackParamList },
    { label: 'Contact Us', screen: 'Contact' as keyof RootStackParamList },
  ];

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
            <TouchableOpacity
              key={link.screen}
              style={styles.mobileNavLink}
              onPress={() => handleNavigation(link.screen)}
            >
              <Text style={styles.mobileNavLinkText}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.titleSection}>
          <Text style={styles.pageContext}>Six-Month Page</Text>
          <Text style={styles.mainHeading}>Six-Month Courses</Text>
          <Text style={styles.introText}>
            Our comprehensive six-month courses are designed to provide in-depth knowledge and practical skills, preparing you for a successful career.
          </Text>
        </View>

        {/* 2. Course Listings */}
        <View style={styles.courseGrid}>
          {sixMonthCourses.map((course: Course) => (
            <View key={course.id} style={styles.courseCard}>
              <Image source={courseImages[course.id]} style={styles.courseImage} />
              <View style={styles.cardContent}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseDescription}>{course.description}</Text>
                <View style={styles.bulletPointsContainer}>
                  <View style={styles.bulletPoint}>
                    <Icon name="circle" size={6} color="#CFB53B" style={styles.bulletIcon} />
                    <Text style={styles.bulletText}>6 Months</Text>
                  </View>
                  <View style={styles.bulletPoint}>
                    <Icon name="circle" size={6} color="#CFB53B" style={styles.bulletIcon} />
                    <Text style={styles.bulletText}>Certificate Provided</Text>
                  </View>
                  <View style={styles.bulletPoint}>
                    <Icon name="circle" size={6} color="#CFB53B" style={styles.bulletIcon} />
                    <Text style={styles.bulletText}>Practical Training</Text>
                  </View>
                </View>
                <Text style={styles.priceText}>R1500</Text>
                <Pressable
                  style={({ hovered }: PressableState) => [styles.learnMoreButton, hovered && styles.buttonHover]}
                  onPress={() => handleNavigation('CourseDetail', { courseId: course.id, courseType: 'six-month' })}
                >
                  <Text style={styles.learnMoreButtonText}>Learn More</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>

        {/* 3. Value Proposition */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Why Choose our Six-Month Courses?</Text>
          <Text style={styles.bodyText}>
            Our six-month programs offer a perfect blend of theoretical knowledge and intensive practical application. We believe in learning by doing, which is why our curriculum is packed with hands-on projects and real-world scenarios to ensure you are job-ready upon completion.
          </Text>
          <Text style={styles.bodyText}>
            Led by experienced instructors who are experts in their fields, you will receive mentorship and guidance throughout your learning journey. Upon successful completion, you will be awarded a valuable certificate that is recognized by employers and validates your newfound expertise.
          </Text>
        </View>

        {/* 4. Enrollment CTA */}
        <View style={styles.section}>
          <Pressable
            style={({ hovered }: PressableState) => [styles.ctaButton, hovered && styles.buttonHover]}
            onPress={() => handleNavigation('CourseSelection')}
          >
            <Text style={styles.ctaButtonText}>ENROLL NOW</Text>
          </Pressable>
        </View>

      </ScrollView>

      {/* 5. Persistent Bottom Navigation */}
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
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100, // Space for bottom nav
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    zIndex: 1000,
  },
  headerIconContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  orgName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#004225',
    marginTop: 4,
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
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  pageContext: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 10,
  },
  mainHeading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
    paddingBottom: 5,
    marginBottom: 15,
  },
  introText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  courseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  courseCard: {
    backgroundColor: '#343a40', // Dark gray
    borderRadius: 15,
    margin: 10,
    width: '42%', // For two-column layout with spacing
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  courseImage: {
    width: '100%',
    height: 100,
  },
  cardContent: {
    padding: 15,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 13,
    color: '#adb5bd',
    marginBottom: 12,
    minHeight: 60,
  },
  bulletPointsContainer: {
    marginBottom: 15,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  bulletIcon: {
    marginRight: 8,
  },
  bulletText: {
    fontSize: 12,
    color: '#adb5bd',
  },
  priceText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#CFB53B',
    marginBottom: 15,
  },
  learnMoreButton: {
    backgroundColor: '#CFB53B',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  learnMoreButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonHover: {
    backgroundColor: '#bcae35',
  },
  section: {
    padding: 20,
    marginTop: 20,
  },
  sectionHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
    paddingBottom: 5,
    marginBottom: 20,
    alignSelf: 'center',
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  ctaButton: {
    backgroundColor: '#CFB53B',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 8,
    height: 70,
  },
  bottomNavItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNavText: {
    fontSize: 12,
    color: '#004225',
    marginTop: 4,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
    minWidth: 120,
    borderWidth: 1,
    borderColor: '#eee',
    zIndex: 1001,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownSeparator: {
    height: 1,
    backgroundColor: '#eee',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#002a18',
    fontWeight: '500',
  },
});

export default SixMonthCoursesScreen;
