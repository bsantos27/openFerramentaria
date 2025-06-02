/// <reference types="cypress" />

import LoginElements from "../elements/loginElements";

const loginElements = new LoginElements();

class LoginPage {
  acessarHome() {
    cy.visit("/");
    cy.wait(2000);
  }

  submitLogin(login, senha) {
    cy.get(loginElements.selectNome()).type(login);
    cy.get(loginElements.selectSenha()).type(senha);
    cy.get(loginElements.btnLogin()).click();
  }

  escolherBase(base) {
    cy.get('body').then($body => {
      if ($body.text().includes(base)) {
        cy.contains(base).click();
      } else {
        this.validarLogin("Usuário ou Senha inválido(a).");
      }
    });
  }

  validarLogin(mensagem) {
    if (!mensagem) {
      throw new Error("Mensagem para validarLogin é obrigatória");
    }
    cy.contains(mensagem).should("be.visible");
  }
}

export default LoginPage;
