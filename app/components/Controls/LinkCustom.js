import React, {Children} from 'react';
import styled,{css} from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { ACTIVE_COLOR, INACTIVE_COLOR , LINK_COLOR, GAP} from 'constants/styles';

const Styles = css`
    cursor: pointer;
    text-decoration: none;
    position: relative;
    display: block;
    color: ${LINK_COLOR};
    margin-bottom: ${GAP};

    &:disabled{
      color: ${INACTIVE_COLOR};
      cursor:default;
    }

    &:active, &:hover{
        opacity: 0.8;
        color: ${ACTIVE_COLOR};
    }
`;

const LinkStyled = styled(Link)`
    ${Styles};
`;

const AStyled = styled.a`
    ${Styles};
`;

function LinkCustom(props) {
    const {href, onClick, template, disabled, children } = props;

    if (onClick) {
        return <AStyled href={void(0)} className={template + (disabled ? ' disabled' : '')} onClick={onClick}>{Children.toArray(children)}</AStyled>
    }

    return <LinkStyled to={href} className={template + (disabled ? ' disabled' : '')}>
    {Children.toArray(children)}</LinkStyled>;
}

LinkCustom.propTypes = {
    children: PropTypes.node.isRequired,
    template: PropTypes.string,
    href: PropTypes.string,
    disabled: PropTypes.bool
};

export default LinkCustom;
