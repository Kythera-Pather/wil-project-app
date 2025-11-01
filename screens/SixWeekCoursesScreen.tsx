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
                  onPress={() => {
                    if (course.id === 'child-minding') {
                      handleNavigation('ChildMindingCourse');
                    } else if (course.id === 'garden-maintenance') {
                      handleNavigation('GardenMaintenanceCourse');
                    } else if (course.id === 'cooking') {
                      handleNavigation('CookingCourse');
                    } else {
                      handleNavigation('CourseDetail', { courseId: course.id, courseType: 'six-week' });
                    }
                    
                  }}
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
    backgroundColor: '#fff',
  },
  container: {
    flex: 1, backgroundColor: '#fff'
  },
  contentContainer: {
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
    backgroundColor: '#343a40',
    borderRadius: 15,
    margin: 10,
    width: '42%',
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
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },
  featureCard: {
    backgroundColor: '#343a40',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    minWidth: '40%',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 13,
    color: '#adb5bd',
    textAlign: 'center',
  },
});

export default SixWeekCoursesScreen;