import { useState } from "react";
import CampoProcesso from "../../components/Processos/CampoProcessos";
import "./Processos.css";


function Processos() {
  const [descricao, setDescricao] = useState("");
  const [editando, setEditando] = useState(false);


  function salvar(e) {

    e.preventDefault();

    if (!descricao.trim()) {
      alert("Digite a descrição do caso.");
      return;
    }

    if (editando) {
      alert("Processo atualizado com sucesso!");
    } else {
      alert("Processo cadastrado com sucesso!");
    }

    limpar();
  }


  function limpar() {
    setDescricao("");
    setEditando(false);
  }


  return (
    <div className="pagina-processos">

      <header className="cabecalho">

        <h2>
          ⚖️ Juris<span>Vault</span>
        </h2>

      </header>


      <main className="conteudo">

        <section className="card-cadastro">

          <h1>
            {editando
              ? "Editar Processo"
              : "Cadastro de Processo"}
          </h1>


          <p className="descricao">
            Cadastre as informações do caso jurídico.
          </p>


          <form onSubmit={salvar}>

            <CampoProcesso
              valor={descricao}
              aoMudar={(e) => setDescricao(e.target.value)}
            />


            <button type="submit">

              {editando
                ? "Atualizar Processo"
                : "Cadastrar Processo"}

            </button>


            {editando && (

              <button
                type="button"
                className="btn-cancelar"
                onClick={limpar}
              >
                Cancelar
              </button>

            )}

          </form>

        </section>

      </main>


      <footer className="rodape">

        © 2026 JurisVault - Gestão Jurídica

      </footer>

    </div>
  );
}


export default Processos;
