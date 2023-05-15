let currentArticleId: number;
let countViews = 0;

describe('Пользователь заходит на страницу статьи', () => {
    beforeEach(() => {
        cy.login().then(() => {
            cy.createArticle().then((article) => {
                currentArticleId = article.id;
                countViews = article.views;
                cy.visit(`articles/${article.id}`);
            });
        });
    });
    afterEach(() => {
        cy.removeArticle(currentArticleId);
    });

    it('Проверка на наличие даты создания статьи', () => {
        cy.getByTestId('ArticleDetails.createdAt');
    });

    it('Проверка на наличие имени статьи', () => {
        cy.intercept('GET', '**/comments?*', { fixture: 'article-comments' });
        cy.intercept('GET', '**/articles/*', { fixture: 'article-details' });
        cy.getByTestId('ArticleDetails.text');
    });

    it('Проверка на наличие количество просмотров статьи', () => {
        cy.intercept('GET', '**/comments?*', { fixture: 'article-comments' });
        cy.intercept('GET', '**/articles/*', { fixture: 'article-details' });
        cy.getByTestId('ArticleDetails.views').should('include.text', countViews);
    });

    it('Оставить комментарий', () => {
        cy.intercept('GET', '**/articles/*', { fixture: 'article-details' });
        cy.getByTestId('AddCommentForm').scrollIntoView();
        cy.addComment('text');
        cy.addComment('text 2');
        cy.getByTestId('CommentCard.Content').should('have.length', 2);
    });

    it('Поставить оценку', () => {
        cy.intercept('GET', '**/comments?*', { fixture: 'article-comments' });
        cy.intercept('GET', '**/articles/*', { fixture: 'article-details' });
        cy.getByTestId('RatingCard').scrollIntoView();
        cy.setRate(4, 'feedback');
        cy.get('[data-selected=true]').should('have.length', 4);
    });
});
