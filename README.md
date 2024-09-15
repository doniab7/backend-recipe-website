## **Project Overview**
The recipe website allows users to create, manage, and interact with meals (recipes). Users can like, comment on, and bookmark meals, as well as follow other users. The backend, developed with **NestJS**, is responsible for handling user authentication, recipe management, notifications, and media uploads. It leverages key NestJS features such as middlewares, guards, validators, and DTOs to ensure a robust and secure API.

## **Key Features**
1. **User Authentication**:
   - Implemented user authentication using **JWT** (JSON Web Tokens).
   - Users can register, log in, and manage their accounts, including profile pictures.
   - **Guards** are used to protect routes that require authentication, ensuring that only authorized users can perform certain actions like creating or modifying meals.

2. **Meal/Recipe and Ingredients Management**:
   - Users can create meals (recipes), define their ingredients, and provide steps for preparation.
   - Each meal contains various properties like duration, region, number of likes, and a list of ingredients.
   - **File Interceptor** is used to handle image uploads for meal pictures and user profile pictures.
   - Ingredients are classified based on measurement types (e.g., kg, ml, piece) and linked to specific meals.

3. **Like, Bookmark, Comment, and Follow Functionalities**:
   - Users can like and comment on meals. Each like or comment is linked to both the user and the meal.
   - Users can bookmark meals for easy access and follow other users to keep track of their meal posts and activities.
   - Relations are set up between users and meals, allowing multiple users to interact with a single meal and vice versa.

4. **Notifications**:
   - The system generates notifications for key events such as when a meal is liked, commented on, or bookmarked, and when a user follows another user.
   - Users also receive notifications when they subscribe to categories or other users.
   - Notifications are handled using **DTOs** to ensure that data is validated before sending it to the frontend.

5. **File Uploads**:
   - **File Interceptor** is implemented to manage the upload of user profile pictures and meal images.
   - Uploaded files are processed and validated to ensure correct formats and sizes, enhancing the overall experience.

6. **Use of Middlewares and Guards**:
   - **Middlewares** are used to handle common tasks such as logging requests and validating session data.
   - **Guards** ensure that only authenticated users can access certain routes, protecting critical parts of the application like meal creation and user-specific data.

7. **Validators and DTOs**:
   - DTOs (Data Transfer Objects) are used extensively to validate incoming data, ensuring that user inputs for meals, comments, likes, and notifications meet predefined criteria.
   - This improves the overall security and stability of the application by preventing malformed or incomplete data from entering the system.

## **Class Diagram and Database Structure**

![diagramme_classe](https://github.com/user-attachments/assets/f71c4444-ac13-4282-95d2-992d16203fbd)

The class diagram outlines the relationships between users, meals, ingredients, and interactions (likes, bookmarks, comments, and follows). Each entity is well-structured, with relations ensuring that a user can interact with multiple meals and follow other users, while meals can have multiple ingredients and steps.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
