# Password Strength Checker

This is a production-ready Password Strength Checker web app built with React, TypeScript, and Tailwind CSS. It provides real-time feedback on password strength, including an estimated time to crack, entropy calculation, and a secure breach check.

## Features

*   **Real-time Strength Analysis:** Get immediate feedback on your password's strength with a score from 0 to 100.
*   **Entropy and Time-to-Crack:** Understand the true strength of your password with entropy calculation (in bits) and an estimated time to crack under various attacker models.
*   **Secure Breach Check:** Safely check if your password has been exposed in a known data breach using the k-anonymity API from Have I Been Pwned.
*   **Password Generator:** Create strong, random passwords with customizable options for length and character sets.
*   **Password Policy Tester:** Define custom password policies and test if your passwords meet the requirements.
*   **Comparison View:** Compare two passwords side-by-side to see the difference in their strength.
*   **Privacy-Focused:** All calculations are done client-side. No passwords are ever sent to a server.

## Privacy Statement

This application is designed with your privacy in mind. All password strength calculations are performed locally in your browser. The optional breach check uses a k-anonymity model, which means your full password is never sent over the network. Only the first five characters of the SHA-1 hash of your password are sent to the Have I Been Pwned API.

## How to Run Locally

1.  Clone the repository:
    ```bash
    git clone https://github.com/pawan-444/password_checker.git
    ```
2.  Install the dependencies:
    ```bash
    cd password_checker
    npm install
    ```
3.  Start the development server:
    ```bash
    npm start
    ```

## How to Deploy to GitHub Pages

1.  Make sure you have a GitHub repository for your project.
2.  In `package.json`, ensure the `homepage` field is set to `https://<your-username>.github.io/<your-repo-name>`.
3.  Run the deployment script:
    ```bash
    npm run deploy
    ```
    This will create a `gh-pages` branch in your repository and deploy the application to GitHub Pages.

## Screenshots

*Desktop*
![Desktop Screenshot](https://i.imgur.com/your-desktop-screenshot.png)

*Mobile*
![Mobile Screenshot](https://i.imgur.com/your-mobile-screenshot.png)
