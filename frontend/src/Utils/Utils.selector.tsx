import { Button, Flex, Select } from "@mantine/core";
import { Bank } from "../Interfaces/Bank.interface";
import { GET_BANKS } from "../GraphQL/Bank.query";
import { Program } from "../Interfaces/Program.interface";
import { GET_PROGRAMS } from "../GraphQL/Program.query";
import { useQuery } from "@apollo/client";
import { UtilsProps } from "../Interfaces/Utils.interface";
import { useState } from "react";

export default function UtilsSelector({ setProgram }: UtilsProps) {
    const [Bank, setBank] = useState<Bank | undefined>(undefined);
    const { data: Banks } = useQuery<{ getAllBanks: Bank[] }>(GET_BANKS);
    const { data: Programs } = useQuery<{ getAllPrograms: Program[] }>(GET_PROGRAMS);

    const banks = Banks?.getAllBanks.map(bank => ({
        value: bank.id?.toString(),
        label: bank.name
    })) || [];

    return (
        <Flex w='100%' direction='column' justify='center' align='center' my={10} p={10}>

            <Select searchable w='50%' placeholder='Выбрать банк' data={banks} description='Фильтр' rightSection='▼' my={10} onChange={(e) => setBank(Banks?.getAllBanks.find((bank) => bank.name === e))} />
            {
                Bank === undefined ?
                    Programs?.getAllPrograms.map((program, index) => (
                        <Button
                            key={index}
                            onClick={() => setProgram(program)}
                            style={{ backgroundColor: '#009A00' }}
                            w='50%'>{program.name}
                        </Button>
                    ))
                    : Programs?.getAllPrograms.filter((program) => program.bankId !== Bank.id).map((program, index) => (
                        <Button
                            key={index}
                            onClick={() => setProgram(program)}
                            style={{ backgroundColor: '#009A00' }}
                            w='50%'>{Bank.name} {program.name}
                        </Button>
                    ))
            }
        </Flex>
    )
}