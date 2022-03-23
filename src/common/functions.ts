import moment from 'moment';
import * as geolib from 'geolib';

import {
  DATE_FORMAT,
  DISTANCE_VARIABLE
} from 'src/constants/common-configurations';

export const getValidDate = (date: string) => {
  let formattedDate = date.split('.').reverse().join('.');
  return moment(formattedDate).format(DATE_FORMAT);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  };
};

export const formatDate = (date: string) => {
  let _date = date?.replaceAll('-', '/');

  return moment(_date, 'DD/MM/YYYY').format(DATE_FORMAT);
};

export const convertTimeValue = (timeString: string) => {
  const timeString12hr = new Date(
    '1970-01-01T' + timeString + 'Z'
  ).toLocaleTimeString('en-US', {
    timeZone: 'UTC',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  });
  return timeString12hr;
};

export const getWorkingHours = (_startTime, _endTime) => {
  let startTime = moment(_startTime, 'HH:mm:ss');
  let endTime = moment(_endTime, 'HH:mm:ss');

  // calculate total duration
  let duration: any = moment.duration(endTime.diff(startTime));
  // duration in hours
  let hours = parseInt(duration.asHours());

  return hours;
};

export const isLocationVerified = (
  assignedLocation: any,
  actualLocation: any
): Boolean => {
  const result = geolib.isPointWithinRadius(
    assignedLocation,
    actualLocation,
    DISTANCE_VARIABLE
  );
  return result;
};
