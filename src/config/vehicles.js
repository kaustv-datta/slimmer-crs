const VEHICLES = {
  L: {
    L1: {
      totalAvailable: 2,
      description: `A two-wheeled vehicle with an engine cylinder capacity in the case of a thermic engine not
      exceeding 50 cm³ and whatever the means of propulsion a maximum design speed not exceeding 50
      km/h.`,
    },
    L2: {
      totalAvailable: 2,
      description: `A three-wheeled vehicle of any wheel arrangement with an engine cylinder capacity in the case
      of a thermic engine not exceeding 50 cm³ or 4kw and whatever the means of propulsion a maximum
      design speed not exceeding 50 km/h.`,
    },
    L3: {
      totalAvailable: 2,
      description: `A two-wheeled vehicle with an engine cylinder capacity in the case of a thermic engine
      exceeding 50 cm³ or 4kw and whatever the means of propulsion a maximum design speed
      exceeding 50 km/h.`,
    },
    L4: {
      totalAvailable: 2,
      description: `A vehicle with three wheels asymmetrically arranged in relation to the longitudinal median plane
      with an engine cylinder capacity in the case of a thermic engine exceeding 50 cm³ or whatever the
      means of propulsion a maximum design speed exceeding 50 km/h (motor cycles with sidecars).`,
    },
    L5: {
      totalAvailable: 2,
      description: `A vehicle with three wheels symmetrically arranged in relation to the longitudinal median plane
      with an engine cylinder capacity in the case of a thermic engine exceeding 50 cm³ or whatever the
      means of propulsion a maximum design speed exceeding 50 km/h.`,
    },
    L6: {
      totalAvailable: 2,
      description: `A vehicle with four wheels whose unladen mass is not more than 350 kg, not including the mass
      of the batteries in case of electric vehicles, whose maximum design speed is not more than 45 km/h,
      and whose engine cylinder capacity does not exceed 50 cm³ for spark (positive) ignition engines, or
      whose maximum net power output does not exceed 4 kW in the case of other internal combustion
      engines, or whose maximum continuous rated power does not exceed 4 kW in the case of electric
      engines.
      `,
    },
    L7: {
      totalAvailable: 2,
      description: `A vehicle with four wheels, other than that classified for the category L6, whose unladen mass is
      not more than 400 kg[3] (550 kg[3] for vehicles intended for carrying goods), not including the mass
      of batteries in the case of electric vehicles and whose maximum continuous rated power does not
      exceed 15 kW.
      `,
    },
  },
  M: {
    M1: {
      totalAvailable: 2,
      description: `Vehicles used for carriage of passengers, comprising not more than eight seats in addition to the
      driver's = 9.( Larger Than Standard Car eg: London Cab / E7 Type Vehicle 8 seat + Driver.)`,
    },
    M2: {
      totalAvailable: 2,
      description: `Vehicles used for the carriage of passengers, comprising more than eight seats in addition to the
      driver's seat, and having a maximum mass not exceeding 5 tonnes. (Bus)`,
    },
    M3: {
      totalAvailable: 2,
      description: `Vehicles used for the carriage of passengers, comprising more than eight seats in addition to the
      driver's seat, and having a maximum mass exceeding 5 tonnes. (Bus)`,
    },
  },
  N: {
    N1: {
      totalAvailable: 2,
      description: `Vehicles used for the carriage of goods and having a maximum mass not exceeding 3.5 tonnes.
      (Pick-up Truck, Van)
      `,
    },
    N2: {
      totalAvailable: 2,
      description: `Vehicles used for the carriage of goods and having a maximum mass exceeding 3.5 tonnes but
      not exceeding 12 tonnes. (Commercial Truck)`,
    },
    N3: {
      totalAvailable: 2,
      description: `Vehicles used for the carriage of goods and having a maximum mass exceeding 12 tonnes.
      (Commercial Truck)`,
    },
  },
  O: {
    O1: {
      totalAvailable: 2,
      description: `Trailers with a maximum mass not exceeding 0.75 tonnes.`,
    },
    O2: {
      totalAvailable: 2,
      description: `Trailers with a maximum mass exceeding 0.75 tonnes, but not exceeding 3.5 tonnes.`,
    },
    O3: {
      totalAvailable: 2,
      description: `Trailers with a maximum mass exceeding 3.5 tonnes, but not exceeding 10 tonnes.`,
    },
    O4: {
      totalAvailable: 2,
      description: `Trailers with a maximum mass exceeding 10 tonnes.`,
    },
  },
  T: {
    T: {
      totalAvailable: 2,
      description: `agricultural and Forestry tractors.`,
    },
  },
  G: {
    G: {
      totalAvailable: 2,
      description: `off-road vehicles.`,
    },
  },
  S: {
    SA: {
      totalAvailable: 2,
      description: `Motor caravan.`,
    },
    SB: {
      totalAvailable: 2,
      description: `Armoured vehicle.`,
    },
    SC: {
      totalAvailable: 2,
      description: `Ambulance.`,
    },
    SD: {
      totalAvailable: 2,
      description: `Hearse.`,
    },
  },
};

export default VEHICLES;
