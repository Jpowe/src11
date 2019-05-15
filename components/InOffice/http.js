import { createApolloFetch } from "apollo-fetch";
import { Log } from "../../utils/utils";
const uri = "https://api.graph.cool/simple/v1/cjdna1o5g6t300176r6xjfp9d";

export const getRows = () => {
  const query =
    "query{ allMessages {id,name,messageText,utcTime,status,frontLine}}";
  const apolloFetch = createApolloFetch({ uri });
  return apolloFetch({ query }).then(res => res.data);
};

const queryName = `
mutation updateMessage ($id: ID!, $val1: String, $val2: Float) {
  updateMessage (id: $id, messageText:$val1, utcTime:$val2) {
    id
  }
}
`;

export const updateField = (rowId, value1, value2) => {
  const variables = {
    id: rowId,
    val1: value1,
    val2: value2
  };
  const apolloFetch = createApolloFetch({ uri });
  return apolloFetch({ query: queryName, variables }).then(res => Log(res));
};
