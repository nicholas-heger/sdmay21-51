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

// currently just setting this one up the same as the other since when workers create their account they initially won't have any skills (possibly location)
export const MUTATE_WORKER_ACCOUNT = gql`
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

// export const MUTATE_WORKER_ACCOUNT = gql`
// mutation(
//     $firstName: String!
//     $lastName: String!
//     $email: String!
//     $password: String!
//     $skills: [SkillInput]
//     $location: LocationInput
// ){
//   createWorker(firstName: $firstName, lastName: $lastName, email: $email, password: $password, skills: $skills, location: $location) {
//     id
//     firstName
//     lastName
//     email
//     skills
//     location
//   }
// }
// `;
