export const columns = [
  {
    name: "createdTimestamp",
    title: "CREATED",
    type: "date",
    order: 1
  },
  { name: "status", title: "STATUS", type: "string", order: 2 },
  { name: "submittedBy", title: "SUBMITTER", type: "string", order: 3 }
];
export const rows = [
  {
    id: 1,
    createdTimestamp: "2/9/2017",
    status: "Success",

    submittedBy: "Me"
  },
  {
    id: 2,
    createdTimestamp: "2/8/2017",
    status: "Fail",

    submittedBy: "Me"
  },
  {
    id: 3,
    createdTimestamp: "12/8/2016",
    status: "Success",

    submittedBy: "Me"
  }
];
