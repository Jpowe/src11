export const columns = [
  { name: "submittedTimestamp", title: "SUBMITTED", type: "date", order: 2 },
  { name: "createdTimestamp", title: "CREATED", type: "date", order: 3 },
  { name: "status", title: "STATUS", type: "string", order: 4 },
  { name: "voidAmount", title: "VOID $", type: "currency", order: 5 },
  { name: "voidCount", title: "VOID #", type: "integer", order: 6 },
  { name: "nonVoidAmount", title: "NON-VOID $", type: "currency", order: 7 },
  { name: "nonVoidCount", title: "NON-VOID #", type: "integer", order: 8 },
  { name: "fileID", title: "FILE ID", type: "string", order: 9 },
  { name: "submittedBy", title: "SUBMITTER", type: "string", order: 10 },
  { name: "override", title: "RESUBMIT", type: "component", order: 1 }
];

export const tempDataPortfolio = [
  {
    name: "Portfolio 1",
    uuid: 101,
    list: [
      {
        uuid: 1,
        field1: "text11",
        field2: "text12",
        field3: "text13",
        field4: "f4"
      },
      {
        uuid: 2,
        field1: "text21",
        field2: "text22",
        field3: "text23",
        field4: "f4"
      }
    ]
  },
  {
    name: "Portfolio 2",
    list: [
      {
        uuid: 3,
        field1: "text11",
        field2: "text12",
        field3: "text13",
        field4: "f4"
      },
      {
        uuid: 4,
        field1: "text21",
        field2: "text22",
        field3: "text23",
        field4: "f4"
      }
    ]
  }
];
export const tempDataSubmissions = [
  {
    name: "1",
    uuid: 201,
    list: [
      { uuid: 11, f1: "xyz11", field2: "xyz12", field3: "xyz13" },
      { uuid: 12, field1: "txy21", field2: "xxxtttt22", field3: "xtz23" }
    ]
  },
  {
    name: "2",
    uuid: 202,
    list: [
      { uuid: 13, field1: "sub211", field2: "sub212", field3: "sub213" },
      { uuid: 14, field1: "sub221", field2: "sub222", field3: "sub223" }
    ]
  }
];

export const months = [
  { name: "jan", title: "January", value: 0 },
  { name: "feb", title: "February", value: 1 },
  { name: "mar", title: "March", value: 2 },
  { name: "apr", title: "April", value: 3 },
  { name: "may", title: "May", value: 4 },
  { name: "jun", title: "June", value: 5 },
  { name: "jul", title: "July", value: 6 },
  { name: "aug", title: "August", value: 7 },
  { name: "sep", title: "September", value: 8 },
  { name: "oct", title: "October", value: 9 },
  { name: "nov", title: "November", value: 10 },
  { name: "dec", title: "December", value: 11 }
];
