import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Pressable, PressableStateCallbackType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp, RootStackParamList } from '../navigation/Navigation';
import { sixWeekCourses } from '../types/courses';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderComponent from '../HeaderComponent';
import BottomNav from '../BottomNav';

type PressableState = PressableStateCallbackType & { hovered?: boolean };

// Mapping course IDs to images
const courseImages: { [key: string]: any } = {
  'cooking': require('../assets/images/cooking-course.jpg'),
  'child-minding': require('../assets/images/child-minding-course.jpg'),
  'garden-maintenance': require('../assets/images/landscaping-course.jpg'), // Reusing landscaping image
};

// Define a type for our course objects
type Course = {
  id: string;
  title: string;
  description: string;
};

const SixWeekCoursesScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();

  const handleNavigation = <RouteName extends keyof RootStackParamList>(screen: RouteName, params?: RootStackParamList[RouteName]) => {
    navigation.navigate({ name: screen, params: params } as any);
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
        <HeaderComponent />

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

        {/* 1. Header and Page Title */}
        <View style={styles.titleSection}>
          <Text style={styles.pageContext}>Six-Week Page</Text>
          <Text style={styles.mainHeading}>Six-Week Courses</Text>
          <Text style={styles.introText}>
            Our six-week courses provide practical skills and are perfect for quick upskilling to boost your career prospects.
          </Text>
        </View>

        {/* 2. Course Listings */}
        <View style={styles.courseGrid}>
          {sixWeekCourses.map((course: Course) => (
            <View key={course.id} style={styles.courseCard}>
              <Image source={courseImages[course.id]} style={styles.courseImage} />
              <View style={styles.cardContent}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseDescription}>{course.description}</Text>
                <View style={styles.bulletPointsContainer}>
                  <View style={styles.bulletPoint}>
                    <Icon name="circle" size={6} color="#CFB53B" style={styles.bulletIcon} />
                    <Text style={styles.bulletText}>6 Weeks Duration</Text>
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
                <Text style={styles.priceText}>R750</Text>
                <Pressable
                  style={({ pressed }: PressableStateCallbackType) => [styles.learnMoreButton, pressed && styles.buttonHover]}
                  onPress={() => handleNavigation('CourseDetail', { courseId: course.id, courseType: 'six-week' })}
                >
                  <Text style={styles.learnMoreButtonText}>Learn More</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>

        {/* 3. Value Proposition */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Why Choose our Six-Week Courses?</Text>
          <View style={styles.featuresGrid}>
            <View style={styles.featureCard}>
              <Text style={styles.featureTitle}>Short Duration</Text>
              <Text style={styles.featureText}>Complete your training quickly and enter the job market sooner.</Text>
            </View>
            <View style={styles.featureCard}>
              <Text style={styles.featureTitle}>Affordable</Text>
              <Text style={styles.featureText}>Gain valuable skills at an accessible price point without a long-term commitment.</Text>
            </View>
            <View style={styles.featureCard}>
              <Text style={styles.featureTitle}>Certification</Text>
              <Text style={styles.featureText}>Receive a certificate upon completion to validate your new expertise.</Text>
            </View>
            <View style={styles.featureCard}>
              <Text style={styles.featureTitle}>Focused Learning</Text>
              <Text style={styles.featureText}>Concentrated curriculum focused on practical, immediately applicable skills.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  contentContainer: {
    paddingBottom: 100, // Space for bottom nav
  },
  mobileNavContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#004225',
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
  pageContext: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 5,
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
  courseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    padding: 20,
  },
  cardContent: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  bulletPointsContainer: {
    marginTop: 15,
    marginBottom: 15,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bulletIcon: {
    marginRight: 10,
  },
  bulletText: {
    fontSize: 14,
    color: '#002a18',
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#CFB53B',
    marginBottom: 15,
  },
  learnMoreButton: {
    backgroundColor: '#004225',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  learnMoreButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonHover: {
    backgroundColor: '#002a18',
  },
  sectionHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
    paddingBottom: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
    alignSelf: 'center',
    width: 'auto',
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#002a18',
    textAlign: 'center',
    marginBottom: 15,
    maxWidth: 800,
    alignSelf: 'center',
  },
  ctaButton: {
    backgroundColor: '#004225',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 4,
    alignSelf: 'center',
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  featureCard: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 8,
    flex: 1,
    minWidth: 250,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    lineHeight: 20,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 10,
  },
  courseDescription: {
    fontSize: 14,
    color: '#002a18',
    marginBottom: 15,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000ff',
    textAlign: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
    alignSelf: 'center',
    width: '25%',
  },
  introText: {
    fontSize: 16,
    color: '#002a18',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
    maxWidth: 800,
    alignSelf: 'center',
    width: '90%',
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 300,
    marginBottom: 30,
    overflow: 'hidden',
  },
  courseImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
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
  // Updated dropdown styles
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

export default SixWeekCoursesScreen;