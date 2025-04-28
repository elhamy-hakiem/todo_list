
# ToDo List App Project

This is a ToDo app built using React and TypeScript. It allows users to manage tasks, mark them as complete, edit task titles, and add custom images to the todo list header. The app also supports drag-and-drop functionality for sorting tasks. Additionally, it provides a login/logout system with a "Remember Me" feature for user sessions.

The app stores tasks and user data in the browser's **localStorage** for persistence across sessions.

---

## How to Run the Client-Side App

### Prerequisites

Make sure you have the following installed on your machine:
- Node.js (version >= 14)
- npm (or Yarn)

You can verify if you have Node.js installed by running the following command in your terminal:
```bash
node -v
```

### Steps to Run

1. **Download the project from the provided Google Drive link.**
   
2. **Once downloaded, extract the ZIP file to your desired location on your local machine.**:
   ```bash
   cd <project-folder>
   ```

3. **Install dependencies**:
   Run the following command to install the required dependencies:
   ```bash
   npm install
   ```

4. **Run the application**:
   After installing dependencies, run the application using:
   ```bash
   npm run dev
   ```

   The app should now be running .

---

## Features

- **Add Tasks**: Add tasks to your todo list.
- **Edit Tasks**: Edit the title of an existing task.
- **Mark as Complete**: Mark tasks as completed by clicking the check icon.
- **Drag-and-Drop**: Reorder tasks by dragging and dropping them.
- **Image Upload**: Upload an image to set as the cover for the todo list.
- **Progress Tracking**: Displays the percentage of tasks completed.
- **Login/Logout**: Users can log in and out, with their session persisted using **localStorage**.
- **Remember Me**: Users can select the "Remember Me" option to stay logged in between sessions.

---

## Project Setup

### Frontend (Client-side)
The frontend of the application is built with React and TypeScript. It uses the following libraries:

- **React.js**: For building the UI.

- **TypeScript**: For static type checking.

T- **ailwind CSS**: For styling and responsive design.

- **@dnd-kit**: For drag-and-drop functionality.

- **React Router**: For handling navigation between different pages.

- **Context API**: For managing application state.

- **Formik**: For handling form management.

- **Yup**: For form validation.

- **LocalStorage**: For storing data and ensuring persistence across sessions.

### Data Persistence (localStorage)
The app stores tasks and user information (including login status) in the browser's **localStorage**. This allows the app to persist tasks and user sessions between page reloads. When users log in, their session will be remembered if the "Remember Me" option is selected.

---

## Deployment

You can deploy the frontend to a platform like **Vercel** or **Netlify**.

### To deploy on **Vercel**:
1. Create an account on [Vercel](https://vercel.com).
2. Connect your GitHub repository to Vercel.
3. Choose the project and deploy it.

### To deploy on **Netlify**:
1. Create an account on [Netlify](https://netlify.com).
2. Connect your GitHub repository to Netlify.
3. Click "Deploy Site" and follow the instructions.

---

## Notes

- **Image Handling**: The app allows users to upload an image as the cover for their todo list. The image is stored in **localStorage**, so it is persisted as long as the user does not clear their browser data.
  
- **Drag-and-Drop**: The task list supports drag-and-drop to reorder tasks using the **@dnd-kit** library.

- **Responsive Design**: The app is designed to be mobile-friendly, and the file upload input and other elements adapt to different screen sizes.

- **Login/Logout & Remember Me**: The app includes a login system. When a user logs in, their session is saved in **localStorage**. If the "Remember Me" checkbox is selected, the app will remember the user's login status even after the browser is closed and reopened.

---

## Troubleshooting

If you encounter any issues while running the app:

1. **Ensure Node.js and npm are correctly installed**:
   - Run `node -v` and `npm -v` to check their versions.
   - Install or update Node.js from [nodejs.org](https://nodejs.org/).

2. **Check the browser console for errors**:
   - If something isn't working as expected, open the browser console to see any error messages that may help with debugging.
   - For example, if there is an issue with localStorage, the console will often show an error related to saving or retrieving data.

3. **Reinstall dependencies**:
   - If you suspect an issue with the packages, try deleting the `node_modules` folder and then running `npm install` again:
   ```bash
   rm -rf node_modules
   npm install
   ```

4. **Check for version mismatches**:
   - Sometimes, a version mismatch in dependencies can cause issues. Ensure the versions of the installed packages match the versions expected by the app.
