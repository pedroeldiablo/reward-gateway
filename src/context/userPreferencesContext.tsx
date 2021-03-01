import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  FunctionComponent,
  useReducer,
  useCallback,
} from 'react';

interface Action {
  type: 'CREATE_LABEL' | 'UPDATE_LABEL' | 'UPDATE_COLOR';
  value: UserProfilePreferences;
}

const reducer = (state: UserProfilePreferences[], action: Action) => {
  switch (action.type) {
    case 'CREATE_LABEL':
      return [action.value, ...state];
    case 'UPDATE_LABEL':
      return state.map((profile) => {
        if (profile.id === action.value.id) {
          return action.value;
        }
        return profile;
      });
    case 'UPDATE_COLOR':
      return state.map((profile) => {
        if (profile.id === action.value.id) {
          return action.value;
        }
        return profile;
      });
    default:
      return state;
  }
};

export interface UserProfilePreferences {
  id: string;
  label?: string;
  color?: string;
}

export const UserPreferencesContext = createContext<{
  user?: string;
  setUser?: React.Dispatch<string> | undefined;
  state?: UserProfilePreferences[];
  dispatch?: React.Dispatch<Action>;
}>({});

export const UserPreferencesProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState('Reward');
  const cache = window.localStorage.getItem('RGUserProfilePreferences');
  const initialState: UserProfilePreferences[] =
    (cache && JSON.parse(cache)) || [];
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    window.localStorage.setItem(
      'RGUserProfilePreferences',
      JSON.stringify(state)
    );
  }, [state]);

  return (
    <UserPreferencesContext.Provider value={{ user, setUser, state, dispatch }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};
