Feature: Login
    Funcionalidade para realizar login

    Scenario Outline: <cenarios>
        Given eu acesso a pagina home da aplicação
        And preencho o cadastro do cliente "<login>" e "<senha>"
        And escolher base "<base>"
        Then valido que foi logado com sucesso "<mensagem>"

        Examples:
            | cenarios | login                   | senha    | base             | mensagem                      |
            | Login    | Bruno@opensystem.srv.br | aA@12345 | Base Limpa       | Bruno - Base Limpa            |
            | Login    | Bruno@opensystem.srv.br | aA@12345 | Testes QA Automa | Bruno - Testes QA Automação   |
            | Login    | Lucas@opensystem.srv.br | aA@12345 | Base Limpa       | Usuário ou Senha inválido(a). |
            | Login    | Bruno@opensystem.srv.br | aA@1234  | Base Limpa       | Usuário ou Senha inválido(a). |
