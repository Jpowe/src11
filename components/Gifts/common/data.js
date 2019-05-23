export const fieldsGiftEvent = [
  {
    name: "eventType",
    title: "Gift Type",
    uiType: "autoComplete",
    required: true
  },
  {
    name: "eventDate",
    title: "Event Date (MM/DD)",
    type: "dateMMDD",
    uiType: "textArea",
    required: true
  },
  { name: "notes", title: "Gift event notes", uiType: "textArea" }
];

export const fieldsRequest = [
  {
    name: "requestNotes",
    title: "Request Notes",
    uiType: "textArea",
    required: true
  },
  {
    name: "registryStatus",
    title: "Registry status",
    uiType: "dropDown"
    //  options: registryStatuses
  },
  {
    name: "active",
    title: "Active status",
    uiType: "dropDown",
    type: "boolean"
    //  options: activeStatuses
  }
];
export const fieldsGift = [
  { name: "value", title: "Value", type: "currency", order: 1 },
  {
    name: "description",
    title: "Description",
    type: "string",
    order: 2,
    uiType: "textArea",
    required: true
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

export const fieldsGiftOrder = [
  {
    name: "vendor",
    title: "Vendor",
    uiType: "autoComplete",
    required: true
  },
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

export const fieldsGiftDelivery = [
  { name: "location", title: "Location", uiType: "location", required: true },
  { name: "attentionTo", title: "Attention to" },
  { name: "deliveryContactNumber", title: "Delivery phone #", type: "phone" },
  { name: "deliveryTrackingNumber", title: "Delivery tracking #" },
  {
    name: "confirmedDeliveryDate",
    title: "Confirmed delivery date",
    type: "date"
  }
];
export const genderStatuses = [
  { name: "Female", title: "Female", value: 1 },
  { name: "Male", title: "Male", value: 2 },
  { name: "Unknown", title: "Unknown", value: 3 }
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

export const columnsPerson = [
  { name: "firstName", title: "First name", type: "string", order: 2 },
  { name: "middleName", title: "Middle name", type: "string", order: 3 },
  { name: "lastName", title: "Last name", type: "string", order: 4 },
  { name: "birthSurname", title: "Surname", type: "string", order: 5 },
  { name: "legalLastName", title: "Legal last", type: "string", order: 6 },
  { name: "suffix", title: "Suffix", type: "string", order: 7 },
  { name: "addMain", title: "Main", type: "string", order: 8 },
  { name: "addParent", title: "Parent", type: "string", order: 9 },
  { name: "addPartner", title: "Partner", type: "string", order: 10 },
  { name: "addChild", title: "Child", type: "string", order: 11 }
];
export const columnsOrg = [
  { name: "name", title: "Name", type: "string", order: 1 }
];

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
  { name: "False", title: "False", value: 2 }
];
export const recurringStatuses = [
  { name: "True", title: "True", value: 1 },
  { name: "False", title: "False", value: 2 }
];
export const fieldsSummary = [
  {
    name: "assignedTo",
    title: "Assigned to",
    type: "string",
    order: 1,
    uiType: "dropDown",
    loadConfig: true,
    configName: "configPersonalAssts"
  }
];

export const columnsGiftEventInstance = [
  { name: "status", title: "STATUS", type: "string", order: 1 },
  { name: "status", title: "ASSIGN", type: "string", order: 2 },
  { name: "eventType", title: "EVENT", type: "string", order: 3 },
  { name: "eventDate", title: "DATE", type: "string", order: 4 },
  { name: "party", title: "PARTY", type: "string", order: 5 },
  { name: "request", title: "REQUEST", type: "string", order: 6 },
  { name: "gift19", title: "GIFT_2019", type: "string", order: 7 },
  { name: "gift19notes", title: "2019_NOTES", type: "string", order: 8 },
  { name: "gift18", title: "GIFT_2018", type: "string", order: 9 },
  { name: "gift18notes", title: "2018_NOTES", type: "string", order: 10 },
  { name: "gift17", title: "GIFT_2017", type: "string", order: 11 },
  { name: "gift17notes", title: "2017_NOTES", type: "string", order: 12 }
];

export const fieldsOrg = [
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
export const fieldsAnimal = [
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
export const fieldsGroup = [{ name: "name", title: "Name" }];
/*
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
*/
