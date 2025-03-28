/// <reference types="cypress" />

describe('Todo', () => {
    beforeEach(() => {
        cy.visit('/todo')
      })

    it('Component loading on page', () => {
        cy.get('[data-cy-h2]').should('be.visible').contains('Todo List')
    })

    it('Add Todo', () => {
        cy.get('[data-cy-input]').focus().type('Todo 1')
        cy.get('[data-cy-button]').click()
        cy.get('[data-cy-input]').should('have.value', '')

        cy.get('[data-cy-input]').focus().type('Todo 2')
        cy.get('[data-cy-button]').click()
        cy.get('[data-cy-input]').should('have.value', '')

        cy.get('[data-cy-ul]').contains('Todo 1')
        cy.get('[data-cy-ul]').contains('Todo 2')

        cy.get('[data-cy-li]').should('have.length', 2)
    })

    it('Remove todo', () => {
        cy.get('[data-cy-input]').focus().type('Todo 1')
        cy.get('[data-cy-button]').click()

        cy.get('[data-cy-input]').focus().type('Todo 2')
        cy.get('[data-cy-button]').click()

        cy.get('[data-cy-remove]').last().click()
        cy.get('[data-cy-li]').should('have.length', 1)
        cy.get('[data-cy-ul]').should('not.contain', 'Todo 2')
    })

    it('Add todo and make done', () => {
        cy.get('[data-cy-input]').focus().type('Todo 1')
        cy.get('[data-cy-button]').click()

        cy.get('[data-cy-li] .cursor-pointer').click()
        cy.get('[data-cy-li] .cursor-pointer').should('have.class', 'line-through')
    })
})