import { gql } from "@apollo/client";

export const GET_BANK_PROGRAMS = gql`query GetPrograms($id: Int!) { getBankPrograms(id: $id) { id, name, variables{ name, definition, isConstant }, discounts{ variables{ name, definition, isConstant } project{ object, region, queue } } } }`

export const GET_PROGRAMS = gql`query GetAllPrograms { getAllPrograms { id, name, variables{ name, definition, isConstant } } }`

export const SET_VALUES = gql`
    mutation SetValue($name: String!, $variableName: String!, $value: String!) {
        fetchProgram(name: $name, variableName: $variableName, value: $value) {
        id, name, variables {
        name, definition, isConstant
        }
        }
    }
`;

export const SET_PROGRAM = gql`
    mutation SetProgram($createProgramDTO: CreateProgramDTO!) {
        createProgram(createProgramDTO: $createProgramDTO) {
        id, name, variables {
        name, definition, isConstant
        }
        }
    }
`;