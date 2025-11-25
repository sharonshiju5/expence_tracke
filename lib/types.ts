export interface User {
  id: string;
  fullName: string;
  username: string;
  password: string;
  mobile: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  mobile: string;
  createdAt: Date;
}

export interface Item {
  id: string;
  name: string;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  date: Date;
  customerId: string;
  customerName: string;
  customerMobile: string;
  itemId: string;
  itemName: string;
  amount: number;
  status: 'completed' | 'pending';
  enteredBy: string;
  createdAt: Date;
}

export interface Expense {
  id: string;
  date: Date;
  title: string;
  description?: string;
  amount: number;
  enteredBy: string;
  createdAt: Date;
}

export interface FinancialSummary {
  totalIncome: number;
  totalPending: number;
  totalExpense: number;
  netBalance: number;
}