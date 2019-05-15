const subForms1 = [
  {
    name: "subform",
    title: "",
    fields: [
      { name: "employeeName", title: "Employee Name", required: true },
      {
        name: "newPassOrUpdatePass",
        title: "Toll Pass Type",
        type: "toll pass type",
        required: true,
        uiType: "dd",
        uiOptions: [
          {
            name: "New Toll Pass",
            title: "New Toll Pass",
            value: "New Toll Pass"
          },
          {
            name: "Replacement/Update Toll Pass",
            title: "Replacement/Update Toll Pass",
            value: "Replacement/Update Toll Pass"
          }
        ]
      },
      {
        name: "workLocation",
        title: "Work Location",
        type: "workLocation",
        required: true,
        uiType: "dd",
        uiOptions: [
          {
            name: "houstonInvOffice",
            title: "Houston Investment Office",
            value: "Houston Investment Office"
          },
          {
            name: "broomfieldOffice",
            title: "Broomfield Office",
            value: "Broomfield Office"
          }
        ]
      },
      {
        name: "carYear",
        title: "Car Year",
        type: "number"
      },
      {
        name: "carMake",
        title: "Car Make"
      },
      {
        name: "carModel",
        title: "Car Model"
      },
      {
        name: "carColor",
        title: "Car Color"
      },
      {
        name: "licensePlateNumber",
        title: "License Plate Number"
      },
      {
        name: "stateLicensePlate",
        title: "License Plate State"
      },
      {
        name: "temporaryPlate",
        title: "Is it a temporary plate?",
        uiType: "dd",
        required: true,
        uiOptions: [
          { name: "one", title: "Yes", value: "Yes" },
          {
            name: "two",
            title: "No",
            value: "No"
          }
        ]
      }
    ]
  }
];

export const forms = [{ title: "Toll Pass Request Form", form: subForms1 }];

export const appVars = {
  finalMessage: "Request submitted."
};
