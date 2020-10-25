import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Search from './components/Search'
import Hero from './components/Hero'
import Grid from './components/Grid'
import Card from './components/Card'
import Navbar from './components/Navbar'
import './App.css';
import Amplify, { API } from 'aws-amplify';
import config from './aws-exports'
Amplify.configure(config)


const Form = styled.form`
position: relative;
`

function App() {

  const [chordToFind, setChordToFind] = useState('')
  const [chord, setChord] = useState('')
  const [allChords, setAllChords] = useState([])
  const [header, setHeader] = useState('Enter notes')

  useEffect(() => {
    API.get('chords', '/chords/chord/').then(chords => {
      setAllChords(chords)
    })
  }, [])

  const handleSubmit = (e) => {
    //TODO: cleanup value
    e.preventDefault();
    API.get('chords', `/chords/object/${chordToFind}`).then(chord => {
      console.log(chord)
      setChord(chord)
      if (!chord.name) {
        setHeader('Sorry, we could not find the chord you are looking for. Please try again.')
        return
      }
      setHeader(`This is the cord you are looking for: ${chord.name} ${chord.type}`)
    }, '')
  }
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      {/* TODO: ADD ROUTER AND AUTHENTICATION */}
      <main>
        <Hero>
          {/* TODO:  THIS IS SEARCH SECTION - HERO*/}
          <h1>{header}</h1>
          <Form onSubmit={handleSubmit}>
            <Search searchPlaceholder='Type a cord' setChordToFind={setChordToFind} />
          </Form>
        </Hero>
        <section>
          <Grid>
            {/* TODO: THIS IS DISLAY SECTION - GRID WITH CARDS */}
            {allChords && allChords.map((chord, i) => {
              return <Card title={`${chord.name} ${chord.type}`} chord={chord.chord} key={"chord-" + i} />
            })
            }
          </Grid>
        </section>
      </main>
    </div >
  );
}

export default App;
