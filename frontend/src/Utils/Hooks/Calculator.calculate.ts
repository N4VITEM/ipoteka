import { useMutation } from "@apollo/client";
import { CALCULATE } from "../../GraphQL/formula.query";
import { useEffect } from "react";

export default function useCalculate(index: number, variables: (string | undefined)[], key?: string, HandleHypoteka?: (key: string, value: string) => void) {
    const [calculate] = useMutation(CALCULATE);

    useEffect(() => {
        if (variables) {
            const values: number[] = variables.map(variable => parseFloat(variable || '0'));
            calculate({
                variables: {
                    id: index,
                    values
                }
            }).then(response => {
                const result = response.data.calculate >= 0 ? response.data.calculate : 0;
                key && HandleHypoteka && HandleHypoteka(key, result.toString())
            }).catch(console.error);
        }
    }, [JSON.stringify(variables)]);
}
