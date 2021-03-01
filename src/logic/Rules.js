// TODO: https://github.com/cachecontrol/json-rules-engine

import PriceData from '../config/prices';
import CurrenyData from '../config/payments';

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

export const calculatePrePaymentRequired = (
  membershipType,
  rentDurationHrs,
  carType,
  carSubtype,
) => {
  const pledge = pledgeValue(membershipType, carType);
  const carHireCost =
    rentDurationHrs * PriceData?.[carType]?.[carSubtype]?.[membershipType];

  return { pledge: pledge.toFixed(1), carHireCost: carHireCost.toFixed(1) };
};

export const calculateFinalAmountDue = (
  membershipType,
  originalRentDuration,
  delayMinutes,
  existingDelays,
  carType,
  carSubtype,
) => {
  const carHourlyCost = PriceData?.[carType]?.[carSubtype]?.[membershipType];
  if (membershipType === 'gold' && existingDelays < 4) {
    delayMinutes = Math.max(0, delayMinutes - 30);
  }

  return carHourlyCost * originalRentDuration + carHourlyCost * delayMinutes;
};

const roundingLogic = (amount) => {
  if (amount < 0.2) {
    return 0.2;
  }
  if (amount < 0.4) {
    return 0.4;
  }
  if (amount < 0.5) {
    return 0.5;
  }
  if (amount < 0.6) {
    return 0.6;
  }
  if (amount < 0.7) {
    return 0.7;
  }
  if (amount < 0.8) {
    return 0.8;
  }
  if (amount < 0.9) {
    return 0.9;
  }
  if (amount < 1) {
    return 1;
  }
  return 0;
};

export const getOptimalCashback = (amountInEuro) => {
  const cashBack = {};
  const notesAndCoins = CurrenyData.denominations.sort(
    (a, b) => b.value - a.value,
  );

  for (let i = 0; amountInEuro > 0 && i < notesAndCoins.length; i += 1) {
    const { value, label } = notesAndCoins[i];

    if (value <= amountInEuro) {
      cashBack[label] = Math.floor(amountInEuro / value);
      amountInEuro -= value * cashBack[label];
    }
    if (i === notesAndCoins.length - 1) {
      if (!cashBack[label]) cashBack[label] = 0;
      amountInEuro = roundingLogic(amountInEuro);
      const roundoffChange = Math.floor(amountInEuro / value);
      cashBack[label] += roundoffChange;
      amountInEuro -= value * roundoffChange;
    }
  }

  return cashBack;
};
