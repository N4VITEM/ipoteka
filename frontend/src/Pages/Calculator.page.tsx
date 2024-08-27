import { AppShell, Center, Container } from "@mantine/core";
import CalculatorBrand from "../Utils/Calculator.brand";
import logo from '../Companies/garantia.png';
import CalculatorObject from "../Utils/Calculator.object";
import { useEffect, useState } from "react";
import CalculatorBase from "../Utils/Calculator.base";
import CalculatorModifier from "../Utils/Calculator.modifier";
import CalculatorCheck from "../Utils/Calculator.check";
import CalculatorCategory from "../Utils/Calculator.category";
import { Variable } from "../Interfaces/Formula.interface";
import { useQuery } from "@apollo/client";
import { GET_VARIABLES } from "../GraphQL/formula.query";
import CalculatorBank from "../Utils/Calculator.bank";
import { Bank } from "../Interfaces/Bank.interface";
import CalculatorProgram from "../Utils/Calculator.program";
import { Program } from "../Interfaces/Program.interface";
import { Project } from "../Interfaces/Project.interface";
import CalculatorSummary from "../Utils/Calculator.summary";
import useComission from "../Utils/Hooks/Calculator.comission";

export default function CalculatorHypotekaPage() {
    const { data } = useQuery<{ getAllVariables: Variable[] }>(GET_VARIABLES)
    const [Project, setProject] = useState<Project | undefined>();
    const [Bank, setBank] = useState<Bank | undefined>(undefined);
    const [Program, setProgram] = useState<Program | undefined>(undefined);
    const [Hypoteka, setHypoteka] = useState<Variable[] | undefined>(data?.getAllVariables);

    useEffect(() => {
        setHypoteka(data?.getAllVariables)
    }, [data])

    useComission(Hypoteka, HandleHypoteka)

    async function HandleHypoteka(name: string, value: string | undefined) {
        setHypoteka((prevHypoteka) => {
            if (prevHypoteka !== undefined) {
                const updatedHypoteka = prevHypoteka.map(variable => {
                    if (variable.name === name) {
                        return {
                            ...variable,
                            definition: value,
                        };
                    }
                    return variable;
                });
                return updatedHypoteka;
            }
            return prevHypoteka;
        });
    }


    return (
        <AppShell.Main>
            <Center>
                <Container w='50%'>
                    <CalculatorBrand logo={logo} />
                    {
                        Bank === undefined ? <CalculatorBank setBank={setBank} /> :
                            Program === undefined ? <CalculatorProgram HandleHypoteka={HandleHypoteka} setProgram={setProgram} BankId={Bank.id} /> :
                                Project === undefined ? <CalculatorObject object={Project} setObject={setProject} /> :
                                    <>
                                        <CalculatorBase HandleHypoteka={HandleHypoteka} Hypoteka={Hypoteka} />
                                        <CalculatorModifier HandleHypoteka={HandleHypoteka} Hypoteka={Hypoteka} Program={Program} />
                                        <CalculatorCheck />
                                        <CalculatorCategory Bank={Bank} Program={Program} Project={Project} setBank={setBank} setProgram={setProgram} setProject={setProject} />
                                        <CalculatorSummary Hypoteka={Hypoteka} />
                                    </>
                    }
                </Container>
            </Center>
        </AppShell.Main>
    )
}
