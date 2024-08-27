import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { CREATE_BANK } from "../../GraphQL/Bank.query";
import { Bank } from "../../Interfaces/Bank.interface";

export default function useCreateBank(bank: Bank | undefined) {
    const [createBank, { data, error }] = useMutation(CREATE_BANK);

    useEffect(() => {
        if (bank !== undefined){
            createBank({
                variables: {
                    createBankDTO: bank
                }
            }).catch(console.error).then(() => window.location.reload());
        }
    }, [bank, createBank])
    
    return {
        result: data ? data.fetchProgram : undefined,
        error
    };
}
