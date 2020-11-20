import React, { useState, useEffect } from 'react'
import { Search, Card } from '../../components'
import { Row, Column, Grid } from '../../globalStyles'
import styled from 'styled-components'

import Amplify, { API } from 'aws-amplify';
import config from '../../aws-exports'
Amplify.configure(config)

const ChordsContainer = styled.div`
  padding: 150px 50px 0 50px;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const ChordsColumn = styled(Column)`
    justify-content: center;
`

function Chords() {
    const [allChords, setAllChords] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [filteredChords, setFilteredChords] = useState([])


    // LOADS ALL CHORDS
    useEffect(() => {
        API.get('chordexplorer', `/chords`).then(chords => {
            setAllChords(chords)
            setFilteredChords(chords)
        }, '')
    }, [])

    // improve search
    const filterChords = (value) => {
        setSearchValue(value)
        let filteredChords = allChords.filter((el) => {
            if (value.length > 0) {
                return el.chord_name.includes(value.toUpperCase()) || el.chord.includes(value.toUpperCase()) || el.chord_type.includes(value.toUpperCase())
            }
        })
        return filteredChords.length ? setFilteredChords(filteredChords) : setFilteredChords(allChords)
    }


    return (
        <ChordsContainer>
            <Row>
                <ChordsColumn>
                    <Search placeholder="Type a chord that you are looking for" change={filterChords} value={searchValue} />
                </ChordsColumn>
            </Row>
            <Row>
                <ChordsColumn>
                    <Grid>
                        {filteredChords && filteredChords.map((chord, i) => {
                            return <Card title={`${chord.chord_name} ${chord.chord_type}`} chord={chord.chord} key={"chord-" + i} />
                        })
                        }
                    </Grid>
                </ChordsColumn>
            </Row>
        </ChordsContainer>
    )
}

export default Chords
