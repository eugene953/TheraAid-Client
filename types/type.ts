export interface UserProps {
  id: string;
  username: string;
  email: string;
  phone_number: string;
  gender: string;
  password: string;
  profile: string | null;
  role: 'user';
}

export interface AdminProps {
  id: string;
  admin_name: string;
  email: string;
  password: string;
  role: 'admin';
}

export interface UserLoginProps {
  username: string;
  password: string;
}

export interface NotificationType {
  id: number;
  title: string;
  message: string;
  timestamp: string;
}

export type ScreenRootParamList = {
  WelcomeScreen: undefined;
  HomeScreen: undefined;
  
};


export type history  = {
  session_id: number;
  start_time: string;
  date: string;
  message: string;
};


