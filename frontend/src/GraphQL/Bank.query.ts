import { gql } from "@apollo/client";

export const GET_BANKS = gql`query GetBanks { getAllBanks { id, name, primaryColor, secondaryColor } }`

export const CREATE_BANK = gql`mutation CreateBank($createBankDTO: CreateBankDTO!) { createBank(createBankDTO: $createBankDTO) { id, name, primaryColor, secondaryColor } }`