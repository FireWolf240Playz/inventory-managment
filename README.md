INVENTORY MANAGEMENT SYSTEM
===========================

A comprehensive application to manage devices, employees, licenses, and user authentication.

TABLE OF CONTENTS
-----------------
  1. Key Features
  2. Demonstration
  3. How To Use
  4. API Usage
  5. Deployment
  6. Build With
  7. To-do
  8. Installation
  9. Known Bugs
  10. Future Updates
  11. Acknowledgement
  12. License

1. KEY FEATURES
---------------
  - Authentication & Authorization
      * Secure login, logout, password reset (JWT).
      * Role-based or user-based access control (optional).
  - Devices Management
      * Create, read, update, delete devices.
      * Track device details (brand, model, status, etc.).
  - Employees Management
      * Maintain employee records (hire date, assigned devices).
      * Search/filter employees (planned feature).
  - Licenses Management
      * Handle software license records: keys, expiry dates.
      * Renewal notifications (optional future enhancement).
  - Avatar Upload
      * Users can upload profile pictures.
      * Served via Express static middleware.
  - Responsive Frontend
      * Built with React & Redux (or React Query).
      * Styled with CSS or Styled Components.

2. DEMONSTRATION
----------------
  - Sample Screens / Gifs (Replace these descriptions with real demos):
      (a) Device list and assignment to employees
      (b) License overview and renewal page
      (c) User profile with avatar upload

  - Example steps:
      1) Log in as admin user
      2) View the device list
      3) Assign a device to a specific employee
      4) Update your user avatar

3. HOW TO USE
-------------
  - Log in or register a user account.
  - Access "Devices" section to create/update hardware records.
  - Go to "Employees" to add or edit employee data, assign them devices.
  - Manage "Licenses" by adding keys and tracking expiration.
  - Update your personal profile info (including avatar) in "Account" section.

4. API USAGE
------------
  - Common Endpoints (examples):
      /api/auth/login         -> Log in (POST)
      /api/users/account      -> Update user (PATCH) w/ avatar
      /api/devices            -> CRUD devices
      /api/employees          -> CRUD employees
      /api/licenses           -> CRUD software licenses
  - Include "Authorization: Bearer <token>" header for protected routes.
  - Use Postman, cURL, or a similar tool to test the endpoints.

5. DEPLOYMENT
-------------
  - Steps (Generic):
      1) Set environment variables (PORT, MONGO_URI, JWT_SECRET, etc.).
      2) Deploy backend to a platform (e.g. Heroku, Render).
      3) Deploy frontend (e.g. Netlify, Vercel, or same platform via buildpack).
  - Make sure environment variables match production environment.

6. BUILD WITH
-------------
  - NodeJS, Express, MongoDB (Mongoose), Multer (for uploads)
  - React (Hooks & functional components), Redux
  - JWT for authentication
  - Optional tools: ESLint, Prettier, Jest

7. TO-DO
--------
  - Role-based Access Control
  - Email or push notifications for license renewals
  - Export device/employee data as CSV
  - Advanced search & filtering for devices/employees

8. INSTALLATION
---------------
  1) Clone repository:
       git clone https://github.com/your-username/inventory-management-system.git
       cd inventory-management-system

  2) Backend setup:
       cd src/backend
       npm install
       npm run dev

  3) Frontend setup:
       cd ../../frontend
       npm install
       npm run dev

  4) Create a .env file in backend with:
       PORT=8000
       MONGO_URI=mongodb://localhost:27017/inventoryDB
       JWT_SECRET=YOUR_SECRET
     Adjust these to your preferences.

  5) Open http://localhost:5173 in browser (if using Vite).

9. KNOWN BUGS
-------------
  - Avatar may not refresh on certain browsers without a forced re-render.
  - Employee search is incomplete (planned feature).
  - Some old records might display stale data until manual refresh.

10. FUTURE UPDATES
------------------
  - Integrate notifications (Slack or email) for device status changes.
  - Two-factor authentication for extra security.
  - PWA support for offline usage.
  - Integration with external payroll/HR systems.

11. ACKNOWLEDGEMENT
-------------------
  - Thanks to Node, React, and open-source communities for their awesome tools.
  - Special mention to all contributors who helped refine the app’s design and functionality.

12. LICENSE
-----------
  - This project is licensed under the MIT License.  
  - Refer to the LICENSE file for more details.


