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
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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
          <Text style={styles.signupLinkText}>
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
    backgroundColor: '#fff',
    height: '100%',
  },
  container: {
    position: 'relative',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100, // Space for bottom nav
  },
  section: {
    marginBottom: 25,
  },
  headerSection: {
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 20,
  },
  mainHeading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
    paddingBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    height: '100%',
    justifyContent: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 25,
  },
  toggleText: {
    fontSize: 14,
    color: '#333',
    marginRight: 10,
  },
  separatorText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  ctaButton: {
    backgroundColor: '#CFB53B',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  linkText: {
    color: '#0055a5',
    textDecorationLine: 'underline',
  },
  signupLinkText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});

export default LoginScreen;