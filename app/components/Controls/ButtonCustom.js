import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { device, ACTIVE_COLOR, INACTIVE_COLOR } from 'constants/styles';
import Loading from 'components/LoadingIndicator';
import { messages } from './messages';

import icoForwardArrow from './img/ForwardArrow.svg';
import icoForwardArrowW from './img/ForwardArrowW.svg';
import icoForwardArrowT from './img/ForwardArrowT.svg';
import icoApprove from './img/Approve.svg';

const StyledButton = css`
  user-select: none;
  cursor: pointer;
  outline: 0;
  box-sizing: border-box;
  text-decoration: none;

  width: 100%;
  display: block;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 17px;
  border-radius: 16px;
  padding: 14px 24px;

  text-align: center;
  position: relative;

  &:active,
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    background-color: ${INACTIVE_COLOR};
    cursor: default;
  }
`;

const ButtonLink = styled(Link)`
  ${StyledButton};
`;

const Button = styled.button`
  ${StyledButton};
`;

const A = styled.a`
  ${StyledButton};
`;

const Wrapper = styled.div`
    position: relative;
    margin-bottom: 1rem;
    border-radius: 16px;

    @media ${device.mobileS} {
        &.btn-inline{
            display: block;
            margin-right: 0px;
        }
    }
    @media ${device.laptop} {
        display: block;
        &.btn-inline{
            display: inline-block;
            margin-right: 15px;
        }
    }
    &.btn-nomargin{margin: 0px;}
    &.btn-iconstyle>${Button},&.btn-iconstyle>${ButtonLink},&.btn-iconstyle>${A}{
        display: flex;
        flex-direction: row;
        gap:0.25rem;
    }

    &.btn-round,&.btn-round>${Button},&.btn-round>${ButtonLink},&.btn-round>${A}{
        border-radius: 12px;
    }

    &.btn-rounded, &.btn-rounded>${Button},&.btn-rounded>${ButtonLink},&.btn-rounded>${A}{
        border-radius: 36px;
    }

    &.btn-spec>${Button},&.btn-spec>${ButtonLink},&.btn-spec>${A}{
        padding: 24px;
    }

    &.btn-xs>${Button},&.btn-xs>${ButtonLink},&.btn-xs>${A}{
        font-size: 0.5rem;
        padding: 0rem 1rem;
    }

    &.btn-s>${Button},&.btn-s>${ButtonLink},&.btn-s>${A}{
        font-size: 0.75rem;
        padding: 0.5rem 1rem;
    }
    &.btn-m>${Button},&.btn-m>${ButtonLink},&.btn-m>${A}{
        font-size: 1.25rem;
        line-height: 21px;
    }
    &.btn-l>${Button},&.btn-l>${ButtonLink},&.btn-l>${A}{
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }
    &.btn-x>${Button},&.btn-x>${ButtonLink},&.btn-x>${A}{
        font-size: 30px;
        line-height: 31px;
    }

    &.btn-link>${Button},&.btn-link>${ButtonLink},&.btn-link>${A}{
        color: #14142B;
        text-transform: capitalize;
    }

    &.btn-link>${Button}:active,&.btn-link>${ButtonLink}:active,&.btn-link>${A}:active,
    &.btn-link>${Button}:hover,&.btn-link>${ButtonLink}:hover,&.btn-link>${A}:hover{
        color: ${ACTIVE_COLOR};
    }

    &.btn-create>${Button},&.btn-create>${ButtonLink},&.btn-create>${A}{
        color: #F7F7FC;
        background: #DA8232;
        border-radius: 12px;
    }

    &.btn-pri>${Button},&.btn-pri>${ButtonLink},&.btn-pri>${A}{
        color: #F7F7FC;
        background: #2C3677;
    }

    &.btn-sec>${Button},&.btn-sec>${ButtonLink},&.btn-sec>${A}{
        color: #F7F7FC;
        background: #DD9457;
    }

    &.btn-light>${Button},&.btn-light>${ButtonLink},&.btn-light>${A}{
        color: #1C1C28;
        background: #FFF;
    }

    &.btn-dark>${Button},&.btn-dark>${ButtonLink},&.btn-dark>${A}{
        color: #fff;
        background: #05050F;
    }

    &.btn-done>${Button},&.btn-done>${ButtonLink},&.btn-done>${A}{
        color: #fff;
        background: #E3609F;
    }

    &.btn-confirm>${Button},&.btn-confirm>${ButtonLink},&.btn-confirm>${A}{
        color: #fff;
        background: #F6A422;
    }

    &.btn-cancel>${Button},&.btn-cancel>${ButtonLink},&.btn-cancel>${A}{
        color: #fff;
        background: #E36060;
    }

    &.btn-refresh>${Button},&.btn-refresh>${ButtonLink},&.btn-refresh>${A}{
        color: #fff;
        background: #9F9ACB;
    }

    &.btn-transparent>${Button},&.btn-transparent>${ButtonLink},&.btn-transparent>${A}{
        color: #fff;
        background: none;
        border: 2px solid #fff;
        box-sizing: border-box;
        border-radius: 48px;
    }

    &.btn-icon>${Button},&.btn-icon>${ButtonLink},&.btn-icon>${A}{
        padding-right: 48px;
    }

    &.btn-icon>${Button}::before,&.btn-icon>${ButtonLink}::before,&.btn-icon>${A}::before{
        content: '';
        position: absolute;

        width: 24px;
        height: 24px;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        background-position: center;
        background-repeat: no-repeat;
        z-index: 2;
        background-image: url("${icoForwardArrowW}");
    }

    &.btn-approve>${Button}::before,&.btn-approve>${ButtonLink}::before,&.btn-approve>${A}::before{
        content: '';
        position: absolute;

        width: 24px;
        height: 24px;
        top: 50%;
        left: 20px;
        transform: translateY(-50%);
        background-position: center;
        background-repeat: no-repeat;
        z-index: 2;
        background-image: url("${icoApprove}");
    }
    &.btn-approve>${Button},&.btn-approve>${ButtonLink},&.btn-approve>${A}{
        padding: 12px 24px 12px 48px;
        color: #fff;
        background: #7A7499;
    }

    &.btn-link>${Button}::before,&.btn-link>${ButtonLink}::before,&.btn-link>${A}::before,
    &.btn-light>${Button}::before,&.btn-light>${ButtonLink}::before,&.btn-light>${A}::before{
        background-image: url("${icoForwardArrow}");
    }

    &.btn-transparent>${Button}::before,&.btn-transparent>${ButtonLink}::before,&.btn-transparent>${A}::before{
        background-image: url("${icoForwardArrowT}");
    }

    &.disabled>${Button},&.disabled>${ButtonLink},&.disabled>${A} {
        background-color: ${INACTIVE_COLOR};
        color: #fff;
    }
    &.disabled.btn-transparent>${Button},&.disabled.btn-transparent>${ButtonLink},&.disabled.btn-transparent>${A}{
        border: 2px solid ${INACTIVE_COLOR};
    }

`;

const LoadingWrapper = styled.div`
  position: absolute;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
`;

function ButtonCustom(props) {
  const {
    href,
    text,
    name,
    template,
    disabled,
    onClick,
    handleRoute,
    type,
    loading,
    iconRight,
  } = props;
  const { t } = useTranslation();
  console.log(name);

  const mText = text || (name ? t(messages[name]()) : '');
  let mButton = (
    <A href={href} onClick={onClick}>
      {mText} {iconRight}
    </A>
  );

  if (href) {
    mButton = (
      <ButtonLink to={href}>
        {mText} {iconRight}
      </ButtonLink>
    );
  }

  // If the Button has a handleRoute prop, we want to render a button
  if (handleRoute || type) {
    mButton = (
      <Button onClick={handleRoute} type={type} disabled={disabled}>
        {mText} {iconRight}
      </Button>
    );
  }
  return (
    <Wrapper className={template + (disabled ? ' disabled' : '')}>
      {loading ? (
        <LoadingWrapper>
          <Loading width="1em" height="1em" />
        </LoadingWrapper>
      ) : (
        ''
      )}
      {mButton}
    </Wrapper>
  );
}

ButtonCustom.propTypes = {
  name: PropTypes.string,
  href: PropTypes.string,
  text: PropTypes.string,
  template: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  handleRoute: PropTypes.func,
  type: PropTypes.string,
  loading: PropTypes.any,
  iconRight: PropTypes.any,
};

export default ButtonCustom;
