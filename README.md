<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Inventory Management System – README</title>
  <style>
    /* Basic reset & global styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: Arial, sans-serif;
      background: #f9f9f9;
      color: #333;
      line-height: 1.6;
      padding: 1rem;
    }
    a {
      color: #4b0082;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    h1, h2, h3, h4 {
      margin-bottom: 1rem;
    }
    /* Center headings if desired */
    [align="center"] {
      text-align: center;
    }

    /* Container for content */
    .container {
      max-width: 900px;
      margin: 2rem auto;
      background: #fff;
      padding: 2rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    /* Title and logo */
    .title-section {
      text-align: center;
      margin-bottom: 2rem;
    }
    .title-section img {
      max-width: 180px;
      margin-bottom: 1rem;
    }

    /* Navigation links (like a mini table of contents) */
    .nav-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem;
      list-style: none;
      margin-bottom: 2rem;
    }
    .nav-links li {
      background: #ececec;
      border-radius: 0.3rem;
    }
    .nav-links li a {
      display: block;
      padding: 0.5rem 1rem;
      font-weight: bold;
    }
    .nav-links li a:hover {
      background: #4b0082;
      color: #fff;
    }

    /* Sections */
    section {
      margin-bottom: 2rem;
    }
    section h2 {
      border-bottom: 2px solid #4b0082;
      padding-bottom: 0.3rem;
      margin-bottom: 1rem;
    }

    /* Code blocks */
    pre {
      background: #f5f5f5;
      border-radius: 4px;
      padding: 1rem;
      overflow-x: auto;
      margin-bottom: 1rem;
    }
    code {
      font-family: "Courier New", Courier, monospace;
      color: #d14;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1rem;
    }
    table th, table td {
      border: 1px solid #ccc;
      padding: 0.5rem 1rem;
    }
    table th {
      background: #f0f0f0;
      text-align: left;
    }

    /* Images / Gifs */
    .demo-gifs img {
      border: 1px solid #eee;
      border-radius: 0.3rem;
      margin-bottom: 1rem;
      max-width: 100%;
    }

    /* Footer */
    footer {
      text-align: center;
      margin-top: 3rem;
      color: #999;
      font-size: 0.9rem;
    }
  </style>
</head>
<body>

  <div class="container">

    <!-- Title & Logo -->
    <div class="title-section">
      <h1 align="center">
        <br>
        <a href="https://github.com/YourUser/inventory-management-system">
          <img src="https://placehold.co/180x180" alt="IMS Logo">
        </a>
        <br>
        Inventory Management System
        <br>
      </h1>
      <h4 align="center">A comprehensive application for managing devices, employees, licenses, and authentication.</h4>
    </div>

    <!-- Navigation Links -->
    <ul class="nav-links">
      <li><a href="#key-features">Key Features</a></li>
      <li><a href="#demonstration">Demonstration</a></li>
      <li><a href="#how-to-use">How To Use</a></li>
      <li><a href="#api-usage">API Usage</a></li>
      <li><a href="#deployment">Deployment</a></li>
      <li><a href="#build-with">Build With</a></li>
      <li><a href="#to-do">To-do</a></li>
      <li><a href="#installation">Installation</a></li>
      <li><a href="#known-bugs">Known Bugs</a></li>
      <li><a href="#future-updates">Future Updates</a></li>
      <li><a href="#acknowledgement">Acknowledgement</a></li>
      <li><a href="#license">License</a></li>
    </ul>

    <!-- Key Features -->
    <section id="key-features">
      <h2>Key Features</h2>
      <ul>
        <li><strong>Authentication &amp; Authorization:</strong> Secure login, logout, update, and reset password with JWT.</li>
        <li><strong>Devices Management:</strong> Create, read, update, delete devices; track brand, model, status.</li>
        <li><strong>Employees Management:</strong> Manage employee records, assign devices to employees, etc.</li>
        <li><strong>Licenses Management:</strong> Handle software licenses, keys, expiry dates.</li>
        <li><strong>Avatar Upload:</strong> Users can upload profile pictures, served via Express static route.</li>
        <li><strong>Responsive Frontend:</strong> Built with React &amp; Redux; styled with CSS/Styled Components.</li>
      </ul>
    </section>

    <!-- Demonstration -->
    <section id="demonstration">
      <h2>Demonstration</h2>
      <p class="demo-gifs">
        <!-- Replace placeholders with your own images/gifs -->
        <img src="https://placehold.co/600x400" alt="Demo 1">
        <img src="https://placehold.co/600x400" alt="Demo 2">
      </p>
      <p>Below are a few demonstrations of the Inventory Management System in action:</p>
      <ol>
        <li>Users can log in, view devices, assign them to employees.</li>
        <li>Track software licenses, expire dates, and renewal notifications (planned).</li>
      </ol>
    </section>

    <!-- How To Use -->
    <section id="how-to-use">
      <h2>How To Use</h2>
      <ul>
        <li><strong>Log in</strong> with your credentials or register a new user.</li>
        <li><strong>Devices</strong>: View, add, or update device details.</li>
        <li><strong>Employees</strong>: Create employee records and assign them devices.</li>
        <li><strong>Licenses</strong>: Manage software license records, mark renewals.</li>
        <li><strong>Profile</strong>: Update your user info, including a new avatar image.</li>
      </ul>
    </section>

    <!-- API Usage -->
    <section id="api-usage">
      <h2>API Usage</h2>
      <p>Check the <strong>Inventory Management System</strong> API endpoints below (examples):</p>

      <ul>
        <li><code>POST /api/auth/login</code>: Log in a user, returns JWT.</li>
        <li><code>PATCH /api/users/account</code>: Update user data, including avatar upload.</li>
        <li><code>GET /api/devices</code>: Fetch all devices.</li>
        <li><code>POST /api/devices</code>: Create a new device.</li>
        <li><code>GET /api/employees</code>: Retrieve employee list.</li>
        <li><code>POST /api/licenses</code>: Add a new license record.</li>
      </ul>

      <p>Use Postman or a similar tool to interact with these endpoints. Include the <code>Authorization: Bearer [token]</code> header for protected routes.</p>
    </section>

    <!-- Deployment -->
    <section id="deployment">
      <h2>Deployment</h2>
      <p>Below are suggested steps if you want to deploy to services like Heroku or Render:</p>
      <ol>
        <li><strong>Set up environment variables</strong> (PORT, MONGO_URI, JWT_SECRET, etc.).</li>
        <li><strong>Push your repo</strong> to GitHub or similar.</li>
        <li><strong>Deploy</strong> the backend by connecting your repo to Heroku/Render. Define your env vars in their dashboard.</li>
        <li>For the <strong>frontend</strong>, build with <code>npm run build</code> (if using CRA or Vite) and deploy the static assets to Netlify, Vercel, or Heroku (buildpack).</li>
      </ol>
    </section>

    <!-- Build With -->
    <section id="build-with">
      <h2>Build With</h2>
      <ul>
        <li><strong>NodeJS</strong> – JS runtime environment</li>
        <li><strong>Express</strong> – Web framework for Node</li>
        <li><strong>MongoDB &amp; Mongoose</strong> – Database &amp; ODM</li>
        <li><strong>React &amp; Redux</strong> – Frontend library &amp; state management</li>
        <li><strong>Multer</strong> – File uploading middleware (for avatars)</li>
        <li><strong>JWT</strong> – Authentication tokens</li>
      </ul>
    </section>

    <!-- To-do -->
    <section id="to-do">
      <h2>To-do</h2>
      <ul>
        <li>Implement license renewal notifications via email</li>
        <li>Role-based access control for admin vs. regular users</li>
        <li>Advanced reporting &amp; analytics on device usage</li>
        <li>Add searching &amp; filtering for employees and devices</li>
      </ul>
    </section>

    <!-- Installation -->
    <section id="installation">
      <h2>Installation</h2>
      <ol>
        <li><strong>Clone</strong> the repo:
          <pre><code>git clone https://github.com/your-username/inventory-management-system.git
cd inventory-management-system
</code></pre>
        </li>
        <li><strong>Backend setup</strong>:
          <pre><code>cd src/backend
npm install
npm run dev
</code></pre>
        </li>
        <li><strong>Frontend setup</strong>:
          <pre><code>cd ../../frontend
npm install
npm run dev
</code></pre>
        </li>
        <li>Open <strong>http://localhost:5173</strong> to access the frontend.</li>
      </ol>
      <p>
        Be sure to create a <code>.env</code> file in <code>src/backend</code> with your environment variables (e.g. MONGO_URI, JWT_SECRET, etc.).
      </p>
    </section>

    <!-- Known Bugs -->
    <section id="known-bugs">
      <h2>Known Bugs</h2>
      <ul>
        <li>Avatar preview might not refresh immediately if caching is too aggressive.</li>
        <li>Some older devices might appear in the UI without updated statuses (need manual refresh).</li>
      </ul>
      <p>If you encounter additional issues, please open an issue or PR on GitHub!</p>
    </section>

    <!-- Future Updates -->
    <section id="future-updates">
      <h2>Future Updates</h2>
      <ul>
        <li>PWA support for offline usage</li>
        <li>Two-factor authentication</li>
        <li>Integration with other HR/financial systems</li>
      </ul>
    </section>

    <!-- Acknowledgement -->
    <section id="acknowledgement">
      <h2>Acknowledgement</h2>
      <p>Special thanks to all contributors and the Node/React communities for their wonderful libraries and documentation!</p>
    </section>

    <!-- License -->
    <section id="license">
      <h2>License</h2>
      <p>This project is open-sourced under the <strong>MIT License</strong>.</p>
    </section>

    <footer>
      <p>© 2023 Inventory Management System</p>
    </footer>
  </div>
</body>
</html>

