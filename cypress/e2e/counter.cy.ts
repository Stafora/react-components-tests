/// <reference types="cypress" />

describe('Counter page', () => {
    it('loading success', () => {
        cy.visit('/')
        const $button = cy.get('[data-cy="button"]')
        $button.click().should('have.text', 'count is 1')
        for(let i = 0; i < 5; i++){
            $button.click()
        }
        $button.should('have.text', 'count is 6')
    })
})