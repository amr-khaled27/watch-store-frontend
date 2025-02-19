
# Ecommerce Watch Store - Frontend Project

## Overview

This project is a modern ecommerce storefront for a watch store, built using React, TypeScript, and Vite. The application features a sleek design, smooth navigation, and essential ecommerce functionalities like authentication, dark/light mode, custom toast notifications, and a payment gateway powered by Stripe.

----------

## Tech Stack

-   **Frontend Framework**: React
    
-   **Language**: TypeScript
    
-   **Build Tool**: Vite
    
-   **Styling**: TailwindCSS
    
-   **State Management**: React Context API
    
-   **Routing**: React Router
    
-   **Authentication**: Custom JWT-based authentication
    
-   **Payment Gateway**: Stripe
    
-   **Toast Notifications**: React Toastify or custom implementation
    

----------

## Features

### 1.  **Dark/Light Mode**

-   Users can toggle between dark and light themes for a personalized experience.
    
-   Theme preference is saved in local storage for persistence across sessions.
    

### 2.  **Authentication Provider**

-   Secure user authentication using a provider a custom JWT-based solution.
    
-   Features include:
    
    -   User login/signup
                
    -   Protected routes for authenticated users
        

### 3.  **Sleek Design**

-   Modern and responsive UI/UX design.
    
-   Clean and intuitive layout for seamless browsing.
    
-   Mobile-first approach for optimal performance on all devices.
    

### 4.  **Custom Toast Notifications**

-   Customizable toast notifications for user feedback (e.g., success, error).
    
-   Built using `react-toastify`  or a custom implementation.
    

### 5.  **Smooth Navigation**

-   Seamless routing with React Router.
    
-   Dynamic page transitions and lazy loading for improved performance.
    

### 6.  **Payment Gateway with Stripe**

-   Integrated Stripe payment gateway for secure and hassle-free transactions.
    
-   Features include:
    
    -   Add to cart functionality
        
    -   Cart page with order summary
        
    -   Secure payment processing
        


## Installation

0.  Setup the backend: https://github.com/amr-khaled27/watch-store-ecommerce-backend

1.  Clone the repository:
    
    ```bash
    git clone https://github.com/amr-khaled27/watch-store-frontend.git
    ```
    
2.  Navigate to the project directory:

    ``` bash
    cd watch-store
    ```
    
3.  Install dependencies:
    
    ```bash    
    npm install
    ```
    
4.  Start the development server:
    
    ```bash    
    npm run dev
    ```
    
5.  Open the application in your browser:
    

----------

## Configuration

### Environment Variables

Create a  `.env`  file in the root directory and add the following variables:

```env
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_API_URL=http://localhost:8000
```

----------

## Future Enhancements

-   Add product search and filtering functionality.
    
-   Implement user reviews and ratings.
    
-   Integrate a CMS for managing products and content.
    
-   Add support for multiple currencies and languages.
    
