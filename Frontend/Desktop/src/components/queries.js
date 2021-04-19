import gql from 'graphql-tag';
import { LocationInput } from '../classes/LocationInput';

export const QUERY_GET_EMPLOYER_ACCOUNTS = gql`
query getAllEmployers {
    employers {
        id
        firstName
        lastName
        email
    }
}
`;

export const QUERY_GET_EMPLOYER_BY_EMAIL = gql`
query getEmployerByEmail($email: String) {
    employers(email: $email) {
        id
        firstName
        lastName
        email
    }
}
`;

export const QUERY_GET_WORKER_ACCOUNTS = gql`
query getAllEmployers {
    employers {
        id
        firstName
        lastName
        email
    }
}
`;

export const QUERY_GET_WORKER_BY_EMAIL = gql`
query getWorkerByEmail($email: String) {
    workers(email: $email) {
        id
        firstName
        lastName
        email
    }
}
`;