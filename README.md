# Welcome to the Mind App!

<!--toc:start-->

- [Welcome to the Mind App!](#welcome-to-the-mind-app)
  - [Features](#features)
  - [Component Structure](#component-structure)
  - [Custom Hooks](#custom-hooks)
  - [Utility Functions](#utility-functions)
  - [Styling](#styling)
  - [Security](#security)
  - [API Integration](#api-integration)
  - [Deployment](#deployment)
  - [Future Enhancements](#future-enhancements)
  - [Contributing](#contributing)
  - [License](#license)
  <!--toc:end-->

This app tracks your thoughts and reflections.

## Features

1. Sign up by setting a username and PIN
2. Log in using your PIN
3. select an emotion and add a comment if you prefer
4. View your all your past emotions
5. You can change your username and PIN or export data from the Settings page

## Component Structure

- `App.jsx`: Handles handling routing and authentication
- `Home.jsx`: Home page with emotion logging functionality
- `History.jsx`: Displays all past entries
- `Settings.jsx`: User settings and data export
- `Navigation.jsx`: Navigation bar component
- `EmotionLogger.jsx`: Component for logging emotions
- `EntryList.jsx`: Displays list of entries
- `WeatherInfo.jsx`: Displays current weather information
- `PinEntry.jsx`: PIN entry component for authentication
- `PinSetup.jsx`: Initial PIN and username setup component

## Custom Hooks

- `useLocalStorage`: Custom hook for persistent state storage
- `useEncryption`: Custom hook for data encryption and decryption

## Utility Functions

- `auth.js`: Functions for authentication and session management
- `weather.js`: Functions for fetching and processing weather data
- `encryption.js`: Utility functions for encryption and decryption

## Styling

The app uses TailwindCSS with a custom colorscheme, Catppuccin Latte theme. The design is responsive and provides a clean, modern user interface. Also, uses DM Sans as main font.

## Security

- All sensitive data is encrypted before storage using AES encryption
- PIN-based authentication for accessing the app
- Session expiration after 15 minutes of inactivity

## API Integration

The app integrates with the Open-Meteo API to fetch real-time weather data based on the user's location. That way I won't need to use an API key :)

## Deployment

The app can be deployed to GitHub Pages. Follow these steps:

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add homepage and deploy scripts to package.json
3. Run `npm run deploy`

For detailed deployment instructions, refer to the [Deployment](#deployment) section.

## Future Enhancements

- Mood trends analysis like graphs and stuff
- Multiple user profiles
- Login functionality
- Cloud sync functionality
- Dark mode option

## License

This project is licensed under the MIT License.
