import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import { RootStackParamList } from './types/navigation';
import { View, Text } from 'react-native';

const Stack = createStackNavigator<RootStackParamList>();

// Placeholder screen for components that are not yet created
const PlaceholderScreen = ({ route }: any) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Screen: {route.name}</Text>
  </View>
);

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* Add other screens here as you create them. For now, they can be placeholders. */}
        <Stack.Screen name="Login" component={PlaceholderScreen} />
        <Stack.Screen name="Signup" component={PlaceholderScreen} />
        <Stack.Screen name="CourseSelection" component={PlaceholderScreen} />
        <Stack.Screen name="Contact" component={PlaceholderScreen} />
        <Stack.Screen name="AboutScreen" component={PlaceholderScreen} />
        <Stack.Screen name="FirstAidCourse" component={PlaceholderScreen} />
        <Stack.Screen name="CookingCourse" component={PlaceholderScreen} />
        <Stack.Screen name="ChildMindingCourse" component={PlaceholderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
