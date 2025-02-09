import LoginPage from "../pages/Login";
import DashboardPage from "../pages/Dashboard";

describe("Test login scenarios - GIVEN user is on login page", () => {
  let user: {
    user: string;
    password: string;
    fullname: string;
    incorrectUser: string;
    incorrectPassword: string;
  };

  before(() => {
    cy.fixture("loginData.json").then((data) => {
      user = data;
      user.user = Cypress.env('user') || data.user;
      user.password = Cypress.env('password') || data.password;
      user.fullname = Cypress.env('fullname') || data.fullname;
    });
  });
  beforeEach(() => {
    cy.setCookie(
      "osano_consentmanager",
      "P3Gu41Uyy12_8aF50nxC0JtSM-ympYs_5SqIcZPohh0lDXeQbn1wAdFjTbIg5bIVaoUbIB6WKChBYQqzOPDdp6E2LZRTwsOiQm9QB9wouojuZbcEH7IEqYnXhuY74V269I37QVHeO1aZk1Nqrlcm4E8PRmid3HRLICG-y5feE-5vCsPyN6D91z_h97dT1H6LDZskgZ25k83jHII_sfQjjJ4A37d02sO9iERoul6frMT62HJBkp_-N-TFiqflN9O6urLt2o0N7kzTMhMSVWl7dZLO2OUarr3ke47CZ0EY6GwhkMkv0L1LjGx22qOmB9rh"
    );
    cy.setCookie(
      "osano_consentmanager_uuid",
      "e65bb869-b27a-4730-97a3-94c644d9d81d"
    );
    LoginPage.visit();
  });

  context("WHEN user enters correct login and password", () => {
    beforeEach(() => {
      LoginPage.enterUsername(user.user);
      LoginPage.enterPassword(user.password);
      LoginPage.clickLoginButton();
    });

    it("THEN user lands on dashboard page", () => {
      cy.url().should("contain", "account/dashboard");
    });

    it("THEN user sees proper name", () => {
      DashboardPage.getUserProfileTitle().should("contain", user.fullname);
    });

    it("THEN user can log out and land on login page", () => {
      DashboardPage.logOut();
      cy.url().should("contain", "login");
    });

    it("THEN user can log out and see correct log out messages on page", () => {
      DashboardPage.logOut();
      LoginPage.getNotificationText().should(
        "contain",
        "You have successfully logged out."
      );
      LoginPage.getMessageBoxText().should(
        "contain",
        "You have successfully logged out."
      );
    });
  });

  context(
    "WHEN user enters icorrect login information and tries to log in",
    () => {
      beforeEach(() => {
        LoginPage.enterUsername(user.incorrectUser);
        LoginPage.enterPassword(user.incorrectPassword);
        LoginPage.clickLoginButton();
      });

      it("THEN user is still on login page or verify page", () => {
        cy.url().then((url) => {
          if (url.includes("verify")) {
            cy.log("User is on the verify page");
            cy.url().should("include", "verify");
          } else {
            cy.log("User is still on the login page with an error");
            cy.url().should("include", "login").and("include", "error");
          }
        });
      });

      it("THEN user can see error messages or verify page", () => {
        cy.url().then((url) => {
          if (url.includes("verify")) {
            LoginPage.getSecurityCheckHeaderMessage().should(
              "contain",
              "Security Check"
            );
          } else {
            LoginPage.getNotificationText().should(
              "contain",
              "You have entered an incorrect username or password."
            );
            LoginPage.getMessageBoxText().should(
              "contain",
              "You have entered an incorrect username or password."
            );
          }
        });
      });
    }
  );

  context("WHEN user leaves fields empty and tries to log in", () => {
    beforeEach(() => {
      LoginPage.clickLoginButton();
    });

    it("THEN user is still on login page", () => {
      cy.url().should("contain", "login");
    });
  });
});
