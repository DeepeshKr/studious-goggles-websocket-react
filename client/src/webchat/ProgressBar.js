import React from 'react';
import styled from 'styled-components';


const ProgressBar = ({ value }) => {
    return (
        <ProgressBarContainer>
            <ProgressBarFill value={value}>{value}</ProgressBarFill>
        </ProgressBarContainer>
    );
};

export default ProgressBar;


const ProgressBarContainer = styled.div`
    width: 100%;
    background-color: #f3f3f3;
    border-radius: 4px;
`;

const ProgressBarFill = styled.div`
    height: 20px;
    width: ${props => props.value}%;
    background-color: #4CAF50;
    border-radius: inherit;
    text-align: center;
    line-height: 20px;
    color: white;
`;
