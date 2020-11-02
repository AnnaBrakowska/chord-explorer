import React from 'react';
import { CardBody, CardTitle, CardSubtitle } from './Card.elements'

const Card = ({ title, chord }) => (
    <CardBody>
        <CardTitle>Name: {title}</CardTitle>
        <CardSubtitle>Chord: {chord}</CardSubtitle>
    </CardBody>
)

export default Card