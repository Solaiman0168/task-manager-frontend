import React from 'react';
import { Frame, Navigation } from '@shopify/polaris';
import { useNavigate } from 'react-router-dom';
import { HomeMajor, CirclePlusMajor } from '@shopify/polaris-icons';

export default function Layout({ children }) {
  const navigate = useNavigate();
  
  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            label: 'Tasks',
            icon: HomeMajor,
            onClick: () => navigate('/'),
          },
          {
            label: 'Create Task',
            icon: CirclePlusMajor,
            onClick: () => navigate('/create'),
          },
        ]}
      />
    </Navigation>
  );

  return (
    <Frame navigation={navigationMarkup}>
      {children}
    </Frame>
  );
}