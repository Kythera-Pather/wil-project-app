import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Pressable, ImageBackground, PressableStateCallbackType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, AppNavigationProp } from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderComponent from '../HeaderComponent';
import BottomNav from '../BottomNav';

type PressableState = PressableStateCallbackType & { hovered?: boolean };

const HomeScreen: React.FC = () => {
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
    { label: 'About Us', screen: 'AboutScreen' as keyof RootStackParamList },
  ];

  return (
    <View style={styles.fullScreenContainer}>
      <HeaderComponent />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.contentContainer}
      >
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
                  <Pressable
                    style={({ pressed }: PressableStateCallbackType) => [styles.heroBtn, pressed && styles.btnHover]}
                    onPress={() => handleNavigation('CourseSelection')}>
                    <Text style={styles.btnText}>EXPLORE OUR COURSES</Text>
                  </Pressable>
                </View>
              </View>
            </ImageBackground>
          </View>
        {/* --- Hero Section Temporarily Removed for Debugging --- */}

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
                <Text style={styles.featureText}>Our courses are designed by industry experts to provide practical, real-world skills.</Text>
              </View>
              <View style={styles.featureCard}>
                <Icon name="users" size={40} color="#CFB53B" style={styles.featureIcon} />
                <Text style={styles.featureTitle}>Expert Instructors</Text>
                <Text style={styles.featureText}>Learn from professionals with years of experience in their respective fields.</Text>
              </View>
              <View style={styles.featureCard}>
                <Icon name="heart" size={40} color="#CFB53B" style={styles.featureIcon} />
                <Text style={styles.featureTitle}>Community Impact</Text>
                <Text style={styles.featureText}>Join a movement that's transforming lives and uplifting communities across South Africa.</Text>
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
                    style={({ pressed }: PressableStateCallbackType) => [styles.btnOutline, pressed && styles.btnHover]}
                    onPress={() => handleNavigation('CourseDetail', { courseId: 'first-aid', courseType: 'six-month' })}
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
                    style={({ pressed }: PressableStateCallbackType) => [styles.btnOutline, pressed && styles.btnHover]}
                    onPress={() => handleNavigation('CourseDetail', { courseId: 'cooking', courseType: 'six-week' })}
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
                    style={({ pressed }: PressableStateCallbackType) => [styles.btnOutline, pressed && styles.btnHover]}
                    onPress={() => handleNavigation('CourseDetail', { courseId: 'child-minding', courseType: 'six-week' })}
                  >
                    <Text style={styles.btnOutlineText}>LEARN MORE</Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <Pressable style={({ pressed }: PressableStateCallbackType) => [styles.btn, { alignSelf: 'center', marginTop: 20, width:300, height:40 }, pressed && styles.btnHover]}
              onPress={() => handleNavigation('CourseSelection')}
            >
              <Text style={styles.btnText}>VIEW ALL COURSES</Text>
            </Pressable>
          </View>

          {/* About Section */}
          <View style={[styles.section, styles.aboutSection]}>
            <Text style={styles.sectionTitle}>Our Story</Text>
            <Text style={styles.bodyText}>
              Founded in 2022 by Precious Radebe, <Text style={{fontWeight: 'bold'}}>Empowering the Nation</Text> was born from personal experience—watching family members struggle due to lack of formal education and skills training.
              Our initiative provides the chances they never had: opportunities to rise above circumstances and create better futures.
            </Text>
            <Text style={styles.bodyText}>
              We specialize in upskilling domestic workers and gardeners who have traditionally been overlooked in the professional landscape. 
              These individuals are often the backbone of households, yet their contributions frequently go undervalued. 
              Our programs change this by offering specialized training that enhances skills, earning potential, dignity, and self-confidence.
            </Text>
            <Pressable
              style={({ pressed }: PressableStateCallbackType) => [styles.btn, styles.goldBtn, { alignSelf: 'center', marginTop: 20}, pressed && styles.btnHover]}
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
              style={({ pressed }: PressableStateCallbackType) => [styles.btn, styles.goldBtn, pressed && styles.btnHover]}
              onPress={() => handleNavigation('Signup')}
            >
              <Text style={styles.goldBtnText}>ENROLL TODAY</Text>
            </Pressable>
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
  // Added missing scrollContainer style referenced by the ScrollView
  scrollContainer: {
    flex: 1,
  },
  hero: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // height: 580, // REMOVED: This fixed height was blocking the ScrollView.
  },
  heroOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center', // ADDED: To center content vertically
    paddingVertical: 60, // ADDED: Use padding for flexible height
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 100, // Ensures content can scroll above the BottomNav
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
  topBarText: {
    color: '#fff',
    fontSize: 15,
    left: 120,
    top: 8,
  },
  topBarLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBarLinkText: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 15,
    right: 200,
    top: 8,
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 80, // Increased from 60
    height: 80, // Increased from 60
    marginRight: 15,
  },
  orgName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#004225',
  },
  navMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    flex: 2,
  },
  navLinkContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginHorizontal: 4,
    marginVertical: 2,
  },
  navLinkHoverActive: {
    backgroundColor: '#e6f0f7',
  },
  navLink: {
    fontSize:20, // Reduced from 18
    color: '#000000ff',
    fontWeight: '500',
    textAlign: 'center',
  },
  navLinkTextHoverActive: {
    color: '#1F6357',
  },
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
    color: '#004225',
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
  heroTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#004225',
    textAlign: 'center',
    marginBottom: 30,
    paddingBottom: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
    alignSelf: 'center',
    width: '50%',
  },
  features: {
    marginTop: 40,
    marginBottom: 40,
  },
  featureCardHover: {
    transform: [{ translateY: -5}],
    shadowOpacity: 0.5,
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
    borderTopColor: '#CFB53B',
    backgroundColor: '#c4c4c4',
  },
  btn: {
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 3,    
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center', // Added text alignment
    width: '100%', // Ensure text takes full width
  },
  heroBtn: {
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 3,
    // top: 170, // REMOVED: No longer needed with flexbox layout
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
  },
  btnHover: {
    backgroundColor: '#002a18',
  },
  stats: {
    backgroundColor: '#CFB53B',
    padding: 20,
    height: 100,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    height: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
  statCard: {
    alignItems: 'center',
    margin: 5,
    minWidth: 120,
  },
  statNumber: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#004225',
  },
  statLabel: {
    fontSize: 16,
    color: '#000000ff',
  },
  section: {
    padding: 20,
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
    maxWidth: '80%', // More flexible width
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 30,
    width: '100%',
    alignItems: 'stretch',
  },
  featureCard: {
    backgroundColor: '#D9D9D9',
    flex: 1,
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    textAlign: 'center',
    borderTopWidth: 4,
    borderTopColor: '#121212',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 250, // Adjusted height to be more flexible
    minWidth: 300,
    maxWidth: 350,
    marginHorizontal: 0, // Rely on gap from parent
  },
  featureIcon: {
    marginBottom: 20, // Adjusted spacing
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 5,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 14,
    color: '#004225',
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
    height: 450,
    // height: 450, // REMOVED: This fixed height was blocking the scroll.
    backgroundColor: '#ffffffff',
  },
  courseCard: {
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    elevation: 3,
    flex: 1,
    minWidth: 320,
    maxWidth: 380,
    height: 380,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  courseCardImageContainer: {
    height: 180,
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
    color: '#CFB53B',
    marginBottom: 10,
    top: 20,
  },
  courseText: {
    fontSize: 16,
    color: '#004225',
    textAlign: 'center',
    marginBottom: 15,
  },
  btnOutline: {
    backgroundColor: 'transparent',
    paddingVertical: 12, // Increased padding
    paddingHorizontal: 40,// Increased padding
    borderRadius: 2,
    width: 200,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
    height: 45, // Increased height
    borderWidth: 2,
    borderColor: '#dc3545',
  },
  btnOutlineText: {
    color: '#dc3545',
    fontWeight: 'bold',
    fontSize: 16, // Increased font size
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
    textAlign: 'left',
    left: 30,
    right: 30,
    width: 1000,
  },
  testimonials: {
    backgroundColor: '#002a18',
    padding: 20,
    textAlign: 'center',
    height: 400,
    // height: 400, // REMOVED: This fixed height was blocking the scroll.
  },
  testimonialsTitle: {
    color: '#ffffffff',
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    flexBasis: '30%',
    height: 250,
    minWidth: 300,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  testimonialText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  testimonialAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    top: 30,
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
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    width: '80%',
    maxWidth: 600,
    height: 60,
    top: 180,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    textAlign: 'center',
    width: '100%',
  },
  searchIcon: {
    marginRight: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    textAlign: 'left',
  },
  searchButton: {
    backgroundColor: '#CFB53B',
    paddingHorizontal: 25,
    justifyContent: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    width: 100,
    textAlign: 'center',
  },
  searchButtonText: {
    color: '#002a18',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  searchButtonHover: {
    backgroundColor: '#bcae35',
  },
  searchFeedbackText: {
    color: '#CFB53B',
    backgroundColor: 'rgba(176, 12, 0, 0.8)',
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
    top: 180,
    textAlign: 'center',
    fontWeight: 'bold',
    width: '80%',
    maxWidth: 600,
  },
  // New gold button styles
  goldBtn: {
    backgroundColor: '#dc3545',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 3,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
  },
  goldBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  heroTextContainer: {
    alignItems: 'center',
  },
  heroTitleSmall: {
    fontSize: 18,
    color: '#CFB53B',
    marginBottom: 10, // REMOVED: top positioning,
  },
  heroTitleLarge: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20, // REMOVED: top positioning
  },
  heroCtaContainer: {
    marginTop: 20,
  },
});

export default HomeScreen;