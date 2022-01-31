import moment from 'moment';
export const getValidDate = (date: string) => {
  let formattedDate = date.split('.').reverse().join('.');
  return moment(formattedDate).format('YYYY-MM-DD');
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
