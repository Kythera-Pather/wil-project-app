import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput, Switch, Linking, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp, RootStackParamList } from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomNav from '../BottomNav';


const SignupScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [receiveUpdates, setReceiveUpdates] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleNavigation = (screen: keyof RootStackParamList) => {
    navigation.navigate({ name: screen, params: undefined } as any);
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const handleSignup = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }
    Alert.alert('Success', 'Your account has been created!');
  };

  return (
    <View style={styles.fullScreenContainer}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* 1. Header & Logo */}
        <View style={styles.headerSection}>
          <Image source={require('../assets/images/LOGO.png')} style={styles.logo} />
          <Text style={styles.mainHeading}>Create Your Account</Text>
        </View>

        {/* 2. Social Sign-Up */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>Continue with Google</Text>
            <Icon name="google" size={20} color="#DB4437" />
          </TouchableOpacity>
        </View>

        {/* 3. Account Creation Form */}
        <View style={styles.section}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#666" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
              <Icon name={showConfirmPassword ? 'eye' : 'eye-slash'} size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 4. Opt-in and Primary CTA */}
        <View style={styles.section}>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>Receive news, updates and deals</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#CFB53B" }}
              thumbColor="#f4f3f4"
              onValueChange={setReceiveUpdates}
              value={receiveUpdates}
            />
          </View>
          <TouchableOpacity style={styles.ctaButton} onPress={handleSignup}>
            <Text style={styles.ctaButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>

        {/* 5. Terms and Conditions */}
        <View style={styles.section}>
          <Text style={styles.legalText}>
            By creating an account you are agreeing to the{' '}
            <Text style={styles.linkText} onPress={() => openLink('https://www.google.com/search?q=Terms+of+Service')}>
              Terms of Service
            </Text>
            {' '}and{' '}
            <Text style={styles.linkText} onPress={() => openLink('https://www.google.com/search?q=Privacy+Policy')}>
              Privacy Policy
            </Text>
            .
          </Text>
        </View>

        {/* 6. Login Link */}
        <View style={styles.section}>
          <Text style={styles.loginText}>
            Already have an account?{' '}
            <Text style={styles.loginLink} onPress={() => handleNavigation('Login')}>
              Log in here
            </Text>
          </Text>
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
  headerSection: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  mainHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004225',
  },
  section: {
    width: '100%',
    paddingHorizontal: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  toggleText: {
    fontSize: 16,
    color: '#333',
  },
  ctaButton: {
    backgroundColor: '#004225',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  legalText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 20,
  },
  linkText: {
    color: '#004225',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingVertical: 40,
    paddingHorizontal: 20,
    minHeight: 600,
  },
  // Top Bar Styles
  topBar: {
    backgroundColor: '#004225',
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    minHeight: 40,
    fontSize: 15,
    zIndex: 1000,
  },
  topBarText: {
    color: '#fff',
    fontSize: 15,
    left: 120,
    top: 8,
  },
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
  // Header Styles - Updated to match HomeScreen
  header: {
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    zIndex: 999,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerLogo: {
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
    fontSize: 20, // Reduced from 18
    color: '#000000ff',
    fontWeight: '500',
    textAlign: 'center',
  },
  navLinkTextHoverActive: {
    color: '#1F6357',
  },
  // Breadcrumb Styles
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
  // Signup Card Styles - Updated for right side positioning
  signupCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    maxWidth: 420,
    width: '90%',
    marginRight: 20,
    marginTop: 20,
  },
  signupHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  signupLogo: {
    width: 120, // Increased size
    height: 120, // Increased size
    marginBottom: 15,
  },
  signupOrgName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 5,
    textAlign: 'center',
  },
  signupSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  signupTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#004225',
    textAlign: 'center',
    marginBottom: 10,
  },
  signupInstruction: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 18,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputError: {
    borderColor: '#eb3941',
    borderWidth: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  eyeIcon: {
    padding: 5,
  },
  termsContainer: {
    marginBottom: 25,
  },
  termsCheckbox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: '#004225',
    borderRadius: 4,
    marginRight: 10,
    marginTop: 2,
  },
  checkboxSelected: {
    backgroundColor: '#004225',
    borderRadius: 4,
    marginRight: 10,
    marginTop: 2,
  },
  termsTextView: {
    flex: 1,
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  termsLink: {
    color: '#004225',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  termsLinkHover: {
    color: '#CFB53B',
  },
  signupButton: {
    backgroundColor: '#004225',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#004225',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  signupButtonHover: {
    transform: [{ scale: 1.02 }],
    shadowOpacity: 0.6,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    paddingHorizontal: 15,
    color: '#666',
    fontSize: 14,
  },
  loginContainer: {
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  loginLink: {
    color: '#004225',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  loginLinkHover: {
    color: '#CFB53B',
  },
  errorText: {
    color: '#eb3941',
    fontSize: 13,
    marginBottom: 10,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 42, 24, 0.95)',
    borderRadius: 15,
    margin: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    width: '40%',
    maxWidth: 600,
    height: '80%',
    borderWidth: 1,
    borderColor: '#CFB53B',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#CFB53B',
    paddingBottom: 15,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    padding: 5,
  },
  modalScrollView: {
    flex: 1,
  },
  modalText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 24,
  },
  modalSectionTitle: {
    fontWeight: 'bold',
    color: '#CFB53B',
  },
  // Footer Styles
  footer: {
    backgroundColor: '#002a18',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  footerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  footerColumn: {
    marginBottom: 20,
    flex: 1,
    minWidth: 250,
  },
  footerHeading: {
    color: '#fff',
    marginBottom: 15,
    paddingBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#CFB53B',
    width: '80%',
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 18,
    marginBottom: 8,
  },
  socialLinks: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  socialLink: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialLinkHover: {
    backgroundColor: '#CFB53B',
  },
  footerLink: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 6,
  },
  footerLinkHover: {
    color: '#CFB53B',
  },
  contactInfoItem: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 18,
    marginBottom: 10,
  },
  copyright: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 15,
    marginTop: 10,
  },
  copyrightText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
});

export default SignupScreen;