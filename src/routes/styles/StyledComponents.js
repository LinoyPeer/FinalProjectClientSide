import styled from 'styled-components';
import { Button } from 'antd';

export const StyledButton = styled(Button)`
    background-color: rgb(137, 207, 240, 0.3);
    color: rgb(149, 165, 166, 1);
    margin-left: 1.5em;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;


    &:hover {
        background-color: rgb(149, 165, 166, 1) !important;
        color: rgb(255, 255, 255, 1) !important;
    }
`;
