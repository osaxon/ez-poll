# Starter template for Node.JS

This is a starter template for building web applications using Node.js, TypeScript, Express, Postgres.

## Features

- 🏃 **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine, designed for building scalable network applications.

- 🥽 **TypeScript:** A superset of JavaScript that adds static typing, enabling a more robust development experience and improved code quality.

- 🍔 **Express:** A fast, unopinionated, minimalist web framework for Node.js, designed for building web and mobile applications.

- 🌦️ **Drizzle ORM:** A lightweight ORM library for Node.js, providing a convenient way to interact with Postgres databases.

- 🤡 **Jest and Supertest:** Jest is a JavaScript testing framework with a focus on simplicity. Supertest is a library for testing HTTP assertions with Jest.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-project.git
   cd your-project
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure the Database:**

   Create a `.env` file in the project root and update with the following:

   ```.env
    NODE_ENV=development
    PORT=3000
    CONNECTION_STRING=postgres://{user}:{pass}@{host}:{port}/{database}
    SESSION_SECRET=TEMP_SECRET
    TEST_USER_PASSWORD=password123
   ```

4. **Run Migrations:**

   Run the database migrations to set up the initial schema.

   ```bash
   npm run migrations
   ```

5. **Start the Development Server:**

   ```bash
   npm run dev
   ```

   The server will be running at `http://localhost:3000`.

6. **Create a Test user in the DB:**

This can be done manually with a SQL statement or in admin console like pgAdmin, or you can make a POST request to the /user endpoint. To do that, first remove the auth middleware on the createUser route:

`userRouter.ts:`

```js
// remove the isAuthenticated middleware to create a test user via REST call
userRouter.post(UserRoutes.ROOT, isAuthenticated([Role.Admin]), createUser);
```

The request body should be:

```json
{
 "email": "email@",
 "password": "password123",
 "role": "admin" // defaults to "user"
}
```

Update the `TEST_USER_PASSWORD` environment variable with the password set for the new user.

## Scripts

- `npm run dev`: Start the development server with automatic reload on code changes.

- `npm run start`: Start the production server.

- `npm run test`: Run Jest tests.

- `npm run db-studio`: Start the Drizzle Kit studio.

- `npm run migrations`: Run database migrations.

## Project Structure

```
your-project/
|-- src/
|   |-- controllers/       # Express route controllers
|   |-- db/                # Database configuration and migrations
|   |-- middleware/        # Express middleware
|   |-- routes/            # Express routes
|   |-- app.ts             # Express app setup
|-- tests/                 # Jest test files
|-- .babelrc               # Babel configuration (for Jest)
|-- .eslintrc.json         # ESLint configuration
|-- jest.config.js         # Jest configuration
|-- package.json           # Project dependencies and scripts
|-- tsconfig.json          # TypeScript configuration
|-- README.md              # Project documentation
```

## Testing

Jest and Supertest are used for testing. Write your tests in the `tests` directory and run them with `npm run test`.

```bash
npm run test
```

## Contributing

Feel free to contribute to this starter template. Create issues, fork the repository, and submit pull requests. Your feedback and contributions are highly appreciated!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
