import { useState } from 'react';
import CampoCadastro from '../../components/Advogados/CampoCadastro';
import './CadastroAdvogado.css';

function CadastroAdvogados() {
  const [nomeAdvogado, setNomeAdvogado] = useState('');
  const [emailAdvogado, setEmailAdvogado] = useState('');
  const [senhaAdvogado, setSenhaAdvogado] = useState('');
  const [cpfAdvogado, setCpfAdvogado] = useState('');
  const [registroOab, setRegistroOab] = useState('');
  const [telefoneAdvogado, setTelefoneAdvogado] = useState('');
  const [ufOab, setUfOab] = useState('');

  const [mensagem, setMensagem] = useState('');

  function cadastrarAdvogado(e) {
    e.preventDefault();

    if (
      !nomeAdvogado ||
      !emailAdvogado ||
      !senhaAdvogado ||
      !cpfAdvogado ||
      !registroOab ||
      !telefoneAdvogado ||
      !ufOab
    ) {
      setMensagem('Preencha todos os campos.');
      return;
    }

    setMensagem('Advogado cadastrado com sucesso!');

    console.log({
      nome: nomeAdvogado,
      email: emailAdvogado,
      senha: senhaAdvogado,
      cpf: cpfAdvogado,
      oab: registroOab,
      telefone: telefoneAdvogado,
      ufOab: ufOab
    });
  }

  return (
    <div className="pagina-cadastro-advogados">

      <header className="cabecalho">
        <h2>SISTEMA <span>JURÍDICO</span></h2>
      </header>

      <main className="conteudo">

        <form
          className="card-cadastro"
          onSubmit={cadastrarAdvogado}
        >

          <h1>Cadastro de Advogado</h1>

          <p className="descricao">
            Preencha os dados para realizar o cadastro.
          </p>

          <CampoCadastro
            label="Nome do Advogado"
            tipo="text"
            valor={nomeAdvogado}
            aoMudar={setNomeAdvogado}
          />

          <CampoCadastro
            label="E-mail"
            tipo="email"
            valor={emailAdvogado}
            aoMudar={setEmailAdvogado}
          />

          <CampoCadastro
            label="Senha"
            tipo="password"
            valor={senhaAdvogado}
            aoMudar={setSenhaAdvogado}
          />

          <CampoCadastro
            label="CPF"
            tipo="text"
            valor={cpfAdvogado}
            aoMudar={setCpfAdvogado}
          />

          <CampoCadastro
            label="Registro da OAB"
            tipo="text"
            valor={registroOab}
            aoMudar={setRegistroOab}
          />

          <CampoCadastro
            label="Telefone"
            tipo="text"
            valor={telefoneAdvogado}
            aoMudar={setTelefoneAdvogado}
          />

          <CampoCadastro
            label="UF da OAB"
            tipo="text"
            valor={ufOab}
            aoMudar={setUfOab}
          />

          {mensagem && (
            <p className="mensagem">
              {mensagem}
            </p>
          )}

          <button type="submit">
            Cadastrar
          </button>

        </form>

      </main>

      <footer className="rodape">
        © 2026 Sistema Jurídico
      </footer>

    </div>
  );
}

export default CadastroAdvogados;