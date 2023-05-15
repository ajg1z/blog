import { getAuthHeader } from 'cypress/helpers/getAuthHeader';
import { Profile } from '../../../src/entities/Profile';

const testProfile = {
    id: '4',
    first: 'test',
    lastname: 'user',
    age: 21,
    currency: 'EUR',
    country: 'Russia',
    city: 'Moscow',
    username: 'testUser',
    avatar: 'https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg',
};

export const updateProfile = (profile: Partial<Profile> | undefined) => {
    Object.entries(profile ?? {}).forEach(([key, value]) => {
        if (value) cy.getByTestId(`ProfileCard.${key}`).clear().type(String(value));
    });
};

export const resetProfile = (profileId: string) =>
    cy.request<Profile>({
        method: 'PUT',
        url: `http://localhost:8000/profile/${profileId}`,
        headers: { Authorization: getAuthHeader() },
        body: testProfile,
    });

export const createProfile = (profile?: Profile) =>
    cy.request<Profile>({
        method: 'POST',
        url: 'http://localhost:8000/profile',
        headers: { Authorization: getAuthHeader() },
        body: profile ?? testProfile,
    });

export const deleteProfile = (id?: string) =>
    cy.request<Profile>({
        method: 'DELETE',
        url: `http://localhost:8000/profile/${id ?? testProfile.id}`,
        headers: { Authorization: getAuthHeader() },
        body: testProfile,
    });

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(profile: Partial<Profile>): Chainable<void>;
            resetProfile(profileId: string): Chainable<void>;
            createProfile(profile?: Profile): Chainable<Response<Profile>>;
            deleteProfile(id?: string): Chainable<Response<Profile>>;
        }
    }
}

export {};
