import { gql } from "@apollo/client";

export const GET_FORMULAS = gql`query GetFormulas { getAll { id, name } }`

export const GET_VARIABLES = gql`query GetVariables { getAllVariables { name, definition, isConstant } }`

export const GET_FORMULA =  gql`query GetFormula($id: Int!) { getById(id: $id) { name, variables, operations, expression } }`

export const CALCULATE = gql`
    mutation Calculate($id: Int!, $values: [Float!]!) {
        calculate(id: $id, variables: $values)
    }
`;