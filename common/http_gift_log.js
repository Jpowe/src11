import { createApolloFetch } from "apollo-fetch";
import { Log } from "../utils/utils";

const uri = "/api/graphql";

export const createPerson = (jwt, payload) => {
  const query = `
       mutation createPerson($input:PersonInput) {
        CreatePerson(input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
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

export const updatePerson = (jwt, userUUID, input) => {
  console.log("HTTP updatePerson " + userUUID + ",  " + JSON.stringify(input));
  //const jsn = { returnMessage: "test" };
  const query = `
     mutation updatePerson($personUUID:String,$input:PersonInput) {
      UpdatePerson(personUUID:$personUUID,input:$input) {
        uuid
        isInvisible
        presenceToken
      } }`;
  const variables = {
    personUUID: userUUID,
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

export const createPersonParent = (jwt, personID, parentID) => {
  console.log("HTTP createPersonParent " + [personID, parentID]);
  const query = `
       mutation createPersonParent( $personUUID:String, $parentUUID:String) {
        CreatePersonParent(personUUID:$personUUID,parentUUID:$parentUUID) {
                   uuid
      }
    }
    `;
  const variables = {
    personUUID: personID,
    parentUUID: parentID
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

export const createPersonPartner = (jwt, personID, partnerID, payload = {}) => {
  console.log("HTTP createPersonPartner " + [personID, partnerID]);
  const query = `
       mutation createPersonPartner( $personUUID:String, $partnerUUID:String,$input:PartnerInput) {
        CreatePersonPartner( personUUID:$personUUID,partnerUUID:$partnerUUID,input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
    personUUID: personID,
    partnerUUID: partnerID,
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

export const updatPersonPartner = (jwt, personUUID, partnerUUID, payload) => {
  console.log("HTTP updatPersonPartner payload" + JSON.stringify(payload));
  const query = `
       mutation updatPersonPartner($personUUID:String, $partnerUUID:String, $input:PartnerInput) {
        UpdatPersonPartner(personUUID:$personUUID, partnerUUID:$partnerUUID ,input:$input) {
                   uuid
      }  }`;
  const variables = {
    personUUID: personUUID,
    partnerUUID: partnerUUID,
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

export const removePersonPartner = (jwt, personUUID, partnerUUID) => {
  console.log("HTTP removePersonPartner " + [personUUID, partnerUUID]);
  const query = `
       mutation removePersonPartner( $personUUID:String,$partnerUUID:String) {
        RemovePersonPartner(  personUUID:$personUUID,partnerUUID:$partnerUUID)
    }
    `;
  const variables = {
    personUUID: personUUID,
    partnerUUID: partnerUUID
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

export const removePersonParent = (jwt, personUUID, parentUUID) => {
  console.log("HTTP removePersonParent " + [personUUID, parentUUID]);
  const query = `
       mutation removePersonParent( $personUUID:String,$parentUUID:String) {
        RemovePersonParent(  personUUID:$personUUID,parentUUID:$parentUUID)
    }
    `;
  const variables = {
    personUUID: personUUID,
    parentUUID: parentUUID
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

/////////////////////////////////////////////////////////////////////////////////

export const getPerson = (jwt, personUUID) => {
  const query = `
    query Person($personUUID:String){
      Person(personUUID:$personUUID){
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
        deathDate,
        parents{
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
        },
        children{
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
        },
        partners{
          person{
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
      }
    }
  `;
  const variables = {
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

export const getPersonGifts = (jwt, personUUID) => {
  const query = `
    query Person($personUUID:String){
      Person(personUUID:$personUUID){
        uuid
        giftEvents{
        active
        recurring
        addedDate
        eventDay
        eventMonth
        eventYear
        eventType
        notes
        registryStatus
        createdTimestamp
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
    }
  `;
  const variables = {
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
      eventYear
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

export const getGiftEvents2 = (jwt, filter) => {
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
            eventYear
            eventType
            notes
            registryStatus
            createdTimestamp
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
                 description,
                 giftNotes,
                 sentiment,
                 assignedTo,
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
       active
       recurring
       addedDate
       eventDay
       eventMonth
       eventYear
       eventType
       notes
       registryStatus
       createdTimestamp
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

export const getPersonGeneology = (jwt, str) => {
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
      deathDate,
      parents{
        uuid,
        firstName,
        lastName
      },
      children{
        uuid,
        firstName,
        lastName
      },
      partners{
        relationshipType,
        person{
          uuid,
          firstName,
          lastName
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

export const createGiftEvent = (jwt, payload) => {
  console.log("HTTP createGiftEvent");
  let newPayload;
  const requiredPayload = {
    recurring: true,
    registryStatus: "Yes",
    active: true
  };
  newPayload = { ...requiredPayload, ...payload };
  const query = `
       mutation createGiftEvent($input:GiftEventInput) {
        CreateGiftEvent(input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
    input: newPayload
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

export const createGiftRequest = (jwt, payload) => {
  console.log("HTTP createGiftRequest");
  const query = `
       mutation createGiftRequest($input:GiftRequestInput) {
        CreateGiftRequest(input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
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

export const createGiftRequestPerson = (jwt, requestID, personID) => {
  console.log("HTTP createGiftRequestPerson " + [requestID, personID]);
  const query = `
       mutation createGiftRequestPerson($giftRequestUUID:String,$personUUID:String) {
        CreateGiftRequestPerson( giftRequestUUID:$giftRequestUUID,personUUID:$personUUID) {
                   uuid
      }
    }
    `;
  const variables = {
    giftRequestUUID: requestID,
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

export const removeGiftRequestPerson = (jwt, requestID, personID) => {
  console.log("HTTP removeGiftRequestPerson " + [requestID, personID]);
  const query = `
       mutation removeGiftRequestPerson($giftRequestUUID:String,$personUUID:String) {
        RemoveGiftRequestPerson( giftRequestUUID:$giftRequestUUID,personUUID:$personUUID)
    }
    `;
  const variables = {
    giftRequestUUID: requestID,
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

export const updateGiftEvent = (jwt, uuid, payload) => {
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

export const createGiftEventPerson = (jwt, geiID, personID) => {
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

export const createGift = (jwt, payload) => {
  console.log("HTTP createGift");
  /*
  const tempJSON = {
    value: 0,
    description: "placeholder",
    giftNotes: ""
  };
  */
  const query = `
       mutation createGift($input:GiftInput) {
        CreateGift(input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
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

export const createGiftRequestGift = (jwt, giftRequestID, giftID, payload) => {
  console.log("HTTP createGiftRequestGift " + [giftRequestID, giftID]);
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

export const createGiftEventGroup = (jwt, geiID, groupID) => {
  console.log("HTTP createGiftEventGroup gei, group " + [geiID, groupID]);
  const query = `
       mutation createGiftEventGroup($giftEventUUID:String,$groupUUID:String) {
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

export const createGiftEventOrganization = (jwt, geiID, orgID) => {
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
