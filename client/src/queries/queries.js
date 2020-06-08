import {gql} from 'apollo-boost';

const addUserMutation = gql`
mutation AddUser($login: String!, $password: String!, $FIO: String)
{
  addUser(id: $login, 
    FIO: $FIO , 
    login: $login, 
    password: $password)
  {
    id
    FIO
    login
  }
}`;

export {addUserMutation};