const subForms1 = [
  {
    name: "subform",
    title: "",
    fields: [
      {
        name: "contractorLegalEntity",
        title: "Contractor Company Name (or Independent Contractor Name)",
        required: true
      },
      {
        name: "contractorRepresentative",
        title: "Contractor Representative Name"
      },
      {
        name: "contractorPhone",
        title: "Representative Phone Number",
        type: "number"
      },
      {
        name: "contractorEmail",
        title: "Representative Email"
      },
      {
        name: "contractInPlace",
        title:
          "Is there a contract in place or will there be a signed contract in place?",
        type:
          "Is there a contract in place or will there be a signed contract in place?",
        required: true,
        uiType: "dd",
        uiOptions: [
          {
            name: "Yes",
            title: "Yes",
            value: "Yes"
          },
          {
            name: "No",
            title: "No",
            value: "No"
          }
        ]
      },
      {
        name: "contractBeginDate",
        title: "What is the first day of the contract work?",
        type: "date"
      },
      {
        name: "corporateOrPropertyFamily",
        title: "Corporate Function or Property/Family Function",
        type: "corporateOrPropertyFamily",
        required: true,
        uiType: "dd",
        uiOptions: [
          {
            name: "Corporate Function",
            title: "Corporate Function",
            value: "Corporate Function"
          },
          {
            name: "Property or Family Function",
            title: "Property or Family Function",
            value: "Property or Family Function"
          }
        ]
      },
      {
        name: "familyMember",
        title: "Which family member is primarily contracting?",
        type: "familyMember",
        uiType: "dd",
        required: true,
        uiOptions: [
          {
            name: "Mrs. and/or Mr. Smith",
            title: "Mrs. and/or Mr. Smith",
            value: "Mrs. and/or Mr. Smith"
          },
          {
            name: "Mrs. and/or Mr. Smith/Westbrook",
            title: "Mrs. and/or Mr. Smith/Westbrook",
            value: "Mrs. and/or Mr. Smith/Westbrook"
          },
          {
            name: "Mrs. and/or Mr. Smith/Swibel",
            title: "Mrs. and/or Mr. Smith/Swibel",
            value: "Mrs. and/or Mr. Smith/Swibel"
          },
          { name: "Corporate", title: "Corporate", value: "Corporate" }
        ]
      },
      {
        name: "LegalEntity",
        title: "Which of our legal entities pays the contractor?",
        uiType: "dd",
        required: true,
        uiOptions: [
          {
            name: "101 LPL, LLC",
            title: "101 LPL, LLC",
            value: "101 LPL, LLC"
          },
          {
            name: "1309 Davies, LLC",
            title: "1309 Davies, LLC",
            value: "1309 Davies, LLC"
          },
          {
            name: "22310 PCH, LLC",
            title: "22310 PCH, LLC",
            value: "22310 PCH, LLC"
          },
          {
            name: "250 West Street, LLC",
            title: "250 West Street, LLC",
            value: "250 West Street, LLC"
          },
          {
            name: "41222 Marina Village LLC",
            title: "41222 Marina Village LLC",
            value: "41222 Marina Village LLC"
          },
          {
            name: "69 Schooner Lane, LLC",
            title: "69 Schooner Lane, LLC",
            value: "69 Schooner Lane, LLC"
          },
          {
            name: "93 LPL, LLC",
            title: "93 LPL, LLC",
            value: "93 LPL, LLC"
          },
          {
            name: "97 LPL, LLC",
            title: "97 LPL, LLC",
            value: "97 LPL, LLC"
          },
          {
            name: "Air Kaitar, LLC",
            title: "Air Kaitar, LLC",
            value: "Air Kaitar, LLC"
          },
          {
            name: "Attleboro Designs",
            title: "Attleboro Designs",
            value: "Attleboro Designs"
          },
          {
            name: "Attleboro Partners, LLC",
            title: "Attleboro Partners, LLC",
            value: "Attleboro Partners, LLC"
          },
          {
            name: "B Swibel Presents, LLC",
            title: "B Swibel Presents, LLC",
            value: "B Swibel Presents, LLC"
          },
          {
            name: "Blue Spruce Capital Corp.",
            title: "Blue Spruce Capital Corp.",
            value: "Blue Spruce Capital Corp."
          },
          {
            name: "Blue Spruce Employment LLC",
            title: "Blue Spruce Employment LLC",
            value: "Blue Spruce Employment LLC"
          },
          {
            name: "BSCC Midland Manager LLC",
            title: "BSCC Midland Manager LLC",
            value: "BSCC Midland Manager LLC"
          },
          {
            name: "Civil Rights Anthology, LLC",
            title: "Civil Rights Anthology, LLC",
            value: "Civil Rights Anthology, LLC"
          },
          {
            name: "Designs by Iris",
            title: "Designs by Iris",
            value: "Designs by Iris"
          },
          {
            name: "Emma Broadway, Limited Liability Company",
            title: "Emma Broadway, Limited Liability Company",
            value: "Emma Broadway, Limited Liability Company"
          },
          {
            name: "FLNGI OPTION HOLDCO, LLC",
            title: "FLNGI OPTION HOLDCO, LLC",
            value: "FLNGI OPTION HOLDCO, LLC"
          },
          {
            name: "FLNGI OPTION SUPER HOLDCO, LLC",
            title: "FLNGI OPTION SUPER HOLDCO, LLC",
            value: "FLNGI OPTION SUPER HOLDCO, LLC"
          },
          {
            name: "Freeport LNG Investments GP, Inc.",
            title: "Freeport LNG Investments GP, Inc.",
            value: "Freeport LNG Investments GP, Inc."
          },
          {
            name: "Freeport LNG Investments, L.L.L.P.",
            title: "Freeport LNG Investments, L.L.L.P.",
            value: "Freeport LNG Investments, L.L.L.P."
          },
          {
            name: "Iris Smith Stable",
            title: "Iris Smith Stable",
            value: "Iris Smith Stable"
          },
          {
            name: "Iris Thoroughbred Holdings LLC",
            title: "Iris Thoroughbred Holdings LLC",
            value: "Iris Thoroughbred Holdings LLC"
          },
          {
            name: "Joy Drive I, LLC",
            title: "Joy Drive I, LLC",
            value: "Joy Drive I, LLC"
          },
          {
            name: "Joy Drive II, LLC",
            title: "Joy Drive II, LLC",
            value: "Joy Drive II, LLC"
          },
          {
            name: "Joy Drive Midland",
            title: "Joy Drive Midland",
            value: "Joy Drive Midland"
          },
          {
            name: "Joy Drive Midland Interest Holder",
            title: "Joy Drive Midland Interest Holder",
            value: "Joy Drive Midland Interest Holder"
          },
          {
            name: "Joy Drive Midland Investor I",
            title: "Joy Drive Midland Investor I",
            value: "Joy Drive Midland Investor I"
          },
          {
            name: "Joy Drive Midland Investor II",
            title: "Joy Drive Midland Investor II",
            value: "Joy Drive Midland Investor II"
          },
          {
            name: "Joy Drive Midland Investor III",
            title: "Joy Drive Midland Investor III",
            value: "Joy Drive Midland Investor III"
          },
          {
            name: "Joy Drive V, LLC",
            title: "Joy Drive V, LLC",
            value: "Joy Drive V, LLC"
          },
          {
            name: "Kaitar Designs",
            title: "Kaitar Designs",
            value: "Kaitar Designs"
          },
          {
            name: "Kaitar Foundation",
            title: "Kaitar Foundation",
            value: "Kaitar Foundation"
          },
          {
            name: "Kaitar Racing LLC",
            title: "Kaitar Racing LLC",
            value: "Kaitar Racing LLC"
          },
          {
            name: "Kaitar Resources, LLP",
            title: "Kaitar Resources, LLP",
            value: "Kaitar Resources, LLP"
          },
          {
            name: "Laight Street Home LLC",
            title: "Laight Street Home LLC",
            value: "Laight Street Home LLC"
          },
          {
            name: "Legacy LNG Holdings LLC",
            title: "Legacy LNG Holdings LLC",
            value: "Legacy LNG Holdings LLC"
          },
          {
            name: "M & I Smith Family, LLLP",
            title: "M & I Smith Family, LLLP",
            value: "M & I Smith Family, LLLP"
          },
          {
            name: "Michael S Smith Household Employer",
            title: "Michael S Smith Household Employer",
            value: "Michael S Smith Household Employer"
          },
          {
            name: "MS LNG Distributions LLC",
            title: "MS LNG Distributions LLC",
            value: "MS LNG Distributions LLC"
          },
          {
            name: "MS-GP Holdco, LLC",
            title: "MS-GP Holdco, LLC",
            value: "MS-GP Holdco, LLC"
          },
          {
            name: "Mucho Squared",
            title: "Mucho Squared",
            value: "Mucho Squared"
          },
          {
            name: "Once Upon A Time Productions LLC",
            title: "Once Upon A Time Productions LLC",
            value: "Once Upon A Time Productions LLC"
          },
          {
            name: "Playing Pretend Productions, LLC",
            title: "Playing Pretend Productions, LLC",
            value: "Playing Pretend Productions, LLC"
          },
          {
            name: "Red Ladders Entertainment, LLC",
            title: "Red Ladders Entertainment, LLC",
            value: "Red Ladders Entertainment, LLC"
          },
          {
            name: "Seriesfest Productions I, Inc.",
            title: "Seriesfest Productions I, Inc.",
            value: "Seriesfest Productions I, Inc."
          },
          {
            name: "Spinnokey, LLC",
            title: "Spinnokey, LLC",
            value: "Spinnokey, LLC"
          },
          {
            name: "Surfside Drive 263, LLC",
            title: "Surfside Drive 263, LLC",
            value: "Surfside Drive 263, LLC"
          },
          {
            name: "Timeline Films",
            title: "Timeline Films",
            value: "Timeline Films"
          },
          {
            name: "Triptyk Studios",
            title: "Triptyk Studios",
            value: "Triptyk Studios"
          },
          {
            name: "Villa Corsica II, LLC",
            title: "Villa Corsica II, LLC",
            value: "Villa Corsica II, LLC"
          },
          {
            name: "Villa Corsica, LLC",
            title: "Villa Corsica, LLC",
            value: "Villa Corsica, LLC"
          }
        ]
      },
      {
        name: "property",
        title: "At which property will work be performed?",
        uiType: "dd",
        required: true,
        uiOptions: [
          {
            name: "Beverly Hills, CA",
            title: "Beverly Hills, CA",
            value: "Beverly Hills, CA"
          },
          {
            name: "Bridgehampton, NY",
            title: "Bridgehampton, NY",
            value: "Bridgehampton, NY"
          },
          {
            name: "Broomfield, CO",
            title: "Broomfield, CO",
            value: "Broomfield, CO"
          },
          {
            name: "Coeur d'Alene, ID",
            title: "Coeur d'Alene, ID",
            value: "Coeur d'Alene, ID"
          },
          {
            name: "Denver, CO",
            title: "Denver, CO",
            value: "Denver, CO"
          },
          {
            name: "East Hampton, NY",
            title: "East Hampton, NY",
            value: "East Hampton, NY"
          },
          {
            name: "Fisher Island, FL",
            title: "Fisher Island, FL",
            value: "Fisher Island, FL"
          },
          {
            name: "Houston, TX",
            title: "Houston, TX",
            value: "Houston, TX"
          },
          {
            name: "Hyannis, MA",
            title: "Hyannis, MA",
            value: "Hyannis, MA"
          },
          {
            name: "Malibu, CA",
            title: "Malibu, CA",
            value: "Malibu, CA"
          },
          {
            name: "New York City, NY",
            title: "New York City, NY",
            value: "New York City, NY"
          },
          {
            name: "Pacific Palisades, CA",
            title: "Pacific Palisades, CA",
            value: "Pacific Palisades, CA"
          },
          {
            name: "Santa Monica, CA",
            title: "Santa Monica, CA",
            value: "Santa Monica, CA"
          },
          {
            name: "Vail, CO",
            title: "Vail, CO",
            value: "Vail, CO"
          }
        ]
      },
      {
        name: "standardORshort",
        title:
          "Will the contractor have direct or potential access confidential family information?",
        uiType: "dd",
        required: true,
        uiOptions: [
          {
            name: "one",
            title:
              "Contractor will have or potentially have direct access to confidential family information.",
            value:
              "Contractor will have or potentially have direct access to confidential family information."
          },
          {
            name: "two",
            title:
              "Contractor will not have direct access to confidential family information.",
            value:
              "Contractor will not have direct access to confidential family information."
          }
        ]
      }
    ]
  }
];
export const forms = [
  {
    title: "Contractor Confidentiality Agreement Request Form",
    form: subForms1
  }
];

export const appVars = {
  finalMessage:
    "Request Submitted; agreement will be emailed to you momentarily."
};
