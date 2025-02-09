class DashboardPage{
    private readonly userProfileLink: string = '[class*="profile"]';
    private readonly logoutButton: string = 'li.logout button';

    logOut() {
        cy.get(this.userProfileLink).click();
        cy.get(this.logoutButton).click();
    }

    getUserProfileTitle(): Cypress.Chainable<string>{
        return cy.get(this.userProfileLink).invoke('attr', 'title');
    }
}

export default new DashboardPage();