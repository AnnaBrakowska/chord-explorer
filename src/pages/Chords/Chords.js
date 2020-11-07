import React, { useState, useEffect } from 'react'
import { Search, Card, Dropdown } from '../../components'
import { Container, Row, Column, Grid, Button } from '../../globalStyles'

import Amplify, { API } from 'aws-amplify';
import config from '../../aws-exports'
Amplify.configure(config)

function Chords() {
    const [allChords, setAllChords] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [filteredChords, setFilteredChords] = useState([])


    // LOADS ALL CHORDS
    useEffect(() => {
        API.get('chords', `/chords/all`).then(chords => {
            setAllChords(chords)
            console.log(allChords)
        }, '')
    }, [])

    // improve search
    const filterChords = (value) => {
        console.log("HELLO")
        console.log("value", value)
        setSearchValue(value)
        let filteredChords = []
        if (value !== '') {
            filteredChords = allChords.filter((el) => {
                return el.name.includes(value.toUpperCase()) || el.chord.includes(value.toUpperCase()) || el.type.includes(value.toUpperCase())
            })
        }

        return setFilteredChords(filteredChords)
    }


    return (
        <Container>
            <Row>
                <Column>
                    <Search placeholder="Type chord that you are looking for" change={filterChords} value={searchValue} />
                </Column>
            </Row>
            <Row>
            </Row>
            <Row>
                <Column>
                    <Grid>
                        {filteredChords && filteredChords.map((chord, i) => {
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
