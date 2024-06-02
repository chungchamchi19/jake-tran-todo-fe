# Introduction

Todo List Application

- You are required to develop a simple Todo List application using ReactJS. 
- The application should allow users to add, edit, and delete tasks. 
- Additionally, users should be able to mark tasks as completed or pending.

## Setup

### Copy env

```
cp .env.example .env
```

### Install dependency

```
yarn
```

### Start application in development mode

```
yarn dev
```

### Build

```
yarn build
```

### Preview application in production mode

```
yarn preview
```

## Project Structure

The project follows a modular pattern, with the following structure:

- `src/`
  - `api/`: Contains api to save data to local storage.
  - `assets/`: Contains asset files such as icons.
  - `components/`: Contains reusable React components.
  - `configs/`: Contains some configurations.
  - `contexts/`: Contains contexts of application to store global data.
  - `hooks/`: Contains some reusable hooks.
  - `modules/`: Contains modules of the application such as header, todo-list, filter,... In each module, there are smaller modules inside.
  - `types/`: Contains type of the data.
  - `utils/`: Contains reusable functions.

- `public/`: Contains static assets such as images and fonts.

- `package.json`: Contains the project dependencies and scripts.

- `yarn.lock`: Lock file generated by Yarn to ensure consistent dependency versions.

- `README.md`: This file, providing an overview of the project and instructions for setup and usage.