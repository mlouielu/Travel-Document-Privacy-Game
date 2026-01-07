export const scenarios = [
  {
    id: 1,
    title: "Airport Check-in",
    type: "boarding-pass",
    risky: true,
    details: {
      passengerName: "SMITH/JANE",
      flight: "UA 524",
      origin: "SFO",
      destination: "NRT",
      date: "14 OCT",
      seat: "24A",
      pnr: "R5X9J2",
      ticketNumber: "016 2415 9921",
    },
    leak: {
      target: "qr-code"
    }
  },
  {
    id: 2,
    title: "Taiwan Adventure",
    type: "passport",
    country: "TWN",
    risky: true,
    details: {
      surname: "CHEN",
      givenNames: "WEI-LING",
      chineseName: "陳韋伶",
      nationality: "TAIWAN",
      personalIdNumber: "A200000000",
      dob: "05 MAY 1995",
      birthPlace: "TAIPEI CITY",
      sex: "F",
      expiration: "05 MAY 2035",
      authority: "MINISTRY OF FOREIGN AFFAIRS",
      passportNumber: "9998881111"
    },
    leak: {
      target: "personal-id"
    }
  },
  {
    id: 3,
    title: "Safe Travels?",
    type: "boarding-pass",
    risky: true,
    details: {
      passengerName: "********",
      flight: "DL 112",
      origin: "LHR",
      destination: "JFK",
      date: "22 DEC",
      seat: "12C",
      pnr: "************",
    },
    leak: {
      target: ["flight", "date", "seat", "origin", "destination"]
    }
  },
  {
    id: 4,
    title: "Trip Booked!",
    type: "app-screenshot",
    risky: true,
    details: {
      airline: "SkyWays",
      flight: "SW 999",
      route: "LAX - SYD",
      date: "10 NOV",
      passenger: "ALEX JOHNSON",
      pnr: "X7Z9P2"
    },
    leak: {
      target: "pnr"
    }
  },
  {
    id: 5,
    title: "Mobile Check-in?",
    type: "app-screenshot",
    risky: true,
    details: {
      airline: "SkyWays",
      flight: "SW 101",
      route: "JFK - LHR",
      date: "12 DEC",
      passenger: "ALEX JOHNSON",
      pnr: "******"
    },
    leak: {
      target: ["flight", "route", "date"]
    }
  },
  {
    id: 6,
    title: "New Passport Arrived!",
    type: "passport",
    risky: true,
    details: {
      surname: "DOE",
      givenNames: "JOHN",
      nationality: "USA",
      dob: "12 JAN 1990",
      sex: "M",
      expiration: "12 JAN 2036",
      passportNumber: "987654321"
    },
    leak: {
      target: "mrz"
    }
  },
  {
    id: 7,
    title: "Privacy First",
    type: "passport",
    risky: true,
    partialCover: true,
    maskMRZ: true,
    details: {
      surname: "DOE",
      givenNames: "JOHN",
      nationality: "USA",
      dob: "12 JAN 1990",
      sex: "M",
      expiration: "12 JAN 2036",
      passportNumber: "987654321"
    },
    leak: {
      target: "passport_no"
    }
  },
  {
    id: 8,
    title: "Ready to Roll",
    type: "luggage-tag",
    risky: false,
    details: {
      name: "J. SMITH",
      phone: "Hidden",
      address: "Hidden",
      email: "j.smith@email.com"
    },
    leak: null
  },
  {
    id: 9,
    title: "Careful Cover?",
    type: "passport",
    country: "TWN",
    risky: true,
    partialCover: true,
    partialMRZMask: true,
    details: {
      surname: "WU",
      givenNames: "YI-CHEN",
      chineseName: "吳怡君",
      nationality: "TAIWAN",
      personalIdNumber: "C200000000",
      dob: "20 SEP 1996",
      birthPlace: "TAICHUNG",
      sex: "F",
      expiration: "20 SEP 2036",
      authority: "MINISTRY OF FOREIGN AFFAIRS",
      passportNumber: "555444333"
    },
    leak: {
      target: "mrz"
    }
  },
  {
    id: 10,
    title: "Luggage Tag",
    type: "luggage-tag",
    gamemode: "find-leak",
    risky: true,
    details: {
      name: "JANE SMITH",
      phone: "+1 (555) 123-4567",
      address: "123 MAPLE STREET, SPRINGFIELD, IL 62704",
      email: "jane.travels@email.com"
    },
    leak: {
      target: "address"
    }
  },
  {
    id: 11,
    title: "Trip Confirmation",
    type: "email",
    gamemode: "find-leak",
    risky: true,
    details: {
      airline: "Oceanic",
      pnr: "OC815X",
      passenger: "JACK SHEPHARD",
      date: "22 SEP",
      flight: "OC 815",
      price: "$850.00"
    },
    leak: {
      target: "pnr"
    }
  },
  {
    id: 12,
    title: "At the Gate",
    type: "boarding-pass",
    gamemode: "find-leak",
    risky: true,
    details: {
      passengerName: "FORD/JAMES",
      flight: "SA 202",
      origin: "LAX",
      destination: "SYD",
      date: "15 DEC",
      seat: "42E",
      pnr: "L0ST42",
      ticketNumber: "123 4567 8901",
    },
    leak: {
      target: ["qr-code", "pnr", "etkt"]
    }
  },
  {
    id: 13,
    title: "Ready to Fly",
    type: "passport",
    country: "TWN",
    gamemode: "find-leak",
    partialCover: true,
    risky: true,
    details: {
      surname: "LIN",
      givenNames: "MEI-HUA",
      chineseName: "林美華",
      nationality: "TAIWAN",
      personalIdNumber: "B200000000",
      dob: "15 AUG 1992",
      birthPlace: "TAIPEI",
      sex: "F",
      expiration: "15 AUG 2032",
      authority: "MINISTRY OF FOREIGN AFFAIRS",
      passportNumber: "777666555"
    },
    leak: {
      target: "mrz"
    }
  },
  {
    id: 14,
    title: "Passport Cover",
    type: "passport-over-boarding-pass",
    gamemode: "find-leak",
    risky: true,
    details: {
      flight: "5J 101",
      gate: "C57"
    },
    leak: {
      target: "barcode"
    }
  }
];
