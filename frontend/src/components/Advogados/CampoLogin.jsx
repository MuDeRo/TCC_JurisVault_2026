function CampoLogin({ label, tipo, valor, aoMudar }) {
  return (
    <div className="campo-login">
      <label>{label}</label>
      <input
        type={tipo}
        value={valor}
        onChange={aoMudar}
      />
    </div>
  );
}

export default CampoLogin;