export const statuses = [
  { status: "discovery", title: "Discovery", color: "#9FA8DA", value: 1 },
  { status: "accounting", title: "Accounting", color: "#FFF59D", value: 2 },
  {
    status: "awaitApproval",
    title: "Awaiting approval",
    color: "#FFCC80",
    value: 3
  },
  { status: "approved", title: "Approved", color: "", value: 4 },
  { status: "vendor", title: "Vendor", color: "#A5D6A7", value: 5 },
  { status: "wrap", title: "Wrap", color: "#EF9A9A", value: 6 },
  { status: "received", title: "Received", color: "#9E9E9E", value: 7 }
];
export const registryStatuses = [
  { name: "Yes", title: "Yes", value: 1 },
  { name: "No", title: "No", value: 2 }
];
export const activeStatuses = [
  { name: "True", title: "True", value: 1 },
  { name: "false", title: "False", value: 2 }
];
export const genderStatuses = [
  { name: "Female", title: "Female", value: 1 },
  { name: "Male", title: "Male", value: 2 },
  { name: "Unknown", title: "Unknown", value: 3 }
];
export const assignedTo = [
  { status: "placeholder", title: "Assigned to:", value: "" },
  { status: "person1", title: "Person one", value: 1 }
];
export const columnsGiftEventInstance = [
  { name: "eventType", title: "EVENT", type: "string", order: 1 },
  { name: "date", title: "DATE", type: "string", order: 2 },
  { name: "recipients", title: "RECIPIENTS", type: "string", order: 3 },
  { name: "registry", title: "REGISTRY STATUS", type: "string", order: 4 },
  { name: "recurring", title: "RECURRING", type: "string", order: 5 }
];

export const columnsPerson = [
  { name: "placeholder", title: "", type: "string", order: 1 },
  { name: "firstName", title: "First name", type: "string", order: 2 },
  { name: "middleName", title: "Middle name", type: "string", order: 3 },
  { name: "lastName", title: "Last name", type: "string", order: 4 },
  { name: "birthSurname", title: "Surname", type: "string", order: 5 },
  { name: "legalLastName", title: "Legal last", type: "string", order: 6 },
  { name: "suffix", title: "Suffix", type: "string", order: 7 }
];

export const columnsOrg = [
  { name: "placeholder", title: "", type: "string", order: 1 },
  { name: "name", title: "Name", type: "string", order: 2 }
];

export const columnsAnimal = [
  { name: "placeholder", title: "", type: "string", order: 1 },
  { name: "name", title: "Name", type: "string", order: 2 },
  { name: "type", title: "Type", type: "string", order: 3 }
];
export const columnsGroup = [
  { name: "placeholder", title: "", type: "string", order: 1 },
  { name: "name", title: "Name", type: "string", order: 2 }
];
export const columnsGift = [
  { name: "person", title: "PERSON", type: "string", order: 1 },
  { name: "address", title: "ADDRESS", type: "string", order: 2 },
  { name: "due", title: "DUE DATE", type: "date", order: 3 },
  { name: "occasion", title: "OCCASION", type: "string", order: 4 },
  { name: "status", title: "STATUS", type: "string", order: 5 },
  { name: "groupStatus", title: "GROUP STATUS", type: "string", order: 6 }
];

export const columnsLocation = [
  { name: "placeholder", title: "", type: "string", order: 1 },
  { name: "street", title: "STREET", type: "string", order: 2 },
  { name: "city", title: "CITY", type: "string", order: 3 },
  { name: "state", title: "STATE", type: "string", order: 4 },
  { name: "zip", title: "ZIP", type: "string", order: 5 }
];

export const parties = [
  { name: "people", title: "People", value: "people" },
  { name: "orgs", title: "Organization", value: "orgs" },
  { name: "animals", title: "Animals", value: "animals" },
  { name: "group", title: "Groups", value: "groups" }
];
export const events = [
  { name: "justBecause", title: "Just Because", value: 1 },
  { name: "housewarming", title: "Housewarming", value: 2 },
  { name: "donation", title: "Donation", value: 3 },
  { name: "wedding", title: "Wedding", value: 4 },
  { name: "baptism", title: "Baptism", value: 5 },
  { name: "retirement", title: "Retirement", value: 6 },
  { name: "congratulations", title: "Congratulations", value: 7 },
  { name: "babyNaming", title: "Baby Naming", value: 8 },
  { name: "babyShower", title: "Baby Shower", value: 9 },
  { name: "engagement", title: "Engagement", value: 10 },
  { name: "bridalShower", title: "Bridal Shower", value: 11 },
  { name: "graduation", title: "Graduation", value: 12 },
  { name: "batMitzvah", title: "Bat Mitzvah", value: 13 },
  { name: "adoption", title: "Adoption", value: 14 },
  { name: "newBirth", title: "New Birth", value: 15 },
  { name: "deathAnniversary", title: "Death Anniversary", value: 16 },
  { name: "marriageAnniversary", title: "Marriage Anniversary", value: 17 },
  { name: "workAnniversary", title: "Work Anniversary", value: 18 },
  { name: "birthday", title: "Birthday", value: 19 },
  { name: "chanukah", title: "Chanukah", value: 20 },
  { name: "christmas", title: "Christmas", value: 21 },
  { name: "valentinesDay", title: "Valentine's Day", value: 22 },
  { name: "thanksgiving", title: "Thanksgiving", value: 23 },
  { name: "holidayCard", title: "Holiday Card", value: 24 },
  { name: "roshHashanah", title: "Rosh Hashanah", value: 25 },
  { name: "passover", title: "Passover", value: 26 },
  { name: "mothersDay", title: "Mother's Day", value: 27 },
  { name: "halloween", title: "Halloween", value: 28 },
  { name: "fathersDay", title: "Father's Day", value: 29 },
  { name: "easter", title: "Easter", value: 30 },
  {
    name: "administrativeProfessionalsDay",
    title: "Administrative Professionals Day",
    value: 31
  },
  { name: "valentinesDayECard", title: "Valentine's Day ECard", value: 32 },
  { name: "mothersDayECard", title: "mother's Day ECard", value: 33 },
  { name: "funeral", title: "Funeral", value: 34 },
  { name: "getWell", title: "Get Well", value: 35 }
];

export const fieldsPerson = [
  { name: "firstName", title: "First name" },
  { name: "lastName", title: "Last name" },
  { name: "middleName", title: "Middle name" },
  {
    name: "gender",
    title: "Gender",
    uiType: "dropDown",
    options: genderStatuses
  },
  { name: "birthDate", title: "Birth date (MMDDYYYY)", type: "date" },
  { name: "personalEmail", title: "Personal email", type: "email" },
  { name: "alternateEmail", title: "Alternate email", type: "email" },
  { name: "personalMobile", title: "Personal mobile", type: "phone" },
  { name: "legalFirstName", title: "Legal first name" },
  { name: "legalLastName", title: "Legal last name" },
  { name: "prefix", title: "Prefix" },
  { name: "suffix", title: "Suffix" },
  { name: "birthSurname", title: "Birth surname" },
  { name: "notes", title: "Notes", uiType: "textArea" },
  { name: "deathDate", title: "Date of death (MMDDYYYY)", type: "date" }
];
export const fieldsOrgs = [
  {
    name: "name",
    title: "Name"
  },
  {
    name: "contactNumber",
    title: "Contact number"
  },
  { name: "email", title: "Email" },
  { name: "notes", title: "Notes" },
  { name: "website", title: "Website" }
];
export const fieldsAnimals = [
  { name: "name", title: "Animal name" },
  {
    name: "type",
    title: "Animal type",
    type: "string",
    uiType: "dropDown",
    loadConfig: true,
    configName: "configAnimalType"
  },
  { name: "notes", title: "Notes" }
];
export const fieldsGroups = [{ name: "name", title: "Name" }];
export const fieldsRequests = [
  { name: "requestNotes", title: "Request Notes", uiType: "textArea" },
  {
    name: "registryStatus",
    title: "Registry status",
    uiType: "dropDown",
    options: registryStatuses
  },
  {
    name: "active",
    title: "Active",
    uiType: "dropDown",
    options: activeStatuses
  }
];
export const fieldsLog = [
  { name: "logField1", title: "Log Field 1" },
  { name: "logField2", title: "Log Field 2" }
];
export const fieldsGift = [
  { name: "value", title: "Value", type: "currency", order: 1 },
  {
    name: "description",
    title: "Description",
    type: "string",
    order: 2,
    uiType: "textArea"
  },
  {
    name: "assignedTo",
    title: "Assigned to",
    type: "string",
    order: 3,
    uiType: "dropDown",
    loadConfig: true,
    configName: "configPersonalAssts"
  },
  {
    name: "sentiment",
    title: "Sentiment",
    type: "string",
    order: 4,
    uiType: "textArea"
  },
  {
    name: "giftNotes",
    title: "Gift Notes",
    type: "string",
    order: 5,
    uiType: "textArea"
  }
];
export const fieldsLocation = [
  {
    name: "streetAddress1",
    title: "Street address 1",
    type: "string",
    order: 1
  },
  {
    name: "streetAddress2",
    title: "Street address 2",
    type: "string",
    order: 2
  },
  { name: "city", title: "City", type: "string", order: 3 },
  { name: "state", title: "State", type: "string", order: 4 },
  { name: "zipcode", title: "Zip code", type: "string", order: 5 },
  { name: "country", title: "Country", type: "string", order: 6 }
];

export const fieldsVendor = [
  { name: "name", title: "Name", uiType: "autoComplete" }
];
export const fieldsDelivery = [
  { name: "attentionTo", title: "Attention to" },
  { name: "deliveryContactNumber", title: "Delivery phone #", type: "phone" },
  { name: "deliveryTrackingNumber", title: "Delivery tracking #" },
  {
    name: "confirmedDeliveryDate",
    title: "Confirmed delivery date",
    type: "date"
  }
];
export const fieldsOrder = [
  //  { name: "status", title: "Order status", uiType: "dropDown" },
  { name: "orderNumber", title: "Order number" },
  { name: "orderDate", title: "Order date", type: "date" },
  { name: "vendorRepresentativeName", title: "Vendor rep name" },
  {
    name: "vendorRepresentativePhone",
    title: "Vendor rep phone",
    type: "phone"
  },
  { name: "vendorRepresentativeEmail", title: "Vendor rep email" }
];
export const dataLog = [
  { id: 1, logField1: "lf1" },
  { id: 2, logField2: "lf2" }
];
export const dataVendor = [{ id: 1, vendorField1: "vf1" }];
export const dataGift = [{ id: 1, person: "p1" }];
export const dataDelivery = [{ id: 1, deliveryField1: "df1" }];
export const dataPeople = [
  {
    id: 1,
    person: "person1",
    address: "addy1",
    dob: "1/2/19",
    selected: true
  },
  {
    id: 2,
    person: "person2",
    address: "addy2",
    dob: "1/22/19",
    selected: true
  },
  {
    id: 3,
    person: "person3",
    address: "addy3",
    dob: "1/24/19",
    selected: true
  },
  {
    id: 4,
    person: "person4",
    address: "addy4",
    dob: "1/25/19",
    selected: true
  }
];

export const appLogic = [
  { tab: "people", order: 1, fields: fieldsPerson, data: dataPeople },
  { tab: "log", order: 2, fields: fieldsLog, data: dataLog },
  { tab: "gifts", order: 3, fields: fieldsGift, data: dataGift },
  { tab: "locations", order: 4, fields: fieldsLocation, data: "" },
  { tab: "vendor", order: 5, fields: fieldsVendor, data: "" },
  { tab: "delivery", order: 6, fields: fieldsDelivery, data: "" },
  { tab: "order", order: 7, fields: fieldsOrder, data: "" },
  { tab: "orgs", order: 8, fields: fieldsOrgs, data: "" },
  { tab: "animals", order: 9, fields: fieldsAnimals, data: "" },
  { tab: "groups", order: 10, fields: fieldsGroups, data: "" },
  { tab: "requests", order: 11, fields: fieldsRequests, data: "" }
];
