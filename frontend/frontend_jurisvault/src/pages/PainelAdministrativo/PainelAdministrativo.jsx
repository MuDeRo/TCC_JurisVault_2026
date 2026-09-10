import "./PainelAdministrativo.css";

function PainelAdministrativo() {
    return (
        <div className="pagina-painel">

            {/* CABEÇALHO */}
            <header className="cabecalho-painel">

                <div className="logo-painel">
                    <span className="icone-logo-painel">
                        ⚖
                    </span>

                    <span>
                        SISTEMA <strong>JURÍDICO</strong>
                    </span>
                </div>

                <nav className="menu-painel">

                    <button>
                        Processos
                    </button>

                    <button>
                        Prazos
                    </button>

                    <button>
                        Arquivos
                    </button>

                    <button className="botao-usuario">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user-round"><path d="M17.925 20.056a6 6 0 0 0-11.851.001" /><circle cx="12" cy="11" r="4" /><circle cx="12" cy="12" r="10" /></svg>       </button>

                </nav>

            </header>


            {/* CONTEÚDO */}
            <main className="conteudo-painel">

                <div className="logo-central-painel">

                    <div className="linha-logo">
                        <span></span>

                        <div className="simbolo-painel">
                            ⚖
                        </div>

                        <span></span>
                    </div>

                    <h1>
                        Sistema
                    </h1>

                    <h2>
                        Jurídico
                    </h2>

                </div>

            </main>


            {/* RODAPÉ */}
            <footer className="rodape-painel">
                © 2026 Sistema Jurídico. Todos os direitos reservados.
            </footer>

        </div>
    );
}

export default PainelAdministrativo;