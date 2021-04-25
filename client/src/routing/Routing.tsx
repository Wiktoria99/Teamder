import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { MainPage } from '@/pages';
import { unauthorizedRoutes } from './unauthorizedRoutes';

const ScrollToTop = (): null => {
  window.scrollTo(0, 0);
  return null;
};

export const Routing: React.FC = () => {
  return (
    <>
      <Route component={ScrollToTop} />
      <Switch>
        <Route exact={true} component={MainPage} />
        {unauthorizedRoutes.map((routeProps, i) => (
          <Route key={`${routeProps.path}-${i}`} {...routeProps} />
        ))}
      </Switch>
    </>
  );
};
