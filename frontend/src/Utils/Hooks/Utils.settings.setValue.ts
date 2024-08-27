import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { SET_VALUES } from "../../GraphQL/Program.query";

export default function useSetValue(program: string | undefined, variableName: string | undefined, value: string | undefined) {
    const [fetchProgram, { data, error }] = useMutation(SET_VALUES);

    useEffect(() => {
        if (program !== undefined && variableName !== undefined && value !== undefined){
            fetchProgram({
                variables: {
                    name: program,
                    variableName: variableName,
                    value: value
                }
            }).catch(console.error);
            console.log(data)
        }
    }, [value, program, variableName, fetchProgram])
    
    return {
        result: data ? data.fetchProgram : undefined,
        error
    };
}
