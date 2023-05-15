import { selectByTestId } from 'cypress/helpers/selectByTestId';
import { AuthResponse } from '../../../src/entities/User/model/types/userSchema';
import { TokenLocalStorageKey } from '../../../src/shared/const/localStorage';

export const login = (username = 'testUser', password = 'test') =>
    cy
        .request({
            method: 'POST',
            url: 'http://localhost:8000/login',
            body: {
                username,
                password,
            },
        })
        .then(({ body }) => {
            window.localStorage.setItem(TokenLocalStorageKey, body.token);
            return body;
        });

export const getByTestId = (testId: string) => cy.get(selectByTestId(testId));

declare global {
    namespace Cypress {
        interface Chainable {
            login(email?: string, password?: string): Chainable<AuthResponse>;
            getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
        }
    }
}

export {};
