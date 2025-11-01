import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import { RootStackParamList } from './navigation/Navigation';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import SixMonthCoursesScreen from './screens/SixMonthCoursesScreen';
import SixWeekCoursesScreen from './screens/SixWeekCoursesScreen';
import ContactUsScreen from './screens/ContactUsScreen';
import CourseSelectionScreen from './screens/CourseSelectionScreen'; // Import the CourseSelectionScreen
import AboutScreen from './screens/AboutScreen';
import ChildMindingSixWeekScreen from './screens/ChildMindingSixWeekScreen';
import CookingSixWeekScreen from './screens/CookingSixWeekScreen';
import GardenMaintenanceSixWeekScreen from './screens/GardenMaintenanceSixWeekScreen';
import FirstAidCourseScreen from './screens/FirstAidSixMonthScreen';
import SewingCourseScreen from './screens/SewingSixMonthScreen';
import LandscapingCourseScreen from './screens/LandscapingSixMonthScreen';
import LifeSkillsCourseScreen from './screens/LifeSkillSixMonthScreen';
import CourseDetailScreen from './screens/CourseDetailScreen';
import FeeCalculationResultsScreen from './screens/FeeCalculator';
const Stack = createStackNavigator<RootStackParamList>();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* Add other screens here as you create them. For now, they can be placeholders. */}
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CourseSelection" component={CourseSelectionScreen} />
        <Stack.Screen name="SixMonthCourses" component={SixMonthCoursesScreen} />
        <Stack.Screen name="SixWeekCourses" component={SixWeekCoursesScreen} />
        <Stack.Screen name="Contact" component={ContactUsScreen} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} />
        <Stack.Screen name="FirstAidCourse" component={FirstAidCourseScreen} />
        <Stack.Screen name="CookingCourse" component={CookingSixWeekScreen} />
        <Stack.Screen name="ChildMindingCourse" component={ChildMindingSixWeekScreen} />
        <Stack.Screen name="GardenMaintenanceCourse" component={GardenMaintenanceSixWeekScreen} />
        <Stack.Screen name="SewingCourse" component={SewingCourseScreen} />
        <Stack.Screen name="LandscapingCourse" component={LandscapingCourseScreen} />
        <Stack.Screen name="LifeSkillsCourse" component={LifeSkillsCourseScreen} />
        <Stack.Screen name="FeeCalculationResults" component={FeeCalculationResultsScreen} />
        <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
