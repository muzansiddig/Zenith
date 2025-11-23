
export enum TaskStatus {
  TODO = 'Todo',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

export enum TaskPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

export interface Habit {
  id: string;
  name: string;
  streak: number;
  completedDates: string[]; // ISO date strings
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  price: number;
  author: string;
  type: 'Spreadsheet' | 'Notion' | 'PDF';
  tags: string[];
}

export interface AITemplateResponse {
  title: string;
  description: string;
  structure: {
    columns: string[];
    data: string[][];
  };
  suggestions: string[];
}

// --- New Types for SaaS Features ---

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  timezone: string;
  location: string;
  createdAt: string;
  preferences: {
    theme: 'light' | 'dark';
    emailNotifications: boolean;
  };
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  details?: string;
  timestamp: string;
  device: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}
