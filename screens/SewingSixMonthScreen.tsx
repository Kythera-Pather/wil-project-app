import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp, RootStackParamList } from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderComponent from '../HeaderComponent';
import BottomNav from '../BottomNav';

const SewingCourseScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();

  const curriculumData = [
    { title: "1. Introduction to Sewing: Basics and Beyond", description: "Perfect for beginners who want to start sewing from scratch.", points: ["Overview of sewing machines and tools", "Basic sewing techniques: stitching, hemming, and seaming", "Introduction to different fabrics and patterns", "Simple projects such as tote bags or pillowcases"], project: "Develop a basic sewing project using fundamental techniques", audience: "Beginners who want to build a strong foundation in sewing and gain confidence with their sewing machine" },
    { title: "2. Sewing Techniques for Intermediate Learners", description: "Build on your basic skills with more complex projects.", points: ["Advanced stitching techniques: zippers, buttonholes, and pockets", "Working with patterns and fitting garments", "Introduction to sewing with specialty fabrics", "Projects include simple garments or accessories"], project: "Create a garment or accessory using intermediate techniques", audience: "Individuals who have basic sewing knowledge and want to expand their skills" },
    { title: "3. Advanced Sewing Techniques and Custom Fit", description: "Refine your skills and create professional-quality garments.", points: ["Tailoring and custom fitting techniques", "Advanced garment construction, including linings and facings", "Techniques for working with complex fabrics", "Projects include tailored jackets or fitted dresses"], project: "Create a professionally tailored garment with custom fitting", audience: "Experienced sewers looking to enhance their skills and create high-quality garments" },
    { title: "4. Creative Sewing Projects: Accessories and Home Décor", description: "Explore your creativity with unique sewing projects.", points: ["Creating accessories like handbags, scarves, and hats", "Sewing home décor items such as cushions and curtains", "Techniques for embellishing and personalizing projects", "Opportunities to develop your own designs"], project: "Design and create a unique accessory or home décor item", audience: "Seamstresses interested in applying their skills to creative projects" },
    { title: "5. Sewing for Sustainability: Upcycling and Repair", description: "Learn sustainable sewing practices and give new life to old garments.", points: ["Techniques for repairing and altering garments", "Upcycling old clothes into new fashion pieces", "Using scraps and remnants creatively", "Sustainable fashion practices"], project: "Transform an old garment into a new fashion piece through upcycling", audience: "Those interested in sustainable fashion and eco-friendly practices" },
    { title: "6. Specialty Sewing: Quilting and Embroidery", description: "Dive into specialized sewing techniques with a focus on quilting and embroidery.", points: ["Basic and advanced quilting techniques", "Introduction to embroidery: hand and machine techniques", "Creating intricate designs and patterns", "Projects include quilted blankets or embroidered artworks"], project: "Complete a quilted or embroidered project showcasing specialized techniques", audience: "Sewers interested in exploring specialized areas of sewing and artistic projects" },
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
        source={require('../assets/images/sewing-course.jpg')}
        style={styles.hero}
        resizeMode="cover"
      >
        <View style={styles.heroOverlay}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Sewing Training Program</Text>
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
            Our Sewing Training Program offers a comprehensive series of classes designed for all skill levels, from beginners to advanced sewers. 
            Whether you're looking to learn the basics, enhance your skills, or master advanced techniques, our program provides hands-on instruction and practical experience to help you achieve your sewing goals.
          </Text>
        </View>

        {/* Course Highlights Grid */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Course Highlights</Text>
          <View style={styles.highlightsGrid}>
            <View style={styles.highlightItem}>
              <Icon name="cut" size={40} color="#CFB53B" style={styles.highlightIcon} />
              <Text style={styles.highlightTitle}>Beginner to Advanced</Text>
              <Text style={styles.highlightDescription}>Comprehensive training for all skill levels</Text>
            </View>
            <View style={styles.highlightItem}>
              <Icon name="hand-scissors-o" size={40} color="#CFB53B" style={styles.highlightIcon} />
              <Text style={styles.highlightTitle}>Hands-On Projects</Text>
              <Text style={styles.highlightDescription}>Practical experience with real projects</Text>
            </View>
            <View style={styles.highlightItem}>
              <Icon name="leaf" size={40} color="#CFB53B" style={styles.highlightIcon} />
              <Text style={styles.highlightTitle}>Sustainable Sewing</Text>
              <Text style={styles.highlightDescription}>Learn upcycling and repair techniques</Text>
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
                <View style={styles.curriculumPoints}>
                  {item.points.map((point, i) => (
                    <Text key={i} style={styles.curriculumPoint}>• {point}</Text>
                  ))}
                </View>
                <Text style={styles.projectLabel}>Hands-On Project:</Text>
                <Text style={styles.projectText}>{item.project}</Text>
                <Text style={styles.audienceLabel}>Who Should Enroll:</Text>
                <Text style={styles.audienceText}>{item.audience}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Benefits Section */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Why Choose Our Sewing Program</Text>
          <View style={styles.benefitsGrid}>
            <View style={styles.benefitCard}>
              <Icon name="user" size={40} color="#000" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Expert Instructors</Text>
              <Text style={styles.benefitText}>Learn from experienced sewers with years of industry knowledge and teaching experience.</Text>
            </View>
            <View style={styles.benefitCard}>
              <Icon name="hands-helping" size={40} color="#000" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Hands-On Learning</Text>
              <Text style={styles.benefitText}>Gain practical experience through projects tailored to your skill level with individual attention.</Text>
            </View>
            <View style={styles.benefitCard}>
              <Icon name="calendar-alt" size={40} color="#000" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Flexible Schedule</Text>
              <Text style={styles.benefitText}>Options for evening and weekend classes to fit your busy lifestyle and commitments.</Text>
            </View>
            <View style={styles.benefitCard}>
              <Icon name="home" size={40} color="#000" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Take Home Projects</Text>
              <Text style={styles.benefitText}>Keep all the beautiful projects you create during the course as part of your growing portfolio.</Text>
            </View>
          </View>
        </View>

        {/* Target Audience */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Who Should Enroll</Text>
          <Text style={styles.description}>
            This program is ideal for anyone interested in learning to sew, from complete beginners to experienced sewers looking to refine their skills. 
            Whether you want to create your own clothes, start a small business, or simply enjoy a creative hobby, our program will provide the skills and confidence you need.
          </Text>
          <Text style={styles.description}>
            Join us to master the art of sewing and unlock your creative potential!
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
    height: '100%', // Explicitly set height to ensure flex context
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
    zIndex: 1000,  },  headerIconContainer: {
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
  projectLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004225',
    marginTop: 15,
    marginBottom: 5,
  },
  projectText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  audienceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004225',
    marginTop: 10,
    marginBottom: 5,
  },
  audienceText: {
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
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

export default SewingCourseScreen;