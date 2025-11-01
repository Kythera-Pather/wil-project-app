import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppNavigationProp, RootStackParamList } from './navigation/Navigation';

const BottomNav: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute();

  const handleNavigation = (screen: keyof RootStackParamList) => {
    navigation.navigate({ name: screen, params: undefined } as any);
  };

  return (
    <View style={styles.bottomNav}>
      {[
        { name: 'Home', icon: 'home', label: 'Home' },
        { name: 'CourseSelection', icon: 'file-text-o', label: 'Courses' },
        { name: 'Contact', icon: 'phone', label: 'Contact' },
      ].map((item) => {
        const isActive = route.name === item.name;
        const activeColor = '#FFC107'; // A bright color for the active state
        const inactiveColor = '#004225';
        const color = isActive ? activeColor : inactiveColor;

        return (
          <TouchableOpacity
            key={item.name}
            style={styles.bottomNavItem}
            onPress={() => handleNavigation(item.name as keyof RootStackParamList)}
          >
            <Icon name={item.icon} size={24} color={color} />
            <Text style={[styles.bottomNavText, { color }]}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default BottomNav;