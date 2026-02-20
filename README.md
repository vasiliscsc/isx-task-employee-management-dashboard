# Vasilis Nicolaou - iSX Employee Dashboard Home Assignment

This repository contains my submission for the home assignment provided by iSX Financial as part of the assessment process for the Senior Frontend Engineer role.

---

## Setup instructions

- Install the node modules by running the following command at the root of the project;

  ```
  npm install
  ```

- Create a `.env.local` file at the root of the project (next to `.env.example`) and copy the contents of `.env.example` to `.env.local`.

## How to run the app

Start the Next.js development server:

```
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

## How to run mock API

This project uses json-server as a mock backend.

Start the API server with:

```
npm run api
```

The mock API runs at:

```
http://localhost:3001
```

## Notes & Technical Decisions

- **MUI version ^6** was chosen for this submission. To that end, I used **Next.js version ^15** as latest stable (version ^16) is not supported by MUI version ^6.
- **json-server** was chosen as the mock api backend.
- **Mock data** generated using https://www.mockaroo.com/.
- **Employee Deletion**.

  This demo performs a hard delete (DELETE /employees/:id) due to the constraints of using a mock backend.

  In a production environment, deletion would typically be implemented as a soft delete. This would include fields such as:
  - isDeleted
  - deletedAt
  - deletedBy

  Soft deletes preserve referential integrity, logs & audit integrity, support debugging, and allow reverting accidental deletions etc.
