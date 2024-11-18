<?php

namespace Database\Seeders;

use App\Models\AccessLevel;
use App\Models\Account;
use App\Models\Accounts;
use App\Models\AccountSubTypes;
use App\Models\AccountTypes;
use App\Models\Company;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();

        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin'),
            'role' => 1
        ]);

        Company::create([
            'name' => 'International Data Conversion Solutions Inc.',
            'location' => 'Philippines Palo, Leyte',
            'abbr' => 'IDCSI',
            'description' => ''
        ]);
        Company::create([
            'name' => 'Freight Process Outsourcing Solutions Inc',
            'location' => 'Philippines Manila, Mandaluyong',
            'abbr' => 'FPOSI',
            'description' => ''
        ]);
        Company::create([
            'name' => 'DDC DP',
            'location' => 'Philippines Batangas',
            'abbr' => 'DDC DP',
            'description' => ''
        ]);

        AccountTypes::create([
            'name' => 'Assets',
            'abbr' => '',
            'description' => ''
        ]);
        AccountTypes::create([
            'name' => 'Liabilities',
            'abbr' => '',
            'description' => ''
        ]);
        AccountTypes::create([
            'name' => "Owner's Equity",
            'abbr' => '',
            'description' => ''
        ]);
        AccountTypes::create([
            'name' => "Revenue",
            'abbr' => '',
            'description' => ''
        ]);

        AccountTypes::create([
            'name' => "Direct Expenses",
            'abbr' => '',
            'description' => ''
        ]);

        AccountTypes::create([
            'name' => "Administrative Expenses",
            'abbr' => '',
            'description' => ''
        ]);


        //ASSETS ACCOUNT SUB TYPES 
        AccountSubTypes::create([
            'name' => "Cash In Bank",
            'account_id' => 1,
            'abbr' => '',
            'description' => ''
        ]);
        AccountSubTypes::create([
            'name' =>  "Cash On Hand",
            'account_id' => 1,
            'abbr' => '',
            'description' => ''
        ]);
        AccountSubTypes::create([
            'name' =>   "Account Receivables",
            'account_id' => 1,
            'abbr' => '',
            'description' => ''
        ]);
        AccountSubTypes::create([
            'name' =>   "Advances To Employees",
            'account_id' => 1,
            'abbr' => '',
            'description' => ''
        ]);
        AccountSubTypes::create([
            'name' =>   "Advances To officers",
            'account_id' => 1,
            'abbr' => '',
            'description' => ''
        ]);
        AccountSubTypes::create([
            'name' =>   "Office Supplies Inventory",
            'account_id' => 1,
            'abbr' => '',
            'description' => ''
        ]);
        AccountSubTypes::create([
            'name' =>   "Computer Supplies Inventory",
            'account_id' => 1,
            'abbr' => '',
            'description' => ''
        ]);
        AccountSubTypes::create([
            'name' =>     "Furnitures & Fixtures",
            'account_id' => 1,
            'abbr' => '',
            'description' => ''
        ]);
        AccountSubTypes::create([
            'name' =>       "Computer Equipments",
            'account_id' => 1,
            'abbr' => '',
            'description' => ''
        ]);
        AccountSubTypes::create([
            'name' =>       "Vehicles",
            'account_id' => 1,
            'abbr' => '',
            'description' => ''
        ]);
        AccountSubTypes::create([
            'name' =>     "Lease hold Improvements",
            'account_id' => 1,
            'abbr' => '',
            'description' => ''
        ]);
        AccountSubTypes::create([
            'name' =>   "Properties",
            'account_id' => 1,
            'abbr' => '',
            'description' => ''
        ]);

        //LIABILITIES ACCOUNT SUB TYPES 
        AccountSubTypes::create([
            'name' =>   "Accounts Payable",
            'account_id' => 2,
            'abbr' => '',
            'description' => ''
        ]);
        AccountSubTypes::create([
            'name' =>   "Advances to Officers",
            'account_id' => 2,
            'abbr' => '',
            'description' => ''
        ]);


        //OWNE'S EQUITY ACCOUNT SUB TYPES 
        AccountSubTypes::create([
            'name' =>   "Capital",
            'account_id' => 3,
            'abbr' => '',
            'description' => ''
        ]);
        AccountSubTypes::create([
            'name' =>   "Net Income",
            'account_id' => 3,
            'abbr' => '',
            'description' => ''
        ]);
        AccountSubTypes::create([
            'name' =>   "Retained Earnings",
            'account_id' => 3,
            'abbr' => '',
            'description' => ''
        ]);

        //REVENUE ACCOUNT SUB TYPES 
        AccountSubTypes::create([
            'name' =>   "Sales",
            'account_id' => 4,
            'abbr' => '',
            'description' => ''
        ]);
        AccountSubTypes::create([
            'name' =>   "Interest Income",
            'account_id' => 4,
            'abbr' => '',
            'description' => ''
        ]);
        AccountSubTypes::create([
            'name' =>   "Other Income",
            'account_id' => 4,
            'abbr' => '',
            'description' => ''
        ]);

        //DIRECT EXPENSES ACCOUNT SUB TYPES 
        AccountSubTypes::create([
            'name' =>   "Salary & Wages",
            'account_id' => 5,
            'abbr' => '',
            'description' => ''
        ]);
        AccountSubTypes::create([
            'name' =>   "Social Security Contribution",
            'account_id' => 5,
            'abbr' => '',
            'description' => ''
        ]);
        AccountSubTypes::create([
            'name' =>   "13th Month Pay",
            'account_id' => 5,
            'abbr' => '',
            'description' => ''
        ]);

        //ADMINISTRATIVE EXPENSES ACCOUNT SUB TYPES 
        AccountSubTypes::create([
            'name' =>   "Salary & Wages",
            'account_id' => 6,
            'abbr' => '',
            'description' => ''
        ]);
        AccountSubTypes::create([
            'name' =>   "Social Security Contribution",
            'account_id' => 6,
            'abbr' => '',
            'description' => ''
        ]);
        AccountSubTypes::create([
            'name' =>   "13th Month Pay",
            'account_id' => 6,
            'abbr' => '',
            'description' => ''
        ]);


        // ACCOUTS 
        Accounts::create([
            'bank_account_code' => 'AC001',
            'bank_name' => 'Bank of America',
            'branch' => 'New York Branch',
            'account_name' => 'Business Checking Account',
            'account_no' => '123456789',
            'currency' => 'USD',
            'others_info' => 'Main business checking account',
            'account_sub_id' => 1,  // Assuming 1 corresponds to 'Cash in Bank'
        ]);

        Accounts::create([
            'bank_account_code' => 'AC002',
            'bank_name' => 'Chase Bank',
            'branch' => 'San Francisco Branch',
            'account_name' => 'Corporate Checking Account',
            'account_no' => '987654321',
            'currency' => 'USD',
            'others_info' => 'Secondary business checking account for operational expenses',
            'account_sub_id' => 1,  // 'Cash in Bank'
        ]);

        Accounts::create([
            'bank_account_code' => 'AC003',
            'bank_name' => 'Wells Fargo',
            'branch' => 'Los Angeles Branch',
            'account_name' => 'Operating Cash Account',
            'account_no' => '456789012',
            'currency' => 'USD',
            'others_info' => 'Account used for day-to-day operations',
            'account_sub_id' => 1,  // 'Cash in Bank'
        ]);

        Accounts::create([
            'bank_account_code' => 'AC004',
            'bank_name' => 'Citibank',
            'branch' => 'Chicago Branch',
            'account_name' => 'Main Corporate Bank Account',
            'account_no' => '234567890',
            'currency' => 'USD',
            'others_info' => 'Primary bank account for corporate finances',
            'account_sub_id' => 1,  // 'Cash in Bank'
        ]);

        Accounts::create([
            'bank_account_code' => 'AC005',
            'bank_name' => 'HSBC',
            'branch' => 'London Branch',
            'account_name' => 'UK Operations Bank Account',
            'account_no' => '567890123',
            'currency' => 'GBP',  // GBP for a different currency
            'others_info' => 'Bank account for UK operations',
            'account_sub_id' => 1,  // 'Cash in Bank'
        ]);

        // COH
        Accounts::create([
            'name' => 'John Doe', // Custodian Name
            'account_sub_id' => 2,  // 'Cash in Bank'
        ]);

        Accounts::create([
            'name' => 'Jane Smith', // Custodian Name
            'account_sub_id' => 2,  // 'Cash in Bank'
        ]);

        Accounts::create([
            'name' => 'Alice Johnson', // Custodian Name
            'account_sub_id' => 2,  // 'Cash in Bank'
        ]);

        Accounts::create([
            'name' => 'Bob Martin', // Custodian Name
            'account_sub_id' => 2,  // 'Cash in Bank'
        ]);

        Accounts::create([
            'name' => 'Carlos Perez ', // Custodian Name
            'account_sub_id' => 2,  // 'Cash in Bank'
        ]);


        // ACCOUNT RECIEVABLE

        Accounts::create([
            'name' => 'Customer A - Invoice #12345',  // Customer or Description
            'account_sub_id' => 3,  // Accounts Receivables
        ]);

        Accounts::create([
            'name' => 'Customer B - Outstanding Balance',  // Customer or Description
            'account_sub_id' => 3,  // Accounts Receivables
        ]);

        Accounts::create([
            'name' => 'XYZ Corp - Due Payment',  // Customer or Description
            'account_sub_id' => 3,  // Accounts Receivables
        ]);

        Accounts::create([
            'name' => 'John Doe - Due Payment',  // Customer or Description
            'account_sub_id' => 3,  // Accounts Receivables
        ]);

        Accounts::create([
            'name' => 'ABC Ltd - Unpaid Invoice',  // Customer or Description
            'account_sub_id' => 3,  // Accounts Receivables
        ]);

        // Create 5 Advances to Employees with account_sub_id = 4
        Accounts::create([
            'name' => 'John Doe - Advance Payment',
            'account_sub_id' => 4,  // Advances to Employees
        ]);

        Accounts::create([
            'name' => 'Jane Smith - Advance Payment',
            'account_sub_id' => 4,  // Advances to Employees
        ]);

        Accounts::create([
            'name' => 'Alice Johnson - Advance Salary',
            'account_sub_id' => 4,  // Advances to Employees
        ]);

        Accounts::create([
            'name' => 'Bob Martin - Employee Advance',
            'account_sub_id' => 4,  // Advances to Employees
        ]);

        Accounts::create([
            'name' => 'Carlos Perez - Salary Advance',
            'account_sub_id' => 4,  // Advances to Employees
        ]);

        // Create 5 Advances to Officer with account_sub_id = 5
        Accounts::create([
            'name' => 'John Smith - Officer Advance',  // Officer Name and Description
            'account_sub_id' => 5,  // Advances to Officers (assuming account_sub_id = 5)
        ]);

        Accounts::create([
            'name' => 'Emma Johnson - Business Loan',  // Officer Name and Description
            'account_sub_id' => 5,  // Advances to Officers
        ]);

        Accounts::create([
            'name' => 'Michael Brown - Travel Advance',  // Officer Name and Description
            'account_sub_id' => 5,  // Advances to Officers
        ]);

        Accounts::create([
            'name' => 'Olivia Davis - Salary Prepayment',  // Officer Name and Description
            'account_sub_id' => 5,  // Advances to Officers
        ]);

        Accounts::create([
            'name' => 'James Wilson - Loan for Business Expense',  // Officer Name and Description
            'account_sub_id' => 5,  // Advances to Officers
        ]);


        // Create 5 Office Supplies with account_sub_id = 6

        Accounts::create([
            'name' => 'Printer Paper - Office Supplies',  // Description of the office supply
            'account_sub_id' => 6,  // Office Supplies Inventory (assuming account_sub_id = 6)
        ]);

        Accounts::create([
            'name' => 'Ink Cartridges - Office Supplies',  // Description of the office supply
            'account_sub_id' => 6,  // Office Supplies Inventory
        ]);

        Accounts::create([
            'name' => 'Office Chairs - Furniture Inventory',  // Description of the office supply
            'account_sub_id' => 6,  // Office Supplies Inventory
        ]);

        Accounts::create([
            'name' => 'Desks - Office Furniture',  // Description of the office supply
            'account_sub_id' => 6,  // Office Supplies Inventory
        ]);

        Accounts::create([
            'name' => 'Stationery - Office Supplies',  // Description of the office supply
            'account_sub_id' => 6,  // Office Supplies Inventory
        ]);


        // Create 5 Computer Supplies with account_sub_id = 7

        Accounts::create([
            'name' => 'Laptops - Computer Supplies',  // Description of the computer supply
            'account_sub_id' => 7,  // Computer Supplies Inventory (assuming account_sub_id = 7)
        ]);

        Accounts::create([
            'name' => 'Monitors - Computer Supplies',  // Description of the computer supply
            'account_sub_id' => 7,  // Computer Supplies Inventory
        ]);

        Accounts::create([
            'name' => 'Keyboards - Computer Supplies',  // Description of the computer supply
            'account_sub_id' => 7,  // Computer Supplies Inventory
        ]);

        Accounts::create([
            'name' => 'Mice - Computer Supplies',  // Description of the computer supply
            'account_sub_id' => 7,  // Computer Supplies Inventory
        ]);

        Accounts::create([
            'name' => 'External Hard Drives - Computer Supplies',  // Description of the computer supply
            'account_sub_id' => 7,  // Computer Supplies Inventory
        ]);

        // Furniture & Fixtures with account_sub_id = 8
        Accounts::create([
            'name' => 'Executive Desks - Furniture & Fixtures',
            'account_sub_id' => 8,
            'num_months_depreciation' => 60,  // Example depreciation months
        ]);

        Accounts::create([
            'name' => 'Office Chairs - Furniture & Fixtures',
            'account_sub_id' => 8,
            'num_months_depreciation' => 48,  // Example depreciation months
        ]);

        Accounts::create([
            'name' => 'Filing Cabinets - Furniture & Fixtures',
            'account_sub_id' => 8,
            'num_months_depreciation' => 72,  // Example depreciation months
        ]);

        Accounts::create([
            'name' => 'Conference Table - Furniture & Fixtures',
            'account_sub_id' => 8,
            'num_months_depreciation' => 60,  // Example depreciation months
        ]);

        Accounts::create([
            'name' => 'Bookshelves - Furniture & Fixtures',
            'account_sub_id' => 8,
            'num_months_depreciation' => 48,  // Example depreciation months
        ]);

        // Computer Equipment with account_sub_id = 9
        Accounts::create([
            'name' => 'Desktop Computers - Computer Equipment',
            'account_sub_id' => 9,
            'num_months_depreciation' => 36,  // Example depreciation months
        ]);

        Accounts::create([
            'name' => 'Laptop Computers - Computer Equipment',
            'account_sub_id' => 9,
            'num_months_depreciation' => 36,  // Example depreciation months
        ]);

        Accounts::create([
            'name' => 'Servers - Computer Equipment',
            'account_sub_id' => 9,
            'num_months_depreciation' => 60,  // Example depreciation months
        ]);

        Accounts::create([
            'name' => 'Networking Routers - Computer Equipment',
            'account_sub_id' => 9,
            'num_months_depreciation' => 48,  // Example depreciation months
        ]);

        Accounts::create([
            'name' => 'Printers - Computer Equipment',
            'account_sub_id' => 9,
            'num_months_depreciation' => 60,  // Example depreciation months
        ]);

        // Vehicles with account_sub_id = 10
        Accounts::create([
            'name' => 'Delivery Van - Vehicles',
            'account_sub_id' => 10,
            'num_months_depreciation' => 84,  // Example depreciation months
        ]);

        Accounts::create([
            'name' => 'Company Car - Vehicles',
            'account_sub_id' => 10,
            'num_months_depreciation' => 72,  // Example depreciation months
        ]);

        Accounts::create([
            'name' => 'Service Truck - Vehicles',
            'account_sub_id' => 10,
            'num_months_depreciation' => 84,  // Example depreciation months
        ]);

        Accounts::create([
            'name' => 'Cargo Van - Vehicles',
            'account_sub_id' => 10,
            'num_months_depreciation' => 84,  // Example depreciation months
        ]);

        Accounts::create([
            'name' => 'Transport Bus - Vehicles',
            'account_sub_id' => 10,
            'num_months_depreciation' => 96,  // Example depreciation months
        ]);

        // Renovation - Leasehold Improvement with account_sub_id = 11
        Accounts::create([
            'name' => 'Office Renovation - Leasehold Improvement',
            'account_sub_id' => 11,
            'num_months_depreciation' => 120,  // Example depreciation months
        ]);

        Accounts::create([
            'name' => 'Partitioning - Leasehold Improvement',
            'account_sub_id' => 11,
            'num_months_depreciation' => 120,  // Example depreciation months
        ]);

        Accounts::create([
            'name' => 'Flooring Installation - Leasehold Improvement',
            'account_sub_id' => 11,
            'num_months_depreciation' => 120,  // Example depreciation months
        ]);

        Accounts::create([
            'name' => 'Lighting System Upgrade - Leasehold Improvement',
            'account_sub_id' => 11,
            'num_months_depreciation' => 120,  // Example depreciation months
        ]);

        Accounts::create([
            'name' => 'HVAC System Upgrade - Leasehold Improvement',
            'account_sub_id' => 11,
            'num_months_depreciation' => 120,  // Example depreciation months
        ]);

        // Property with account_sub_id = 12
        Accounts::create([
            'name' => 'Main Office Building - Property',
            'account_sub_id' => 12,
            'num_months_depreciation' => 180,  // Example depreciation months
        ]);

        Accounts::create([
            'name' => 'Warehouse Property - Property',
            'account_sub_id' => 12,
            'num_months_depreciation' => 180,  // Example depreciation months
        ]);

        Accounts::create([
            'name' => 'Retail Storefront Property - Property',
            'account_sub_id' => 12,
            'num_months_depreciation' => 180,  // Example depreciation months
        ]);

        Accounts::create([
            'name' => 'Industrial Property - Property',
            'account_sub_id' => 12,
            'num_months_depreciation' => 180,  // Example depreciation months
        ]);

        Accounts::create([
            'name' => 'Residential Apartment Building - Property',
            'account_sub_id' => 12,
            'num_months_depreciation' => 180,  // Example depreciation months
        ]);


        AccessLevel::create([
            'role' => 'Bank Accounts Data encoder',
            'description' => 'inflow & outflow'
        ]);
        AccessLevel::create([
            'role' => 'Accounts Payable encoder',
             'description' => 'inflow'
        ]);
        AccessLevel::create([
            'role' => 'Government Reports encoder',
            'description' => 'inflow'
        ]);
        AccessLevel::create([
            'role' => 'Payroll Encoder',
            'description' => 'inflow'
        ]);
        AccessLevel::create([
            'role' => 'Check Issuer & Bank Monitoring',
            'description' => 'inflow & flow'
        ]);

    }
}
