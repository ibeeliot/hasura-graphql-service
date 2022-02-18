import React from 'react';
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client';
import { Badge } from './shared/Badge';
import { List, ListItem } from './shared/List';

const PLANETS = gql`
{
  planets {
    cuisine
    id
    name
  }
}`

export default function Planets({ newPlanets }) {
  const { data, loading, error } = useQuery(PLANETS);
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error </p>

  const renderPlanets = (planets) => {
    return planets.map(({ id, name, cuisine }) => {
      return (
        <ListItem key={id}>
          <Link to={`/planet/${id}`}>
            {name} <Badge> {cuisine}</Badge>
          </Link>
        </ListItem>
      )
    })
  }

  return (
    <List>
      {
        renderPlanets(newPlanets || data.planets)
      }
    </List>
  )
}