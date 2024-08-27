import { Button, Flex, TextInput } from "@mantine/core";
import { useState } from "react";
import useCreateBank from "./Hooks/Utils.create.createBank";
import { Bank } from "../Interfaces/Bank.interface";

export default function UtilsCreateBank() {
    const [bank, setBank] = useState<Bank | undefined>(undefined)
    const [name, setName] = useState<string | undefined>(undefined);
    const [primaryColor, setPrimaryColor] = useState<string | undefined>(undefined);
    const [secondaryColor, setSecondaryColor] = useState<string | undefined>(undefined);

    useCreateBank(bank);

    return (
        <Flex w='100%' direction='column' justify='center' align='center' my={10} p={10}>
            Добавление банка
            <TextInput w='50%' my={10} placeholder="введите название банка" onChange={(e) => setName(e.currentTarget.value)} />
            <TextInput w='50%' my={10} placeholder="введите цвет фона" onChange={(e) => setPrimaryColor(e.currentTarget.value)} />
            <TextInput w='50%' my={10} placeholder="введите цвет текста" onChange={(e) => setSecondaryColor(e.currentTarget.value)} />
            <Button w='50%' onClick={() => setBank(name && primaryColor && secondaryColor ? { name: name, primaryColor: primaryColor, secondaryColor: secondaryColor } : undefined)}>Добавить</Button>
        </Flex>
    )
}