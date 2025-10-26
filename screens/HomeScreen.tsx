import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Linking, Pressable, ImageBackground, PressableStateCallbackType, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, AppNavigationProp } from '../navigation/Navigation';
import { sixMonthCourses, sixWeekCourses } from '../data/courses';
import Icon from 'react-native-vector-icons/FontAwesome';

type PressableState = PressableStateCallbackType & { hovered?: boolean };

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleNavigation = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
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
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        {/* Header */}
      <View style={styles.header}>
        {/* Hamburger Menu Icon (placeholder) */}
        <TouchableOpacity style={styles.headerIconContainer}>
          <Icon name="bars" size={24} color="#000" />
        </TouchableOpacity>

        {/* Logo and Brand Name */}
        <View style={styles.headerTitleContainer}>
          <Image source={require('../assets/images/LOGO.png')} style={styles.logo} />
          <Text style={styles.orgName}>Empowering the Nation</Text>
        </View>

        {/* User Icon and Dropdown */}
        <View style={styles.headerIconContainer}>
          <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
            <Icon name="user" size={24} color="#000" />
          </TouchableOpacity>
          {showDropdown && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity style={styles.dropdownItem} onPress={handleLogin}>
                <Text style={styles.dropdownItemText}>Login</Text>
              </TouchableOpacity>
              <View style={styles.dropdownSeparator} />
              <TouchableOpacity style={styles.dropdownItem} onPress={handleSignup}>
                <Text style={styles.dropdownItemText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Mobile Navigation Column */}
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

      {/* Hero Section */}
      <View>
        <ImageBackground
          source={require('../assets/images/homepage.jpg')}
          style={styles.hero}
          resizeMode="cover"
        >
          <View style={styles.heroOverlay}>
            <View style={styles.heroTextContainer}>
              <Text style={styles.heroTitleSmall}>Empowering the Nation Through Education</Text>
              <Text style={styles.heroTitleLarge}>Empower Yourself Through Quality Education</Text>
            </View>
            <View style={styles.heroCtaContainer}>
              <Text style={styles.heroSubtitle}>Transform your future with our specialized skills training programs designed for domestic workers and gardeners.</Text>
              <Pressable
                style={({ hovered }: PressableState) => [styles.heroBtn, hovered && styles.btnHover]}
                onPress={() => handleNavigation('CourseSelection')}>
                <Text style={styles.btnText}>EXPLORE OUR COURSES</Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* Stats Section */}
      <View style={styles.stats}>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Students Trained</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Courses Offered</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>95%</Text>
            <Text style={styles.statLabel}>Success Rate</Text>
          </View>
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Choose Us</Text>
        <View style={styles.featuresGrid}>
          <View style={styles.featureCard}>
            <Icon name="graduation-cap" size={40} color="#CFB53B" style={styles.featureIcon} />
            <Text style={styles.featureTitle}>Quality Education</Text>
            <Text style={styles.featureCardText}>Our courses are designed by industry experts to provide practical, real-world skills.</Text>
          </View>
          <View style={styles.featureCard}>
            <Icon name="users" size={40} color="#CFB53B" style={styles.featureIcon} />
            <Text style={styles.featureTitle}>Expert Instructors</Text>
            <Text style={styles.featureCardText}>Learn from professionals with years of experience in their respective fields.</Text>
          </View>
          <View style={styles.featureCard}>
            <Icon name="heart" size={40} color="#CFB53B" style={styles.featureIcon} />
            <Text style={styles.featureTitle}>Community Impact</Text>
            <Text style={styles.featureCardText}>Join a movement that's transforming lives and uplifting communities across South Africa.</Text>
          </View>
        </View>
      </View>

      {/* Courses Preview */}
      <View style={[styles.section, styles.coursesPreview]}>
        <Text style={styles.sectionTitle}>Our Popular Courses</Text>
        <View style={styles.coursesGrid}>
          <View style={styles.courseCard}>
            <View style={styles.courseCardImageContainer}>
              <Image 
                source={require('../assets/images/first-aid-course.jpg')} 
                style={styles.courseImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.courseContent}>
              <Text style={styles.courseTitle}>First Aid Training</Text>
              <Text style={styles.courseText}>Learn essential life-saving skills with our comprehensive first aid course.</Text>
              <Pressable
                style={({ hovered }: PressableState) => [styles.btnOutline, hovered && styles.btnOutlineHover]}
                onPress={() => handleNavigation('FirstAidCourse')}
              >
                <Text style={styles.btnOutlineText}>LEARN MORE</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.courseCard}>
            <View style={styles.courseCardImageContainer}>
              <Image 
                source={require('../assets/images/cooking-course.jpg')} 
                style={styles.courseImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.courseContent}>
              <Text style={styles.courseTitle}>Cooking & Nutrition</Text>
              <Text style={styles.courseText}>Master the art of preparing nutritious, balanced meals for modern households.</Text>
              <Pressable
                style={({ hovered }: PressableState) => [styles.btnOutline, hovered && styles.btnOutlineHover]}
                onPress={() => handleNavigation('CookingCourse')}
              >
                <Text style={styles.btnOutlineText}>LEARN MORE</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.courseCard}>
            <View style={styles.courseCardImageContainer}>
              <Image 
                source={require('../assets/images/child-minding-course.jpg')} 
                style={styles.courseImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.courseContent}>
              <Text style={styles.courseTitle}>Child Minding</Text>
              <Text style={styles.courseText}>Gain expertise in early childhood development and create safe environments for children.</Text>
              <Pressable
                style={({ hovered }: PressableState) => [styles.btnOutline, hovered && styles.btnOutlineHover]}
                onPress={() => handleNavigation('ChildMindingCourse')}
              >
                <Text style={styles.btnOutlineText}>LEARN MORE</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <Pressable
          style={({ hovered }: PressableState) => [styles.btn, { alignSelf: 'center', marginTop: 20, width:300, height:40 }, hovered && styles.btnHover]}
          onPress={() => handleNavigation('CourseSelection')}
        >
          <Text style={styles.viewAllBtnText}>VIEW ALL COURSES</Text>
        </Pressable>
      </View>

      {/* About Section */}
      <View style={[styles.section, styles.aboutSection]}>
        <Text style={styles.sectionTitle}>Our Story</Text>
        <Text style={styles.bodyText}>
          Founded in 2018 by Precious Radebe, <Text style={{fontWeight: 'bold'}}>Empowering the Nation</Text> was born from personal experience—watching family members struggle due to lack of formal education and skills training. 
          Our initiative provides the chances they never had: opportunities to rise above circumstances and create better futures.
        </Text>
        <Text style={styles.bodyText}>
          We specialize in upskilling domestic workers and gardeners who have traditionally been overlooked in the professional landscape. 
          These individuals are often the backbone of households, yet their contributions frequently go undervalued. 
          Our programs change this by offering specialized training that enhances skills, earning potential, dignity, and self-confidence.
        </Text>
        <Pressable
          style={({ hovered }: PressableState) => [styles.btn, styles.goldBtn, { alignSelf: 'center', marginTop: 20}, hovered && styles.goldBtnHover]}
          onPress={() => handleNavigation('AboutScreen')}
        >
          <Text style={styles.goldBtnText}>LEARN MORE ABOUT US</Text>
        </Pressable>
      </View>

      {/* Testimonials */}
      <View style={[styles.section, styles.testimonials]}>
        <Text style={[styles.sectionTitle, styles.testimonialsTitle]}>Success Stories</Text>
        <View style={styles.testimonialGrid}>
          <View style={styles.testimonialCard}>
            <Text style={styles.testimonialText}>"The First Aid course changed my life. I now have a valuable skill that makes me more employable and confident."</Text>
            <Text style={styles.testimonialAuthor}>- Sarah M., Course Graduate</Text>
          </View>
          <View style={styles.testimonialCard}>
            <Text style={styles.testimonialText}>"After completing the Landscaping course, I started my own small business. I'm now earning three times what I did before."</Text>
            <Text style={styles.testimonialAuthor}>- John D., Course Graduate</Text>
          </View>
          <View style={styles.testimonialCard}>
            <Text style={styles.testimonialText}>"Empowering the Nation provided my domestic worker with training that significantly improved her skills. It's been beneficial for everyone."</Text>
            <Text style={styles.testimonialAuthor}>- Susan P., Employer</Text>
          </View>
        </View>
      </View>

      {/* Call to Action */}
      <View style={styles.cta}>
        <Text style={styles.ctaTitle}>Ready to Transform Your Future?</Text>
        <Text style={styles.ctaText}>Join hundreds of individuals who have elevated their skills and changed their lives through our programs.</Text>
        <Pressable
          style={({ hovered }: PressableState) => [styles.btn, styles.goldBtn, hovered && styles.goldBtnHover]}
          onPress={() => handleNavigation('Signup')}
        >
          <Text style={styles.goldBtnText}>ENROLL TODAY</Text>
        </Pressable>
      </View>

      </ScrollView>
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
    backgroundColor: '#ffffffff',
  },
  contentContainer: {
    paddingBottom: 80, // Add space for the persistent bottom navigation
  },
  scrollContainer: {
    flex: 1,
    position: 'relative',
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    justifyContent: 'center',
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
    paddingVertical: 10, // This creates the space under the header
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
    height: 500,
  },
  heroOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  heroTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  heroTitleSmall: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  heroTitleLarge: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  heroCtaContainer: {
    alignItems: 'flex-end',
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'right',
    marginBottom: 20,
    maxWidth: 400,
  },
  btn: {
    backgroundColor: '#004225',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,    
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  goldBtnText: {
    color: '#002a18',
    fontWeight: 'bold',
    fontSize: 16,
  },
  heroBtn: {
    backgroundColor: '#CFB53B', // Gold/Brown color
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnHover: {
    backgroundColor: '#bcae35', // Darker gold for hover
  },
  goldBtn: {
    backgroundColor: '#CFB53B',
  },
  goldBtnHover: {
    backgroundColor: '#bcae35',
  },
  stats: {
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statCard: {
    backgroundColor: '#343a40', // Dark gray
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
    minWidth: 100,
  },
  statNumber: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#CFB53B', // Gold color for better contrast on dark card
  },
  statLabel: {
    fontSize: 16,
    color: '#fff',
  },
  section: {
    padding: 20,
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000ff',
    textAlign: 'center',
    marginBottom: 40,
    paddingBottom: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
    alignSelf: 'center', // Let the width be determined by content
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 30,
    width: '100%',
    alignContent: 'center',
  },
  featureCard: {
    backgroundColor: '#343a40', // Dark gray
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flex: 1,
    minWidth: 300,
    maxWidth: 350,
    marginHorizontal: 10,
    marginBottom: 20, // For wrapping on mobile
  },
  featureIcon: {
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  featureCardText: {
    fontSize: 14,
    color: '#adb5bd', // Lighter text for dark background
    textAlign: 'center',
  },
  featureText: { // This style was being used inconsistently, now unified with featureCardText
    fontSize: 14,
    color: '#adb5bd',
    textAlign: 'center',
  },
  coursesPreview: {
    backgroundColor: '#ffffffff',
  },
  coursesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 30,
    width: '100%',
    backgroundColor: '#fff',
  },
  courseCard: {
    backgroundColor: '#343a40', // Dark gray
    borderRadius: 10,
    elevation: 3,
    flex: 1,
    minWidth: 300,
    maxWidth: '100%', // Allow card to shrink on smaller screens
    marginHorizontal: 10,
    overflow: 'hidden',
    marginBottom: 20, // For wrapping on mobile
  },
  courseCardImageContainer: {
    height: 120,
    width: '100%',
  },
  courseImage: {
    width: '100%',
    height: '100%',
  },
  courseContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    textAlign: 'center',
  },  
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  courseText: {
    fontSize: 16,
    color: '#adb5bd', // Lighter text for dark background
    textAlign: 'center',
    marginBottom: 15,
  },
  btnOutline: {
    backgroundColor: '#CFB53B',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnOutlineText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  viewAllBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnOutlineHover: {
    backgroundColor: '#bcae35',
  },
  aboutSection: {
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    padding: 20,
    textAlign: 'center',
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#002a18',
    marginBottom: 15, // Centered text for this section
    textAlign: 'center',
  },
  testimonials: {
    backgroundColor: '#002a18', // Changed to match the original design intent
    padding: 20,
  },
  testimonialsTitle: {
    color: '#fff', // Corrected from invalid 8-digit hex
    borderBottomColor: '#CFB53B',
  },
  testimonialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
    alignContent: 'center', 
  },
  testimonialCard: {
    backgroundColor: '#000', // Black cards
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    minWidth: 300,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  testimonialText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#fff',
    marginBottom: 10,
  },
  testimonialAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  cta: {
    backgroundColor: '#ffffffff',
    padding: 40,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000ff',
    textAlign: 'center',
    marginBottom: 10,
  },
  ctaText: {
    fontSize: 20,
    color: '#002a18',
    textAlign: 'center',
    marginBottom: 20,
  },
  // New styles for dropdown and search
  dropdownContainer: {
    position: 'relative',
    zIndex: 1002,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 40, // Position below the header
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
    zIndex: 1003,
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
  // Persistent Bottom Navigation
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
    height: 70, // Fixed height
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

export default HomeScreen;