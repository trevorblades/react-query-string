import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
  ParseOptions,
  ParsedQuery,
  StringifyOptions,
  parse,
  stringify
} from 'query-string';

export interface QueryStringResult {
  [0]: ParsedQuery;
  [1]: Dispatch<SetStateAction<ParsedQuery>>;
}

export default function useQueryString(
  location: Location,
  navigate: (path: string) => void,
  parseOptions?: ParseOptions,
  stringifyOptions?: StringifyOptions
): QueryStringResult {
  const [state, setState] = useState(parse(location.search, parseOptions));

  useEffect((): void => {
    navigate(location.pathname + '?' + stringify(state, stringifyOptions));
  }, [state]);

  const setQuery: typeof setState = (values): void => {
    setState(
      (state): ParsedQuery => ({
        ...state,
        ...(typeof values === 'function' ? values(state) : values)
      })
    );
  };

  return [state, setQuery];
}
