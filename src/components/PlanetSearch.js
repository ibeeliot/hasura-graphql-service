import React, { useState } from 'react';
// lazy only runs when search is clicked
import { useLazyQuery, gql } from '@apollo/client';
import Search from './Search'
import Planets from './Planets'

const SEARCH = gql`
query Search($match: String) {
    planets(where: {name: {_ilike: $match}}, order_by: {name: asc}) {
      cuisine
      id
      name
    }
  }
`

const PlanetSearch = () => {
    const [inputVal, setInputVal] = useState('');

    // search is returned as a function you can invoke when you want
    // the query to actually load so it's not just automatic and top level
    const [search, { data, loading, err }] = useLazyQuery(SEARCH);

    console.log('this is data', data)

    return <div>
        <Search inputVal={inputVal} onChange={e => setInputVal(e.target.value)} onSearch={() => { search({ variables: { match: `%${inputVal}%` } }) }} />
        <Planets newPlanets={data && data.planets} />
    </div>
}

export default PlanetSearch;