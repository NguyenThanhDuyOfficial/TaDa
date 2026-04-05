# User Stories

| Role                   | I want to                                                                          | so that                                                   | Point | Priority 1-3 |
| ---------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------- | ----- | ------------ |
| User                   | register/login                                                                     | -                                                         | 1     | 3            |
| -                      | -                                                                                  | -                                                         | -     | -            |
| Admin                  | define the roles (sales, inventory, accounting)                                    | limit permissions by job function                         |       |              |
| Admin                  | invite and deactive staffs                                                         | control who accesses the ERP                              |       |              |
| Inventory manager      | add and edit products                                                              | all sales and purchase data uses the same product catalog |       |              |
| User                   | filter products by category, status and warehouse                                  | i can quickly find what i need                            |       |              |
| Saleperson             | create and edit sales orders                                                       | i can capture customer demand correctly                   |       |              |
| Saleperson             | see available stock when adding items to an order                                  | i don't promise more than we have                         |       |              |
| Sales manager          | view all sales orders with status                                                  | i can track progress                                      |       |              |
| Customer service agent | see the order history for each customer                                            | i can answer questions about past purchases               |       |              |
| user                   | search orders                                                                      | i can find specific orders quickly                        |       |              |
| accountant             | generate invoices from sales order                                                 | i can bill customers automatically                        |       |              |
| accountant             | mark invoices as "paid" or "overdue"                                               | i can track accounts receivable                           |       |              |
| accountant             | record payments against invoices so that the system rreflects real-world cash flow |                                                           |       |
| accountant             | see a basic "income vs. cost" summary for a date range                             | i can quickly check profitability                         |       |              |
| manager                | make a list of overdue invoices                                                    | i can follow up with customers for faster collections     |       |              |
| manager                | have a dashboard with key metrics                                                  | i can scan the business health in one screen              |       |              |
| user                   | exporrt orders and invoices to CSV or PDF                                          | i can share data with external systems or print documents |       |              |
| manager                | have date-range filters on reports                                                 | i can compare performance between periods                 |       |              |
| accountant             | have a simple accounts receivable\payable overview                                 | i can monitor cash owed and owed to others                |       |              |
| Manager                | check an audit log for key actions                                                 | trace changes when something went wrong                   |       |              |
| user                   | have secure login                                                                  | only authorized people can access company data            |       |              |
| admin                  | have role-based access control                                                     | sales users cannot edit accounting or inventory settings  |       |              |
| power user             | have keyboard shortcut and bult actions for list                                   | i can work faster in daily operations                     |       |              |

# Tech Stack

Frontend: Nextjs 16.2.2 + Tailwind
Backend: NextAPI

Database: Prisma + PostgreSQL
Auth: Clerk

Cache: Redis
Devops: Docker

# Architecture

Modular Monolith

- src/
  - app/
    - (page)
    - api/
  - client
    - components/
      - layout
      - ui
      - forms
      - tables
      - modals
    - hooks
    - providers
    - lib
    - assets
  - server
    - modulers
      - actions
      - loaders
      - repositories
      - usecases
      - lib
    - shared
      - lib
      - interfaces
      - middlewares
  - database
  - shared
  - i18n
  - public
- docs
- etcs

# Features

- **Users & Roles**
  - Secure login via Clerk (or similar identity provider).
  - Role‑based access: admin, sales, inventory, and accounting users with different permissions.
  - Simple user management (invite, deactivate, basic profiles).

- **Inventory Management**
  - Add, edit, and view products with name, SKU, price, and cost.
  - Track stock levels and basic stock movements (inbound / outbound).
  - Mark products as active/inactive and filter by category or warehouse.

- **Sales & Orders**
  - Create and manage sales orders (customer, items, quantities, dates).
  - Convert orders to invoices with due dates and simple payment status (pending / paid).
  - View a list of orders and invoices with filters and search.

- **Basic Accounting**
  - Track **accounts payable** (what you owe suppliers) and **accounts receivable** (what customers owe you).
  - Record basic invoices and payments and link them to customers or suppliers.
  - Basic profit‑and‑loss style view (income vs. cost) for the current period.

- **Dashboard & Reporting (Light)**
  - Dashboard with key metrics:
    - Low‑stock alerts.
    - Overdue invoices.
    - Recent sales by date.
  - Export orders and invoices to CSV or PDF for basic reporting.

- **Search & Filters**
  - Search products, orders, invoices, and customers by name, code, or reference.
  - Date‑range filters for orders, invoices, and payments.

- **Audit & Safety**
  - Basic audit logs for who created/updated products, orders, and invoices.
  - Soft‑delete behavior for products and customers (mark as deleted instead of hard‑removing).

# Todo

| Status | Git Commit Message              | Priority | User Points |
| ------ | ------------------------------- | -------- | ----------- |
|        | chore: init                     | 3        | 1           |
|        | chore: init Prisma + PostgreSQL | 3        | 1           |
|        | chore: init Clerk               | 3        | 1           |
|        | feat: build users module        | 3        |             |
|        | feat: landing page              | 1        | 2           |
|        | feat: login/register page       | 3        | 1           |
|        | feat: dashboard                 | 3        |             |
|        | feat: event log                 | 1        |             |
|        | feat: item management           | 3        |             |
|        | feat: order management          | 3        |             |
|        | feat: inventory management      | 3        |             |
|        | feat: payment                   | 3        |             |
|        | feat: report daily              | 2        |             |
|        | feat: customer management       | 2        |             |
|        | feat: staff management          | 3        |             |
|        | feat: export CSV                | 1        |             |

# User Module

## User Stories

| Status | Role  | I want                                                       | so that | Priority |
| ------ | ----- | ------------------------------------------------------------ | ------- | -------- |
|        | Admin | to invite users by email, assign roles to users in user page |         | High     |
|        | Admin | to deactive user in user page                                |         | High     |
|        | Admin | to search user in user page                                  |         | Medium   |
|        | User  | to change my avatar, name                                    |         | Low      |

## Boundaries & Dependencies

    Owns:

        User records, roles, role assignments.

        User CRUD logic and validation.

    Depends on:

        shared/types.User and shared/types.Role.

        server/shared/permissions (for permission checks).

        server/database (Prisma service).

## Data model / entities

```Prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  roles Role[]
}
enum Role {
  ADMIN
  INVENTORY
  SALES
  ACCOUNTING
}
```

## Exposed API / use cases

### createUser

```Typescript
export async function createUser(data: CreateUserSchema): Promise<User> {
  return await userRepository.create(data)
}
```

### getUser

```Typescript
export async function getUserById(id: string): Promise<User | null> {
  return userRepository.findById(id);
}
```
