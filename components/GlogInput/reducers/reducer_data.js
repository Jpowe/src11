export const giftEventInstances = [
  {
    id: 21,
    createdTimestamp: "0",
    eventType: ["Thank You"],
    date: ["9/23/90"],
    requests: [
      {
        id: 601,
        type: "requests"
      },
      {
        id: 602,
        type: "requests"
      }
    ],
    recipients: [
      {
        id: 121,
        type: "people"
      },
      {
        id: 123,
        type: "people"
      },
      { id: 501, type: "groups" }
    ],
    giftHistory: [
      {
        id: 1,
        type: "gift"
      },
      {
        id: 2,
        type: "gift"
      }
    ],
    registryStatus: [1],
    active: [1],
    recurring: [1],
    eventMonth: "09",
    eventDay: "08",
    notes: ["notes here and here for project id 21"]
  }
];
export const dataGroups = [
  {
    id: 501,
    name: "Group1",
    selected: false,
    children: [{ id: 502, name: "name group2", type: "group" }]
  },
  {
    id: 502,
    name: "Group2",
    selected: false,
    children: [{ id: 150, name: "name person5 ", type: "person" }]
  },

  { id: 511, name: "Group11", selected: "false", children: [] }
];
export const dataPeople = [
  {
    id: 121,
    firstName: "Adel",
    lastName: "Last1",
    name: "Adel Last1",
    email: "adel@person.com",
    phone: "412-122-1234",
    pob: "Denver,Co",
    dob: "1/2/19",
    dod: "",
    selected: false
  },
  {
    id: 122,
    firstName: "Bobby",
    lastName: "Last2",
    name: "Bobby Last2",
    email: "bobyl@person.com",
    phone: "333-332-1234",
    pob: "Two butts,Co",
    dob: "2/2/19",
    dod: "",
    selected: false
  },
  {
    id: 123,
    firstName: "Carmen",
    lastName: "Last3",
    name: "Carmen Last3",
    email: "carmen@person.com",
    phone: "111-222-333",
    pob: "Clevland,Co",
    dob: "3/2/19",
    dod: "",
    selected: false
  },
  {
    id: 124,
    firstName: "Dieago",
    lastName: "Last4",
    name: "Dieago Last4",
    gender: "M",
    email: "dieago@person.com",
    phone: "444-222-333",
    pob: "Detroit,Co",
    dob: "1/2/19",
    dod: "1 / 2 / 70",
    selected: false
  },
  {
    id: 150,
    firstName: "Person5",
    lastName: "OfGroup1",
    name: "Person5 OfGroup1",
    gender: "M",
    email: "dago@pern.com",
    phone: "444-222-333",
    pob: "Detroit,Co",
    dob: "1/12/11",
    dod: "",
    selected: false
  }
];
export const dataRequests = [
  {
    id: 601,
    registryStatus: "regStatus1",
    requestNotes: "req notes 1",
    recipients: [{ id: 121, name: "Adel Last1" }]
  },
  {
    id: 602,
    registryStatus: "regStatus2",
    requestNotes: "req notes 2",
    recipients: [{ id: 121, name: "Adel Last1" }, { id: 123, name: "Carmen" }]
  },
  {
    id: 603,
    registryStatus: "regStatus3",
    requestNotes: "req notes 3",
    recipients: []
  }
];
export const dataGifts = [
  {
    id: 1,
    value: 11,
    description: "Description1 gift 1a",
    requestNotes: "request notes 1",
    vendor: 1001,
    delivery: 2001,
    location: 201,
    order: 3001,
    requests: [
      {
        id: 601,
        type: "requests",
        name: "Request1"
      }
    ],
    parties: []
  },
  {
    id: 2,
    value: 12,
    description: "Description2 gift 2",
    requestNotes: "request notes 2",
    vendor: 1002,
    delivery: 2002,
    location: 203,
    order: 3002,
    requests: [],
    parties: [
      {
        id: 121,
        type: "people",
        name: "Adel Last1"
      }
    ]
  },
  {
    id: 4,
    value: 14,
    description: "Description4 gift 4",
    requestNotes: "equest notes 4",
    vendor: 1001,
    delivery: 2004,
    location: 202,
    order: 3004,
    requests: [],
    parties: [
      {
        id: 121,
        type: "people"
      }
    ]
  },
  {
    id: 5,
    value: 15,
    description: "Description5 gift 5",
    requestNotes: "equest notes 5",
    vendor: 1001,
    delivery: 2005,
    location: 202,
    order: 3005,
    requests: [],
    parties: []
  },
  {
    id: 6,
    value: 16,
    description: "Description6 gift 6",
    requestNotes: "equest notes 6",
    vendor: 1002,
    delivery: 2006,
    location: 202,
    order: 3006,
    requests: [],
    parties: []
  },
  {
    id: 7,
    value: 17,
    description: "Description7 gift 7",
    requestNotes: "request notes 7",
    vendor: 1001,
    delivery: 2007,
    location: 201,
    order: 3007,
    requests: [],
    parties: []
  }
];
export const dataVendors = [
  {
    id: 1001,
    name: "Neiman Marcus",
    contactNumber: "970-223-2211"
  },
  { id: 1002, name: "Bergdorfs", contactNumber: "212-122-3454" }
];
export const dataDeliveries = [
  {
    id: 2001,
    attentionTo: "Ms. AttentionTo2001",
    trackingNum: "23UX5",
    deliveryDate: "2/3/14"
  },
  {
    id: 2002,
    attentionTo: "Ms. AttentionTo2002",
    trackingNum: "23UX6",
    deliveryDate: "2/4/14"
  },

  {
    id: 2004,
    attentionTo: "no attention",
    trackingNum: "123",
    deliveryDate: "12/4/11"
  },
  {
    id: 2005,
    attentionTo: "no attention",
    trackingNum: "123",
    deliveryDate: "12/4/11"
  },
  {
    id: 2006,
    attentionTo: "no attention",
    trackingNum: "123",
    deliveryDate: "12/4/11"
  },
  {
    id: 2007,
    attentionTo: "no attention",
    trackingNum: "123",
    deliveryDate: "12/4/11"
  }
];
export const dataOrders = [
  {
    id: 3001,
    status: 6,
    orderNumber: 123456789,
    orderDate: "3/4/11",
    repName: "Ms. Rep",
    repPhone: "123-12-1234",
    repEmail: "a@b.co"
  },
  {
    id: 3002,
    status: 1,
    orderNumber: 123456733,
    orderDate: "3/3/11",
    repName: "Ms. Rep",
    repPhone: "123-12-1234",
    repEmail: "a@b.co"
  },
  {
    id: 3003,
    status: 2,
    orderNumber: "",
    orderDate: "",
    repName: "Ms rep 3",
    repPhone: "",
    repEmail: ""
  },
  {
    id: 3004,
    status: 1,
    orderNumber: "",
    orderDate: "",
    repName: "Ms rep 4",
    repPhone: "",
    repEmail: ""
  },
  {
    id: 3005,
    status: 2,
    orderNumber: "",
    orderDate: "",
    repName: "Ms rep 5",
    repPhone: "",
    repEmail: ""
  },
  {
    id: 3006,
    status: 1,
    orderNumber: "",
    orderDate: "",
    repName: "Ms rep 6",
    repPhone: "",
    repEmail: ""
  },
  {
    id: 3007,
    status: 1,
    orderNumber: "",
    orderDate: "",
    repName: "Ms rep 7",
    repPhone: "",
    repEmail: ""
  }
];
export const dataOrgs = [
  {
    id: 301,
    name: "org1",
    phone: "412-122-1234",
    selected: false
  },
  {
    id: 302,
    name: "org2",
    phone: "412-122-1234",
    selected: false
  },

  {
    id: 303,
    name: "org3",
    phone: "412-122-1234",
    selected: false
  }
];
export const dataAnimals = [
  {
    id: 401,
    name: "fluffy",
    address: "addy1",
    type: "dog",
    selected: false
  },
  {
    id: 402,
    name: "bonkers",
    address: "addy2",
    type: "cat",
    selected: false
  },

  {
    id: 403,
    name: "Justify",
    type: "horse",
    address: "addy3"
  }
];

export const dataLocations = [
  {
    id: 201,
    streetAddress1: "105 Edgeview Drive",
    city: "Broomfield",
    state: "CO",
    zipcode: "80021"
  },
  {
    id: 202,
    streetAddress1: "street2 Address2",
    city: "City2",
    state: "state2",
    zipcode: "zip2"
  },
  {
    id: 203,
    streetAddress1: "street3 Address3",
    city: "City3",
    state: "state3",
    zipcode: "zip3"
  }
];
