// TODO: https://github.com/cachecontrol/json-rules-engine

import PriceData from '../config/prices';

export const pledgeValue = (membershipType, vehicleType) => {
  if (membershipType === 'gold') {
    return 0;
  }
  if (['L', 'M', 'N'].includes(vehicleType)) {
    return 100;
  }
  if (['O', 'T', 'G', 'S'].includes(vehicleType)) {
    return 300;
  }
  return 0;
};

export const calculatePaymentRequired = (
  membershipType,
  rentDurationHrs,
  carType,
  carSubtype,
) => {
  console.log(membershipType, rentDurationHrs, carType, carSubtype);
  const pledge = pledgeValue(membershipType, carType);
  const carHireCost =
    rentDurationHrs * PriceData?.[carType]?.[carSubtype]?.[membershipType];

  return (pledge + carHireCost).toFixed(1);
};

// export const pendingAmount = (
//   membershipType,
//   originalRentDuration,
//   delayMinutes,
//   existingDelays,
//   carType,
//   carSubtype,
//   pledgePaid,
// ) => {
//   let cost = 0;
//   if (delayMinutes === 0) {
//     cost =
//       PriceData[carType][carSubtype][membershipType] * originalRentDuration;
//     cost -= pledgePaid;
//   } else {
//   }
//   return cost;
// };
