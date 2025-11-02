import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp, RootStackParamList } from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderComponent from '../HeaderComponent';
import BottomNav from '../BottomNav';

const FirstAidCourseScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();

  // Data for the curriculum
  const curriculumData = [
    { title: "1. Introduction to First Aid", description: "Understanding the principles and importance of first aid.", points: ["Legal and ethical considerations in providing assistance", "Basic equipment and supplies", "Emergency response protocols"] },
    { title: "2. CPR and AED Training", description: "Cardiopulmonary resuscitation techniques for all ages.", points: ["CPR techniques for adults, children, and infants", "Proper use of Automated External Defibrillators (AEDs)", "Recognizing and responding to cardiac emergencies"] },
    { title: "3. Wound Care and Infection Control", description: "Techniques for cleaning, dressing, and managing wounds.", points: ["Techniques for cleaning and dressing wounds", "Addressing and preventing infection", "Treatment of minor injuries and burns"] },
    { title: "4. Medical Emergencies", description: "Identifying and managing symptoms of common medical emergencies.", points: ["Allergic reactions, asthma attacks, and seizures", "Recognizing signs of shock and appropriate intervention", "Diabetic emergencies and stroke recognition"] },
    { title: "5. Trauma Management", description: "Assessing and responding to trauma injuries.", points: ["Fractures, sprains, and head injuries", "Techniques for immobilization", "Safe patient transport methods"] },
  ];

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
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <HeaderComponent />
        </View>

        {/* Mobile Navigation */}
        <View style={styles.mobileNavContainer}>
          {navLinks.map((link) => (
            <TouchableOpacity key={link.name} style={styles.mobileNavLink} onPress={() => handleNavigation(link.name)}>
              <Text style={styles.mobileNavLinkText}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

      {/* Hero Section */}
      <ImageBackground
        source={require('../assets/images/first-aid-course.jpg')}
        style={styles.hero}
        resizeMode="cover"
      >
        <View style={styles.heroOverlay}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>First Aid Training Program</Text>
            <Text style={styles.heroPrice}>R1500</Text>
            <Text style={styles.heroDuration}>6-Month Comprehensive Certification Course</Text>
            <Pressable style={styles.heroButton} onPress={handleEnroll}>
              <Text style={styles.heroButtonText}>ENROLL NOW</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
      
      {/* Main Content */}
      <View style={styles.section}>
        {/* Overview Section */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Program Overview</Text>
          <Text style={styles.description}>
            Our 6-month First Aid Training Program is designed to equip participants with essential life-saving skills and the confidence to act effectively in emergencies. 
            This comprehensive program covers a wide range of first aid techniques, ensuring that you are prepared to handle various medical situations with competence and care.
          </Text>
        </View>

        {/* Course Highlights Grid */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Course Highlights</Text>
          <View style={styles.highlightsGrid}>
            <View style={styles.highlightItem}>
              <Icon name="heartbeat" size={40} color="#CFB53B" style={styles.highlightIcon} />
              <Text style={styles.highlightTitle}>CPR & AED Training</Text>
              <Text style={styles.highlightDescription}>Life-saving techniques for all age groups</Text>
            </View>
            <View style={styles.highlightItem}>
              <Icon name="bandage" size={40} color="#CFB53B" style={styles.highlightIcon} />
              <Text style={styles.highlightTitle}>Wound Care</Text>
              <Text style={styles.highlightDescription}>Infection control and injury management</Text>
            </View>
            <View style={styles.highlightItem}>
              <Icon name="ambulance" size={40} color="#CFB53B" style={styles.highlightIcon} />
              <Text style={styles.highlightTitle}>Emergency Response</Text>
              <Text style={styles.highlightDescription}>Medical and trauma emergency handling</Text>
            </View>
            <View style={styles.highlightItem}>
              <Icon name="certificate" size={40} color="#CFB53B" style={styles.highlightIcon} />
              <Text style={styles.highlightTitle}>Certification</Text>
              <Text style={styles.highlightDescription}>Nationally recognized qualification</Text>
            </View>
          </View>
        </View>

        {/* Detailed Curriculum */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Detailed Curriculum</Text>
          
          <View style={styles.curriculumContainer}>
            {curriculumData.map((item, index) => (
              <View key={index} style={styles.curriculumItem}>
                <Text style={styles.curriculumTitle}>{item.title}</Text>
                <Text style={styles.curriculumDescription}>{item.description}</Text>
                {item.points.map((point, i) => (
                  <Text key={i} style={styles.curriculumPoint}>• {point}</Text>
                ))}
              </View>
            ))}
          </View>
        </View>

        {/* Benefits Section */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Why Choose Our First Aid Program</Text>
          <View style={styles.benefitsGrid}>
            <View style={styles.benefitCard}>
              <Icon name="user-md" size={40} color="#000" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Expert Instructors</Text>
              <Text style={styles.benefitText}>Learn from certified professionals with extensive experience in emergency medical services.</Text>
            </View>
            <View style={styles.benefitCard}>
              <Icon name="hands-helping" size={40} color="#000" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Hands-On Learning</Text>
              <Text style={styles.benefitText}>Gain practical experience through interactive sessions and real-life simulations.</Text>
            </View>
            <View style={styles.benefitCard}>
              <Icon name="calendar-alt" size={40} color="#000" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Flexible Schedule</Text>
              <Text style={styles.benefitText}>Options for evening and weekend classes to fit your busy lifestyle.</Text>
            </View>
            <View style={styles.benefitCard}>
              <Icon name="certificate" size={40} color="#000" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Certification</Text>
              <Text style={styles.benefitText}>Receive a nationally recognized certificate upon successful completion.</Text>
            </View>
          </View>
        </View>

        {/* Target Audience */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Who Should Enroll</Text>
          <Text style={styles.audienceText}>
            This program is ideal for individuals who want to enhance their ability to respond effectively in emergency situations, including parents, teachers, coaches, and anyone interested in acquiring life-saving skills.
          </Text>
          <Text style={styles.audienceText}>
            Join us to become a confident first responder and make a difference in emergencies!
          </Text>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Pressable style={styles.enrollButton} onPress={handleEnroll}>
            <Text style={styles.enrollButtonText}>ENROLL NOW - R1500</Text>
          </Pressable>
          <Text style={styles.ctaSubtext}>Limited spots available for next intake</Text>
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
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 80, // Space for bottom nav
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
  hero: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
  heroOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
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
    textAlign: 'center',
  },
  heroDuration: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.9,
  },
  heroButton: {
    backgroundColor: '#004225',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
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
    alignSelf: 'center',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  // Course Highlights
  highlightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 30,
    width: '100%',
  },
  highlightItem: {
    backgroundColor: '#f8f9fa',
    flex: 1,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: '40%', // For two-column layout
  },
  highlightIcon: {
    marginBottom: 20,
  },
  highlightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
    textAlign: 'center',
  },
  highlightDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
  },
  // Curriculum
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
    width: '100%',
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
  curriculumPoints: {
    marginLeft: 10,
  },
  curriculumPoint: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
    lineHeight: 24,
  },
  // Benefits Section
  benefitsGrid: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 30,
    width: '100%',
  },
  benefitCard: {
    backgroundColor: '#f8f9fa',
    flex: 1,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
    minWidth: '40%',
  },
  benefitIcon: {
    marginBottom: 25,
  },
  benefitTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
    textAlign: 'center',
  },
  benefitText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
  },
  // Target Audience
  audienceText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  // CTA Section
  ctaSection: {
    backgroundColor: '#f8f9fa',
    padding: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    width: '100%',
  },
  enrollButton: {
    backgroundColor: '#004225',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 20,
  },
  enrollButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  ctaSubtext: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
});

export default FirstAidCourseScreen;