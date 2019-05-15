export const addObjPartner = (person, selectedPerson, generation) => {
  console.log("addObjPartner");
  return {
    ...person,
    name: `${person.firstName} ${person.lastName}`,
    generation: generation,
    partners: [`${selectedPerson}`],
    children: []
  };
};
export const addObjChild = (person, selectedPerson, generation) => {
  console.log("addObjChild");
  return {
    ...person,
    name: `${person.firstName} ${person.lastName}`,
    generation: generation,
    partners: [],
    children: []
  };
};
export const addObjParent = (person, selectedPerson, generation) => {
  console.log("addObjParent  ");
  return {
    ...person,
    name: `${person.firstName} ${person.lastName}`,
    generation: generation,
    partners: [],
    children: [`${selectedPerson}`]
  };
};

/* if group/org name overides person first and last */
export const addObjMain = (person, selectedPerson) => {
  console.log("addObjMain");
  return {
    name: `${person.firstName} ${person.lastName}`,
    ...person,
    generation: 3,
    partners: [],
    children: []
  };
};

export const formatDateYYMMDD = strDate => {
  console.log("date strDate: " + strDate);
  if (!strDate) {
    return;
  }
  let arrDate = strDate.split("/");
  if (arrDate.length == 1) {
    console.log("arrDate length = 1");
    let newDt = strDate.slice(4, 8) + strDate.slice(0, 2) + strDate.slice(2, 4);
    console.log("newDt " + newDt);
    return newDt;
  }
  console.log("formatedDate " + arrDate[2] + arrDate[0] + arrDate[1]);
  return arrDate[2] + arrDate[0] + arrDate[1];
};
