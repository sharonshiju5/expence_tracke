import { User, Customer, Item, Transaction, Expense } from './types';

// In-memory data store (replace with actual database in production)
export const users: User[] = [
  {
    id: '1',
    fullName: 'Admin User',
    username: 'admin',
    password: 'admin123',
    mobile: '+1234567890',
    role: 'admin',
    createdAt: new Date()
  }
];

export const customers: Customer[] = [];
export const items: Item[] = [];
export const transactions: Transaction[] = [];
export const expenses: Expense[] = [];

// Helper functions
export const generateId = () => Date.now().toString();

export const findUserByCredentials = (username: string, password: string) => {
  return users.find(u => u.username === username && u.password === password);
};

export const findCustomerByName = (name: string) => {
  return customers.find(c => c.name.toLowerCase() === name.toLowerCase());
};

export const findItemByName = (name: string) => {
  return items.find(i => i.name.toLowerCase() === name.toLowerCase());
};

export const addCustomer = (name: string, mobile: string) => {
  const customer: Customer = {
    id: generateId(),
    name,
    mobile,
    createdAt: new Date()
  };
  customers.push(customer);
  return customer;
};

export const addItem = (name: string) => {
  const item: Item = {
    id: generateId(),
    name,
    createdAt: new Date()
  };
  items.push(item);
  return item;
};

export const getFinancialSummary = () => {
  const totalIncome = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalPending = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  
  return {
    totalIncome,
    totalPending,
    totalExpense,
    netBalance: totalIncome - totalExpense
  };
};