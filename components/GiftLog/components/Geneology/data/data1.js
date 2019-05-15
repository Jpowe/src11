export const initData = [
  {
    id: `7`,
    generation: 1,
    name: "person7:ANCHOR",
    parents: ["1", "2"],
    partners: ["3"],
    children: ["4", "5", "6"]
  },
  {
    id: `1`,
    generation: 0,
    name: "person1",
    parents: [],
    partners: ["2"],
    children: ["7"]
  },
  {
    id: `2`,
    generation: 0,
    name: "person2",
    parents: [],
    partners: ["1"],
    children: ["7"]
  },
  {
    id: `3`,
    generation: 1,
    name: "person3",
    parents: [],
    partners: ["7"],
    children: ["4", "5", "6"]
  },
  {
    id: `4`,
    generation: 2,
    name: "person4",
    parents: ["7", "3"],
    partners: [],
    children: []
  },
  {
    id: `5`,
    generation: 2,
    name: "person5",
    parents: ["7", "3"],
    partners: [],
    children: []
  },
  {
    id: `6`,
    generation: 2,
    name: "person6",
    parents: ["7", "3"],
    partners: [],
    children: []
  }
];

export const clearData = {
  anchor: null,
  selectedPerson: "1",
  data: [
    {
      id: `1`,
      name: "person1:ANCHOR",
      relative: "anchor",
      relationUUID: ["0"],
      generation: 0
    },
    {
      id: `2`,
      name: "person:2",
      relative: "partner",
      relationUUID: ["1"],
      generation: 0
    },

    {
      id: `3`,
      name: "child init:3",
      relative: "child",
      relationUUID: ["1"],
      generation: 1
    },
    {
      id: `4`,
      name: "child init:4",
      relative: "child",
      relationUUID: ["1", "2"],
      generation: 1
    },
    {
      id: `5`,
      name: "parent init:4",
      relative: "parent",
      relationUUID: ["1"],
      generation: -1
    }
  ]
};
