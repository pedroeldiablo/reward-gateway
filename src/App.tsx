import React from 'react';
import { ProfileListComponent } from './components/profile-list/profile-list.component';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../src/components/theme/theme.styles';
import { PageTitle } from '../src/components/title/title.component';
import { ViewportProvider } from './context/viewPortContext';
import './App.css';
import { UserPreferencesProvider } from './context/userPreferencesContext';

function App() {
  return (
    <ViewportProvider>
      <UserPreferencesProvider>
        <ThemeProvider theme={defaultTheme}>
          <div className="App">
            <PageTitle>Hello Reward Gateway TS</PageTitle>
            <ProfileListComponent />
          </div>
        </ThemeProvider>
      </UserPreferencesProvider>
    </ViewportProvider>
  );
}

export default App;
