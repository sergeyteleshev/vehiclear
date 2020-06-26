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
mutation AddCar($location: String, $photoIn: String!, $userCreated: String, $reports_counter: Int)
{
    addCar(
        location: $location
        userCreated: $userCreated
        photoIn:{photo: $photoIn} 
        reports_counter: $reports_counter         
    )
    {      
        id
        gos_numb
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

