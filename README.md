![image](https://github.com/user-attachments/assets/2a7ec24a-7f1c-49ec-92ea-b425dcc4fbf0)# Getting Started with Create Task Manager React App

Frontend (React with Shopify Polaris) Implementation

1. Setup React Project

npx create-react-app task-manager-frontend  <br> <br>

2. Install Dependencies

npm install @shopify/polaris @shopify/polaris-icons axios react-router-dom

3. Setup Project Structure
   
I add components and pages

TaskList.js, TaskForm.js, Layout.js etc. for components

HomePage.js, CreateTaskPage.js, EditTaskPage.js for pages 

Additional Features Implementation

1. Search/Filter Functionality Add to HomePage.js:

2. Lazy Loading also N Progress bar

Create a lazy-loaded version

3. Error Handling

Create an ErrorBoundary component

Then wrap routes with it in App.js:

4. For Task create, update, delete used polaris toast

5. Add Pagination

6. Form Validation

![Form validation ](https://github.com/user-attachments/assets/72555ed1-b988-4137-9ec8-b7c06cd43b8c)

![Form validation for edit task](https://github.com/user-attachments/assets/c25fbaab-a9a3-461f-98ad-6f3cf924bd95)


7. Keep Create and Update modal same form field

8. Full responsive app

9. For unit testing apply few formula

10. Finally i deploy my front end full project to vercel

Project URL : https://task-manager-frontend-kappa-orcin.vercel.app/



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.





