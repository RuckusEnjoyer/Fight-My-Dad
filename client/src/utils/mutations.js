import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation loginUser($username: String, $password: String!) {
    loginUser(username: $username, password: $password) {
        token
        user {
            _id
            username
            dad {
                dadStats
            }
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String, $firstName: String, $lastName: String, $password: String!) {
    addUser(username: $username, firstName: $firstName, lastName: $lastName, password: $password) {
        token
        user {
            _id
            username
        }
    }
}`;

export const SAVE_DAD = gql`
mutation addDad($newDad: dadStats) {
    addDad(newDad: $newDad) {
        userId    
        dadName
        nickname
        entryMusic
        dadJoke
        weight
        armLength
        experience
        winNum
        lossNum
    }
}`;

export const REMOVE_DAD = gql`
mutation removeDad($dadId: ID!) {
    removeDad(dadId: $dadId) {
        _id
        username
    }
}`;
