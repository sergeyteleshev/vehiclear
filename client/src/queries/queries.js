import {gql} from 'apollo-boost';

export const addUserMutation = gql`
mutation AddUser($login: String!, $password: String!, $FIO: String!)
{
    addUser(      
        login: $login
        password: $password
        FIO: $FIO
    )
    {      
        FIO
        login
    }
}`;

export const authorizeUserMutation = gql`
mutation AuthorizeUser($login: String!, $password: String!)
{
    authorizeUser(
        login: $login
        password: $password
    )
    {      
        login
        FIO
    }
}
`;

export const addCarMutation = gql`
mutation AddCar($location: String, $login: String!, $photoIn: Upload!)
{
    addCar(
        location: $location
        login: $login
        photoIn: $photoIn
    )
    {      
        id
        login
        gos_numb
        location      
    }
}
`;

export const getCsvReportMutation = gql`
mutation GetCsvReport($dateFrom: String!, $dateTo: String!)
{         
    getCsvReport(
        dateFrom: $dateFrom 
        dateTo: $dateTo
    )
    {
        id
        url
    }
}
`;

export const GetOneCarCsvReport = gql`
mutation GetOneCarCsv($id: Integer)
{         
    getCsvReport(id: $id)
    {
        id
        url
    }
}
`;

