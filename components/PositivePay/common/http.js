//import * as Constants from "./constants";
import _ from "lodash";
import { createApolloFetch } from "apollo-fetch";
const uri = "https://api.graph.cool/simple/v1/cje8v4wif0gbu0129hwu6zacc";

export const getRows = () => {
  const query = "query{allColumns{name,title,type,order}}";
  const apolloFetch = createApolloFetch({ uri });
  return apolloFetch({ query }).then(res => res.data);
};
export const getRows2 = () => {
  const query =
    "query{allRowsbofas{id,date,fileId,nonVoidAmount,nonVoidBatchCount,status,voidAmount,voidBatchCount,submittedBy}}";
  const apolloFetch = createApolloFetch({ uri });
  return apolloFetch({ query }).then(res => res.data);
};
export const getRows3 = () => {
  const query =
    "query{allRowscobizes{id,date,fileId,nonVoidAmount,nonVoidBatchCount,status,voidAmount,voidBatchCount,submittedBy}}";
  const apolloFetch = createApolloFetch({ uri });
  return apolloFetch({ query }).then(res => res.data);
};
