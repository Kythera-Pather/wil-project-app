import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Linking, Alert, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp, RootStackParamList } from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

const ContactUsScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const [showDropdown, setShowDropdown] = useState(false);
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
  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  mainHeading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
    paddingBottom: 10,
    marginBottom: 15,
    alignSelf: 'center',
  },
  subHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004225',
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#CFB53B',
    marginBottom: 25,
  },
  introText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 26,
  },
  contactContainer: {
    paddingHorizontal: 20,
  },
  contactInfo: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 8,
    marginBottom: 30,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  contactIcon: {
    marginRight: 15,
    marginTop: 2,
    width: 24,
    textAlign: 'center',
  },
  contactDetails: {
    flex: 1,
  },
  contactType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 5,
  },
  contactValue: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  contactForm: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
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
  mapPlaceholder: {
    height: 200,
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
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  faqItemStatic: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
    padding: 20,
  },
  faqQuestionStatic: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 10,
  },
  faqAnswerStatic: {
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
    color: '#004225',
    fontWeight: '500',
  },
});

export default ContactUsScreen;