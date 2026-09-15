function CampoProcesso({ valor, aoMudar }) {
  return (
    <div className="campo-processo">
      <label>Descrição do Caso</label>

      <textarea
        name="descricao_caso"
        value={valor}
        onChange={aoMudar}
        placeholder="Descreva o caso..."
      />
    </div>
  );
}

export default CampoProcesso;
