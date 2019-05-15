import { createApolloFetch } from "apollo-fetch";
import { Log } from "../utils/utils";

const uri = "/api/graphql";

//const uri = "http://rod.bluesprucecapital.net/api/graphql";

/******************GLOG ***************************/
export const getGiftEvents = (jwt, filter) => {
  let monthFilter = filter ? filter : "06";
  const query = `
  query giftEvents($eventMonth:String){
     GiftEvents(eventMonth:$eventMonth) {
      uuid
      active
      recurring
      addedDate
      eventDay
      eventMonth
      eventType
      notes
      registryStatus
      createdTimestamp
      eventPersons{
        uuid,
        firstName,
        lastName
      }
      eventGroups{
        uuid,
        name
      }
      eventOrganizations{
        uuid,
        name
      }
      eventAnimals{
        uuid,
        name
      }
      eventGiftRequests{
        uuid
      }
    }
  }
`;
  const variables = {
    eventMonth: monthFilter
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const getGiftEvent = (jwt, id) => {
  const query = `
  query giftEvent($giftEventUUID:String){
     GiftEvent(giftEventUUID:$giftEventUUID) {
      uuid
      eventPersons{
        uuid,
        firstName,
        lastName,
        middleName,
        legalFirstName,
        legalLastName,
        personalMobile,
        personalEmail,
        alternateEmail,
        gender,
        birthDate,
        birthSurname,
        prefix,
        suffix,
        notes,
        deathDate
      }
      eventGroups{
        uuid,
        name,
        memberPersons{
          person {
            uuid
            firstName,
            lastName
          }
        }
      }
      eventOrganizations{
        uuid,
        name,
        employees{
          title,
          person{
            uuid,
            firstName,
            lastName
          }
        },
        memberGroups{
          group{
            uuid,
            name,
            category,
            memberGroups{
                group{
                  uuid,
                  name,
                  category
                }
            },
            memberPersons{
              notes,
              person{
                uuid,
                firstName,
                lastName
              }
            },
          }
        }
      }
      eventAnimals{
        uuid,
        name,
        type,
        notes
      }
      eventGiftRequests{
        uuid
        registryStatus
        requestNotes
        active
        requestGifts{
          giftYear,
          status,
          gift{
            uuid,
            value,
            description,
            giftNotes,
            sentiment,
            assignedTo,
            recipientPersons{
              uuid,
              firstName,
              lastName
            },
            recipientGroups{
              uuid,
              name
            },
            recipientOrganizations{
              uuid,
              name
            },
            recipientAnimals{
              uuid,
              name
            },
            delivery{
              uuid
              attentionTo
              deliveryContactNumber
              deliveryTrackingNumber
              confirmedDeliveryDate
              location{
                uuid
                name
                formattedAddress
              }
            }
            giftVendor{
              uuid
              orderStatus
              orderNumber
              orderDate
              vendorRepresentativeName
              vendorRepresentativePhone
              vendorRepresentativeEmail
              organization{
                uuid
                name
                contactNumber
              }
            }
          }
        }
        requestPersons{
          uuid,
          firstName,
          lastName
        }
        requestAnimals{
          uuid,
          name
        }
        requestOrganizations{
          uuid,
          category,
          name
        }
        requestGroups{
          uuid,
          name
        }
      }
    }
  }
`;
  const variables = {
    giftEventUUID: id
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createGiftEvent = (jwt, login) => {
  console.log("HTTP createGiftEvent");
  const tempJSON = {
    eventDay: "01",
    eventMonth: "13",
    eventType: "01",
    recurring: true,
    registryStatus: "Yes",
    active: true
  };
  const query = `
       mutation createGiftEvent($input:GiftEventInput) {
        CreateGiftEvent(input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
    input: tempJSON
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};
export const updateGiftEvent = (jwt, login, uuid, payload) => {
  console.log("HTTP updateGiftEvent payload" + JSON.stringify(payload));
  console.log("HTTP updateGiftEvent uuid: " + uuid);
  const query = `
       mutation updateGiftEvent($giftEventUUID:String,$input:GiftEventInput) {
        UpdateGiftEvent(giftEventUUID:$giftEventUUID,input:$input) {
                   uuid
      }  }`;
  const variables = {
    giftEventUUID: uuid,
    input: payload
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createGiftEventPerson = (jwt, login, geiID, personID) => {
  console.log("HTTP createGiftEventPerson gei, person " + [geiID, personID]);
  const query = `
       mutation createGiftEventPerson($giftEventUUID:String,$personUUID:String) {
        CreateGiftEventPerson(giftEventUUID:$giftEventUUID,personUUID:$personUUID) {
                   uuid
      }
    }
    `;
  const variables = {
    giftEventUUID: geiID,
    personUUID: personID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createGift = (jwt, login) => {
  console.log("HTTP createGift");
  const tempJSON = {
    value: 0,
    description: "placeholder",
    giftNotes: ""
  };
  const query = `
       mutation createGift($input:GiftInput) {
        CreateGift(input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
    input: tempJSON
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const updateGift = (jwt, uuid, payload) => {
  console.log("HTTP updateGift  payload" + JSON.stringify(payload));
  console.log("HTTP updateGift  uuid: " + uuid);
  const query = `
       mutation updateGift($giftUUID:String,$input:GiftInput) {
        UpdateGift(giftUUID:$giftUUID,input:$input) {
                   uuid
      }  }`;
  const variables = {
    giftUUID: uuid,
    input: payload
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createOrganization = jwt => {
  console.log("HTTP createOrganization ");
  const tempJSON = {
    name: `placeholder${Math.random()}`
  };
  const query = `
       mutation createOrganization($input:OrganizationInput) {
        CreateOrganization(input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
    input: tempJSON
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createGiftEventOrganization = (jwt, login, geiID, orgID) => {
  console.log("HTTP createGiftEventOrganization gei, org " + [geiID, orgID]);
  const query = `
       mutation createGiftEventOrganization($giftEventUUID:String,$organizationUUID:String) {
        CreateGiftEventOrganization(giftEventUUID:$giftEventUUID,organizationUUID:$organizationUUID) {
                   uuid
      }
    }
    `;
  const variables = {
    giftEventUUID: geiID,
    organizationUUID: orgID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const updateOrganization = (jwt, uuid, payload) => {
  console.log("HTTP updateOrganization payload" + JSON.stringify(payload));
  console.log("HTTP updateOrganization uuid: " + uuid);
  const query = `
       mutation updateOrganization($organizationUUID:String,$input:OrganizationInput) {
        UpdateOrganization(organizationUUID:$organizationUUID,input:$input) {
                   uuid
                   name
                   contactNumber
      }  }`;
  const variables = {
    organizationUUID: uuid,
    input: payload
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createGiftRequest = jwt => {
  console.log("HTTP createGiftRequest");
  const tempJSON = {
    registryStatus: `placeholder${Math.random()}`,
    requestNotes: `placeholder${Math.random()}`,
    active: true
  };
  const query = `
       mutation createGiftRequest($input:GiftRequestInput) {
        CreateGiftRequest(input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
    input: tempJSON
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createGiftEventGiftRequest = (jwt, geiID, grID) => {
  console.log("HTTP createGiftEventGiftRequest gei, org " + [geiID, grID]);
  const query = `
       mutation createGiftEventGiftRequest($giftEventUUID:String,$giftRequestUUID:String) {
        CreateGiftEventGiftRequest(giftEventUUID:$giftEventUUID,giftRequestUUID:$giftRequestUUID) {
                   uuid
      }
    }
    `;
  const variables = {
    giftEventUUID: geiID,
    giftRequestUUID: grID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const updateGiftRequest = (jwt, uuid, payload) => {
  console.log("HTTP updateGiftRequest payload" + JSON.stringify(payload));
  console.log("HTTP updateGiftRequest uuid: " + uuid);
  const query = `
       mutation updateGiftRequest($giftRequestUUID:String,$input:GiftRequestInput) {
        UpdateGiftRequest(giftRequestUUID:$giftRequestUUID,input:$input) {
                   uuid
      }  }`;
  const variables = {
    giftRequestUUID: uuid,
    input: payload
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createGiftRequestPerson = (jwt, geiID, personID) => {
  console.log("HTTP createGiftRequestPerson " + [geiID, personID]);
  const query = `
       mutation createGiftRequestPerson($giftRequestUUID:String,$personUUID:String) {
        CreateGiftRequestPerson( giftRequestUUID:$giftRequestUUID,personUUID:$personUUID) {
                   uuid
      }
    }
    `;
  const variables = {
    giftRequestUUID: geiID,
    personUUID: personID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const removeGiftRequestPerson = (jwt, geiID, personID) => {
  console.log("HTTP removeGiftRequestPerson " + [geiID, personID]);
  const query = `
       mutation removeGiftRequestPerson($giftRequestUUID:String,$personUUID:String) {
        RemoveGiftRequestPerson( giftRequestUUID:$giftRequestUUID,personUUID:$personUUID)
    }
    `;
  const variables = {
    giftRequestUUID: geiID,
    personUUID: personID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createGiftRequestAnimal = (jwt, geiID, animalID) => {
  console.log("HTTP createGiftRequestAnimal " + [geiID, animalID]);
  const query = `
       mutation createGiftRequestAnimal($giftRequestUUID:String,$animalUUID:String) {
        CreateGiftRequestAnimal( giftRequestUUID:$giftRequestUUID,animalUUID:$animalUUID) {
                   uuid
      }
    }
    `;
  const variables = {
    giftRequestUUID: geiID,
    animalUUID: animalID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const removeGiftRequestAnimal = (jwt, geiID, animalID) => {
  console.log("HTTP createGiftRequestAnimal " + [geiID, animalID]);
  const query = `
       mutation removeGiftRequestAnimal($giftRequestUUID:String,$animalUUID:String) {
          RemoveGiftRequestAnimal( giftRequestUUID:$giftRequestUUID,animalUUID:$animalUUID)
    }
    `;
  const variables = {
    giftRequestUUID: geiID,
    animalUUID: animalID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createGiftRequestOrganization = (jwt, geiID, organizationUUID) => {
  console.log(
    "HTTP createGiftRequestOrganization  " + [geiID, organizationUUID]
  );
  const query = `
       mutation createGiftRequestOrganization ($giftRequestUUID:String,$organizationUUID:String) {
        CreateGiftRequestOrganization ( giftRequestUUID:$giftRequestUUID,organizationUUID:$organizationUUID) {
                   uuid
      }
    }
    `;
  const variables = {
    giftRequestUUID: geiID,
    organizationUUID: organizationUUID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const removeGiftRequestOrganization = (jwt, geiID, organizationUUID) => {
  console.log(
    "HTTP removeGiftRequestOrganization  " + [geiID, organizationUUID]
  );
  const query = `
       mutation removeGiftRequestOrganization ($giftRequestUUID:String,$organizationUUID:String) {
         RemoveGiftRequestOrganization ( giftRequestUUID:$giftRequestUUID,organizationUUID:$organizationUUID)
    }
    `;
  const variables = {
    giftRequestUUID: geiID,
    organizationUUID: organizationUUID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createGiftRequestGroup = (jwt, geiID, groupUUID) => {
  console.log("HTTP createGiftRequestGroup  " + [geiID, groupUUID]);
  const query = `
       mutation createGiftRequestGroup ($giftRequestUUID:String,$groupUUID:String) {
        CreateGiftRequestGroup ( giftRequestUUID:$giftRequestUUID,groupUUID:$groupUUID) {
                   uuid
      }
    }
    `;
  const variables = {
    giftRequestUUID: geiID,
    groupUUID: groupUUID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const removeGiftRequestGroup = (jwt, geiID, groupUUID) => {
  console.log("HTTP removeGiftRequestGroup  " + [geiID, groupUUID]);
  const query = `
       mutation removeGiftRequestGroup ($giftRequestUUID:String,$groupUUID:String) {
         RemoveGiftRequestGroup ( giftRequestUUID:$giftRequestUUID,groupUUID:$groupUUID)
    }
    `;
  const variables = {
    giftRequestUUID: geiID,
    groupUUID: groupUUID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createGiftRequestGift = (jwt, giftRequestID, giftID, payload) => {
  console.log("HTTP createGiftRequestGift " + [giftRequestID, giftID]);
  /*
  const tempJSON = {
    giftYear: "1969",
    status: "status one"
  };
  */
  const query = `
       mutation createGiftRequestGift($giftRequestUUID:String,$giftUUID:String,$input:GiftRequestGiftInput) {
        CreateGiftRequestGift( giftRequestUUID:$giftRequestUUID,giftUUID:$giftUUID,input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
    giftRequestUUID: giftRequestID,
    giftUUID: giftID,
    input: payload
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createGiftPerson = (jwt, giftID, personID) => {
  console.log("HTTP createGiftPerson  " + [giftID, personID]);
  const query = `
       mutation createGiftPerson($giftUUID:String,$personUUID:String) {
        CreateGiftPerson(giftUUID:$giftUUID,personUUID:$personUUID) {
                   uuid
      }
    }
    `;
  const variables = {
    giftUUID: giftID,
    personUUID: personID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createGiftAnimal = (jwt, giftID, animalUUID) => {
  console.log("HTTP createGiftAnimal  " + [giftID, animalUUID]);
  const query = `
       mutation createGiftAnimal($giftUUID:String,$animalUUID:String) {
        CreateGiftAnimal(giftUUID:$giftUUID,animalUUID:$animalUUID) {
                   uuid
      }
    }
    `;
  const variables = {
    giftUUID: giftID,
    animalUUID: animalUUID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};
export const createGiftOrganization = (jwt, giftID, organizationUUID) => {
  console.log("HTTP createGiftOrganization  " + [giftID, organizationUUID]);
  const query = `
       mutation createGiftOrganization($giftUUID:String,$organizationUUID:String) {
        CreateGiftOrganization(giftUUID:$giftUUID,organizationUUID:$organizationUUID) {
                   uuid
      }
    }
    `;
  const variables = {
    giftUUID: giftID,
    organizationUUID: organizationUUID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};
export const createGiftGroup = (jwt, giftID, groupUUID) => {
  console.log("HTTP createGiftGroup  " + [giftID, groupUUID]);
  const query = `
       mutation createGiftGroup($giftUUID:String,$groupUUID:String) {
        CreateGiftGroup(giftUUID:$giftUUID,groupUUID:$groupUUID) {
                   uuid
      }
    }
    `;
  const variables = {
    giftUUID: giftID,
    groupUUID: groupUUID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createGiftVendor = (jwt, giftID, orgID, payload) => {
  console.log("HTTP createGiftVendor " + [giftID, orgID]);
  const query = `
       mutation createGiftVendor( $giftUUID:String,$organizationUUID:String,$input:GiftVendorInput) {
        CreateGiftVendor(giftUUID:$giftUUID,organizationUUID:$organizationUUID,input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
    giftUUID: giftID,
    organizationUUID: orgID,
    input: payload
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const removeGiftVendor = (jwt, giftID, organizationUUID) => {
  console.log("HTTP removeGiftVendor " + [giftID, organizationUUID]);
  const query = `
       mutation removeGiftVendor( $giftUUID:String,$organizationUUID:String ) {
        RemoveGiftVendor(giftUUID:$giftUUID,organizationUUID:$organizationUUID)
    }
    `;
  const variables = {
    giftUUID: giftID,
    organizationUUID: organizationUUID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const updateGiftVendor = (jwt, giftUUID, organizationUUID, payload) => {
  console.log("HTTP updateGiftVendor payload" + JSON.stringify(payload));
  const query = `
       mutation updateGiftVendor($giftUUID:String,$organizationUUID:String,$input:GiftVendorInput) {
        UpdateGiftVendor(giftUUID:$giftUUID,organizationUUID:$organizationUUID,input:$input) {
                   uuid
      }  }`;
  const variables = {
    giftUUID: giftUUID,
    organizationUUID: organizationUUID,
    input: payload
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createLocation = (jwt, input) => {
  console.log("HTTP createLocation");

  const query = `
       mutation createLocation($input:LocationInput) {
        CreateLocation(input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
    input: input
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createGiftLocation = (jwt, giftID, locationID, payload) => {
  console.log("HTTP createGiftLocation " + [giftID, locationID]);
  /*
  const tempJSON = {
    giftYear: "1969",
    status: "status one"
  };
  */
  const query = `
       mutation createGiftLocation( $giftUUID:String,$locationUUID:String,$input:GiftLocationInput) {
        CreateGiftLocation(giftUUID:$giftUUID,locationUUID:$locationUUID,input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
    giftUUID: giftID,
    locationUUID: locationID,
    input: payload
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};
export const removeGiftLocation = (jwt, giftID, locationID) => {
  console.log("HTTP createGiftLocation " + [giftID, locationID]);

  const query = `
       mutation removeGiftLocation( $giftUUID:String,$locationUUID:String ) {
        RemoveGiftLocation(giftUUID:$giftUUID,locationUUID:$locationUUID)
    }
    `;
  const variables = {
    giftUUID: giftID,
    locationUUID: locationID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const updateGiftLocation = (jwt, giftUUID, locationUUID, payload) => {
  console.log("HTTP updateGiftLocation payload" + JSON.stringify(payload));
  const query = `
       mutation updateGiftLocation($giftUUID:String,$locationUUID:String,$input:GiftLocationInput) {
        UpdateGiftLocation(giftUUID:$giftUUID,locationUUID:$locationUUID,input:$input) {
                   uuid
      }  }`;
  const variables = {
    giftUUID: giftUUID,
    locationUUID: locationUUID,
    input: payload
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const searchOrganization = (jwt, str) => {
  const query = `
  query searchOrganization($searchText:String){
     SearchOrganization(searchText:$searchText) {
      uuid,
      name,
      contactNumber,
      employees{
        title,
        person{
          uuid,
          firstName,
          lastName
        }
      },
      ownerPersons{
        person{
          uuid,
          firstName,
          lastName
        }
      },
      memberGroups{
        group{
          uuid,
          name,
          category,
          memberGroups{
              group{
                uuid,
                name,
                category
              }
          },
          memberPersons{
            notes,
            person{
              uuid,
              firstName,
              lastName
            }
          },
        }
      }
    }
  }
`;
  const variables = {
    searchText: str
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const searchOrgTEST = (jwt, str) => {
  const query = `
  query searchOrganization($searchText:String){
     SearchOrganization(searchText:$searchText) {
      uuid,
      name,
      employees{
        title,
        person{
          uuid,
          firstName,
          lastName
        }
      },
      ownerPersons{
        person{
          uuid,
          firstName,
          lastName
        }
      },
      memberGroups{
        group{
          uuid,
          name,
          category
        }
      }
    }
  }
`;
  const variables = {
    searchText: str
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const searchGroup2 = (jwt, str) => {
  const query = `
  query searchGroup($searchText:String){
     SearchGroup(searchText:$searchText) {
      uuid,
      name,
      category,
      memberPersons{
        notes,
        person{
          uuid,
          firstName,
          lastName
        }
      },
      memberGroups{
        notes,
        group{
          uuid,
          name,
          category
        }
      }
    }
  }
`;
  const variables = {
    searchText: str
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const searchPerson = (jwt, str) => {
  const query = `
  query searchPerson($searchText:String){
     SearchPerson(searchText:$searchText) {
      uuid,
      firstName,
      middleName,
      lastName,
      personalMobile,
      personalEmail,
      alternateEmail,
      gender,
      birthDate,
      birthSurname,
      legalFirstName,
      legalLastName,
      suffix,
      prefix,
      notes,
      deathDate
    }
  }
`;
  const variables = {
    searchText: str
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const searchGroup = (jwt, str) => {
  console.log("HTTP searchGroup");
  const query = `
  query searchGroup($searchText:String){
     SearchGroup(searchText:$searchText) {
      uuid,
      name,
      category,
      memberPersons{
        notes,
        person{
          uuid,
          firstName,
          lastName
        }
      },
      memberGroups{
        notes,
        group{
          uuid,
          name,
          category,
          memberPersons{
            notes,
            person{
              uuid,
              firstName,
              lastName
            }
          },
        }
      }
    }
  }
`;
  const variables = {
    searchText: str
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const searchGroupTEST = (jwt, str) => {
  console.log("HTTP searchGroup");
  const query = `
  query searchGroup($searchText:String){
     SearchGroup(searchText:$searchText) {
      uuid,
      name,
      category,
      memberPersons{
        person{
          uuid,
          firstName,
          lastName
        }
      },
      memberGroups{
        notes,
        group{
          uuid,
          name,
          memberPersons{
            person{
              uuid,
              firstName,
              lastName
            }
          }
        }
      }
    }
  }
`;
  const variables = {
    searchText: str
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const searchAnimal = (jwt, str) => {
  const query = `
  query searchAnimal($searchText:String){
     SearchAnimal(searchText:$searchText) {
      uuid,
      name,
      type
    }
  }
`;
  const variables = {
    searchText: str
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createGroup = jwt => {
  console.log("HTTP createGroup ");
  const tempJSON = {
    name: `placeholder${Math.random()}`
  };
  const query = `
       mutation createGroup($input:GroupInput) {
        CreateGroup(input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
    input: tempJSON
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const updateGroup = (jwt, uuid, payload) => {
  console.log("HTTP updateGroup payload" + JSON.stringify(payload));
  console.log("HTTP updateGroup uuid: " + uuid);
  const query = `
       mutation updateGroup($groupUUID:String,$input: GroupInput) {
        UpdateGroup(groupUUID:$groupUUID,input:$input) {
                   uuid
                   name
      }  }`;
  const variables = {
    groupUUID: uuid,
    input: payload
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createGiftEventGroup = (jwt, login, geiID, groupID) => {
  console.log("HTTP createGiftEventGroup gei, group " + [geiID, groupID]);
  const query = `
       mutation createGiftEvenGroup($giftEventUUID:String,$groupUUID:String) {
        CreateGiftEventGroup(giftEventUUID:$giftEventUUID,groupUUID:$groupUUID) {
                   uuid
      }
    }
    `;
  const variables = {
    giftEventUUID: geiID,
    groupUUID: groupID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createAnimal = jwt => {
  console.log("HTTP createAnimal ");
  const tempJSON = {
    name: `placeholder${Math.random()}`,
    type: "TBD"
  };
  const query = `
       mutation createAnimal($input:AnimalInput) {
        CreateAnimal(input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
    input: tempJSON
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createGiftEventAnimal = (jwt, login, geiID, animalID) => {
  console.log("HTTP createGiftEventAnimal gei, animal " + [geiID, animalID]);
  const query = `
       mutation createGiftEventAnimal($giftEventUUID:String,$animalUUID:String) {
        CreateGiftEventAnimal(giftEventUUID:$giftEventUUID,animalUUID:$animalUUID) {
                   uuid
      }
    }
    `;
  const variables = {
    giftEventUUID: geiID,
    animalUUID: animalID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const updateAnimal = (jwt, uuid, payload) => {
  console.log("HTTP updateAnimal payload" + JSON.stringify(payload));
  console.log("HTTP updateAnimal uuid: " + uuid);
  const query = `
       mutation updateAnimal($animalUUID:String,$input:AnimalInput) {
        UpdateAnimal(animalUUID:$animalUUID,input:$input) {
                   uuid
                   name
                  type
      }  }`;
  const variables = {
    animalUUID: uuid,
    input: payload
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const removeGiftRequestGift = (jwt, giftRequestUUID, giftUUID) => {
  console.log("HTTP removeGiftRequestGift ");

  const query = `
       mutation removeGiftRequestGift($giftRequestUUID:String,$giftUUID:String) {
        RemoveGiftRequestGift(giftRequestUUID:$giftRequestUUID,giftUUID:$giftUUID)  }`;
  const variables = {
    giftRequestUUID: giftRequestUUID,
    giftUUID: giftUUID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const removeGift = (jwt, giftUUID) => {
  console.log("HTTP removeGift ");

  const query = `
       mutation removeGift($giftUUID:String) {
        RemoveGift( giftUUID:$giftUUID)  }`;
  const variables = {
    giftUUID: giftUUID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const removeGiftEventPerson = (jwt, giftEventUUID, personUUID) => {
  console.log("HTTP removeGiftEventPerson ");
  const query = `
       mutation removeGiftEventPerson($giftEventUUID:String,$personUUID:String) {
        RemoveGiftEventPerson(giftEventUUID:$giftEventUUID,personUUID:$personUUID)  }`;
  const variables = {
    giftEventUUID: giftEventUUID,
    personUUID: personUUID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const removeGiftEventOrganization = (
  jwt,
  giftEventUUID,
  organizationUUID
) => {
  console.log("HTTP removeGiftEventOrg");
  const query = `
       mutation removeGiftEventOrganization($giftEventUUID:String,$organizationUUID:String) {
        RemoveGiftEventOrganization(giftEventUUID:$giftEventUUID,organizationUUID:$organizationUUID)  }`;
  const variables = {
    giftEventUUID: giftEventUUID,
    organizationUUID: organizationUUID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};
export const removeGiftEventGroup = (jwt, giftEventUUID, groupUUID) => {
  console.log("HTTP removeGiftEventGroup");
  const query = `
       mutation removeGiftEventGroup($giftEventUUID:String,$groupUUID:String) {
        RemoveGiftEventGroup(giftEventUUID:$giftEventUUID,groupUUID:$groupUUID)  }`;
  const variables = {
    giftEventUUID: giftEventUUID,
    groupUUID: groupUUID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};
//removeGiftEventGiftRequest
export const removeGiftEventGiftRequest = (
  jwt,
  giftEventUUID,
  giftRequestUUID
) => {
  console.log("HTTP emoveGiftEventGiftRequest");
  const query = `
       mutation removeGiftEventGiftRequest($giftEventUUID:String,$giftRequestUUID:String) {
        RemoveGiftEventGiftRequest(giftEventUUID:$giftEventUUID,giftRequestUUID:$giftRequestUUID)  }`;
  const variables = {
    giftEventUUID: giftEventUUID,
    giftRequestUUID: giftRequestUUID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const removeGiftRequest = (jwt, giftRequestUUID) => {
  console.log("HTTP removeGiftRequest");
  const query = `
       mutation removeGiftRequest($giftRequestUUID:String) {
        RemoveGiftRequest(giftRequestUUID:$giftRequestUUID)  }`;
  const variables = {
    giftRequestUUID: giftRequestUUID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const removeGiftPerson = (jwt, giftUUID, personUUID) => {
  console.log("HTTP removeGiftPerson ");
  const query = `
       mutation removeGiftPerson($giftUUID:String,$personUUID:String) {
        RemoveGiftPerson(giftUUID:$giftUUID,personUUID:$personUUID)  }`;
  const variables = {
    giftUUID: giftUUID,
    personUUID: personUUID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const removeGiftAnimal = (jwt, giftUUID, animalUUID) => {
  console.log("HTTP removeGiftAnimal ");
  const query = `
       mutation removeGiftAnimal($giftUUID:String,$animalUUID:String) {
        RemoveGiftAnimal(giftUUID:$giftUUID,animalUUID:$animalUUID)  }`;
  const variables = {
    giftUUID: giftUUID,
    animalUUID: animalUUID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const removeGiftOrganization = (jwt, giftUUID, organizationUUID) => {
  console.log("HTTP emoveGiftOrganization ");
  const query = `
       mutation removeGiftOrganization($giftUUID:String,$organizationUUID:String) {
        RemoveGiftOrganization(giftUUID:$giftUUID,organizationUUID:$organizationUUID)  }`;
  const variables = {
    giftUUID: giftUUID,
    organizationUUID: organizationUUID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const removeGiftGroup = (jwt, giftUUID, groupUUID) => {
  console.log("HTTP removeGiftOrganization ");
  const query = `
       mutation removeGiftGroup($giftUUID:String,$groupUUID:String) {
        RemoveGiftGroup(giftUUID:$giftUUID,groupUUID:$groupUUID)  }`;
  const variables = {
    giftUUID: giftUUID,
    groupUUID: groupUUID
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const updateGiftRequestGift = (
  jwt,
  giftRequestUUID,
  giftUUID,
  payload
) => {
  console.log("HTTP updateGiftRequestGift payload" + JSON.stringify(payload));
  const query = `
       mutation updateGiftRequestGift($giftRequestUUID:String, $giftUUID:String, $input:GiftRequestGiftInput) {
        UpdateGiftRequestGift(giftRequestUUID:$giftRequestUUID, giftUUID:$giftUUID ,input:$input) {
                   uuid
      }  }`;
  const variables = {
    giftRequestUUID: giftRequestUUID,
    giftUUID: giftUUID,
    input: payload
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};
