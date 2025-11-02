import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Linking, Alert, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp, RootStackParamList } from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderComponent from '../HeaderComponent';
import BottomNav from '../BottomNav';

const ContactUsScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const faqItems = [
    { question: "How do I enroll in a course?", answer: "You can enroll in our courses by visiting our Course Selection page, choosing your desired courses, and following the enrollment process. Alternatively, you can visit our campus during office hours or contact us for assistance." },
    { question: "What payment methods do you accept?", answer: "We accept various payment methods including cash, bank transfers, and credit/debit cards. We also offer payment plans for certain courses." },
    { question: "Do you offer any financial assistance?", answer: "Yes, we offer financial assistance and scholarships for eligible students. Please contact our admissions office for more information about available options and eligibility criteria." },
    { question: "Can I visit the campus before enrolling?", answer: "Absolutely! We encourage prospective students to visit our campus. Please contact us to schedule a campus tour at your convenience." },
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

  const handleSubmit = () => {
    if (!fullName || !email || !subject || !message) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    Alert.alert('Thank You', 'Your message has been sent. We will get back to you soon.');
    setFullName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
  };

  const openMap = () => {
    const address = '123 Education St, Johannesburg, South Africa';
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url).catch(err => Alert.alert('Error', 'Could not open maps.'));
  };

  const callPhone = (number: string) => {
    Linking.openURL(`tel:${number}`).catch(() => Alert.alert('Error', 'Could not make a call.'));
  };

  const sendEmail = (recipient: string) => {
    Linking.openURL(`mailto:${recipient}`).catch(() => Alert.alert('Error', 'Could not open email client.'));
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

        {/* 1. Header and Contact Form */}
        <View style={styles.section}>
          <Text style={styles.mainHeading}>Get In Touch With Us</Text>
          <Text style={styles.introText}>
            We're here to answer any questions you may have about our courses, enrollment process, or anything else. Reach out to us and we'll respond as soon as we can.
          </Text>
        </View>

        {/* Contact Container */}
        <View style={styles.contactContainer}>
          {/* Contact Information */}
          <View style={styles.contactInfo}>
            <Text style={styles.subHeading}>Contact Information</Text>
            <Pressable style={styles.contactItem} onPress={openMap}>
              <Icon name="map-marker" size={24} color="#CFB53B" style={styles.contactIcon} />
              <View style={styles.contactDetails}>
                <Text style={styles.contactType}>Address</Text>
                <Text style={styles.contactValue}>123 Education St, Johannesburg, South Africa</Text>
              </View>
            </Pressable>
            <Pressable style={styles.contactItem} onPress={() => callPhone('+27111234567')}>
              <Icon name="phone" size={24} color="#CFB53B" style={styles.contactIcon} />
              <View style={styles.contactDetails}>
                <Text style={styles.contactType}>Phone</Text>
                <Text style={styles.contactValue}>+27 11 123 4567 (Landline)</Text>
                <Text style={styles.contactValue}>+27 82 123 4567 (Mobile)</Text>
              </View>
            </Pressable>
            <Pressable style={styles.contactItem} onPress={() => sendEmail('info@empoweringthenation.org.za')}>
              <Icon name="envelope" size={24} color="#CFB53B" style={styles.contactIcon} />
              <View style={styles.contactDetails}>
                <Text style={styles.contactType}>Email</Text>
                <Text style={styles.contactValue}>info@empoweringthenation.org.za</Text>
                <Text style={styles.contactValue}>admissions@empoweringthenation.org.za</Text>
              </View>
            </Pressable>
            <View style={styles.contactItem}>
              <Icon name="clock-o" size={24} color="#CFB53B" style={styles.contactIcon} />
              <View style={styles.contactDetails}>
                <Text style={styles.contactType}>Office Hours</Text>
                <Text style={styles.contactValue}>Mon - Fri: 08:00 - 17:00</Text>
                <Text style={styles.contactValue}>Sat: 09:00 - 13:00</Text>
                <Text style={styles.contactValue}>Sun: Closed</Text>
              </View>
            </View>
          </View>

          {/* Contact Form */}
          <View style={styles.contactForm}>
            <Text style={styles.subHeading}>Send Us a Message</Text>
            <TextInput style={styles.input} placeholder="Full Name *" value={fullName} onChangeText={setFullName} />
            <TextInput style={styles.input} placeholder="Email Address *" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
            <TextInput style={styles.input} placeholder="Subject *" value={subject} onChangeText={setSubject} />
            <TextInput style={[styles.input, styles.textArea]} placeholder="Your Message *" value={message} onChangeText={setMessage} multiline numberOfLines={4} />
            <Pressable style={styles.ctaButton} onPress={handleSubmit}>
              <Text style={styles.ctaButtonText}>SEND MESSAGE</Text>
            </Pressable>
          </View>
        </View>

        {/* Location Map */}
        <View style={styles.section}>
          <Text style={styles.mainHeading}>Find Us</Text>
          <Text style={styles.introText}>Visit our campus or training centers. See the map below for directions.</Text>
          <TouchableOpacity onPress={openMap}>
            <View style={styles.mapPlaceholder}>
              <Icon name="map-pin" size={40} color="#DB4437" />
              <Text style={styles.mapText}>Map would be displayed here (Google Maps integration)</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.mainHeading}>Frequently Asked Questions</Text>
          {faqItems.map((item, index) => (
            <View key={index} style={styles.faqItemStatic}>
              <Text style={styles.faqQuestionStatic}>{item.question}</Text>
              <Text style={styles.faqAnswerStatic}>{item.answer}</Text>
            </View>
          ))}
        </View>

      </ScrollView>

      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    paddingBottom: 100, // For BottomNav
    // alignItems: 'center', // Centering is handled by child containers now
  },
  mobileNavContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
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
  mainHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
  },
  subHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 25,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#CFB53B',
  },
  input: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    width: '100%',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  ctaButton: {
    backgroundColor: '#004225',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 4,
    alignItems: 'center',
    height: 55,
    width: '100%',
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  mapText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  faqItemStatic: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    padding: 20,
    width: '100%',
    maxWidth: 800,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  faqQuestionStatic: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 10,
  },
  faqAnswerStatic: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  container: {
    flex: 1
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
  header: {
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  // UPDATED LOGO CONTAINER TO MATCH COURSESELECTIONSCREEN
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 80, // Increased from 60 to match CourseSelectionScreen
    height: 80, // Increased from 60 to match CourseSelectionScreen
    marginRight: 15,
  },
  orgName: {
    fontSize: 28, // Increased from 24 to match CourseSelectionScreen
    fontWeight: '700',
    color: '#004225',
  },
  // UPDATED NAV MENU TO MATCH COURSESELECTIONSCREEN
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
    fontSize: 20, // Reduced from 18 to match CourseSelectionScreen
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
  section: {
    padding: 20,
    // alignItems: 'center', // Let children control their alignment
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000ff',
    textAlign: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
    alignSelf: 'center',
    width: '50%',
  },
  introText: {
    fontSize: 18,
    color: '#002a18',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 26,
    maxWidth: 800,
  },
  // Contact Container
  contactContainer: {
    flexDirection: 'column',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  // Contact Information
  contactInfo: {
    // flex: 1, // Not needed in a column layout
    // minWidth: 300,
    // maxWidth: 400,
    backgroundColor: '#D9D9D9',
    padding: 30,
    borderRadius: 8,
    marginBottom: 30, // Add margin to separate from the form
  },
  contactInfoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 25,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#CFB53B',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  contactIcon: {
    marginRight: 15,
    marginTop: 2,
  },
  contactDetails: {
    flex: 1,
  },
  contactType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 8,
  },
  contactValue: {
    fontSize: 16,
    color: '#002a18',
    marginBottom: 3,
    lineHeight: 20,
  },
  // Contact Form
  contactForm: {
    // flex: 1, // Not needed in a column layout
    // minWidth: 300,
    // maxWidth: 400,
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactFormTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 25,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#CFB53B',
  },
  formInput: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  messageInput: {
    height: 120,
  },
  submitButton: {
    backgroundColor: '#004225',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 4,
    alignItems: 'center',
    height: 55,
  },
  submitButtonHover: {
    backgroundColor: '#002a18',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  // Map Section
  mapSection: {
    marginTop: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mapDescription: {
    fontSize: 18,
    color: '#002a18',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
    maxWidth: 800,
  },
  mapPlaceholder: {
    height: 300,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Takes full width of its parent
    maxWidth: 800,
  },
  mapPlaceholderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 5,
  },
  mapPlaceholderSubtext: {
    fontSize: 16,
    color: '#002a18',
  },
  // FAQ Section
  faqSection: {
    backgroundColor: '#f8f9fa',
    padding: 40,
    // margin: 20, // Replaced with section padding
    borderRadius: 8,
    alignItems: 'center',
  },
  faqContainer: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  faqItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  faqQuestion: {
    padding: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004225',
    backgroundColor: 'rgba(0, 66, 37, 0.1)',
  },
  faqAnswer: {
    padding: 20,
    fontSize: 16,
    color: '#002a18',
    lineHeight: 24,
  },
  // Footer Styles
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
    left: 100,
    right: 100,
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
  socialLinkHover: {
    backgroundColor: '#CFB53B',
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
  // Dropdown styles
  dropdownContainer: {
    position: 'relative',
    zIndex: 1001,
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    right: 200,
    top: 8,
  },
  dropdownCaret: {
    marginLeft: 5,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 35,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    minWidth: 120,
    borderWidth: 1,
    borderColor: '#eee',
    zIndex: 1002,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#004225',
    fontWeight: '500',
  },
});

export default ContactUsScreen;