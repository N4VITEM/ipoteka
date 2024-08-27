import { Button, Container, Flex } from "@mantine/core";
import { Bank } from "../Interfaces/Bank.interface";
import { Program } from "../Interfaces/Program.interface";
import { Project } from "../Interfaces/Project.interface";

interface categoryProps {
    Bank: Bank,
    Program: Program,
    Project: Project,
    setBank: (bank: Bank | undefined) => void,
    setProgram: (program: Program | undefined) => void,
    setProject: (object: Project | undefined) => void,
}

export default function CalculatorCategory({ Bank, Program, Project, setBank, setProgram, setProject }: categoryProps) {
    return (
        <Container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', borderTop: '1px solid #ccc' }} p={10}>
            <Flex direction='row' justify='center' align='center'>
                <Button bg={Bank.primaryColor} c={Bank.secondaryColor} onClick={() => { setBank(undefined); setProgram(undefined) }}>{Bank.name}</Button>
                <Button bg={'transparent'} c={'black'} onClick={() => setProgram(undefined)}>{`/ ${Program.name}`}</Button>
                <Button bg={'transparent'} c={'black'} onClick={() => setProject(undefined)}>{`/ ${Project.region} ${Project.object} очередь: ${Project.queue}`}</Button>
            </Flex>
        </Container>
    )
}