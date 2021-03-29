import gql from 'graphql-tag';

export const MUTATE_EMPLOYER_ACCOUNT = gql`
mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
){
  createEmployer(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
    id
    firstName
    lastName
    email
  }
}
`;
