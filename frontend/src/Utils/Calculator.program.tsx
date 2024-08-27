import { Button, Center, Container } from "@mantine/core";
import { Program, ProgramProps } from "../Interfaces/Program.interface";
import { useQuery } from "@apollo/client";
import { GET_BANK_PROGRAMS } from "../GraphQL/Program.query";

export default function CalculatorProgram({ setProgram, BankId, HandleHypoteka }: ProgramProps) {
    const { data: Programs } = useQuery<{ getBankPrograms: Program[] }>(GET_BANK_PROGRAMS, { variables: { id: BankId } })
    async function HandleProgram(program: Program) {
        program.variables.map((variable) => {
            HandleHypoteka(variable.name, variable.definition ? variable.definition : '')
        })

        await setProgram(program);
    }


    return (
        <Container w='100%' p={10} my={20}>
            <label style={{ display: 'block', width: '100%', fontSize: '1.5rem', textAlign: 'center', fontWeight: 'lighter', marginBottom: '1rem' }}>Выберите Программу</label>
            <Center style={{ flexDirection: 'row' }}>
                {
                    Programs?.getBankPrograms.map((program, index) => (
                        <Button
                            key={index}
                            style={{ backgroundColor: '#009A00' }}
                            w='50%'
                            mx={1}
                            onClick={() => HandleProgram(program)}
                        >{program.name}</Button>
                    ))
                }
            </Center>
        </Container >
    )
}