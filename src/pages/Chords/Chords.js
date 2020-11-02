import React, { useState } from 'react'
import { Search, Card } from '../../components'
import { Container, Row, Column, Grid } from '../../globalStyles'

import Amplify, { API } from 'aws-amplify';
import config from '../../aws-exports'
Amplify.configure(config)

function Chords() {
    const [allChords, setAllChords] = useState([])
    const [chord, setChord] = useState('')
    const [header, setHeader] = useState('Which chord are you looking for?')

    const handleSubmit = (value, type) => {
        // if (type === 'chord') {
        //     API.get('chords', `/chords/object/${value.toUpperCase()}`).then(chord => {
        //         setChord(chord)
        //         setAllChords([chord])
        //         if (!chord.name) {
        //             setHeader('Sorry, we could not find the chord you are looking for. Please try again.')
        //             setAllChords([])
        //             return
        //         }
        //         setHeader(`It looks like you are looking for: ${chord.name} ${chord.type}`)
        //     }, '')
        // }

        // TEST
        API.get('chords', `/chords/advanced/${value.toUpperCase()}`).then(chord => {
            setChord(chord)
            setAllChords([chord])
            if (!chord.name) {
                setHeader('Sorry, we could not find the chord you are looking for. Please try again.')
                setAllChords([])
                return
            }
            setHeader(`It looks like you are looking for: ${chord.name} ${chord.type}`)
        }, '')

    }

    const fetchAll = () => {
        API.get('chords', '/chords/chord/').then(chords => {
            setAllChords(chords)
        })
    }

    return (
        <Container>
            <Row>
                <Column>
                    <h1>{header}</h1>
                </Column>
            </Row>
            <Row>
                <Column>
                    <Search searchPlaceholder='Search by chord' submit={handleSubmit} />
                </Column>
            </Row>
            <Row>
                <Column>
                    <Grid>
                        {allChords && allChords.map((chord, i) => {
                            return <Card title={`${chord.name} ${chord.type}`} chord={chord.chord} key={"chord-" + i} />
                        })
                        }
                    </Grid>
                </Column>
            </Row>
        </Container>
    )
}

export default Chords
