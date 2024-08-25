# TourTix

## Directory Structure

The project follows this directory structure:
```
│   .gitignore
│   index.js
│   package-lock.json
│   package.json
├───config
│       constants.js
├───database
│       connect.db.js
├───middleware
│       bypass.middleware.js
├───routes
│       auth.routes.js
└───utils
        authUtils.js
```


### File Descriptions

- **`.env`**: Contains environment variables used in the project. Ensure this file is added to `.gitignore` to keep sensitive information secure.
- **`.gitignore`**: Specifies files and directories that should be ignored by Git.
- **`index.js`**: Entry point of the application. It typically initializes and starts the server.
- **`package-lock.json`**: Contains the exact version of dependencies installed for consistent installs.
- **`package.json`**: Manages project dependencies, scripts, and metadata.

#### Directories

- **`config/`**: Contains configuration files for the project.
  - **`constants.js`**: Defines constant values used throughout the application.
- **`database/`**: Contains database connection files.
  - **`connect.db.js`**: Manages database connection logic.
- **`middleware/`**: Contains middleware functions used in the application.
  - **`bypass.middleware.js`**: A middleware that does nothing and simply passes the request to the next middleware.
- **`routes/`**: Contains route definitions.
  - **`auth.routes.js`**: Manages authentication-related routes.
- **`utils/`**: Contains utility functions.
  - **`authUtils.js`**: Provides functions for authentication, such as generating and verifying JWT tokens, and hashing passwords.

## Environment Variables

The project uses environment variables defined in the `.env` file. Here are the keys used:

- **`PORT`**: The port on which the server runs. Default is `8080`.
- **`SALT_ROUNDS`**: Number of salt rounds for hashing passwords. Default is `15`.
- **`JWT_SECRET`**: The secret key for signing and verifying JSON Web Tokens (JWTs). Example: `HelloWorld`.
- **`MONGO_URI`**: The URI for connecting to the MongoDB database. Example: `mongodb://127.0.0.1:27017/tourtix?directConnection=true`.

### Example `.env` File
