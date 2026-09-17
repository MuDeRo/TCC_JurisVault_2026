import "./ListaProcessos.css";


function ListaProcessos() {

  const processos = [];


  return (
    <div className="pagina-lista">

      <header className="cabecalho">

        <h2>
          ⚖️ Juris<span>Vault</span>
        </h2>

      </header>


      <main className="lista-conteudo">

        <section className="card-lista">

          <h1>Processos</h1>

          <p>
            Processos cadastrados no sistema.
          </p>


          {processos.length === 0 ? (

            <div className="sem-processos">

              <span>📁</span>

              <h3>
                Nenhum processo cadastrado
              </h3>

              <p>
                Os processos cadastrados aparecerão aqui.
              </p>

            </div>

          ) : (

            processos.map((processo) => (

              <div
                className="processo"
                key={processo.id}
              >

                <div>

                  <strong>
                    Processo #{processo.id}
                  </strong>

                  <p>
                    {processo.descricao_caso}
                  </p>

                </div>


                <button>
                  Editar
                </button>

              </div>

            ))

          )}

        </section>

      </main>


      <footer className="rodape">

        © 2026 JurisVault - Gestão Jurídica

      </footer>

    </div>
  );
}


export default ListaProcessos;
