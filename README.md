# Ozone Milk Zone - Inventory Management System

**Ozone Milk Zone** is a professional inventory management system specifically designed for dairy product businesses. It provides seamless tracking of stock-in, stock-out, and real-time financial updates, ensuring streamlined operations. Built using **React** and **Tailwind CSS**, this system offers a modern, intuitive, and responsive interface for managing products, transactions, and user settings.

## Key Features

### 1. **Comprehensive Inventory Management**
   - **Add, update, and delete products**: Easily manage dairy product details such as quantity, price per unit, and inventory status.
   - **Stock-in and Stock-out management**: Track both incoming and outgoing stock with detailed reports.
   - **Paginated views**: Efficiently navigate through large datasets with pagination in both stock-in and stock-out reports.

### 2. **Financial Tracking**
   - **Real-time earnings data**: Track today's, yesterday's, and total earnings from MoMo and cash transactions.
   - **Profit/Loss visualization**: See profit and loss data for every stock-out transaction, providing immediate insights into financial performance.
   - **Icons for quick insights**: Use of visual icons to represent financial statuses and earnings.

### 3. **Admin Settings Management**
   - **Update user credentials**: Admins can securely update their username and password.
   - **Profile photo management**: Change profile images via an intuitive upload interface.
   - **User-friendly validation**: Integrated with password strength checks and validation for enhanced security.

### 4. **Interactive Reports**
   - **Stock reports**: Generate comprehensive reports for stock-in and stock-out activities.
   - **Date filtering**: Filter transaction reports by custom date ranges to view specific stock events.
   - **Paginated tables**: Easily navigate large datasets without performance degradation.

### 5. **Responsive and Modern Design**
   - Optimized for both desktop and mobile views.
   - Interactive modals for product and transaction details.
   - Tailored for a professional look and feel, with a clean UI design powered by Tailwind CSS.

## Technologies Used

- **React**: A modern JavaScript library for building fast, interactive user interfaces.
- **Tailwind CSS**: A utility-first CSS framework that enables quick and responsive styling.
- **React Router**: Provides seamless navigation between different sections of the application.
- **React Icons**: A rich library of icons for quick visual representation of various features.
- **State Management**: Managed using React’s `useState` and `useEffect` hooks for a dynamic and real-time experience.

## Installation Guide

Follow the steps below to install and run **Ozone Milk Zone** locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/ozone-milk-zone.git

2. **Navigate to the project directory**: 
   ```bash
   cd ozone-milk-zone

3. *Install dependencies:*:
   ```bash
   npm install

4. *Run the development server:*:
   ```bash
   npm start

The app will run at http://localhost:3000 in your browser.

## Project Structure

### The Ozone Milk Zone system is organized in a modular structure:
```
src/
│
├── components/
│   ├── dashboard/
│   │   ├── HomeDash.js       // Displays earnings and recent stock data
│   │   ├── StockIn.js        // Manages incoming stock
│   │   ├── StockOut.js       // Manages outgoing stock
│   │   ├── Products.js       // Lists products with pagination
│   │   ├── Reports.js        // Displays filtered stock reports
│   │   └── Settings.js       // User profile and password settings
│   └── shared/
│       ├── Header.js         // Navigation bar
│       ├── Sidebar.js        // Side navigation menu
│       └── Pagination.js     // Reusable pagination component
│
├── styles/
│   └── index.css             // Tailwind and custom styles
│
├── App.js                    // Main application component
├── index.js                  // Entry point for React application
└── ...
```
## Usage Instructions

### 1. Product Management
- Navigate to the Products page via the sidebar.
- Add a product by clicking on the Add Product button, filling in necessary fields (Product Name, Type, Quantity, Price per Unit).
- Use pagination controls to browse the product list efficiently.

### 2. Managing Stock
- Visit the StockIn or StockOut pages to add new stock entries or record outgoing products.
- Reports can be filtered by date or transaction type for easy tracking.

### 3. Monitoring Earnings
- On the HomeDash page, view a detailed breakdown of MoMo and Cash earnings for today, yesterday, and total income.
- Click on specific stock entries to view detailed transaction data, including profit/loss.

### 4. Admin Settings
- Update username, password, and profile photo from the Settings page.
- Ensure secure password management with built-in validation and strength checks.

## Future Enhancements
- Analytics Dashboard: Adding detailed charts and graphs for better business insights.
- Multi-user Access: Enabling multiple users with different access levels (admin, staff).
- Notifications: Email and SMS notifications for low stock alerts and important updates.

## License
``` This project is licensed under the MIT License. You are free to use, modify, and distribute this software under the terms of the license. See the LICENSE file for more details. ```

## Contributions

Contributions are welcome! Feel free to fork the repository and submit a pull request. You can also submit issues or feature requests.

1. Fork the repository.
2. Create a new branch for your feature.
3. Submit a pull request with a detailed description of the changes.

## Contact

For any questions or support related to Ozone Milk Zone, please feel free to reach out:

1. Email: danieliryivuze4@gmail.com
2. GitHub Issues: https://github.com/diryivuze/ozone-milk-zone/issues

### Ozone Milk Zone is built to help dairy businesses effectively manage their inventory and financial operations with ease and professionalism.