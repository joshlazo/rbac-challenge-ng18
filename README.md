# RbacChallenge

This project was created with [Angular CLI](https://github.com/angular/angular-cli) version 18 and Node.js v20.

## Development Server

Run `npm install` to install dependencies. Then, run `npm start` to start the development server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).  
**Note**: Tests are not fully functional yet as the project is still under active development.

## Competencies

### Required Features

#### User Authentication:
- Implement a login system using the Reqres API.
- The system should handle both authentication and authorization, differentiating between a super admin and a regular user.
- Upon login, the role should be assigned correctly, and users should be redirected to their respective dashboards (see role descriptions below).

#### Dashboard:
- **Super Admin**:
  - View the full list of users.
  - View user details.
  - Delete users. Only the super admin can delete users.
  
- **Regular User**:
  - View a list of resources (e.g., products, accounts) fetched from the API. The API will return a list of Pantone colors, but you can treat them as resources.
  - Perform CRUD operations on these resources (create, update, delete).

#### Routing and Navigation:
- Use Angular routing to create different views:
  - Login.
  - Super Admin Dashboard.
  - User Dashboard.
  - User Details.
  - Resource Management in User Dashboard.

#### Forms:
- Use Reactive Forms (`ReactiveFormsModule`) for the login form and resource management (create and edit resources).
- Forms should include proper validations (e.g., email validation for login, field validations for resource creation).

#### Styling:
- The UI should be responsive and visually appealing. Design matters, so attention to detail is valued.
- Use SCSS for styling. You can use a component library (Angular Material, Nebular) or write custom styles.
- Include UI elements such as buttons, forms, tables, and notifications for CRUD actions.

#### Data Management and RxJS:
- Use Angular services to handle HTTP requests and manage state using RxJS (Observable, Subject).

#### Error Handling:
- Implement robust error handling for server failures (4xx/5xx errors). Ensure the user is notified with appropriate error messages when an API request fails (e.g., login error or data fetching error).

#### Unit Testing:
- Implement basic unit tests for key services and components, covering both successful and error scenarios (e.g., login, user retrieval, and resource management).

### Technical Requirements:
- The project must be built using Angular (v10+).
- Use RxJS for handling asynchronous data and HTTP requests.
- The application must integrate with the Reqres API (API endpoints provided below).
- The project structure should follow best practices and be modular.
- Use Reactive Forms for form handling and include proper validations.
- Authentication should use a token-based approach, managing authorization for different roles.
- Implement robust error handling, displaying messages to the user if an operation fails.