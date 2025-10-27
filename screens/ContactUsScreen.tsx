import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp, RootStackParamList } from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

const ContactUsScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();

  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // FAQ state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleNavigation = (screen: keyof RootStackParamList, params?: any) => {
    navigation.navigate(screen, params);
  };

  const handleSendMessage = () => {
    if (!fullName || !email || !subject || !message) {
      Alert.alert('Incomplete Form', 'Please fill in all required fields.');
      return;
    }
    Alert.alert('Message Sent', 'Thank you for contacting us! We will get back to you shortly.');
    // Clear form
    setFullName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
  };

  const handleLogin = () => {
    setShowDropdown(false);
    navigation.navigate('Login');
  };

  const handleSignup = () => {
    setShowDropdown(false);
    navigation.navigate('Signup');
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqItems = [
    { question: 'How do I enroll in a course?', answer: 'You can enroll by visiting our "Course Selection" page, choosing your desired courses, and following the on-screen instructions to complete the enrollment and payment process.' },
    { question: 'What payment method do you accept?', answer: 'We accept various payment methods including credit/debit cards, EFT (Electronic Funds Transfer), and direct bank deposits. All options will be available at checkout.' },
    { question: 'Do you offer any financial assistance?', answer: 'We offer flexible payment plans and occasionally have sponsorship opportunities. Please contact our admissions office at admissions@empoweringthenation.org.za for more information.' },
    { question: 'Can I visit the campus before enrolling?', answer: 'Yes, we welcome prospective students to visit our campus. Please call us at +27 11 123 4567 to schedule a tour during our office hours.' },
  ];

  const navLinks = [
    { label: 'Home', screen: 'Home' as keyof RootStackParamList },
    { label: 'Six Week Courses', screen: 'SixWeekCourses' as keyof RootStackParamList },
    { label: 'Six Month Courses', screen: 'SixMonthCourses' as keyof RootStackParamList },
    { label: 'Course Selection', screen: 'CourseSelection' as keyof RootStackParamList },
    { label: 'Contact Us', screen: 'Contact' as keyof RootStackParamList },
  ];

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
            <TouchableOpacity key={link.screen} style={styles.mobileNavLink} onPress={() => handleNavigation(link.screen)}>
              <Text style={styles.mobileNavLinkText}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 1. Header and Contact Form */}
        <View style={styles.section}>
          <Text style={styles.pageContext}>Contact Us page</Text>
          <Text style={styles.mainHeading}>Get In Touch With Us</Text>
          <Text style={styles.introText}>
            We're here to answer any questions you may have about our courses, enrollment process, or anything else.
          </Text>

          <Text style={styles.subHeading}>Send Us a Message</Text>
          <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
          <TextInput style={styles.input} placeholder="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <TextInput style={styles.input} placeholder="Subject" value={subject} onChangeText={setSubject} />
          <TextInput style={[styles.input, styles.textArea]} placeholder="Message" value={message} onChangeText={setMessage} multiline />

          <Pressable style={styles.ctaButton} onPress={handleSendMessage}>
            <Text style={styles.ctaButtonText}>SEND MESSAGE</Text>
          </Pressable>
        </View>

        {/* 2. Contact Information */}
        <View style={styles.section}>
          <Text style={styles.subHeading}>Contact Information</Text>
          <View style={styles.contactInfoContainer}>
            <View style={styles.contactItem}>
              <Icon name="map-marker" size={20} color="#004225" style={styles.contactIcon} />
              <Text style={styles.contactText}>123 Main St, Johannesburg, South Africa</Text>
            </View>
            <View style={styles.contactItem}>
              <Icon name="phone" size={20} color="#004225" style={styles.contactIcon} />
              <Text style={styles.contactText}>+27 11 123 4567 (Landline)</Text>
            </View>
            <View style={styles.contactItem}>
              <Icon name="mobile" size={24} color="#004225" style={styles.contactIcon} />
              <Text style={styles.contactText}>+27 82 789 123 (Mobile)</Text>
            </View>
            <View style={styles.contactItem}>
              <Icon name="envelope" size={20} color="#004225" style={styles.contactIcon} />
              <Text style={styles.contactText}>info@empoweringthenation.org.za</Text>
            </View>
            <View style={styles.contactItem}>
              <Icon name="graduation-cap" size={20} color="#004225" style={styles.contactIcon} />
              <Text style={styles.contactText}>admissions@empoweringthenation.org.za</Text>
            </View>
            <View style={styles.contactItem}>
              <Icon name="clock-o" size={20} color="#004225" style={styles.contactIcon} />
              <View>
                <Text style={styles.contactText}>Mon - Fri: 08:00 - 17:00</Text>
                <Text style={styles.contactText}>Sat: 09:00 - 13:00</Text>
                <Text style={styles.contactText}>Sun: Closed</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 3. Location Map */}
        <View style={styles.section}>
          <Text style={styles.subHeading}>Find Us</Text>
          <Text style={styles.introText}>Visit our campus or training centers. See the map below for directions.</Text>
          <View style={styles.mapPlaceholder}>
            <Icon name="map-pin" size={40} color="#DB4437" />
            <Text style={styles.mapText}>Map of 1 George Ross St, Johannesburg</Text>
          </View>
        </View>

        {/* 4. FAQ */}
        <View style={styles.section}>
          <Text style={styles.mainHeading}>Frequently Asked Questions</Text>
          {faqItems.map((item, index) => (
            <View key={index}>
              <TouchableOpacity style={styles.faqHeader} onPress={() => toggleFaq(index)}>
                <Text style={styles.faqQuestion}>{item.question}</Text>
                <Icon name={expandedFaq === index ? 'chevron-up' : 'chevron-down'} size={16} color="#333" />
              </TouchableOpacity>
              {expandedFaq === index && (
                <View style={styles.faqAnswerContainer}>
                  <Text style={styles.faqAnswer}>{item.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

      </ScrollView>

      {/* 5. Persistent Bottom Navigation */}
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
  },
  orgName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#004225',
    marginTop: 4,
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
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  section: {
    padding: 20,
  },
  pageContext: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 10,
    textAlign: 'center',
  },
  mainHeading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
    paddingBottom: 5,
    marginBottom: 15,
    alignSelf: 'center',
  },
  subHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#CFB53B',
    paddingBottom: 5,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  introText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#f8f9fa',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  ctaButton: {
    backgroundColor: '#CFB53B',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  contactInfoContainer: {
    marginTop: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  contactIcon: {
    marginRight: 15,
    width: 24,
    textAlign: 'center',
    marginTop: 2,
  },
  contactText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  mapPlaceholder: {
    height: 250,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  mapText: {
    marginTop: 10,
    color: '#6c757d',
    fontWeight: 'bold',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  faqAnswerContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#eee',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: -10,
    marginBottom: 10,
  },
  faqAnswer: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
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
    color: '#002a18',
    fontWeight: '500',
  },
});

export default ContactUsScreen;