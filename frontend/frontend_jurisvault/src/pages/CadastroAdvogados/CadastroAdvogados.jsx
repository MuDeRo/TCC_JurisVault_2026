import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampoCadastro from "../../components/Advogados/CampoCadastro";

import "./CadastroAdvogado.css";

export default function CadastroAdvogados() {
  const [nomeAdvogado, setNomeAdvogado] = useState("");
  const [emailAdvogado, setEmailAdvogado] = useState("");
  const [senhaAdvogado, setSenhaAdvogado] = useState("");
  const [cpfAdvogado, setCpfAdvogado] = useState("");
  const [registroOab, setRegistroOab] = useState("");
  const [telefoneAdvogado, setTelefoneAdvogado] = useState("");
  const [ufOab, setUfOab] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem("");

    // Validação dos campos
    if ( !nomeAdvogado || !emailAdvogado || !senhaAdvogado || !cpfAdvogado || !registroOab || !telefoneAdvogado || !ufOab ) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    try {
      setCarregando(true);

      // Envia os dados para a API
      const resposta = await api.post("/advogado/cadastro", {
        nome_advogado: nomeAdvogado,
        email_advogado: emailAdvogado,
        senha_advogado: senhaAdvogado,
        cpf_advogado: cpfAdvogado,
        registro_oab: registroOab,
        telefone_advogado: telefoneAdvogado,
        uf_oab: ufOab,
      });

      setMensagem(
        resposta.data.message || "Advogado cadastrado com sucesso!"
      );

      // Limpa os campos
      setNomeAdvogado("");
      setEmailAdvogado("");
      setSenhaAdvogado("");
      setCpfAdvogado("");
      setRegistroOab("");
      setTelefoneAdvogado("");
      setUfOab("");

      // Se quiser mandar para outra página depois do cadastro:
      // navigate("/login");

    } catch (error) {
      console.error("Erro na requisição:", error);

      setMensagem(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Erro ao realizar cadastro."
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="pagina-cadastro-advogados">

      <header className="cabecalho">
        <h2>
          SISTEMA <span>JURÍDICO</span>
        </h2>
      </header>

      <main className="conteudo">

        <form
          className="card-cadastro"
          onSubmit={handleSubmit}
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

          <button
            type="submit"
            disabled={carregando}
          >
            {carregando ? "Cadastrando..." : "Cadastrar"}
          </button>

        </form>

      </main>

      <footer className="rodape">
        © 2026 Sistema Jurídico
      </footer>

    </div>
  );
}
