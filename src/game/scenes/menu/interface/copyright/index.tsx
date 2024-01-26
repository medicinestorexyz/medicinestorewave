import React from 'react';

import pkg from '../../../../../../package.json';

import {
  Wrapper, Icon, About, Discord, Author, Link,
} from './styles';

export const Copyright: React.FC = () => (
  <Wrapper>
    <About>
      <Author>
        Created by{' '}
        <Link href={pkg.author.url} target="_blank">
          {pkg.author.name}
        </Link>
      </Author>
      <Author>
        Reskinned by{' '}
        <Link href="https://medicinestore.xyz" target="_blank">
          MedicineStore.XYZ
        </Link>
      </Author>
      Version {pkg.version}
    </About>
    <Discord href='https://discord.gg/VXptmyVK' target="_blank">
      <Icon src='assets/discord.png' />
      DISCORD
    </Discord>
  </Wrapper>
);
