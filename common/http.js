import { createApolloFetch } from "apollo-fetch";
import { Log } from "../utils/utils";
//const uri = "https://api.graph.cool/simple/v1/cj799ixxo0sy80132jecpv6zr";
//const uri = "http://devhost:8080/api/gql-portal/graphql";
///const uri = "/api/gql-portal/graphql";

const uri = "/api/graphql";

//const uri = "http://rod.bluesprucecapital.net/api/graphql";

/*
const requestHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json"
};
*/

export const getRows = (jwt, uuid) => {
  console.log("http GETROWS JWT : " + jwt);

  const query = `
  query PortalUser {
    portalUserNotifications(uuid:$uuid) {
     message
    }
  }
`;
  //  const query = `query {portalUserNotifications{message}}`;
  const variables = {
    uuid: uuid
  };

  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    //credentials: "include"
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const setPreferences = (jwt, uuid, login, input) => {
  //const query = `mutation{deleteDeal(id:${rowId}){id}}`;
  const query = `
     mutation updatePortalUser($login:String!,$input:PortalUserInput!) {
      UpdatePortalUser(login:$login,input:$input){uuid}  }`;
  const variables = {
    login: login,
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

export const getUser = (jwt, login) => {
  console.log("http getUser " + [jwt, login]);
  const query = `
  query {
    PortalUser {
      uuid
      firstName
      lastName
      preferences
      roles {
        uuid
        name
        permissions{
          queries
          mutations
          subscriptions
        }
      }
      locations{
        type
        notes
        name
      }
      notifications {
        uuid
        title
        message
        urgent
        channel
      }
    }
  }
`;
  //  const query = `query {portalUserNotifications{message}}`;
  const variables = {
    login: login
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
/**
 * FRONT END DELETE == SET FIELD READMESSAGE TO TRUE
 */
export const deleteRow = (jwt, uuid, rows) => {
  Log("HTTP deleteRow " + [jwt, uuid, rows]);
  //const query = `mutation{deleteDeal(id:${rowId}){id}}`;
  const query = `
  mutation dismissPortalUserNotifications($uuid:String!,$notificationUUIDs: [String!]!) {
         DismissPortalUserNotifications(userUUID:$uuid,notificationUUIDs:$notificationUUIDs)  } `;
  const variables = {
    uuid: uuid,
    notificationUUIDs: rows
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

//CreatePositivePaySubmission(bankUUID: String, retryUUID: String)
export const createPositivePaySubmission = (jwt, bankUUID, retryUUID) => {
  console.log("HTTP createPP " + bankUUID + ",  " + retryUUID);
  const query = `
     mutation createPP($bankUUID:String,$retryUUID:String) {
      CreatePositivePaySubmission(bankUUID:$bankUUID,retryUUID:$retryUUID) {
                 uuid
                 fileID
                 createdTimestamp
                 submittedTimestamp
                 status
                 submittedBy
                 nonVoidAmount
                 nonVoidCount
                 voidAmount
                 voidCount
                 statusMessage
                 manualFile64
                 autoFile64
    }
  }
  `;
  const variables = {
    bankUUID: bankUUID,
    retryUUID: retryUUID ? retryUUID : null
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

export const createManualPositivePaySubmission = (jwt, bankUUID, retryUUID) => {
  Log("HTTP " + bankUUID + ",  " + retryUUID);
  const query = `
     mutation createManualPP($bankUUID:String,$retryUUID:String) {
      CreateManualPositivePaySubmission(bankUUID:$bankUUID,retryUUID:$retryUUID) {
                 uuid
                 fileID
                 createdTimestamp
                 submittedTimestamp
                 status
                 submittedBy
                 nonVoidAmount
                 nonVoidCount
                 voidAmount
                 voidCount
                 statusMessage
                 manualFile64
                 autoFile64
    }
  }
  `;
  const variables = {
    bankUUID: bankUUID,
    retryUUID: retryUUID ? retryUUID : null
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

export const createAddeparBloombergSubmission = jwt => {
  Log("HTTP CreateAddeparBloombergSubmission");
  const query = `
     mutation createAB {
      CreateAddeparBloombergSubmission {
        uuid
        createdTimestamp
        status
        submittedBy
    }
  }
  `;
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query }).then(res => res.data);
};

// mutation updatePerson($userUUID:String,$input:PersonInput) {
//  UpdatePerson(userUUID:$userUUID,input:$input) {
export const createPendingSubmission = (jwt, a, b) => {
  console.log("HTTP createPendingSubmission");
  const query = `
     mutation createPendingSubmission($input:PendingInput!) {
      CreatePendingSubmission(input:$input)
  }
  `;
  const variables = {
    //teamworkID: a,
    //  date: b
    input: { teamworkID: a, date: b }
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
export const createUpdateSubmission = (jwt, a, b) => {
  console.log("HTTP createUpdateSubmission");
  const query = `
     mutation createUpdateSubmission($input:PendingInput!) {
      CreateUpdateSubmission(input:$input)
  }
  `;
  const variables = {
    //  teamworkID: a,
    //  date: b
    input: { teamworkID: a, date: b }
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

export const createPendingReport = jwt => {
  console.log("HTTP createPendingReport");
  const query = `
     mutation createPendingReport  {
      CreatePendingReport
  }
  `;

  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query }).then(res => res.data);
};

//UpdatePresence(userUUID: String, input: PresenceInput)
//var query = `mutation CreateMessage($input: MessageInput) {
//  createMessage(input: $input) {
//  id
//  }
//}`;
export const updatePresence = (jwt, userUUID, input) => {
  Log("HTTP updatePresence " + userUUID + ",  " + JSON.stringify(input));
  //const jsn = { returnMessage: "test" };
  const query = `
     mutation updatePresence($userUUID:String,$input:PresenceInput) {
      UpdatePresence(userUUID:$userUUID,input:$input)  }`;
  const variables = {
    userUUID: userUUID,
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

export const getBanks = (jwt, login) => {
  const query = `
  query {
    PositivePayBanks {
      uuid
      name
      positivePaySubmissions {
        uuid
        fileID
        createdTimestamp
        submittedTimestamp
        status
        submittedBy
        nonVoidAmount
        nonVoidCount
        voidAmount
        voidCount
        statusMessage
      }
    }
  }
`;
  const variables = {
    login: login
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
  return apolloFetch({ query }).then(res => res.data);
};

export const getAddepar = (jwt, login) => {
  const query = `
  query {
    AddeparBloombergSubmissions {
      uuid
      createdTimestamp
      status
      submittedBy
    }
  }
`;
  const variables = {
    login: login
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
  return apolloFetch({ query }).then(res => res.data);
};

export const getPortalUsers = (jwt, login) => {
  const query = `
  query {
    PortalUsers {
      uuid
      firstName
      lastName
      lastSeenTimestamp
      returnTimestamp
      returnMessage
      presenceToken
      isInvisible
    }
  }
`;
  const variables = {
    login: login
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
  return apolloFetch({ query }).then(res => res.data);
};

/******************GLOG ***************************/
export const getGiftEvents = (jwt, login) => {
  const query = `
  query giftEvents($eventMonth:String){
     GiftEvents(eventMonth:$eventMonth) {
      uuid
      recurring
      addedDate
      eventDay
      eventMonth
      eventYear
      eventType
      notes
      registryStatus
      createdTimestamp
      giftHistory {
        status
        gift {
          description
        }
      }
      giftPersons{
        uuid,
        firstName,
        lastName
      }
    }
  }
`;
  const variables = {
    login: login,
    eventMonth: "01"
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
/*
export const getModuleConfiguration = (jwt, login) => {
  const query = `
  query configs($name:String){
     ModuleConfiguration(name:$name) {
      uuid
      name
      metaValues{
        name
        value
      }

      }
    }
  }
`;
  const variables = {
    name: name
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
*/
export const createPerson = (jwt, login) => {
  const tempJSON = {
    firstName: "placeholder",
    lastName: "placeholder"
  };
  const query = `
       mutation createPerson($input:PersonInput) {
        CreatePerson(input:$input) {
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

export const createGiftEvent = (jwt, login) => {
  const tempJSON = {
    eventDay: "01",
    eventMonth: "01",
    eventYear: "01",
    eventType: "01",
    recurring: "Yes",
    registryStatus: "Active"
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
  const tempJSON = {
    value: 0,
    description: "descript",
    requestNotes: "reqNotes"
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
/* name param
 Access Portal
 Gift Log
 */
export const getModuleConfig = (jwt, name) => {
  const query = `
  query moduleConfiguration($name:String){
     ModuleConfiguration(name:$name) {
      uuid
      name
      enumerations{
        uuid
        name
        metaValues{
          name
          value
        }
      }
      metaValues{
        name
        value
      }
    }
  }
`;
  const variables = {
    name: name
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

// mutation createPendingSubmission--WHAT TO CALL PENDINGINPUT??
export const submitCalendar = (jwt, startDate, endDate) => {
  console.log("HTTP submitCalendar");
  const query = `
     mutation createIrisCalendarSubmission($startDate:String,$endDate:String) {
       CreateIrisCalendarSubmission(startDate:$startDate,endDate:$endDate)
  }
  `;
  const variables = {
    //input: { startDate: a, endDate: b }
    startDate: startDate,
    endDate: endDate
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
