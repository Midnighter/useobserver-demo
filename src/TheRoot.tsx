import React from 'react';
// Project imports
import { RootStoreProvider } from './store';
import App from './App';

const TheRoot: React.FC = () => (
  <RootStoreProvider>
    <App />
  </RootStoreProvider>
);

export default TheRoot;
