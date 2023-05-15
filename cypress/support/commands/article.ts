/* eslint-disable max-len */
import { getAuthHeader } from 'cypress/helpers/getAuthHeader';
import { TokenLocalStorageKey } from '../../../src/shared/const/localStorage';
import { Article } from '../../../src/entities/Article/model/types/article';

const testArticle = {
    id: '3',
    title: 'Sport news for last 3 years',
    subtitle: 'Что нового в JS за 2022 год?',
    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    views: 122,
    createdAt: '13.02.2022',
    type: ['POLITICS', 'GAMEDEV'],
    userId: 2,
    blocks: [
        {
            id: '1',
            type: 'text',
            title: 'Заголовок этого блока',
            paragraphs: [
                'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
                'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
                'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
            ],
        },
    ],
    user: {
        id: 2,
        username: 'user',
        password: '123',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb6Z6Uxl-jW0hktZrPM6uOwPnm8h01l8Bk3w&usqp=CAU',
        roles: ['USER'],
    },
};

export const createArticle = (article?: Article) => {
    cy.log('token', localStorage.getItem(TokenLocalStorageKey));
    return cy
        .request({
            method: 'POST',
            url: 'http://localhost:8000/articles',
            headers: { Authorization: getAuthHeader() },
            body: article ?? testArticle,
        })
        .then((resp) => resp.body);
};

export const removeArticle = (articleId: number) =>
    cy.request({
        method: 'DELETE',
        url: `http://localhost:8000/articles/${articleId}`,
        headers: { Authorization: getAuthHeader() },
    });

declare global {
    namespace Cypress {
        interface Chainable {
            createArticle(article?: Article): Chainable<Article>;
            removeArticle(articleId: number): Chainable<void>;
        }
    }
}
