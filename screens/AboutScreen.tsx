import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Pressable, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp, RootStackParamList } from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderComponent from '../HeaderComponent';
import BottomNav from '../BottomNav';

const AboutScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();
  
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

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.fullScreenContainer}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      
      <HeaderComponent />

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
    backgroundColor: '#fff'
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
});

export default AboutScreen;