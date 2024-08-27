import { gql } from "@apollo/client";

export const CREATE_OBJECT = gql`mutation CreateObject($createObjectDTO: createObjectDTO!) { createObject(createObjectDTO: $createObjectDTO) { id, object, queue } }`

export const GET_OBJECTS = gql`query GetObjects { getAllObjects { id, object, queue } }`