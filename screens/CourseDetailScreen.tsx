import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Pressable, ImageBackground } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { AppNavigationProp, RootStackParamList } from '../navigation/Navigation';
import { sixMonthCourses, sixWeekCourses } from '../data/courses';
import Icon from 'react-native-vector-icons/FontAwesome'; // Keep for other icons
import HeaderComponent from '../HeaderComponent';
import BottomNav from '../BottomNav';

type CourseDetailScreenRouteProp = RouteProp<RootStackParamList, 'CourseDetail'>;

interface Props {
  route: CourseDetailScreenRouteProp;
}
const CourseDetailScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<AppNavigationProp>();
  const { courseId, courseType } = route.params;
  
  const course = courseType === 'six-month' 
    ? sixMonthCourses.find(c => c.id === courseId)
    : sixWeekCourses.find(c => c.id === courseId);

  if (!course) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Course not found</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backLink}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

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

  const handleEnroll = () => {
    handleNavigation('CourseSelection');
  };

  return (
    <View style={styles.fullScreenContainer}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <HeaderComponent />
        </View>

        {/* Hero Section */}
        <ImageBackground source={course.image} style={styles.hero} resizeMode="cover">
          <View style={styles.heroOverlay}>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>{course.title}</Text>
              <Text style={styles.heroPrice}>R{course.price}</Text>
              <Text style={styles.heroDuration}>{courseType === 'six-month' ? '6-Month' : '6-Week'} Certification Course</Text>
              <Pressable style={styles.heroButton} onPress={handleEnroll}>
                <Text style={styles.heroButtonText}>ENROLL NOW</Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>

        {/* Main Content */}
        <View style={styles.section}>
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Program Overview</Text>
            <Text style={styles.description}>{course.description}</Text>
          </View>

          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Detailed Curriculum</Text>
            <View style={styles.curriculumContainer}>
              {course.highlights.map((highlight, index) => (
                <View key={index} style={styles.curriculumItem}>
                  <Text style={styles.curriculumTitle}>{highlight.title}</Text>
                  <Text style={styles.curriculumDescription}>{highlight.overview}</Text>
                  {highlight.items && highlight.items.map((item, itemIndex) => (
                    <Text key={itemIndex} style={styles.curriculumPoint}>• {item}</Text>
                  ))}
                </View>
              ))}
            </View>
          </View>

          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Why Choose This Program</Text>
            <View style={styles.benefitsGrid}>
              {course.benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitCard}>
                  <Icon name="check-circle" size={30} color="#004225" style={styles.benefitIcon} />
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Who Should Enroll</Text>
            {course.whoShouldEnroll.map((item, index) => (
              <Text key={index} style={styles.description}>{item}</Text>
            ))}
          </View>

          <View style={styles.ctaSection}>
            <Pressable style={styles.enrollButton} onPress={handleEnroll}>
              <Text style={styles.enrollButtonText}>ENROLL NOW - R{course.price}</Text>
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
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#d9534f',
    marginBottom: 20,
  },
  backLink: {
    fontSize: 16,
    color: '#004225',
    textDecorationLine: 'underline',
  },
  header: {
    zIndex: 10,
  },
  hero: {
    width: '100%',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  heroPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#CFB53B',
    marginBottom: 10,
  },
  heroDuration: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 30,
  },
  heroButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 4,
  },
  heroButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  section: {
    padding: 20,
  },
  contentSection: {
    marginBottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
    paddingBottom: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  curriculumContainer: {
    width: '100%',
  },
  curriculumItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#004225',
  },
  curriculumTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 10,
  },
  curriculumDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  curriculumPoint: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
    lineHeight: 24,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  benefitCard: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
  },
  benefitIcon: {
    marginRight: 15,
  },
  benefitText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  ctaSection: {
    backgroundColor: '#f8f9fa',
    padding: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    width: '100%',
  },
  enrollButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 4,
    alignItems: 'center',
  },
  enrollButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },
});

export default CourseDetailScreen;