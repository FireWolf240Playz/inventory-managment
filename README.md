<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Inventory Management System – README</title>
  <style>
    /* Basic Reset */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      background: #f3f3f3;
      color: #333;
      line-height: 1.6;
    }

    header {
      background: #4b0082;
      color: #fff;
      padding: 2rem;
      text-align: center;
    }

    header h1 {
      margin-bottom: 1rem;
    }

    header p {
      font-size: 1.2rem;
      opacity: 0.9;
    }

    main {
      max-width: 960px;
      margin: 2rem auto;
      padding: 1rem;
      background: #fff;
      border-radius: 0.5rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    nav {
      margin-bottom: 2rem;
    }

    nav ul {
      list-style-type: none;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    nav li {
      background: #ececec;
      border-radius: 0.3rem;
    }

    nav a {
      display: block;
      padding: 0.5rem 1rem;
      text-decoration: none;
      color: #4b0082;
      font-weight: bold;
    }

    nav a:hover {
      background: #4b0082;
      color: #fff;
    }

    section {
      margin-bottom: 2rem;
    }

    section h2 {
      border-bottom: 2px solid #4b0082;
      padding-bottom: 0.3rem;
      margin-bottom: 1rem;
    }

    ul, ol {
      margin-left: 2rem;
      margin-bottom: 1rem;
    }

    code, pre {
      background: #f5f5f5;
      font-family: 'Courier New', Courier, monospace;
    }

    pre {
      padding: 1rem;
      border-radius: 0.3rem;
      overflow: auto;
      margin-bottom: 1rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1rem;
    }

    table th, table td {
      border: 1px solid #ccc;
      padding: 0.5rem 1rem;
      text-align: left;
    }

    table th {
      background: #f0f0f0;
    }

    footer {
      text-align: center;
      color: #999;
      margin-top: 3rem;
      margin-bottom: 1rem;
    }
  </style>
</head>
<body>

<header>
  <h1>Inventory Management System</h1>
  <p>A comprehensive system to manage devices, employees, licenses, and authentication.</p>
</header>

<main>
  <!-- Table of Contents -->
  <nav>
    <ul>
      <li><a href="#features">Features</a></li>
      <li><a href="#tech-stack">Tech Stack</a></li>
      <li><a href="#project-structure">Project Structure</a></li>
      <li><a href="#getting-started">Getting Started</a></li>
      <li><a href="#api-endpoints">API Endpoints</a></li>
      <li><a href="#avatar-upload">Avatar Upload</a></li>
      <li><a href="#contributing">Contributing</a></li>
      <li><a href="#license">License</a></li>
    </ul>
  </nav>

  <!-- Features -->
  <section id="features">
    <h2>Features</h2>
    <ul>
      <li><strong>Authentication &amp; Authorization:</strong> Secure login/logout with JWT.</li>
      <li><strong>User Profile Management:</strong> Update personal info and avatar.</li>
      <li><strong>Devices Management:</strong> Create, read, update, and delete devices.</li>
      <li><strong>Employees Management:</strong> CRUD for employee records.</li>
      <li><strong>Licenses Management:</strong> Track software licenses, keys, and expiries.</li>
      <li><strong>Responsive Frontend:</strong> Built with React, Redux (or React Query), and styled components or CSS.</li>
    </ul>
  </section>

  <!-- Tech Stack -->
  <section id="tech-stack">
    <h2>Tech Stack</h2>
    <p><strong>Backend:</strong> Node.js, Express, MongoDB, Multer (for file uploads), JWT for auth, CORS for cross-origin support.</p>
    <p><strong>Frontend:</strong> React, Redux Toolkit, TypeScript (optional), react-hook-form or react-query, Styled Components or plain CSS.</p>
    <p><strong>Other:</strong> ESLint, Prettier (code formatting), Jest/React Testing Library (optional tests).</p>
  </section>

  <!-- Project Structure -->
  <section id="project-structure">
    <h2>Project Structure</h2>
    <pre><code>inventory-management-system/
 ├─ src/
 │   └─ backend/
 │       ├─ src/
 │       │   ├─ config/
 │       │   ├─ controllers/
 │       │   ├─ models/
 │       │   ├─ routes/
 │       │   ├─ utils/
 │       │   └─ index.ts
 │       └─ package.json
 ├─ frontend/
 │   ├─ src/
 │   │   ├─ pages/
 │   │   ├─ store/
 │   │   ├─ components/
 │   │   └─ App.tsx
 │   └─ package.json
 ├─ .env.example
 └─ README.md
</code></pre>
  </section>

  <!-- Getting Started -->
  <section id="getting-started">
    <h2>Getting Started</h2>
    <h3>Prerequisites</h3>
    <ul>
      <li>Node.js v14+ (or higher)</li>
      <li>npm or yarn</li>
      <li>MongoDB (local or remote)</li>
    </ul>

    <h3>Installation</h3>
    <ol>
      <li>
        <strong>Clone the Repo:</strong>
        <pre><code>git clone https://github.com/your-username/inventory-management-system.git
cd inventory-management-system
</code></pre>
      </li>
      <li>
        <strong>Backend Setup:</strong>
        <pre><code>cd src/backend
npm install
</code></pre>
      </li>
      <li>
        <strong>Frontend Setup:</strong>
        <pre><code>cd ../../frontend
npm install
</code></pre>
      </li>
    </ol>

    <h3>Environment Variables</h3>
    <ul>
      <li>Create a <code>.env</code> file in <code>src/backend</code>, based on <code>.env.example</code>.</li>
      <li>Provide:
        <pre><code>PORT=8000
MONGO_URI=mongodb://localhost:27017/inventoryDB
JWT_SECRET=your_jwt_secret_here
</code></pre>
      </li>
    </ul>

    <h3>Running the App</h3>
    <ol>
      <li><strong>Start Backend</strong>: 
        <pre><code>cd src/backend
npm run dev
</code></pre>
        This runs the Express server at <code>http://localhost:8000</code>.
      </li>
      <li><strong>Start Frontend</strong>:
        <pre><code>cd ../../frontend
npm run dev
</code></pre>
        The React app runs at <code>http://localhost:5173</code> by default.
      </li>
      <li>
        Visit <code>http://localhost:5173</code> in your browser.
      </li>
    </ol>
  </section>

  <!-- API Endpoints -->
  <section id="api-endpoints">
    <h2>API Endpoints</h2>

    <h3>Authentication Routes</h3>
    <table>
      <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
      <tr><td>POST</td><td><code>/api/auth/register</code></td><td>Register a new user</td></tr>
      <tr><td>POST</td><td><code>/api/auth/login</code></td><td>Login and receive JWT token</td></tr>
    </table>

    <h3>User Routes</h3>
    <table>
      <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
      <tr><td>PATCH</td><td><code>/api/users/account</code></td><td>Update user profile &amp; avatar</td></tr>
      <tr><td>GET</td><td><code>/api/users</code></td><td>(Admin) Get all users</td></tr>
    </table>

    <h3>Devices Routes</h3>
    <table>
      <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
      <tr><td>GET</td><td><code>/api/devices</code></td><td>Get all devices</td></tr>
      <tr><td>POST</td><td><code>/api/devices</code></td><td>Create a new device</td></tr>
      <tr><td>GET</td><td><code>/api/devices/:id</code></td><td>Get a single device by ID</td></tr>
      <tr><td>PATCH</td><td><code>/api/devices/:id</code></td><td>Update a device</td></tr>
      <tr><td>DELETE</td><td><code>/api/devices/:id</code></td><td>Delete a device</td></tr>
    </table>

    <h3>Employees Routes</h3>
    <table>
      <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
      <tr><td>GET</td><td><code>/api/employees</code></td><td>Get all employees</td></tr>
      <tr><td>POST</td><td><code>/api/employees</code></td><td>Create a new employee</td></tr>
      <tr><td>GET</td><td><code>/api/employees/:id</code></td><td>Get a single employee by ID</td></tr>
      <tr><td>PATCH</td><td><code>/api/employees/:id</code></td><td>Update an employee</td></tr>
      <tr><td>DELETE</td><td><code>/api/employees/:id</code></td><td>Delete an employee</td></tr>
    </table>

    <h3>Licenses Routes</h3>
    <table>
      <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
      <tr><td>GET</td><td><code>/api/licenses</code></td><td>Get all software licenses</td></tr>
      <tr><td>POST</td><td><code>/api/licenses</code></td><td>Create a new license</td></tr>
      <tr><td>GET</td><td><code>/api/licenses/:id</code></td><td>Get a single license by ID</td></tr>
      <tr><td>PATCH</td><td><code>/api/licenses/:id</code></td><td>Update a license</td></tr>
      <tr><td>DELETE</td><td><code>/api/licenses/:id</code></td><td>Delete a license</td></tr>
    </table>
  </section>

  <!-- Avatar Upload -->
  <section id="avatar-upload">
    <h2>Avatar Upload &amp; Serving Static Files</h2>
    <ul>
      <li><strong>Upload:</strong> Send a <code>multipart/form-data</code> request (PATCH) to <code>/api/users/account</code> with <code>avatar</code> field.</li>
      <li><strong>Storage:</strong> Multer writes images to <code>src/backend/src/uploads/avatars</code>.</li>
      <li><strong>Static Serving:</strong> Express exposes them at <code>http://localhost:8000/uploads/avatars/&lt;filename&gt;</code>.</li>
      <li><strong>Frontend:</strong> Reference <code>&lt;img src="http://localhost:8000/uploads/avatars/&lt;file&gt;" /&gt;</code> in the UI.</li>
    </ul>
  </section>

  <!-- Contributing -->
  <section id="contributing">
    <h2>Contributing</h2>
    <ol>
      <li>Fork the repository.</li>
      <li>Create a new branch for your feature or fix.</li>
      <li>Commit changes with clear messages.</li>
      <li>Submit a pull request against the main repo.</li>
    </ol>
    <p>Your contributions are welcome!</p>
  </section>

  <!-- License -->
  <section id="license">
    <h2>License</h2>
    <p>This project is licensed under the <strong>MIT License</strong>. See the <code>LICENSE</code> file for details.</p>
  </section>
</main>

<footer>
  <p>© 2023 Inventory Management System</p>
</footer>

</body>
</html>
