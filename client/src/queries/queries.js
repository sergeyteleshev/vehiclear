import {gql} from 'apollo-boost';

const addUserMutation = gql`
mutation AddUser($login: String!, $password: String!, $FIO: String)
{
  addUser(      
    login: $login, 
    password: $password
    FIO: $FIO)
  {
    id
    FIO
    login
  }
}`;

export {addUserMutation};