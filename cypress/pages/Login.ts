class LoginPage {
    private readonly usernameInput: string = '#inputEmail';
    private readonly passwordInput: string = '#inputPassword';
    private readonly loginButton: string = '[class*="login-btn"]';
    private readonly lostPasswordLink: string = '.lost-password';

    private readonly notification: string = '.notification';
    private readonly notificationCloseButton: string = '.notification .cancel';

    private readonly messageBox: string = '.cbox_messagebox'

    private readonly languageButton: string = '#languageSwitch'
    private readonly supportButton: string = '#custom-support-form-button'
    private readonly cookiesButton: string = '#cookie-preferences-button'

    private readonly securityCheckHeader: string = ".login-container h1"

    visit() {
        cy.visit("/login");
    }

    // #region login functionality

    enterUsername(username: string) {
        cy.get(this.usernameInput).clear().type(username);
    }

    enterPassword(password: string) {
        cy.get(this.passwordInput).clear().type(password);
    }

    clickLoginButton(){
        cy.get(this.loginButton).click();
    }

    login(username: string, password: string) {
        this.enterUsername(username);
        this.enterPassword(password);
        this.clickLoginButton();
    }

    // #endregion

    // lost password link
    clickLostPasswordLink(){
        cy.get(this.lostPasswordLink).click();
    }

    // #region get text and placeholders from elements

    getNotificationText(): Cypress.Chainable<string>{
        return cy.get(this.notification).invoke('text');
    }

    getLoginButtonText(): Cypress.Chainable<string>{
        return cy.get(this.loginButton).invoke('text');
    }

    getLostPasswordLinkText(): Cypress.Chainable<string>{
        return cy.get(this.lostPasswordLink).invoke('text');
    }

    getUsernamePlaceholder(): Cypress.Chainable<string>{
        return cy.get(this.usernameInput).invoke('attr', 'placeholder');
    }

    getPasswordPlaceholder(): Cypress.Chainable<string>{
        return cy.get(this.passwordInput).invoke('attr', 'placeholder');
    }

    getSupportButtonText(): Cypress.Chainable<string>{
        return cy.get(this.supportButton).invoke('text');
    }

    getCookiesButtonText(): Cypress.Chainable<string>{
        return cy.get(this.cookiesButton).invoke('text');
    }

    getLanguageButtonText(): Cypress.Chainable<string>{
        return cy.get(this.languageButton).invoke('text');
    }

    getMessageBoxText(): Cypress.Chainable<string>{
        return cy.get(this.messageBox).invoke('text');
    }

    getSecurityCheckHeaderMessage(): Cypress.Chainable<string>{
        return cy.get(this.securityCheckHeader).invoke('text');
    }

    // #endregion

    closeNotification(){
        cy.get(this.notificationCloseButton).click();
    }

}

export default new LoginPage();