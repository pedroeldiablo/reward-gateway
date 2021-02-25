import React from 'react';
import { ProfileListComponent } from './components/profile-list/profile-list.component';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../src/components/theme/theme.styles';
import { PageTitle } from '../src/components/title/title.component';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="App">
        <PageTitle>Hello Reward Gateway TS</PageTitle>
        <ProfileListComponent />
      </div>
    </ThemeProvider>
  );
}

export default App;
