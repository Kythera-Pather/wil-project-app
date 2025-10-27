import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Linking, Pressable, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp, RootStackParamList } from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChildMindingSixWeekScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const [showDropdown, setShowDropdown] = useState(false);

  // Data for the curriculum
  const curriculumData = [
    { title: "Week 1: Introduction to Child-Minding", description: "Learn the core responsibilities and best practices of child-minding.", points: ["Overview of child-minding roles and duties", "Understanding child development stages", "Creating safe and nurturing environments", "Effective communication with children and parents"] },
    { title: "Week 2: Child Safety and First Aid", description: "Focus on essential safety practices and first aid skills.", points: ["Child safety and accident prevention", "Basic first aid: CPR, cuts, burns, choking", "Recognizing signs of illness and injury", "Emergency procedures and contacting services"] },
    { title: "Week 3: Nutrition and Healthy Eating", description: "Learn about nutritional needs and meal planning for children.", points: ["Basics of child nutrition and dietary requirements", "Planning balanced meals and snacks", "Addressing dietary concerns and allergies", "Safe food preparation and hygiene practices"] },
    { title: "Week 4: Engaging Activities and Developmental Play", description: "Explore age-appropriate activities that support development.", points: ["Benefits of play in child development", "Designing creative activities for various ages", "Encouraging social, emotional, and cognitive development", "Incorporating educational toys and resources"] },
    { title: "Week 5: Behavior Management and Positive Discipline", description: "Learn strategies for managing behavior and positive discipline.", points: ["Understanding child behavior and challenges", "Techniques for positive discipline and boundaries", "Strategies for managing challenging behaviors", "Building supportive relationships with children"] },
    { title: "Week 6: Communication with Parents and Professionals", description: "Focus on effective communication strategies with parents.", points: ["Best practices for communicating with parents", "Collaborating with caregivers and professionals", "Handling sensitive topics and feedback", "Documentation and reporting practices"] },
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

  const handleEnroll = () => {
    navigation.navigate('CourseSelection');
  };

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
            <TouchableOpacity key={link.name} style={styles.mobileNavLink} onPress={() => handleNavigation(link.name)}>
              <Text style={styles.mobileNavLinkText}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Hero Section */}
        <ImageBackground source={require('../assets/images/child-minding-course.jpg')} style={styles.hero} resizeMode="cover">
          <View style={styles.heroOverlay}>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Child Minding Training Program</Text>
              <Text style={styles.heroPrice}>R750</Text>
              <Text style={styles.heroDuration}>6-Week Comprehensive Certification Course</Text>
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
            Our 6-week Child Minding Training Program is designed to provide caregivers, parents, and professionals with the skills and knowledge needed to ensure the well-being, safety, and development of children. 
            This program combines practical experience with theoretical understanding in child care, development, and emergency response.
          </Text>
        </View>

        {/* Course Highlights Grid */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Course Highlights</Text>
          <View style={styles.highlightsGrid}>
            <View style={styles.highlightItem}>
              <Icon name="child" size={30} color="#CFB53B" style={styles.highlightIcon} />
              <Text style={styles.highlightTitle}>Child Development</Text>
              <Text style={styles.highlightDescription}>Understand child development stages and needs</Text>
            </View>
            <View style={styles.highlightItem}>
              <Icon name="medkit" size={40} color="#CFB53B" style={styles.highlightIcon} />
              <Text style={styles.highlightTitle}>Safety & First Aid</Text>
              <Text style={styles.highlightDescription}>Essential safety practices and emergency response</Text>
            </View>
            <View style={styles.highlightItem}>
              <Icon name="cutlery" size={40} color="#CFB53B" style={styles.highlightIcon} />
              <Text style={styles.highlightTitle}>Nutrition</Text>
              <Text style={styles.highlightDescription}>Healthy meal planning and dietary requirements</Text>
            </View>
            <View style={styles.highlightItem}>
              <Icon name="certificate" size={40} color="#CFB53B" style={styles.highlightIcon} />
              <Text style={styles.highlightTitle}>Certification</Text>
              <Text style={styles.highlightDescription}>Nationally recognized qualification</Text>
            </View>
          </View>
        </View>

        {/* Weekly Curriculum */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>6-Week Course Curriculum</Text>
          
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
          <Text style={styles.sectionTitle}>Why Choose Our Program</Text>
          <View style={styles.benefitsGrid}>
            <View style={styles.benefitCard}>
              <Icon name="graduation-cap" size={40} color="#000" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Expert Instructors</Text>
              <Text style={styles.benefitText}>Learn from experienced child care professionals.</Text>
            </View>
            <View style={styles.benefitCard}>
              <Icon name="handshake-o" size={40} color="#000" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Hands-On Learning</Text>
              <Text style={styles.benefitText}>Practical exercises and real-life scenarios.</Text>
            </View>
            <View style={styles.benefitCard}>
              <Icon name="user" size={40} color="#000" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Personalized Guidance</Text>
              <Text style={styles.benefitText}>Feedback and support tailored to your needs.</Text>
            </View>
            <View style={styles.benefitCard}>
              <Icon name="calendar" size={40} color="#000" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Flexible Scheduling</Text>
              <Text style={styles.benefitText}>Classes available at various times.</Text>
            </View>
          </View>
        </View>

        {/* Target Audience */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Who Should Enroll</Text>
          <Text style={styles.audienceText}>This program is suitable for parents, caregivers, child care professionals, and anyone interested in enhancing their skills in child-minding. Equip yourself with essential child-minding skills and provide exceptional care!</Text>
          <Text style={styles.audienceText}>
            Join us to become a confident and skilled child caregiver!
          </Text>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Pressable style={styles.enrollButton} onPress={handleEnroll}>
            <Text style={styles.enrollButtonText}>ENROLL NOW - R750</Text>
          </Pressable>
          <Text style={styles.ctaSubtext}>Limited spots available for next intake</Text>
        </View>
      </View>

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
      </ScrollView>
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
    color: '#CFB53B',
    textAlign: 'center',
    lineHeight: 22,
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
  audienceText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
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
    color: '#004225',
    fontWeight: '500',
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
});

export default ChildMindingSixWeekScreen;