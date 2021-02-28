import { CRS_DB_KEY, defaultData } from './DataLayer';

export const getSystemState = () => {
  const strData = localStorage.getItem(CRS_DB_KEY);
  let systemState = { ...defaultData };

  if (strData !== null) {
    systemState = JSON.parse(strData);
  }

  return systemState;
};
