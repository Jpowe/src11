export const data1 = [
  {
    id: 14,
    name: "Quick Access",
    level: 1,
    show: true,
    leaf: true,
    favorite: false,
    endpoint: "/quickAccess",
    allow: "Portal User"
  },
  {
    id: 15,
    name: "Workflow",
    level: 1,
    show: true,
    leaf: false,
    favorite: false,
    endpoint: "/workflow/dashboard",
    allow: "Workflow User"
  },
  {
    id: 1,
    name: "Investments",
    level: 1,
    show: true,
    leaf: false,
    endpoint: "/investments/portfolio"
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
    name: "BoxToken",
    level: 1,
    show: true,
    leaf: true,
    favorite: false,
    endpoint: "/boxtokenNative"
  },
  {
    id: 13,
    name: "G-log Input",
    level: 1,
    show: true,
    leaf: true,
    favorite: false,
    endpoint: "/glogInput",
    allow: "Gift Log Admin"
  },
  {
    id: 16,
    name: "Mrs. Smith's Calendar",
    level: 1,
    show: true,
    leaf: true,
    favorite: false,
    endpoint: "/irisCalendar",
    allow: "Iris PA"
  },
  {
    id: 17,
    name: "Gift mgmt",
    level: 1,
    show: true,
    leaf: false,
    favorite: false,
    endpoint: "/giftLog",
    allow: "Gift Log Admin"
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
    id: 210,
    name: "Export to Bloomberg",
    parentId: 11,
    level: 2,
    show: false,
    leaf: true,
    favorite: false,
    endpoint: "/addepar/bloomberg",
    parentName: "Addepar",
    allow: "AddeparBloombergSubmissions"
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
    parentName: "Addepar",
    allow: "AddeparBloombergSubmissions"
  },
  {
    id: 212,
    name: "Dashboard",
    parentId: 15,
    level: 2,
    show: false,
    leaf: true,
    favorite: false,
    endpoint: "/workflow/dashboard",
    parentName: "Workflow",
    allow: "Workflow HR"
  },
  {
    id: 213,
    name: "My Tasks",
    parentId: 15,
    level: 2,
    show: false,
    leaf: true,
    favorite: false,
    endpoint: "/workflow/myTasks",
    parentName: "Workflow",
    allow: "Workflow User"
  },
  {
    id: 214,
    name: "New Hire Request",
    parentId: 15,
    level: 2,
    show: false,
    leaf: true,
    favorite: false,
    endpoint: "/workflow/newHireRequest",
    parentName: "Workflow",
    allow: "Workflow Admin"
  },
  {
    id: 215,
    name: "Toll Pass Request",
    parentId: 15,
    level: 2,
    show: false,
    leaf: true,
    favorite: false,
    endpoint: "/workflow/tollPass",
    parentName: "Workflow",
    allow: "Workflow Admin"
  },
  {
    id: 216,
    name: "CCA",
    parentId: 15,
    level: 2,
    show: false,
    leaf: true,
    favorite: false,
    endpoint: "/workflow/cc",
    parentName: "Workflow",
    allow: "Workflow Admin"
  },
  {
    id: 217,
    name: "Gift events",
    parentId: 17,
    level: 2,
    show: false,
    leaf: true,
    favorite: false,
    endpoint: "/giftLog",
    parentName: "Gift mgmt",
    allow: "Gift Log Admin"
  },
  {
    id: 218,
    name: "Gifts",
    parentId: 17,
    level: 2,
    show: false,
    leaf: true,
    favorite: false,
    endpoint: "/gift",
    parentName: "Gift mgmt",
    allow: "Gift Log Admin"
  },
  {
    id: 219,
    name: "People",
    parentId: 17,
    level: 2,
    show: false,
    leaf: true,
    favorite: false,
    endpoint: "/people",
    parentName: "Gift mgmt",
    allow: "Gift Log Admin"
  }
];

export const data3 = [];
