export const data1 = [
  {
    id: 1,
    name: "Investments",
    level: 1,
    show: true,
    leaf: false,
    endpoint: "/investments/portfolio"
  },
  {
    id: 2,
    name: "FlowWright Login",
    level: 1,
    show: true,
    leaf: true,
    favorite: false,
    endpoint: "/flowWright"
  },
  {
    id: 3,
    name: "FlowWright Task",
    level: 1,
    show: true,
    leaf: true,
    favorite: false,
    endpoint: "/flowWright2"
  },
  {
    id: 4,
    name: "FlowWright Form",
    level: 1,
    show: true,
    leaf: true,
    favorite: false,
    endpoint: "/flowWright3"
  },
  {
    id: 7,
    name: "BoxToken",
    level: 1,
    show: true,
    leaf: true,
    favorite: false,
    endpoint: "/boxtoken"
  },
  {
    id: 8,
    name: "TEST LEVEL1",
    level: 1,
    show: true,
    leaf: false,
    endpoint: "/testlevel1"
  },
  {
    id: 9,
    name: "Positive Pay",
    level: 1,
    show: true,
    leaf: true,
    favorite: false,
    endpoint: "/positivePay",
    allow: "PositivePayBanks"
  },
  {
    id: 10,
    name: "Pending List",
    level: 1,
    show: true,
    leaf: true,
    favorite: false,
    endpoint: "/pendingList",
    allow: "CreatePendingSubmission"
  },
  {
    id: 11,
    name: "Addepar",
    level: 1,
    show: true,
    leaf: false,
    endpoint: "/addepar/bloomberg",
    allow: "AddeparBloombergSubmissions"
  },
  {
    id: 12,
    name: "BoxToken Native",
    level: 1,
    show: true,
    leaf: true,
    favorite: false,
    endpoint: "/boxtokenNative"
  }
];

export const data2 = [
  {
    id: 201,
    name: "Portfolio",
    parentId: 1,
    level: 2,
    show: false,
    leaf: true,
    favorite: false,
    endpoint: "/investments/portfolio",
    parentName: "Investments"
  },
  {
    id: 202,
    name: "Michael",
    parentId: 1,
    level: 2,
    show: false,
    leaf: true,
    favorite: false,
    endpoint: "/investments/michael",
    parentName: "Investments"
  },
  {
    id: 203,
    name: "Tara",
    parentId: 1,
    level: 2,
    show: false,
    leaf: true,
    favorite: false,
    endpoint: "/investments/tara",
    parentName: "Investments"
  },
  {
    id: 204,
    name: "Kaily",
    parentId: 1,
    level: 2,
    show: false,
    leaf: true,
    favorite: false,
    endpoint: "/investments/kaily",
    parentName: "Investments"
  },
  {
    id: 205,
    name: "TESTLEVEL2A",
    parentId: 8,
    level: 2,
    show: false,
    leaf: true,
    favorite: false,
    endpoint: "/testlevel1/testlevel2A"
  },
  {
    id: 206,
    name: "TESTLEVEL2B",
    parentId: 8,
    level: 2,
    show: false,
    leaf: false,
    favorite: false,
    endpoint: "/testlevel1/testlevel2B"
  },
  {
    id: 210,
    name: "Export to Bloomberg",
    parentId: 11,
    level: 2,
    show: false,
    leaf: true,
    favorite: false,
    endpoint: "/addepar/bloomberg",
    parentName: "Addepar"
  },
  {
    id: 211,
    name: "Export to Intacct",
    parentId: 11,
    level: 2,
    show: false,
    leaf: true,
    favorite: false,
    endpoint: "/addepar/intacct",
    parentName: "Addepar"
  }
];

export const data3 = [
  {
    id: 301,
    name: "TESTLEVEL3A",
    parentId: 206,
    level: 3,
    show: false,
    leaf: true,
    endpoint: "/testlevel1/testlevel2B/testllevel3A"
  },
  {
    id: 302,
    name: "TESTLEVEL3B",
    parentId: 206,
    level: 3,
    show: false,
    leaf: true,
    endpoint: "/testlevel1/testlevel2B/testllevel3B"
  },
  {
    id: 303,
    name: "TESTLEVEL3C",
    parentId: 206,
    level: 3,
    show: false,
    leaf: true,
    endpoint: "/testlevel1/testlevel2B/testllevel3C"
  }
];
