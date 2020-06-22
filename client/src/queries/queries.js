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

//TODO: здесь нужно на вход квери подавать id машины для экспорта - тогда сработает. Пофикси плиз  по моим изменениям

export const getCarsCsvMutation = gql`
mutation GetCarsCsv($dateFrom: String!, $dateTo: String!)
{         
    getCarsCsv(
        dateFrom: $dateFrom 
        dateTo: $dateTo
    )
    {
        id
        url
    }
}
`;

export const downloadCarCsvQuery = gql`
mutation Report($id: Integer)
{         
    getCarsCsv(id: $id)
    {
        id
        url
    }
}
`;

