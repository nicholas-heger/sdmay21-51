import gql from 'graphql-tag';
// import { SkillInput } from '../classes/SkillInput';
// import { LocationInput } from '../classes/LocationInput';

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
    $skills: [SkillInput]
    $location: LocationInput
){
  createWorker(firstName: $firstName, lastName: $lastName, email: $email, password: $password, skills: $skills, location: $location) {
    id
    firstName
    lastName
    email
  }
}
`;
