import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppNavigationProp } from './navigation/Navigation';

interface HeaderComponentProps {
  showBackButton?: boolean;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ showBackButton = false }) => {
  const navigation = useNavigation<AppNavigationProp>();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogin = () => {
    setShowDropdown(false);
    navigation.navigate('Login');
  };

  const handleSignup = () => {
    setShowDropdown(false);
    navigation.navigate('Signup');
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.headerIconContainer} 
        onPress={() => showBackButton ? navigation.goBack() : navigation.navigate('AboutScreen')}
      >
        <Icon name={showBackButton ? "arrow-left" : "bars"} size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.headerTitleContainer}>
        <Image source={require('./assets/images/LOGO.png')} style={styles.logo} />
        <Text style={styles.orgName}>Empowering the Nation</Text>
      </View>
      <View style={styles.headerIconContainer}>
        <TouchableOpacity onPress={toggleDropdown}>
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
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
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
    fontWeight: 'bold',
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
    zIndex: 1001
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
    fontWeight: 'normal',
  },
});

export default HeaderComponent;