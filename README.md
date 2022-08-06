# Tyba technical interview

## Importing Postman data
1. Select Import in the left navigation menu.
2. Select your file or folder, input your link, paste your raw text, or import from GitHub. ...
3. Select the files you want to import.
4. Select Import to bring your data into Postman.

## Build and run with Docker Compose
1. From project directory, start up the database by running:
```
docker compose up -d
```
## Set environment variables
the following environment variables must be set in your system configuration:
```
JWT_SECRET
```
```
GOOGLE_MAPS_API_KEY
```
## Running the application locally
Run the app with the following command:
```
npm install
npm start
```
## Running tests locally
```
npm run test
```
