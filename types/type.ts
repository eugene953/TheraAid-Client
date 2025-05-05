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




export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
}

interface Category {
  id: number;
  name: string;
  image: string;
}

export interface CategoryType {
  id: number;
  name: string;
  image: string;
}

export interface CartItemType {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}
