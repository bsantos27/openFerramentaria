/// <reference types="cypress" />
import LoginPage from "../pages/loginPage";

const loginPage = new LoginPage();

Given("eu acesso a pagina home da aplicação", () => {
  loginPage.acessarHome();
});

When("preencho o cadastro do cliente {string} e {string}", (login, senha) => {
  loginPage.submitLogin(login, senha);
});

When(/^escolher base "([^"]*)"$/, (base, mensagem) => {
  loginPage.escolherBase(base, mensagem);
});

Then("valido que foi logado com sucesso {string}", (mensagem) => {
  loginPage.validarLogin(mensagem);
});
