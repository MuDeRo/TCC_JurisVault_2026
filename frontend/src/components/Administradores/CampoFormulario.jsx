import React from 'react';

function CampoFormulario({ 
  label, 
  tipo = 'text', 
  valor = '', 
  aoMudar, 
  onChange, 
  name, 
  opcoes = [], 
  placeholder = '' 
}) {
  const tratarMudanca = aoMudar || onChange;
  const ehSelect = tipo === 'select' || (Array.isArray(opcoes) && opcoes.length > 0);

  return (
    <div className="campo-formulario-box">
      {label && <label htmlFor={name}>{label}</label>}

      {ehSelect ? (
        <select
          id={name}
          name={name}
          value={valor}
          onChange={tratarMudanca}
        >
          <option value="">{placeholder || 'Selecione uma opção...'}</option>
          {(Array.isArray(opcoes) ? opcoes : []).map((item, index) => {
            const ehObjeto = typeof item === 'object' && item !== null;
            const val = ehObjeto ? (item.value ?? item.id) : item;
            const txt = ehObjeto ? (item.label ?? item.nome) : item;
            return (
              <option key={index} value={val}>
                {txt}
              </option>
            );
          })}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={tipo}
          value={valor}
          onChange={tratarMudanca}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

export default CampoFormulario;