import React from 'react';

import { phrase } from '~lib/lang';

import {
  Wrapper, Amount, Icon, Label, Value, Currency,
} from './styles';

type Props = {
  value: number,
  difficulty: String
};

export const Record: React.FC<Props> = ({ value, difficulty }) => (
  <Wrapper>
    <Label>{phrase('RECORD')}</Label>
    <Value>
      <Icon src="assets/sprites/hud/score.png" />
      <Amount>{value}</Amount>
      {
        difficulty === 'HARD' && <Currency>{` `} SOBR Token</Currency>
      }
    </Value>
  </Wrapper>
);
