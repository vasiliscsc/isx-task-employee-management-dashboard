# Vasilis Nicolaou - iSX Employee Dashboard Home Assignment

This repo was created as a submission to the task given by iSX Financial as part of assessment for the role of Senior Frontend Engineer.

## Setup instructions

- Install the node modules by running the following command at the root of the project;

  ```
  npm install
  ```

- Create a `.env.local` file at the root of the project, next to `.env.example`, and copy the contents of `.env.example` to `.env.local`.

## How to run the app

After completing the Setup instructions, to launch the application, run the following command at the root of the project;

```
npm run dev
```

## How to run mock API

After completing the Setup instructions, to run the mock backend (json-server), run the following command at the root of the project;

```
npm run api
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
