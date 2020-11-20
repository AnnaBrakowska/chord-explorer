import React, { useState, useEffect } from 'react'
import { Search, Card } from '../../components'
import { Row, Column, Grid } from '../../globalStyles'

import Amplify, { API } from 'aws-amplify';
import config from '../../aws-exports'
Amplify.configure(config)

function Chords() {
    const [allChords, setAllChords] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [filteredChords, setFilteredChords] = useState([])


    // LOADS ALL CHORDS
    useEffect(() => {
        console.log("LOADING CHORDS")
        API.get('chordexplorer', `/chords`).then(chords => {
            console.log("CHORDS", chords)
            setAllChords(chords)
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
                return el.chord_name.includes(value.toUpperCase()) || el.chord.includes(value.toUpperCase()) || el.chord_type.includes(value.toUpperCase())
            })
        }

        return setFilteredChords(filteredChords)
    }


    return (
        <Row>
            <Column>
                <Search placeholder="Type chord that you are looking for" change={filterChords} value={searchValue} />
            </Column>

            <Column>
                <Grid>
                    {filteredChords && filteredChords.map((chord, i) => {
                        return <Card title={`${chord.chord_name} ${chord.chord_type}`} chord={chord.chord} key={"chord-" + i} />
                    })
                    }
                </Grid>
            </Column>
        </Row>
    )
}

export default Chords
