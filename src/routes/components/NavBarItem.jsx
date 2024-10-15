import React from 'react';
import NavBarLink from './NavBarLink';
import { StyledButton } from '../styles/StyledComponents';

export default function NavBarItem({ to, label, specificBtnStyle, specificNavStyle }) {
    return (
        <NavBarLink to={to} style={specificNavStyle}>
            <StyledButton style={specificBtnStyle}>
                {label}
            </StyledButton>
        </NavBarLink>
    );
}
