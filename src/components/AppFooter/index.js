import React from 'react';
import { Footer, FooterText, ProfileLink, HeartIcon } from './styles';

const AppFooter = () => {
  return (
    <Footer>
      <FooterText>
        Made with
        <HeartIcon />
        by
        <ProfileLink href="https://marciogurka.com" target="_blank" rel="noopener noreferrer">
          Márcio Gurka
        </ProfileLink>
      </FooterText>
    </Footer>
  );
};

export default AppFooter;
