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

export const LOGIN_USER = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    refreshToken
    accessToken
  }
}
`;
