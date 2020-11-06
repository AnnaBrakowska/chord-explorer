import React, { useState } from 'react'
import { Search, Card, Dropdown } from '../../components'
import { Container, Row, Column, Grid, Button } from '../../globalStyles'

import Amplify, { API } from 'aws-amplify';
import config from '../../aws-exports'
Amplify.configure(config)

function Chords() {
    const [allChords, setAllChords] = useState([])
    const [chord, setChord] = useState('')
    const [chordToFetch, setChordToFetch] = useState('')
    const [header, setHeader] = useState('Which chord are you looking for?')
    const [searchType, setSearchType] = useState('chord')
    const [sortType, setSortType] = useState('chord')

    const handleSearchTypeChange = (value) => {
        setSearchType(value)
    }

    const handleSortTypeChange = (value) => {
        setSortType(value)
    }
    const handleValueChange = (value) => {
        setChordToFetch(value)
    }

    const handleSubmit = () => {
        console.log(searchType)
        console.log(chordToFetch)
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
        // API.get('chords', `/chords/advanced/${value.toUpperCase()}`).then(chord => {
        //     setChord(chord)
        //     setAllChords([chord])
        //     if (!chord.name) {
        //         setHeader('Sorry, we could not find the chord you are looking for. Please try again.')
        //         setAllChords([])
        //         return
        //     }
        //     setHeader(`It looks like you are looking for: ${chord.name} ${chord.type}`)
        // }, '')

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
                    <Search searchPlaceholder={`Search by ${searchType}`} submit={handleSubmit} change={handleValueChange} value={chordToFetch} />
                </Column>
            </Row>
            <Row>
                <Column>
                    <Dropdown value={searchType} options={['value', 'type', 'chord']} title="Search by:" handler={handleSearchTypeChange} />
                </Column>
                {/* <Column>
                    <Dropdown value={sortType} options={['value', 'type', 'chord']} title="Sort by:" handler={handleSortTypeChange} />
                </Column>
                <Column>
                    <Button onClick={fetchAll}>Show all</Button>
                </Column> */}
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
        </Container >
    )
}

export default Chords
