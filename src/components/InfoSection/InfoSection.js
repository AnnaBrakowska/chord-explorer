import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../globalStyles';
import {
    InfoSec,
    InfoRow,
    InfoColumn,
    TextWrapper,
    Heading,
    Subtitle,
    ImgWrapper,
    Img
} from './InfoSection.elements';

function InfoSection({
    primary,
    lightBg,
    lightText,
    lightTextDesc,
    headline,
    description,
    buttonLabel,
    img,
    alt
}) {
    return (
        <InfoSec lightBg={lightBg}>
            <InfoRow>
                <InfoColumn>
                    <TextWrapper>
                        <Heading lightText={lightText}>{headline}</Heading>
                        <Subtitle lightTextDesc={lightTextDesc}>{description}</Subtitle>
                        <Link to='/sign-up'>
                            <Button big fontBig primary={primary}>
                                {buttonLabel}
                            </Button>
                        </Link>
                    </TextWrapper>
                </InfoColumn>
                <InfoColumn>
                    <ImgWrapper>
                        <Img src={img} alt={alt} />
                    </ImgWrapper>
                </InfoColumn>
            </InfoRow>
        </InfoSec>
    );
}

export default InfoSection;