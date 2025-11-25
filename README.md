# Smart Ledger & Expense Tracker

A comprehensive expense tracking and ledger management system built with Next.js, TypeScript, and Tailwind CSS.

## Features

### User Roles & Permissions
- **Super Admin**: Full access to admin dashboard, user management, and all financial reports
- **User (Staff)**: Access to user dashboard, transaction entry, expense tracking, and limited reports

### Core Modules
1. **Login System**: Secure authentication for both Admin and Users
2. **User Management**: Admin can create and manage staff accounts
3. **Transaction Management**: Add income/sales with autocomplete for customers and items
4. **Expense Tracking**: Record daily operational expenses
5. **Payment Management**: Update pending payments to completed status
6. **Comprehensive Reports**: Customer ledger, daily transactions, expense reports, and financial summaries

### Key Features
- **Dynamic Autocomplete**: Smart suggestions for customer names and items
- **Automatic Master Data Creation**: New customers and items are automatically saved for future use
- **Real-time Financial Dashboard**: Live updates of income, expenses, and net balance
- **Debt Management**: Track and manage pending payments
- **Role-based Access Control**: Different interfaces for admins and users

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Default Login Credentials

**Admin Account:**
- Username: `admin`
- Password: `admin123`

## Usage

### For Admins:
1. Login with admin credentials
2. Create user accounts in "User Management"
3. Monitor financial overview in the dashboard
4. Access all reports and manage the system

### For Users:
1. Login with credentials provided by admin
2. Add transactions (income/sales) with customer and item details
3. Record daily expenses
4. View reports and update payment statuses

### Transaction Entry:
- Start typing customer names - existing customers will appear in dropdown
- If customer doesn't exist, type new name and it will be saved automatically
- Same functionality applies to item names
- Mobile numbers auto-fill for existing customers

### Payment Management:
- View pending payments in Reports > Pending Payments
- Click "Mark as Paid" to convert pending to completed status
- This updates the financial summary automatically

## Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Data Storage**: In-memory (can be replaced with database)
- **Authentication**: Local storage based (for demo purposes)

## Project Structure

```
├── app/
│   ├── page.tsx          # Main application entry
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── Login.tsx         # Authentication component
│   ├── Dashboard.tsx     # Main dashboard
│   ├── UserManagement.tsx # Admin user management
│   ├── TransactionForm.tsx # Income/sales entry
│   ├── ExpenseForm.tsx   # Expense tracking
│   └── Reports.tsx       # All reports and analytics
├── lib/
│   ├── types.ts          # TypeScript interfaces
│   ├── data.ts           # Data management functions
│   └── auth.ts           # Authentication utilities
```

## Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- Advanced reporting with charts
- Export functionality (PDF/Excel)
- Multi-currency support
- Mobile app version
- Advanced user permissions
- Backup and restore functionality

## Contributing

This is a demo application. For production use, implement proper database storage, authentication, and security measures.
