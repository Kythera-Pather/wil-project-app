import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp, RootStackParamList } from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderComponent from '../HeaderComponent';
import BottomNav from '../BottomNav';

const CookingSixWeekScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();

  // Data for the curriculum
  const curriculumData = [
    { title: "Week 1: Kitchen Fundamentals", description: "Get started with the basics of kitchen organization and fundamental cooking techniques.", points: ["Overview of kitchen tools and equipment", "Basic knife skills: chopping, slicing, dicing", "Cooking techniques: sautéing, boiling, baking", "Safety and hygiene practices"] },
    { title: "Week 2: Meal Planning and Budgeting", description: "Learn how to plan nutritious and budget-friendly meals.", points: ["Principles of meal planning and grocery lists", "Budgeting for groceries and reducing waste", "Techniques for batch cooking and meal prep", "Exploring different dietary needs"] },
    { title: "Week 3: Cooking Techniques", description: "Enhance your cooking skills with advanced techniques.", points: ["Advanced cooking: roasting, grilling, poaching", "Understanding flavor profiles and seasoning", "Basics of recipe development and modification", "Tips for cooking proteins and vegetables"] },
    { title: "Week 4: Healthy Cooking and Nutrition", description: "Focus on cooking techniques that promote health and wellness.", points: ["Basics of nutrition and dietary requirements", "Techniques for preparing healthy meals", "Incorporating fruits, vegetables, whole grains", "Cooking methods that preserve nutrients"] },
    { title: "Week 5: International Cuisine", description: "Explore global flavors and cooking styles.", points: ["Introduction to international cuisines", "Techniques and ingredients from different cultures", "Understanding cultural significance", "Adapting recipes to local ingredients"] },
    { title: "Week 6: Special Occasions and Presentation", description: "Learn to prepare and present meals for special events.", points: ["Techniques for impressive dishes", "Presentation skills: plating and garnishing", "Planning multi-course meals", "Tips for hosting and entertaining"] },
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
      <HeaderComponent />

        {/* Mobile Navigation */}
        <View style={styles.mobileNavContainer}>
          {navLinks.map((link) => (
            <TouchableOpacity key={link.name} style={styles.mobileNavLink} onPress={() => handleNavigation(link.name)}>
              <Text style={styles.mobileNavLinkText}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Hero Section */}
        <ImageBackground source={require('../assets/images/cooking-course.jpg')} style={styles.hero} resizeMode="cover">
          <View style={styles.heroOverlay}>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Cooking Life Skills Training Program</Text>
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
            Our 6-week Cooking Life Skills Training Program is designed to teach essential culinary skills while promoting healthier eating habits and practical cooking techniques.
            Perfect for beginners and those looking to refine their kitchen skills, this program combines hands-on cooking experience with valuable life skills.
          </Text>
        </View>

        {/* Course Highlights Grid */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Course Highlights</Text>
          <View style={styles.highlightsGrid}>
            <View style={styles.highlightItem}>
              <Icon name="cutlery" size={30} color="#CFB53B" style={styles.highlightIcon} />
              <Text style={styles.highlightTitle}>Kitchen Fundamentals</Text>
              <Text style={styles.highlightDescription}>Master essential cooking tools and techniques</Text>
            </View>
            <View style={styles.highlightItem}>
              <Icon name="money" size={40} color="#CFB53B" style={styles.highlightIcon} />
              <Text style={styles.highlightTitle}>Meal Planning</Text>
              <Text style={styles.highlightDescription}>Learn budgeting and meal preparation strategies</Text>
            </View>
            <View style={styles.highlightItem}>
              <Icon name="leaf" size={40} color="#CFB53B" style={styles.highlightIcon} />
              <Text style={styles.highlightTitle}>Healthy Cooking</Text>
              <Text style={styles.highlightDescription}>Nutrition-focused cooking techniques</Text>
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
          <Text style={styles.sectionTitle}>Why Choose Our Cooking Program</Text>
          <View style={styles.benefitsGrid}>
            <View style={styles.benefitCard}>
              <Icon name="graduation-cap" size={40} color="#000" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Expert Chefs</Text>
              <Text style={styles.benefitText}>Learn from experienced culinary professionals with years of industry experience and passion for teaching.</Text>
            </View>
            <View style={styles.benefitCard}>
              <Icon name="handshake-o" size={40} color="#000" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Interactive Learning</Text>
              <Text style={styles.benefitText}>Practical cooking exercises and real kitchen applications that build confidence and skill.</Text>
            </View>
            <View style={styles.benefitCard}>
              <Icon name="user" size={40} color="#000" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Personalized Guidance</Text>
              <Text style={styles.benefitText}>Individual feedback and support tailored to your cooking level and learning style.</Text>
            </View>
            <View style={styles.benefitCard}>
              <Icon name="calendar" size={40} color="#000" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Flexible Scheduling</Text>
              <Text style={styles.benefitText}>Evening and weekend classes available to accommodate your work and personal commitments.</Text>
            </View>
          </View>
        </View>

        {/* Target Audience */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Who Should Enroll</Text>
          <Text style={styles.audienceText}>
            Our program is suitable for anyone looking to improve their cooking skills, whether for personal enjoyment, health, or entertaining.
            Discover the joy of cooking and enhance your life skills!
          </Text>
          <Text style={styles.audienceText}>
            Join us to become a confident home cook and impress your family and friends!
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
    flexDirection: 'row',
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

export default CookingSixWeekScreen;