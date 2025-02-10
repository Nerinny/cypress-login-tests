# Cypress login tests
Login tests in Cypress.

## Running solution in GH
- GH Actions pipeline is available in Actions tab of repository, it runs docker container and for debugging generates screenshots on failures which are available in run artifacts. Login credentials are saved as GH secrets.

NOTE: currently a few tests fail in pipeline, because of re-running it a lot of times with wrong password before - they fail on captcha step when they should login successfully. Local run and local docker run are successful.

## Running solution locally
- Clone respository locally
- Set environment variables with your login data:
```
CYPRESS_user=<your_login_here>
CYPRESS_password=<your_password_here>
CYPRESS_fullname=<Name Surname>
```
NOTE: you need to escape special characters with '\\' for example 'password\\$' if password is 'password$'

- OR add them to the existing **fixtures/loginData.json** file:
```json
{
    "user": "your_email_here",
    "password": "your_password_here",
    "fullname": "Name Surname",
}
```
- Build docker image:
```
docker build . -f Dockerfile -t cypresstest:latest 
```
- Run docker, set variables and map screenshots volume to access them locally:
```
docker run --rm -e CYPRESS_user="$CYPRESS_user" -e CYPRESS_password="$CYPRESS_password" -e CYPRESS_fullname="$CYPRESS_fullname" -v ./screenshots:/e2e/cypress/screenshots cypresstest:latest
```

## Structure of solution
- **cypress/e2e/TestLogin.cy.ts** - cypress tests for login  
- **cypress/fixtures/loginData.json** - test data for login and place for credentials for local debug  
- **cypress/pages/Dashboard.ts** and **cypress/pages/Login.ts** - page object models for login and dashboard pages
- **tsconfig.json** - configuration for typescript support
- **cypress.config.ts** - cypress configuration
- **Dockerfile** - commands to create docker container
- **package.json** - dependencies

## Test scenarios
### Feature: Login functionality
Scenario: Successful login lands on dashboard page  
GIVEN user is on login page  
WHEN user enters correct login and password  
THEN user lands on dashboard page

Scenario: After successful login user can see their proper name on dashboard  
GIVEN user is on login page  
WHEN user enters correct login and password  
THEN user sees proper name on dashboard

Scenario: After successful login user can log out and land on login page  
GIVEN user is on login page  
WHEN user enters correct login and password  
THEN user user can log out and land on login page

Scenario: After log out user can see correct log out messages  
GIVEN user is on login page  
WHEN user enters correct login and password  
THEN user user can log out and see correct log out messages on page

Scenario: After entering incorrect credentials user is on log in with error or verify page  
GIVEN user is on login page  
WHEN user enters incorrect login information and tries to log in  
THEN user is still on login page or verify page

Scenario: After entering incorrect credentials user sees error messages  
GIVEN user is on login page  
WHEN user enters incorrect login information and tries to log in  
THEN user can see error messages or verify page

Scenario: User leaving emtpy fields and logging in lands on login page  
GIVEN user is on login page  
WHEN user leaves fields empty and tries to log in  
THEN user is still on login page  

### Not automated, but other possible test cases:
- When user goes back in browser after logging in they are still logged in
- Mock and emulate error when server doesn't respond and check behaviour
- Emulate slow server response - loading screen test
- Test reset password
- Check translation of different languages of login page
- Check all possible sizes with cypress viewport options and if all elements are visible
- Visual test with cypress plugin for visual testing if UI stays consistent
- Accessibility - navigating with tab
- Login on multiple devices
- Navigating message popups - closing them, triggering multiple times
