describe('Portfolio Homepage', () => {
  it('navigates to Contact page and shows email', () => {
    cy.visit('http://localhost:5173/');      
    cy.contains('Contact').click();         
    cy.contains('kebinkyle@gmail.com').should('exist');   
  });
});
