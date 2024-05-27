## URL Extension

Built an extension to copy URL

1. used Firebase database to store urls
2. real-time updates in Next.js app when new URLs are added using listener for changes in the Firestore collection.
3. copy to clipboard functionality for copying saved URLs.
4. toast notifications for users.

## Tech stack

Let's keep it simple

1. Next for Frontend
2. Node.js for Backend
3. Typescript in Next app.
4. Firestore as database
5. urlExtension for extension logic

## Setting it up locally

- Clone the repo
- Start urlExtension
  - open chrome manage extensions
  - switch on developer mode
  - load unpacked and select urlExtension folder
- Start Backend
  - cd backend
  - npm i
  - npm run dev
- Start frontend
  - cd frontend
  - npm i
  - npm run dev
