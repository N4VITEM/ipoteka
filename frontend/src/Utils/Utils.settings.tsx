import { Button, Flex, TextInput } from "@mantine/core";
import { SettingsProps } from "../Interfaces/Utils.interface";
import useSetValue from "./Hooks/Utils.settings.setValue";
import { useState } from "react";

export default function UtilsSettings({ setProgram, Program }: SettingsProps) {
    const [variableName, setVariableName] = useState<string | undefined>(undefined)
    const [value, setValue] = useState<string | undefined>(undefined)

    function HandleChange(variableName: string, value: string) {
        setVariableName(variableName);
        setValue(value)
    }

    useSetValue(Program?.name, variableName, value)

    return (
        <Flex w='100%' direction='column' justify='center' align='center' my={10} p={10}>
            <Button
                style={{ backgroundColor: '#009A00' }}
                w='50%'
                mx={1}
                onClick={() => setProgram(undefined)}
            >назад</Button>
            <label style={{ display: 'block', width: '100%', fontSize: '1rem', textAlign: 'center', margin: '1rem' }}>{Program?.name}</label>
            {
                Program?.variables.map((variable, index) => (
                    <TextInput key={index} my={10} p={10} placeholder={variable.definition} description={variable.name} onChange={(e) => HandleChange(variable.name, e.currentTarget.value)} />
                ))
            }
        </Flex>
    )
}