import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput, Switch, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp, RootStackParamList } from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomNav from '../BottomNav';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleNavigation = (screen: keyof RootStackParamList) => {
       navigation.navigate({ name: screen, params: undefined } as any);
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Missing Information', 'Please enter both email and password.');
      return;
    }
    // In a real app, you would add authentication logic here
    Alert.alert('Login Success', 'Welcome back!');
    navigation.navigate('Home');
  };

  return (
    <View style={styles.fullScreenContainer}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* 1. Header & Logo */}
        <View style={styles.headerSection}>
          <Image source={require('../assets/images/LOGO.png')} style={styles.logo} />
          <Text style={styles.mainHeading}>Log In</Text>
        </View>

        {/* 2. Login Form */}
        <View style={styles.section}>
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
        </View>

        {/* 3. Utility Elements */}
        <View style={styles.section}>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>Remember me</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#CFB53B" }}
              thumbColor="#f4f3f4"
              onValueChange={setRememberMe}
              value={rememberMe}
            />
          </View>
          <Text style={styles.separatorText}>Or</Text>
        </View>

        {/* 4. Primary Call-to-Action (CTA) */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.ctaButton} onPress={handleLogin}>
            <Text style={styles.ctaButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>

        {/* 5. Sign Up Link */}
        <View style={styles.section}>
          <Text style={styles.signupText}>
            Don't have an account?{' '}
            <Text style={styles.linkText} onPress={() => handleNavigation('Signup')}>
              Sign up here
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
  separatorText: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: 'bold',
  },
  ctaButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupLinkText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
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
    minHeight: 500,
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
  // Login Card Styles - Updated for right side positioning
  loginCard: {
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
  loginHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  loginLogo: {
    width: 120, // Increased size
    height: 120, // Increased size
    marginBottom: 15,
  },
  loginOrgName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 5,
    textAlign: 'center',
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  loginTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#004225',
    textAlign: 'center',
    marginBottom: 10,
  },
  loginInstruction: {
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
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: '#004225',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#004225',
    borderColor: '#004225',
  },
  rememberText: {
    fontSize: 14,
    color: '#666',
  },
  forgotPassword: {
    color: '#004225',
    fontSize: 14,
    fontWeight: '600',
  },
  forgotPasswordHover: {
    color: '#CFB53B',
  },
  loginButton: {
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
  loginButtonHover: {
    transform: [{ scale: 1.02 }],
    shadowOpacity: 0.6,
  },
  loginButtonText: {
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
  signupContainer: {
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  signupLink: {
    color: '#004225',
    fontWeight: 'bold',
  },
  signupLinkHover: {
    color: '#CFB53B',
  },
  errorText: {
    color: '#eb3941',
    fontSize: 13,
    marginBottom: 10,
  },
  successContainer: {
    backgroundColor: 'rgba(46, 139, 87, 0.1)',
    borderColor: '#2e8b57',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  successText: {
    color: '#2e8b57',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // Forgot Password Overlay Styles
  forgotPasswordOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    justifyContent: 'center',
    alignItems: 'flex-start', // Align to the left
    zIndex: 1000, // Ensure it's above other content
  },
  forgotPasswordCard: {
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
    maxWidth: 400,
    width: '90%',
    marginLeft: 20, // Position on the left
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
  },
  forgotPasswordTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004225',
    textAlign: 'center',
    marginBottom: 10,
  },
  forgotPasswordInstruction: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  forgotPasswordInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 15,
  },
  forgotPasswordMessage: {
    fontSize: 14,
    color: '#004225',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  forgotPasswordSuccessMessage: {
    color: '#2e8b57', // A success green color
    fontSize: 15,
    textAlign: 'center',
  },
  forgotPasswordButton: {
    backgroundColor: '#004225',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#004225',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  forgotPasswordButtonHover: {
    transform: [{ scale: 1.02 }],
    shadowOpacity: 0.6,
  },
  forgotPasswordButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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

export default LoginScreen;