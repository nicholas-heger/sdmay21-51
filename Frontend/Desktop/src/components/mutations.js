import gql from 'graphql-tag';
import { LocationInput } from '../classes/LocationInput';

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

export const MUTATE_WORKER_ACCOUNT = gql`
mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
){
  createWorker(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
    id
    firstName
    lastName
    email
  }
}
`;

export const MUTATE_WORKER_ACCOUNT_ADD_LOCATION = gql`
mutation(
    $id: ID!
    $location: LocationInput
){
  updateWorker(id: $id, location: $location) {
    id
  }
}
`;
