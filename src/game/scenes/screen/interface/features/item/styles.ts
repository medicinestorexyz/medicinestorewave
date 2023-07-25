import styled, { css, keyframes } from 'styled-components';

import { InterfaceColor, InterfaceFont } from '~type/interface';

const animationTimeout = keyframes`
  0% { right: 0 }
  100% { right: 100% }
`;

const animationOpacity = keyframes`
  0% { opacity: 0; margin-bottom: 0 }
  100% { opacity: 1; margin-bottom: 12px }
`;

export const Icon = styled.img`
  display: block;
  width: 26px;
  height: 26px;
`;

export const Info = styled.div`
  position: absolute;
  display: none;
  transform: translateX(-50%);
  bottom: 100%;
  left: 50%;
  margin-bottom: 12px;
  width: 200px;
  animation: ${animationOpacity} 0.1s ease-in;
  &::after {
    position: absolute;
    content: '';
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 100%);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 12px solid ${InterfaceColor.BLUE_DARK}cc;
  }
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: ${InterfaceColor.BLUE_BLACK}ee;
  border-radius: 10px 10px 0 0;
`;

export const Name = styled.div`
  color: ${InterfaceColor.INFO};
  font-family: ${InterfaceFont.PIXEL_LABEL};
  font-size: 14px;
  line-height: 14px;
  padding-bottom: 2px;
`;

export const Body = styled.div`
  background: ${InterfaceColor.BLUE_DARK}cc;
  padding: 10px 14px 12px 14px;
  border-radius: 0 0 10px 10px;
`;

export const Container = styled.div<{
  $active?: boolean
}>`
  background: rgba(0, 0, 0, 0.5);
  padding: 14px;
  pointer-events: all;
  position: relative;
  border-bottom: 4px solid #000;
  border-radius: 5px;
  ${(props) => (props.$active ? css`
    ${Icon} {
      opacity: 0.5;
    }
  ` : css`
    &:hover {
      background: ${InterfaceColor.BLACK_TRANSPARENT};
      cursor: pointer;
      ${Info} {
        display: block;
      }
    }
  `)}
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

export const Timeout = styled.div`
  position: absolute;
  background: ${InterfaceColor.INFO};
  right: 0;
  left: 0;
  bottom: -4px;
  height: 4px;
  animation: ${animationTimeout} 1s linear;
`;
