import React from 'react';

// basta colocar entre chaves para obter as propriedades
//children - todo conteudo do componente
export default function Header({title, children}) {
  return (
    <header>
      <h1>{ title }</h1>

      { children }
    </header>
  )
}