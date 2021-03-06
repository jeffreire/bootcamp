import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList , Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api.js';

// Não possuem valor semântico (Significado)
// Não possuem estilização própria

// View: div, footer, header, main, aside, section
// Text: p, span, strong, h1, h2, h3
export default function App() {
  const [ projects, setProjects ] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      console.log(response.data);
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Jefferson Freire'
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return(
    <>
      <StatusBar barStyle= "light-content" backgroundColor="#7159c1"/>
      {/* Colocar sempre a stilização */}
      <SafeAreaView style= {styles.container}>
        <FlatList
          style= {styles.container}
          data= {projects}
          keyExtractor = {project => project.id}
          // funcao que retorna laguma coisa, 
          renderItem={({ item: project }) => (
            <Text style={styles.project}>{project.title}</Text>
          )}
        />

        <TouchableOpacity 
          activeOpacity= {0.6} 
          style={styles.button} 
          onPress= {handleAddProject}
        >
          <Text style= {styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* <View style= {styles.container}>
        {projects.map(project => ( 
          // precisa ter uma chave key
          <Text style={styles.project} key= {project.id}>{project.title}</Text>
        ))}
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },

  project: {
    color: '#FFF',
    fontSize: 30,
  },

  button: {
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    fontSize: 'bold',
    fontSize: 16,
  },
});
