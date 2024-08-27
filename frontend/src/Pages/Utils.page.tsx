
import { AppShell, Button, Center, Container, Flex, } from "@mantine/core";
import { useState } from "react";
import { Program } from "../Interfaces/Program.interface";
import UtilsSelector from "../Utils/Utils.selector";
import UtilsSettings from "../Utils/Utils.settings";
import UtilsCreate from "../Utils/Utils.create";
import { Bank } from "../Interfaces/Bank.interface";
import UtilsCreateBank from "../Utils/Utils.create.bank";
import UtilsCreateObject from "../Utils/Utils.create.object";


export default function UtilsPage() {
    const [Program, setProgram] = useState<Program | undefined>(undefined)
    const [Bank, setBank] = useState<Bank | undefined>(undefined)
    const [isCreate, setIsCreate] = useState(false);
    const [isCreateObject, setIsCreateObject] = useState(false);
    const [isCreateBank, setIsCreateBank] = useState(false);


    return (
        <AppShell.Main>
            <Center>
                <Container w='100%'>
                    <label style={{ display: 'block', width: '100%', fontSize: '2rem', textAlign: 'center' }}>Управление</label>
                    <Flex w='100%' direction='column' justify='center' align='center' my={10} p={10}>
                        {isCreateObject === false && isCreateBank === false && <Button w='50%' onClick={() => setIsCreate(!isCreate)} m={5}>{isCreate === false ? 'Добавить программу' : 'назад'}</Button>}
                        {isCreateObject === false && isCreate === false && <Button w='50%' onClick={() => setIsCreateBank(!isCreateBank)} m={5}>{isCreateBank === false ? 'Добавить Банк' : 'назад'}</Button>}
                        {isCreate === false && isCreateBank === false && <Button w='50%' onClick={() => setIsCreateObject(!isCreateObject)} m={5}>{isCreateObject === false ? 'Добавить Объект' : 'назад'}</Button>}
                    </Flex>
                    {
                        isCreate === true ? <UtilsCreate /> : isCreateBank === true ? <UtilsCreateBank /> : isCreateObject === true ? <UtilsCreateObject /> :
                            Program === undefined ? <UtilsSelector setProgram={setProgram} /> : <UtilsSettings setProgram={setProgram} Program={Program} />
                    }
                </Container>
            </Center>
        </AppShell.Main>
    )
}