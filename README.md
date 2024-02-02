# GraphQl-Z01

This project is designed to help you learn the GraphQL query language by creating your own profile page. You will interact with the GraphQL endpoint provided by the platform (`https://domain/api/graphql-engine/v1/graphql`). The goal is to query and display your school information on a personalized profile page.

## Project Overview

### Features:

1. **Login Page:**
   - Obtain a JSON Web Token (JWT) from the signin endpoint (`https://domain/api/auth/signin`) using Basic authentication.
   - Support login with both username:password and email:password.
   - Display appropriate error messages for invalid credentials.
   - Provide a logout mechanism.

2. **Profile Page:**
   - Query and display user information, such as basic identification, XP amount, grades, audits, and skills.
   - Include a statistic section with at least two SVG-based graphs showcasing your journey and achievements.
   - Choose from various data combinations for graph creation, such as XP earned over time, XP earned by project, audit ratio, and more.
   - Implement good UI/UX principles for an intuitive user interface design.

### GraphQL Queries Examples:

```graphql
# Query user information
{
  user {
    id
    login
    xp
    grades
    audits
    skills
  }
}

# Query progress information
{
  progress {
    id
    userId
    objectId
    grade
    createdAt
    updatedAt
    path
  }
}

# Query result information with nested user details
{
  result {
    id
    user {
      id
      login
    }
  }
}
```

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/soum-dev/GraphQl-Z01.git
   cd GraphQl-Z01
   ```

2. **Install Dependencies:**
   ```bash
   # Install dependencies using your preferred package manager (e.g., npm or yarn)
   npm install
   ```

3. **Configure Environment Variables:**
   - Create a `.env` file and add the necessary environment variables, including the GraphQL endpoint and any authentication details.

4. **Run the Application Locally:**
   ```bash
   # Start the development server
   npm start
   ```

5. **Explore GraphQL Schema:**
   - Access GraphiQL to explore the GraphQL schema and understand available query parameters.

## Hosting

Choose a hosting platform for your profile, such as GitHub Pages, Netlify, or others. Ensure that your deployment includes the necessary configuration to interact with the GraphQL endpoint securely.

## Learning Objectives

This project provides hands-on experience with the following concepts:

- GraphQL
- GraphiQL
- Hosting
- JWT (JSON Web Token)
- Authentication and Authorization
- Basics of Human-Computer Interface (UI/UX)

Feel free to explore additional GraphQL queries and experiment with different types of SVG graphs to enhance your learning experience. Have fun building your personalized profile page!
