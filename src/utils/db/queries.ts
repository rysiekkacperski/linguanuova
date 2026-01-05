import { createQueries, Queries, Store } from 'tinybase';

const createCustomQueries = (storeLaunched: Store) => {
  let queries: Queries = createQueries(storeLaunched);
  return queries;
} 

export default createCustomQueries;