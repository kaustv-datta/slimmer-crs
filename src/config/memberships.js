const MEMBERSHIPS = {
  gold: {
    IDPattern: '/^N-[0-9]{8}$/',
    delayMaxCount: 4,
    delayLimitMinutes: 30,
    delayValidityDays: 30,
    isPledgeRequired: false,
  },
  regular: {
    IDPattern: '/^G-[0-9]{6}-[A-Z]{2}$/',
    delayMaxCount: 0,
    delayLimitMinutes: 0,
    delayValidityDays: 0,
    isPledgeRequired: true,
  },
};

export default MEMBERSHIPS;
