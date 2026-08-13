 function CampoFormulario({ label, tipo, valor, aoMudar }) {
  return (
    <div className="campo-formulario">
      <label>{label}</label>
      <input
        type={tipo}
        value={valor}
        onChange={aoMudar}
      />
    </div>
  );
}

export default CampoFormulario;