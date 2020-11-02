import React from 'react'
import { InfoSection } from '../../components'
import { homeConfig } from './Home.config'

function Home() {
    return (
        <InfoSection {...homeConfig} />
    )
}

export default Home