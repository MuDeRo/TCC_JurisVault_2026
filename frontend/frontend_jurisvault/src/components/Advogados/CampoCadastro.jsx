function CampoCadastro({ label, tipo, valor, aoMudar }) {
  return (
    <div className="campo-cadastro">
      <label>{label}</label>
      <input
        type={tipo}
        value={valor}
        onChange={(e) => aoMudar(e.target.value)}
      />
    </div>
  );
}

export default CampoCadastro;