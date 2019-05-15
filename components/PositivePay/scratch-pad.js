// are arrays equal?
//if not which rows/objects are new

//combine arrays, with new array last
//then find uniq.  if duplicates, this tells us a row has changed
//pick last duplicate
//get uuid of changed row(s)

//DO i need to handle new rows in o2?  probably not since this is covered by'new' functioanlity in UI

const o1 = [
  { uuid: 1, status: "a", submitter: "J" },
  { uuid: 2, status: "b", submitter: "J" },
  { uuid: 3, status: "c", submitter: "J" }
];
const o2 = [
  { uuid: 1, status: "a2", submitter: "J" },
  { uuid: 2, status: "b", submitter: "J" },
  { uuid: 4, status: "c", submitter: "J" }
];

//console.log([...o1,o2])

const d = R.uniq([...o1, ...o2]);
const arrNamesGreater1 = arr => {
  const count = arr => {
    return R.countBy(R.identity, arr);
  };
  return R.keys(R.filter(x => x > 1, count(arr)));
};
R.difference(o2, o1);
/* RESULTS IN [
    {
        status: "a2",
        submitter: "J",
        uuid: 1
    },
    {
        status: "c",
        submitter: "J",
        uuid: 4
    }
]
*/
//d
//arrNamesGreater1(JSON.stringify(d))
//R.filter(x=>R.uniq(x.uuid),d)
