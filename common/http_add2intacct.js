import { createApolloFetch } from "apollo-fetch";

const uri = "/api/graphql";

export const getAddeparIntacctPortfolios = (jwt, login) => {
  const query = `
  query {
    AddeparIntacctPortfolios {
      uuid
      name
      submissions {
        uuid
        createdTimestamp
        endDate
        status
        statusMessage
        submittedBy
        submissionRanges{
          monthEnding
          addeparAccounts{
            accountID
            accountName
            accountDeltas{
              addeparCategory
              addeparAmount
              intacctCredits{
                accountID
                amount
              }
              intacctDebits{
                accountID
                amount
              }
            }
          }
        }
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

export const createAddeparIntacctSubmission = (
  jwt,
  login,
  endDate,
  portfolioID
) => {
  const query = `
     mutation createAddeparIntacctSubmission($portfolioID:String,$endDate:String) {
      CreateAddeparIntacctSubmission(portfolioID:$portfolioID ,endDate:$endDate) {
                 uuid
    }
  }
  `;
  const variables = {
    portfolioID: portfolioID ? portfolioID : null,
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

export const addeparIntacctSubmission = (jwt, login) => {
  const query = `
  query {
    AddeparIntacctSubmission {
        uuid
        createdTimestamp
        endDate
        status
        statusMessage
        submittedBy
        submissionRanges{
          monthEnding
          addeparAccounts{
            accountID
            accountName
            accountDeltas{
              addeparCategory
              addeparAmount
              intacctCredits{
                accountID
                amount
              }
              intacctDebits{
                accountID
                amount
              }
            }
          }
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

export const approveAddeparIntacctSubmission = (
  jwt,
  login,
  submissionID,
  arrAccounts
) => {
  const query = `
     mutation approveAddeparIntacctSubmission($submissionUUID:String,$accounts:AccountEntry) {
      ApproveAddeparIntacctSubmission(submissionUUID:$submissionUUID ,accounts:$accounts) {
                 uuid
    }
  }
  `;
  const variables = {
    submissionUUD: submissionID ? submissionID : null,
    accounts: arrAccounts
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
