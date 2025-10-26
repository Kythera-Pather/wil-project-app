import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Linking, Pressable, ImageBackground, PressableStateCallbackType, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, AppNavigationProp } from '../types/navigation';
import { sixMonthCourses, sixWeekCourses } from './courses';
import Icon from 'react-native-vector-icons/FontAwesome';

type PressableState = PressableStateCallbackType & { hovered?: boolean };

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const generalInfoSearch = [
    { keywords: ['about', 'story', 'mission', 'vision', 'who we are'], screen: 'AboutScreen' as const },
    { keywords: ['team', 'founder', 'staff', 'precious radebe', 'instructors'], screen: 'MeetTheTeam' as const },
    { keywords: ['contact', 'phone', 'email', 'address', 'location', 'map', 'get in touch'], screen: 'Contact' as const },
    { keywords: ['faq', 'questions', 'payment', 'enrollment', 'enroll'], screen: 'Contact' as const },
    { keywords: ['fee', 'calculator', 'discount', 'price', 'cost', 'select course'], screen: 'CourseSelection' as const },
    { keywords: ['six month', '6 month', 'long courses'], screen: 'SixMonthCourses' as const },
    { keywords: ['six week', '6 week', 'short courses'], screen: 'SixWeekCourses' as const },
    { keywords: ['login', 'sign in', 'portal'], screen: 'Login' as const },
    { keywords: ['signup', 'sign up', 'register', 'create account'], screen: 'Signup' as const },
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      Alert.alert('Search', 'Please enter a course name, program, or info to search.');
      return;
    }

    const allCourses = [...sixMonthCourses, ...sixWeekCourses];
    const lowerCaseQuery = searchQuery.toLowerCase();

    // 1. Search for general info and pages first
    for (const info of generalInfoSearch) {
      if (info.keywords.some(keyword => lowerCaseQuery.includes(keyword))) {
        navigation.navigate(info.screen);
        return;
      }
    }

    // 2. If no general info found, search for courses
    const courseResults = allCourses.filter(course => 
      course.title.toLowerCase().includes(lowerCaseQuery) ||
      course.description.toLowerCase().includes(lowerCaseQuery)
    );

    if (courseResults.length === 1) {
      const course = courseResults[0];
      const screenMap: { [key: string]: keyof RootStackParamList } = {
        'first-aid': 'FirstAidCourse',
        'sewing': 'SewingCourse',
        'landscaping': 'LandscapingCourse',
        'life-skills': 'LifeSkillsCourse',
        'cooking': 'CookingCourse',
        'child-minding': 'ChildMindingCourse',
        'garden-maintenance': 'GardenMaintenanceCourse',
      };
      const screenName = screenMap[course.id];
      if (screenName) {
        navigation.navigate(screenName);
      } else {
        // Fallback to a generic course detail or selection screen if mapping is missing
        navigation.navigate('CourseSelection', { searchQuery });
      }
    } else if (courseResults.length > 1) {
      // Navigate to the course selection screen to show multiple results
      navigation.navigate('CourseSelection', { searchQuery });
    } else {
      // 3. If no courses found either, show no results
      Alert.alert('No Results', `No results found for "${searchQuery}".`);
    }
  };
  
  return ( // The screenMap in handleSearch is missing some course IDs. I'll add them.
    <ScrollView style={styles.container}>
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
            <Icon name="user-o" size={24} color="#000" />
          </TouchableOpacity>
          {showDropdown && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity style={styles.dropdownItem} onPress={handleLogin}>
                <Text style={styles.dropdownItemText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={handleSignup}>
                <Text style={styles.dropdownItemText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Breadcrumb */}
      <View style={styles.breadcrumb}>
        <View style={styles.breadcrumbContainer}>
          <TouchableOpacity onPress={() => handleNavigation('Home')}>
            <Text style={styles.breadcrumbLink}>Home</Text>
          </TouchableOpacity>
          <Text style={styles.breadcrumbSeparator}> &gt; </Text>
          <Text style={styles.breadcrumbCurrent}>Welcome</Text>
        </View>
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
          <Text style={styles.btnText}>VIEW ALL COURSES</Text>
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
          <Text style={styles.btnText}>LEARN MORE ABOUT US</Text>
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
          <Text style={styles.btnText}>ENROLL TODAY</Text>
        </Pressable>
      </View>

      {/* Spacer for bottom nav */}
      <View style={{ height: 80 }} />

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

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerGrid}>
          <View style={styles.footerColumn}>
            <Text style={styles.footerHeading}>Empowering the Nation</Text>
            <Text style={styles.footerText}>Transforming lives through skills development and education since 2018.</Text>
            <View style={styles.socialLinks}>
              <TouchableOpacity style={styles.socialLink} onPress={() => openLink('https://facebook.com')}><Icon name="facebook-f" size={16} color="#fff" /></TouchableOpacity>
              <TouchableOpacity style={styles.socialLink} onPress={() => openLink('https://twitter.com')}><Icon name="twitter" size={16} color="#fff" /></TouchableOpacity>
              <TouchableOpacity style={styles.socialLink} onPress={() => openLink('https://instagram.com')}><Icon name="instagram" size={16} color="#fff" /></TouchableOpacity>
              <TouchableOpacity style={styles.socialLink} onPress={() => openLink('https://linkedin.com')}><Icon name="linkedin" size={16} color="#fff" /></TouchableOpacity>
            </View>
          </View>
          <View style={styles.footerColumn}>
            <Text style={styles.footerHeading}>Quick Links</Text>
            <Pressable onPress={() => handleNavigation('Home')}>
              {({ hovered }: PressableState) => <Text style={[styles.footerLink, hovered && styles.footerLinkHover]}>Home</Text>}
            </Pressable>
            <Pressable onPress={() => handleNavigation('SixMonthCourses')}>
              {({ hovered }: PressableState) => <Text style={[styles.footerLink, hovered && styles.footerLinkHover]}>Six-Month Courses</Text>}
            </Pressable>
            <Pressable onPress={() => handleNavigation('SixWeekCourses')}>
              {({ hovered }: PressableState) => <Text style={[styles.footerLink, hovered && styles.footerLinkHover]}>Six-Week Courses</Text>}
            </Pressable>
            <Pressable onPress={() => handleNavigation('CourseSelection')}>
              {({ hovered }: PressableState) => <Text style={[styles.footerLink, hovered && styles.footerLinkHover]}>Course Selection</Text>}
            </Pressable>
            <Pressable onPress={() => handleNavigation('Contact')}>
              {({ hovered }: PressableState) => <Text style={[styles.footerLink, hovered && styles.footerLinkHover]}>Contact Us</Text>}
            </Pressable>
          </View>
          <View style={styles.footerColumn}>
            <Text style={styles.footerHeading}>Contact Info</Text>
            <Text style={styles.contactInfoItem}><Icon name="map-marker" size={16} color="#CFB53B" /> 123 Education St, Johannesburg, South Africa</Text>
            <Text style={styles.contactInfoItem}><Icon name="phone" size={16} color="#CFB53B" /> +27 11 123 4567</Text>
            <Text style={styles.contactInfoItem}><Icon name="envelope" size={16} color="#CFB53B" /> info@empoweringthenation.org.za</Text>
          </View>
        </View>
        <View style={styles.copyright}>
          <Text style={styles.copyrightText}>&copy; 2025 Empowering the Nation. All rights reserved.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
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
  // Kept for reference, but not used in mobile-first design
  /* navMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '60%',
    justifyContent: 'center',
  },
  navLinkContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    marginRight: 10,
    marginHorizontal: 5,
    height:25,
  },
  navLinkHoverActive: {
    backgroundColor: '#e6f0f7',
  },
  navLink: {
    fontSize: 18,
    color: '#000000ff',
    fontWeight: '500',
    marginHorizontal:25,
  },
  navLinkTextHoverActive: {
    color: '#1F6357',
  }, */
  breadcrumb: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  breadcrumbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumbLink: {
    fontSize: 14,
    color: '#0055a5',
    fontWeight: '500',
  },
  breadcrumbSeparator: {
    fontSize: 14,
    color: '#6c757d',
    marginHorizontal: 5,
  },
  breadcrumbCurrent: {
    fontSize: 14,
    color: '#000000ff',
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
    width: 250,
  },
  btnText: {
    color: '#002a18',
    fontWeight: 'bold',
    fontSize: 20,
  },
  heroBtn: {
    backgroundColor: '#CFB53B', // Gold/Brown color
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
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
    alignSelf: 'center',
    width: '25%',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 30,
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
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
    alignContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    height:400,
    backgroundColor: '#ffffffff',
  },
  courseCard: {
    backgroundColor: '#343a40', // Dark gray
    borderRadius: 10,
    elevation: 3,
    flex: 1,
    minWidth: 300,
    maxWidth: 350,
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
    marginBottom: 15,
    textAlign:'left',
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
    flexBasis: '30%',
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