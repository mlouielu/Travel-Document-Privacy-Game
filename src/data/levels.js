export const scenarios = [
  {
    id: 1,
    title: "Airport Check-in",
    description: "So excited for this trip! Finally managed to get a window seat! ✈️ #AdventureTime",
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
      target: "qr-code", // Used by the renderer to highlight
      reason: "This QR code contains your PNR (Booking Reference) and full name. Anyone can scan it to access your booking, change your seat, or even cancel your flight!"
    }
  },
  {
    id: 2,
    title: "Taiwan Adventure",
    description: "Finally off to Taiwan! Can't wait for the night markets! 🇹🇼🍜 #Taiwan #Travel",
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
      target: "personal-id",
      reason: "The National ID number is unique and permanent. Leaking it exposes you to identity theft risks in Taiwan, unlike a passport number which changes with renewal."
    }
  },
  {
    id: 3,
    title: "Safe Travels",
    description: "Heading home for the holidays. Covered the important bits just in case! 🏠❤️",
    type: "boarding-pass",
    risky: false,
    details: {
      passengerName: "HIDDEN",
      flight: "DL 112",
      origin: "LHR",
      destination: "JFK",
      date: "22 DEC",
      seat: "12C",
      pnr: "HIDDEN",
    },
    leak: null,
    safeMessage: "Great job! By covering the barcode and ticket number, you've protected your personal data."
  },
  {
    id: 4,
    title: "Trip Booked!",
    description: "Just booked my flights! So easy with the app! 📱✈️",
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
      target: "pnr",
      reason: "Screenshots of booking apps often show the PNR clearly. This is the 'password' to your booking management!"
    }
  },
  {
    id: 5,
    title: "New Passport Arrived!",
    description: "Got my new passport today! Ready for the next 10 years of travel! 🌍🛂",
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
      target: "mrz", // Machine Readable Zone
      reason: "The bottom two lines (MRZ) contain all the info on the page: Name, Passport Number, DOB, and Expiry. It's readable by bots and scammers instantly."
    }
  },
  {
    id: 6,
    title: "Luggage Tag",
    description: "My bags are packed and ready to go! 🧳✈️ #TravelReady",
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
      target: "address",
      reason: "Never post your home address on a public luggage tag photo! It tells everyone where you live and that your house is currently empty."
    }
  },
  {
    id: 7,
    title: "Trip Confirmation",
    description: "Got the email! It's official! 📧✨ #TravelPlans",
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
      target: "pnr",
      reason: "Your Booking Reference (PNR) is the key to your entire trip. Don't share it!"
    }
  },
  {
    id: 8,
    title: "At the Gate",
    description: "Waiting to board! See you on the other side! 🛫",
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
      target: ["qr-code", "pnr", "etkt"],
      reason: "Your PNR, Ticket Number, and QR code are all sensitive. Anyone can use them to access or modify your booking!"
    }
  },
  {
    id: 9,
    title: "Ready to Fly",
    description: "Passports ready! Let's go! 🛂✈️",
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
      target: "mrz",
      reason: "The MRZ code at the bottom of your passport is meant for machines, but scammers have machines too!"
    }
  }
];
