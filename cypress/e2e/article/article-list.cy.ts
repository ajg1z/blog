describe('Пользователь заходит на со списком статей', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/articles');
    });

    it('Проверяем момент загрузки(лоадеры)', () => {
        cy.intercept('GET', '**/articles?*', { fixture: 'articles', delay: 2000 });
        cy.getByTestId('ArticleListItemSkeleton').should('have.length.greaterThan', 3);
    });

    it('Проверяем загруженные статьи', () => {
        cy.intercept('GET', '**/articles?*', { fixture: 'articles' });
        cy.getByTestId('ArticleList');
        cy.getByTestId('ArticleListItem.TILE').should('have.length.greaterThan', 3);
    });

    it('Проверяем поисковик(фильтр)', () => {
        cy.intercept('GET', '**/articles?*', { fixture: 'articles', delay: 2000 });
        cy.getByTestId('ArticlesPageFilters.Search').clear().type('it').should('have.value', 'it');
        cy.getByTestId('ArticleListItemSkeleton').should('have.length.greaterThan', 3);
        cy.getByTestId('ArticleListItem.TILE').should('have.length.greaterThan', 3);
    });

    it('Проверяем табы(фильтр)', () => {
        cy.intercept('GET', '**/articles?*', { fixture: 'articles', delay: 2000 });
        cy.getByTestId('Tab.IT').click({ force: true });
        cy.getByTestId('ArticleListItemSkeleton').should('have.length.greaterThan', 3);
        cy.getByTestId('ArticleListItem.TILE').should('have.length.greaterThan', 3);
    });

    it('Проверяем переключение вида статьи', () => {
        cy.intercept('GET', '**/articles?*', { fixture: 'articles', delay: 2000 });
        cy.getByTestId('ArticlesViewSelector.LIST').click();
        cy.getByTestId('ArticleListItem.LIST').should('have.length.greaterThan', 1);
        cy.getByTestId('ArticlesViewSelector.TILE').click();
        cy.getByTestId('ArticleListItem.TILE').should('have.length.greaterThan', 1);
    });
});
