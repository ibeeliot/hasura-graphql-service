import React, { useState } from "react";
import { useSubscription, useMutation, gql, useQuery } from "@apollo/client";
import { List, ListItem } from "./shared/List";
import { Badge } from "./shared/Badge";
import InputForm from "./shared/InputForm";

const PLANET = gql`
subscription Planet($id: uuid!) {
  planets_by_pk(id: $id) {
    id
    name
    cuisine
    reviews {
      body
      id
    }
  }
}
`;

const PLANET_QUERY = gql`
query Planet($id: uuid!) {
  planets_by_pk(id: $id) {
    id
    name
    cuisine
    reviews {
      body
      id
    }
  }
}
`;
// const PLANET = gql`
// query Planet($id: uuid!) {
//     planets_by_pk(id: $id) {
//       id
//       name
//       cuisine
//       reviews {
//         body
//         id
//       }
//     }
//   }
// `;

const ADD_REVIEW = gql`
 mutation addReviews($body: String, $planet_id: uuid!) {
  insert_reviews(objects: {body: $body, planet_id: $planet_id}) {
    affected_rows
  }
}
`;

const Planet = ({
  match: {
    params: { id },
  },
}) => {
  const [inputVal, setInputVal] = useState("");
  const { loading, data } = useQuery(PLANET_QUERY, {
    variables: { id },
  });
  // const { loading, data } = useSubscription(PLANET, {
  //   variables: { id },
  // });
  const [addReview] = useMutation(ADD_REVIEW);
  console.log('this is data coming from subscription', data)

  if (loading) return <p>Loading ...</p>;

  // const { name, cuisine, reviews } = data?.planets_by_pk;
  const { name, cuisine, reviews } = data?.planets_by_pk;
  // const name = "nane"
  // const cuisine = "cuisine"
  // const reviews = [
  //   { id: '123123', body: "review rewview something" }
  // ]

  return (
    <div>
      <h3>
        {name} <Badge>{cuisine}</Badge>
      </h3>
      <InputForm
        inputVal={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onSubmit={() => {
          addReview({ variables: { planet_id: id, body: inputVal } })
            .then(() => setInputVal(""))
            .catch((e) => {
              setInputVal(e.message);
            });
        }}
        buttonText="Submit"
      />
      <List>
        {reviews.map((review) => (
          <ListItem key={review.id}>{review.body}</ListItem>
        ))}
      </List>
    </div>
  );
}

export default Planet;