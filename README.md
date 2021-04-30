# React Challenge Calendar

The application has a workind Calendar, where the user can select a Country, City, Temperature Scale, Months and up to 10 Years ahead.

    - Selecting a Country the user will be able to add different cities to his reminders;
    - Selecting a City will trigger a call to Open Weather that will return the Weather for the current day;
    - Changin between Temperature scales will allow users to see the temperature on the calendar on it's desired scale;
    - Selecting the Month or Year will change the calendar to show the requested info;
    - Users can create reminders, edit or remove them from the selected month, with the ability to change the City the reminder displays and the date inside the month where the reminder is;

This application requires a .env file with the env variable below to work.

REACT_APP_API_KEY=f9e9df8221ece19ba572d145e5175be0

After creating the .env file with the informed env variable you can run the commands below to run the application;

## How to deploy

 - Run `npm install` | `yarn install` to install all dependencies.
 - Run `npm start`   | `yarn run` to run the app locally.
 - You can find the project running on `localhost:3000`.
