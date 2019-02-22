import { useState } from 'react';

const INITIAL_STATE: boolean = true;

export const useCollapse = (collapsed: boolean = INITIAL_STATE): [boolean, () => void] => {
  const [state, setState] = useState(collapsed);
  const toggleCollapse = () => setState(!state);
  return [state, toggleCollapse];
};
