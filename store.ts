
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Task, Habit, Transaction, TaskStatus, TaskPriority, User, ActivityLog, Notification } from './types';

interface AppState {
  // Auth & User
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  
  // Data
  tasks: Task[];
  habits: Habit[];
  transactions: Transaction[];
  
  // System
  logs: ActivityLog[];
  notifications: Notification[];
  
  // Actions
  addTask: (task: Task) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  toggleHabit: (id: string, date: string) => void;
  addTransaction: (transaction: Transaction) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'timestamp'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
}

// Helper for Mock Logging
const createLog = (userId: string, action: string, details: string = ''): ActivityLog => ({
  id: Math.random().toString(36).substr(2, 9),
  userId,
  action,
  details,
  timestamp: new Date().toISOString(),
  device: navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop - Chrome',
});

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      tasks: [
        { id: '1', title: 'Design system update', status: TaskStatus.IN_PROGRESS, priority: TaskPriority.HIGH, dueDate: '2023-11-01' },
        { id: '2', title: 'Q4 Budget Review', status: TaskStatus.TODO, priority: TaskPriority.MEDIUM, dueDate: '2023-11-05' },
      ],
      habits: [
        { id: '1', name: 'Morning Meditation', streak: 12, completedDates: [new Date().toISOString().split('T')[0]] },
      ],
      transactions: [
        { id: '1', description: 'Freelance Project', amount: 1500, type: 'income', category: 'Business', date: '2023-10-25' },
      ],
      logs: [],
      notifications: [],

      // --- Auth Actions ---

      login: async (email, password) => {
        // Mock API Call
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
        
        if (email && password) {
          const mockUser: User = {
            id: 'u-123',
            name: email.split('@')[0],
            email,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            location: 'New York, USA', // Mock location
            createdAt: new Date().toISOString(),
            preferences: { theme: 'light', emailNotifications: true }
          };
          
          set((state) => ({
            user: mockUser,
            isAuthenticated: true,
            token: 'mock-jwt-token-123',
            logs: [createLog(mockUser.id, 'Login', 'User logged in successfully'), ...state.logs],
            notifications: [{ 
              id: Date.now().toString(), 
              title: 'Welcome Back!', 
              message: `Good to see you, ${mockUser.name}.`, 
              type: 'success', 
              read: false, 
              timestamp: new Date().toISOString() 
            }, ...state.notifications]
          }));
          return true;
        }
        return false;
      },

      register: async (name, email, password) => {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockUser: User = {
          id: `u-${Math.random().toString(36).substr(2, 5)}`,
          name,
          email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          location: 'Detected via IP',
          createdAt: new Date().toISOString(),
          preferences: { theme: 'light', emailNotifications: true }
        };

        set((state) => ({
          user: mockUser,
          isAuthenticated: true,
          token: 'mock-jwt-token-new',
          logs: [createLog(mockUser.id, 'Register', 'Account created'), ...state.logs],
           notifications: [{ 
              id: Date.now().toString(), 
              title: 'Welcome to Zenith', 
              message: 'Your account has been set up successfully.', 
              type: 'info', 
              read: false, 
              timestamp: new Date().toISOString() 
            }, ...state.notifications]
        }));
        return true;
      },

      logout: () => set((state) => {
        const userId = state.user?.id || 'unknown';
        return {
          user: null,
          isAuthenticated: false,
          token: null,
          logs: [createLog(userId, 'Logout'), ...state.logs]
        };
      }),

      updateProfile: (data) => set((state) => {
        if (!state.user) return state;
        const updatedUser = { ...state.user, ...data };
        return {
          user: updatedUser,
          logs: [createLog(state.user.id, 'Profile Update', Object.keys(data).join(', ')), ...state.logs],
          notifications: [{
             id: Date.now().toString(),
             title: 'Profile Updated',
             message: 'Your changes have been saved.',
             type: 'info',
             read: false,
             timestamp: new Date().toISOString()
          }, ...state.notifications]
        };
      }),

      // --- Data Actions ---

      addTask: (task) => set((state) => ({ 
        tasks: [...state.tasks, task],
        logs: state.user ? [createLog(state.user.id, 'Create Task', task.title), ...state.logs] : state.logs
      })),

      updateTaskStatus: (id, status) => set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
        // Optional: reduce log noise by not logging every status change or log it if critical
      })),

      toggleHabit: (id, date) => set((state) => ({
        habits: state.habits.map((h) => {
          if (h.id === id) {
            const isCompleted = h.completedDates.includes(date);
            const newCompletedDates = isCompleted
              ? h.completedDates.filter((d) => d !== date)
              : [...h.completedDates, date];
            
            // Check for streak reward
            const newStreak = isCompleted ? h.streak - 1 : h.streak + 1;
            
            return { ...h, completedDates: newCompletedDates, streak: Math.max(0, newStreak) };
          }
          return h;
        }),
      })),

      addTransaction: (tx) => set((state) => ({ 
        transactions: [...state.transactions, tx],
        logs: state.user ? [createLog(state.user.id, 'Add Transaction', `$${tx.amount} - ${tx.description}`), ...state.logs] : state.logs
      })),

      // --- Notifications ---

      addNotification: (n) => set((state) => ({
        notifications: [{ ...n, id: Date.now().toString(), read: false, timestamp: new Date().toISOString() }, ...state.notifications]
      })),

      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
      })),

      clearNotifications: () => set({ notifications: [] })
    }),
    {
      name: 'zenith-storage', // unique name
      storage: createJSONStorage(() => localStorage), // persist to local storage
      partialize: (state) => ({ 
         user: state.user, 
         isAuthenticated: state.isAuthenticated, 
         tasks: state.tasks, 
         habits: state.habits, 
         transactions: state.transactions,
         logs: state.logs,
         notifications: state.notifications 
      }),
    }
  )
);
