import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Linking, Pressable, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp, RootStackParamList } from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

const AboutScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const [showDropdown, setShowDropdown] = useState(false);

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

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
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

        {/* Stats Section with hero image background */}
        <ImageBackground
          source={require('../assets/images/homepage.jpg')}
          style={styles.hero}
          resizeMode="cover"
        >
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Our Impact</Text>
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
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>5</Text>
                <Text style={styles.statLabel}>Years of Excellence</Text>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* Main Content - Who We Are section */}
        <View style={styles.content}>
          <Text style={styles.title}>Who We Are</Text>
          
          <Text style={styles.sectionText}>
            Founded in 2018 by Precious Radebe, Empowering the Nation was born from personal experience—watching 
            family members struggle due to lack of formal education and skills training. Our initiative provides 
            the chances they never had: opportunities to rise above circumstances and create better futures.
          </Text>
          
          <Text style={styles.sectionText}>
            We believe that education and practical skills are the cornerstones of empowerment. Our mission is to provide accessible, high-quality training that equips individuals with the tools they need to secure employment, start businesses, and build self-sufficient lives. We are more than just a training center; we are a community dedicated to fostering growth, resilience, and hope across the nation.
          </Text>

          {/* Why Choose Us */}
          <View style={styles.features}>
            <Text style={styles.sectionTitle}>Why Choose Us</Text>
            <View style={styles.featuresGrid}>
              <Pressable style={styles.featureCard}>
                <Icon name="graduation-cap" size={40} color="#CFB53B" style={styles.featureIcon} />
                <Text style={styles.featureTitle}>Quality Education</Text>
                <Text style={styles.featureText}>
                  Our courses are designed by industry experts to provide practical, real-world skills.
                </Text>
              </Pressable>
              <Pressable style={styles.featureCard}>
                <Icon name="users" size={40} color="#CFB53B" style={styles.featureIcon} />
                <Text style={styles.featureTitle}>Expert Instructors</Text>
                <Text style={styles.featureText}>
                  Learn from professionals with years of experience in their respective fields.
                </Text>
              </Pressable>
              <Pressable style={styles.featureCard}>
                <Icon name="heart" size={40} color="#CFB53B" style={styles.featureIcon} />
                <Text style={styles.featureTitle}>Community Impact</Text>
                <Text style={styles.featureText}>
                  Join a movement that's transforming lives and uplifting communities across South Africa.
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
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
    height: 350,
  },
  heroOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 40,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: 1000,
  },
  statCard: {
    alignItems: 'center',
    marginHorizontal: 10,
    flex: 1,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#CFB53B',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
    paddingBottom: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
    alignSelf: 'center',
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  features: {
    marginTop: 40,
    marginBottom: 40,
  },
  featuresGrid: {
    // This will now stack vertically on mobile
  },
  featureCard: {
    backgroundColor: '#f8f9fa',
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
  featureIcon: {
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
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

export default AboutScreen;