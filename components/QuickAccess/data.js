const employee = [
  {
    name: "Payroll/HR Website -- TriNet",
    link: "https://trinet.hrpassport.com/",
    target: "blank"
  },
  {
    name: "PTO Request for Time Off Form",
    link: "https://bluespruce.box.com/s/hfg8o65tnmg8o8hhs08hjjousfcvqm3e",
    target: "blank"
  },
  {
    name: "BSCC PTO & Private Appointment Reporting",
    link: "https://bluespruce.box.com/s/a7kfngdqa783jk2o3ejb8x67n1u8o8dn",
    locations: ["BSCC Broomfield"],
    target: "blank"
  },
  {
    name: "2019 BSCC Holidays",
    link: "https://bluespruce.box.com/s/n4u0i3t0iiid89edvlybk746aw7a4c4w",
    target: "blank"
  }
];
const financial = [
  {
    name: "BSCC Expense Report Form",
    link: "https://bluespruce.box.com/s/jqm3dx51otuukz1zx1tsbqt0bu8rizg8",
    target: "blank"
  },
  {
    name: "Toll Pass Request/Update",
    link: "https://bluespruce.box.com/s/c0sw7osdsbyutkzffw15nypiamrhpqcb",
    link: "/workflow/tollPass",
    target: "self"
  },
  {
    name: "Direct Deposit for Expense Reimbursement Form",
    link: "https://bluespruce.box.com/s/ghhbbf73y0k7u2l0b8buiyu9pv2tyejb",
    target: "blank"
  },
  {
    name: "Fitness Reimbursement",
    link: "https://bluespruce.box.com/s/2f7x9rf8gjr3f4s142iessk7eolvqona",
    target: "blank"
  },
  {
    name: "2018 BSCC Travel Policy",
    link: "https://bluespruce.box.com/s/24x5s4qhhbppvfvxq1918aizag34pjbr",
    locations: ["BSCC Broomfield", "BSCC Houston"],
    target: "blank"
  },

  {
    name: "2018 BSCC Travel Policy - Houston Office Addendum",
    link: "https://bluespruce.box.com/s/r5qpnb86sqlyh5eltlph1gq0ee4h5c7t",
    locations: ["BSCC Houston"],
    target: "blank"
  },
  {
    name: "EZ Tag",
    link: "https://bluespruce.app.box.com/file/312463821265",
    locations: ["BSCC Houston"],
    target: "blank"
  }
];
const operations = [
  {
    name: "Request Contractor Confidentiality Agreement",
    link: "/workflow/cc",
    target: "self"
  }
];

export const pageJSON = [
  { title: "Employee", list: employee },
  { title: "Financial", list: financial },
  { title: "Operations", list: operations }
];
