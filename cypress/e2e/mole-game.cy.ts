/// <reference types="cypress" />

describe('Mole Game', () => {
    beforeEach(() => {
        cy.visit('/mole')
    })

    it('should render title, holes, button and score', () => {
        cy.get('[data-cy-title]').should('contain.text', 'Try Kill Mole!!!')
        cy.get('[data-cy-holes]').find('[data-cy-hole="0"]').should('exist')
        cy.get('[data-cy-button]').should('exist')
        cy.get('[data-cy-score]').should('contain.text', 'Score: 0')
    })

    it('should start and stop the game', () => {
        cy.get('[data-cy-button]').click()
        cy.get('[data-cy-button]').should('contain.text', 'Stop')
        cy.wait(1000)
        cy.get('[data-cy-button]').click()
        cy.get('[data-cy-button]').should('contain.text', 'Start')
    })

    it('should increase score when mole is hit', () => {
        cy.get('[data-cy-button]').click()
        let hits = 0

        function findAndHitMole() {
            cy.get('[data-cy-holes] > div').then(($holes) => {
                const moleIndex = [...$holes].findIndex((hole) => hole.innerText.includes('MOLE'))
                if (moleIndex !== -1) {
                    cy.get(`[data-cy-hole="${moleIndex}"]`).click()
                    hits++
                    cy.get('[data-cy-score]').should('contain.text', `Score: ${hits}`)
                }
            }).then(() => {
                if (hits < 3) {
                    cy.wait(1000)
                    findAndHitMole()
                }
            })
        }

        findAndHitMole()
    })

    it('should not increase score on wrong click', () => {
        cy.get('[data-cy-button]').click()
        cy.wait(1000)

        cy.get('[data-cy-holes] > div').then(($holes) => {
            const moleIndex = [...$holes].findIndex((hole) => hole.innerText.includes('MOLE'))
            const missIndex = moleIndex === 0 ? 1 : 0
            if (moleIndex !== -1) {
                cy.get(`[data-cy-hole="${missIndex}"]`).click()
                cy.get('[data-cy-score]').should('contain.text', 'Score: 0')
            }
        })
    })

    it('should reset score when game is restarted', () => {
        cy.get('[data-cy-button]').click()
        cy.wait(1000)

        cy.get('[data-cy-holes] > div').then(($holes) => {
            const moleIndex = [...$holes].findIndex((hole) => hole.innerText.includes('MOLE'))
            if (moleIndex !== -1) {
                cy.get(`[data-cy-hole="${moleIndex}"]`).click()
                cy.get('[data-cy-score]').should('contain.text', 'Score: 1')
            }
        })

        cy.get('[data-cy-button]').click() // Stop
        cy.get('[data-cy-button]').click() // Start again
        cy.get('[data-cy-score]').should('contain.text', 'Score: 0')
    })

    it('should not show mole after game is stopped', () => {
        cy.get('[data-cy-button]').click()
        cy.wait(1000)
        cy.get('[data-cy-button]').click()

        cy.wait(2000)
        cy.get('[data-cy-holes] > div').each(($el) => {
            cy.wrap($el).should('not.contain.text', 'MOLE')
        })
    })
})
