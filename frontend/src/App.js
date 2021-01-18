// Sempre letra MAIUSCULA QUANDO È UM COMPONENTE
import React, { useState, useEffect } from 'react';
import api from './services/api.js';

import './App.css';
//import backgroundImage from './assets/background.jpg'

import Header from './components/Header';

//Componente é uma função que retorna um HTMl;
function App() {
  const[projects, setProjects] = useState([]);

  /**
   * Dois parametros
   * 
   * 1 - Qual funcao eu quero disparar;
   * 2 - Quando eu quero disparar a funcao;
   */   
    useEffect(() => {
      api.get('projects').then(response => {
        setProjects(response.data);

        //visualizando o response
        // console.log( response );

      })
    }, []);
  
  //useState retorna um array com 2 posições
  //
  // 1. Variável com o seu valor inicial
  // 2. Função para atualizarmos esse valor

  async function handleAddProject() {
    // projects.push(`Novo projeto ${ Date.now() }`);

    // percorrendo o array de projetos e copiando cada projeto e add um novo 
    // projeto no final
    // setProjects([ ...projects, `Novo projeto ${Date.now()}`]);

    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: "Jefferson Freire"
    });

    const project = response.data;

    setProjects([...projects, project]);

  }

  return (
    <>
      <Header title= "Projects" />
      {/* /<img width= { 300 } src= { backgroundImage }></img> */}
        
        <ul>
          { projects.map( project => <li key={project.id}>{project.title}</li> ) }
        </ul>

        <button type="button" onClick= { handleAddProject }>Adicionar projeto</button>
    </>
  );
}

export default App;