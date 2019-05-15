const subForms1 = [
  {
    name: "subform",
    title: "Legal Name",
    fields: [
      { name: "FirstName", title: "First name", required: true },
      { name: "MiddleInitial", title: "Middle initial" },
      { name: "LastName", title: "Last name", required: true }
    ]
  },
  {
    name: "subform",
    title: "Home Address",
    fields: [
      { name: "Street", title: "Street" },
      { name: "Apt", title: "Apt or suite" },
      { name: "City", title: "City" },
      {
        name: "State",
        title: "State",
        required: true,
        uiType: "dd",
        uiOptions: [
          { name: "", title: "Select state", value: "" },
          { name: "ca", title: "California", value: "California" },
          { name: "co", title: "Colorado", value: "Colorado" },
          { name: "fl", title: "Florida", value: "Florida" },
          { name: "ny", title: "New York", value: "New York" },
          { name: "tx", title: "Texas", value: "Texas" }
        ]
      },
      { name: "Zip", title: "Zip code", type: "zipCode" }
    ]
  },
  {
    name: "subform",
    title: "Personal Contact Information",
    fields: [
      {
        name: "Email",
        title: "Personal email",
        type: "email",
        required: true
      },
      { name: "PersonalMobilePhone", title: "Mobile phone", type: "phone" },
      { name: "HomePhone", title: "Home phone", type: "phone" },
      { name: "SSN", title: "SSN", type: "ssn", required: true },
      {
        name: "DateOfBirth",
        title: "Date of birth",
        type: "date",
        required: true
      },
      {
        name: "Gender",
        title: "Gender",
        type: "gender",
        uiType: "dd",
        uiOptions: [
          { name: "", title: "Select gender", value: "" },
          { name: "male", title: "M", value: "M" },
          { name: "female", title: "F", value: "F" }
        ]
      },
      {
        name: "ethnicity",
        title: "Ethnicity",
        type: "ethnicity",
        uiType: "dd",
        uiOptions: [
          { name: "", title: "Select ethnicity", value: "" },
          {
            name: "hispanic",
            title: "Hispanic or Latino",
            value: "Hispanic or Latino"
          },
          {
            name: "white",
            title: "White (not Hispanic or Latino)",
            value: "White (not Hispanic or Latino)"
          },
          {
            name: "black",
            title: "Black or African-American (not Hispanic or Latino)",
            value: "Black or African-American (not Hispanic or Latino)"
          },
          {
            name: "asian",
            title: "Asian (not Hispanic or Latino)",
            value: "Asian (not Hispanic or Latino)"
          },
          {
            name: "nativeHawaiian",
            title:
              "Native Hawaiian or Other Pacific Islander (not Hispanic or Latino)",
            value:
              "Native Hawaiian or Other Pacific Islander (not Hispanic or Latino)"
          },
          {
            name: "americanIndian",
            title: "American Indian or Alaskan Native (not Hispanic or Latino)",
            value: "American Indian or Alaskan Native (not Hispanic or Latino)"
          },
          {
            name: "twoRaces",
            title: "Two or More Races (not Hispanic or Latino)",
            value: "Two or More Races (not Hispanic or Latino)"
          },
          {
            name: "noAnswer",
            title: "Choose Not to Answer",
            value: "Choose not to Answer"
          }
        ]
      }
    ]
  }
];
export const subForms2 = [
  {
    name: "subform",
    title: "",
    fields: [
      {
        name: "LegalEntity",
        title: "Legal entity",
        type: "legalEntity",
        required: true,
        uiType: "dd",
        uiOptions: [
          { name: "", title: "Select legal entity", value: "" },
          {
            name: "bscc",
            title: "Blue Spruce Capital Corp.",
            value: "Blue Spruce Capital Corp."
          },
          {
            name: "bse",
            title: "Blue Spruce Employment LLC",
            value: "Blue Spruce Employment LLC"
          },
          {
            name: "midland",
            title: "BSCC Midland Manager LLC",
            value: "BSCC Midland Manager LLC"
          },
          {
            name: "triptyk",
            title: "Triptyk Studios LLC",
            value: "Triptyk Studios LLC"
          }
        ]
      },
      {
        name: "Division",
        title: "Division",
        type: "division",
        required: true,
        uiType: "dd",
        uiOptions: [
          { name: "", title: "Select division", value: "" },
          {
            name: "householdOps",
            title: "Household Operations & Personal Assistants",
            value: "Household Operations & Personal Assistants"
          },
          {
            name: "flightOps",
            title: "Flight Operations",
            value: "Flight Operations"
          },
          {
            name: "investmentOps",
            title: "Investment Operations including JDM",
            value: "Investment Operations including JDM"
          },
          {
            name: "secondGen",
            title: "Second Generation including Triptyk",
            value: "Second Generation including Triptyk"
          },
          {
            name: "financeAndIT",
            title: "Finance & IT Operations",
            value: "Finance & IT Operations"
          }
        ]
      },
      {
        name: "Department",
        title: "Department",
        type: "department",
        required: true,
        uiType: "dd",
        uiOptions: [
          { name: "", title: "Select department", value: "" },
          {
            name: "investmentOps",
            title: "Investment Operations & Reporting",
            value: "Investment Operations & Reporting"
          },
          {
            name: "it",
            title: "Information Technology & Security",
            value: "Information Technology & Security"
          },
          {
            name: "fiancial",
            title: "Financial Planning Reporting & Taxation",
            value: "Financial Planning Reporting & Taxation"
          },
          {
            name: "concierge",
            title: "Concierge & Personal Assistance",
            value: "Concierge & Personal Assistance"
          },
          {
            name: "exOfficeBroomfield",
            title: "Executive Office - Broomfield",
            value: "Executive Office - Broomfield"
          },
          {
            name: "aviation",
            title: "Aviation Insurance & G2",
            value: "Aviation Insurance & G2"
          },
          { name: "hr", title: "Human Resources", value: "Human Resources" },
          {
            name: "taxation",
            title: "Taxation & Financial Planning",
            value: "Taxation & Financial Planning"
          },
          {
            name: "householdOps",
            title: "Household Operations",
            value: "Household Operations"
          },
          { name: "investments", title: "Investments", value: "Investments" },
          {
            name: "exOfficeHouston",
            title: "Executive Office - Houston",
            value: "Executive Office - Houston"
          },
          {
            name: "midland",
            title: "Joy Drive Midland LLC",
            value: "Joy Drive Midland LLC"
          },
          {
            name: "flightOperations",
            title: "Flight Operations",
            value: "Flight Operations"
          }
        ]
      },
      {
        name: "WorkLocation",
        title: "Work location",
        type: "workLocation",
        required: true,
        uiType: "dd",
        uiOptions: [
          { name: "", title: "Select work location", value: "" },
          { name: "malibu", title: "Malibu", value: "Malibu" },
          { name: "yacht", title: "Yacht", value: "Yacht" },
          { name: "moreno", title: "Moreno", value: "Moreno" },
          { name: "corsica", title: "Corsica", value: "Corsica" },
          { name: "hyannis", title: "Hyannis", value: "Hyannis" },
          { name: "west250", title: "250 West", value: "250 West" },
          {
            name: "triptyk",
            title: "Triptyk Studios",
            value: "Triptyk Studios"
          },
          {
            name: "sanVicente",
            title: "San Vicente Blvd.",
            value: "San Vicente Blvd."
          },
          { name: "daviesDr", title: "Davies Drive", value: "Davies Drive" },
          { name: "gozzer", title: "Gozzer Ranch", value: "Gozzer Ranch" },
          { name: "surfside", title: "Surfside", value: "Surfside" },
          {
            name: "fisherIsland",
            title: "Fisher Island/Marina Village",
            value: "Fisher Island/Marina Village"
          },
          {
            name: "lilyPond",
            title: "Lily Pond Lane",
            value: "Lily Pond Lane"
          },
          {
            name: "houstonHangar",
            title: "Houston Flight Hangar",
            value: "Houston Flight Hangar"
          },
          {
            name: "houstonInvOffice",
            title: "Houston Investment Office",
            value: "Houston Investment Office"
          },
          {
            name: "broomfieldOffice",
            title: "Broomfield Office",
            value: "Broomfield Office"
          },
          {
            name: "remote",
            title: "Remote/Home Office",
            value: "Remote/Home Office"
          }
        ]
      },
      {
        name: "Supervisor",
        title: "Supervisor",
        uiType: "dd",
        required: true,
        uiOptions: [
          { name: "", title: "Select supervisor", value: "" },
          { name: "thorn", title: "Andrea Thorn", value: "Andrea Thorn" },
          {
            name: "sheridan",
            title: "Cathy Sheridan",
            value: "Cathy Sheridan"
          },
          { name: "gloude", title: "Dale Gloude", value: "Dale Gloude" },
          { name: "wilkos", title: "Darrick Wilkos", value: "Darrick Wilkos" },
          { name: "lloyd", title: "David Lloyd", value: "David Lloyd" },
          { name: "arnold", title: "Emily Arnold", value: "Emily Arnold" },
          {
            name: "williams",
            title: "Grant Williams",
            value: "Grant Williams"
          },
          { name: "cuevas", title: "Lee Cuevas", value: "Lee Cuevas" },
          { name: "saunders", title: "Rod Saunders", value: "Rod Saunders" },
          {
            name: "shockling",
            title: "Tina Shockling",
            value: "Tina Shockling"
          }
        ]
      }
    ]
  },

  {
    name: "subform",
    title: "",
    fields: [
      {
        name: "EmploymentType",
        title: "Employment type",
        uiType: "dd",
        required: true,
        uiOptions: [
          { name: "", title: "Select employment type", value: "" },
          {
            name: "one",
            title: "TriNet Co-Employee Payroll",
            value: "TriNet Co-Employee Payroll"
          },
          {
            name: "two",
            title: "Independent Contractor/Consultant/Vendor",
            value: "Independent Contractor/Consultant/Vendor"
          }
        ]
      },
      {
        name: "FullOrPartTime",
        title: "Full or part time",
        uiType: "dd",
        required: true,
        uiOptions: [
          { name: "", title: "Select full or part time", value: "" },
          { name: "one", title: "Full-Time", value: "Full-Time" },
          {
            name: "two",
            title: "Part-Time",
            value: "Part-Time"
          }
        ]
      },
      {
        name: "HourlyOrSalary",
        title: "Hourly or salary",
        uiType: "dd",
        required: true,
        uiOptions: [
          { name: "", title: "Select hourly or salary", value: "" },
          { name: "one", title: "Hourly", value: "Hourly" },
          {
            name: "two",
            title: "Salary",
            value: "Salary"
          }
        ]
      },
      {
        name: "HoursPerWeek",
        title: "Hours per week",
        uiType: "dd",
        uiOptions: [
          { name: "", title: "Select hours per week", value: "" },
          { name: "one", title: "0-30", value: "0-30" },
          {
            name: "two",
            title: "30-40",
            value: "30-40"
          },
          {
            name: "three",
            title: "40+",
            value: "40+"
          }
        ]
      },
      {
        name: "FLSAStatus",
        title: "FLSA status",
        uiType: "dd",
        required: true,
        uiOptions: [
          { name: "", title: "Select FLSA", value: "" },
          { name: "one", title: "Exempt", value: "Exempt" },
          {
            name: "two",
            title: "Non-Exempt",
            value: "Non-Exempt"
          }
        ]
      },
      { name: "CompensationRange", title: "Compensation Range" }
    ]
  }
];
const subForms3 = [
  {
    name: "subform",
    title: "",
    fields: [
      {
        name: "DateOfHire",
        title: "Date of hire",
        type: "date",
        required: true
      },
      { name: "JobTitle", title: "Job title", required: true },

      {
        name: "PTOHoursPerYear",
        title: "PTO hours per year",
        type: "number"
      },
      {
        name: "OfferExpirationDate",
        title: "Offer expiration date",
        type: "date"
      },
      {
        name: "IsManager",
        title: "Is a manager",
        uiType: "dd",
        required: true,
        uiOptions: [
          { name: "", title: "Select: is a manager", value: "" },
          { name: "one", title: "Yes", value: "Yes" },
          {
            name: "two",
            title: "No",
            value: "No"
          }
        ]
      },
      {
        name: "IsCandidateViaAgency",
        title: "Candidate found via agency",
        uiType: "dd",
        required: true,
        uiOptions: [
          { name: "", title: "Select candidate agency", value: "" },
          { name: "one", title: "Yes", value: "Yes" },
          {
            name: "two",
            title: "No",
            value: "No"
          }
        ]
      }
    ]
  },
  {
    name: "subform",
    title: "Preferred Name",
    fields: [
      { name: "txtFirstNamePreferred", title: "First lastName" },
      { name: "txtMiddleInitialPreferred", title: "Middle initial" },
      { name: "txtLastNamePreferred", title: "Last name" }
    ]
  },
  {
    name: "subform",
    title: "Financial",
    fields: [
      {
        name: "FinalCompensation",
        title: "Final compensation",
        type: "currency",
        required: true
      },
      { name: "BonusPotential", title: "Bonus potential", type: "currency" },
      { name: "SigningBonus", title: "Signing bonus", type: "currency" }
    ]
  }
];
export const forms = [
  { title: "Employee information", form: subForms1 },
  { title: "Position information", form: subForms2 },
  { title: "Offer letter request", form: subForms3 }
];
