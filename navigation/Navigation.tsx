import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  AboutScreen: undefined;
  SixMonthCourses: undefined;
  SixWeekCourses: undefined;
  CourseSelection: { searchQuery?: string };
  Login: undefined;
  Signup: undefined;
  FeeCalculationResults: {
    personalInfo: {
      name: string;
      phone: string;
      email: string;
    };
    selectedCourses: Array<{ id: string; name: string; price: number }>;
    subtotal: number;
    discount: number;
    discountAmount: number;
    discountedSubtotal: number;
    vatAmount: number;
    total: number;
  };
  Contact: undefined;
  // Course Detail Screen
  CourseDetail: {
    courseId: string;
    courseType: 'six-month' | 'six-week';
    title?: string;
  };
  // Six-month course screens
  FirstAidCourse: undefined;
  SewingCourse: undefined;
  LandscapingCourse: undefined;
  LifeSkillsCourse: undefined;
  // Six-week course screens
  ChildMindingCourse: undefined;
  CookingCourse: undefined;
  GardenMaintenanceCourse: undefined;
};

export type AppNavigationProp<T extends keyof RootStackParamList = 'Home'> = StackNavigationProp<RootStackParamList, T>;