import { Button, Flex, TextInput } from "@mantine/core";
import useCreateObject from "./Hooks/Utils.create.createObject";
import { useState } from "react";
import { Project } from "../Interfaces/Project.interface";

export default function UtilsCreateObject() {
    const [project, setProject] = useState<Project | undefined>(undefined)
    const [object, setObject] = useState<string | undefined>(undefined);
    const [queue, setQueue] = useState<number | undefined>(undefined);

    useCreateObject(project);

    return (
        <Flex w='100%' direction='column' justify='center' align='center' my={10} p={10}>
            Добавление объекта
            <TextInput w='50%' my={10} placeholder="введите название объекта" onChange={(e) => setObject(e.currentTarget.value)} />
            <TextInput w='50%' my={10} placeholder="введите очередь" onChange={(e) => setQueue(parseInt(e.currentTarget.value))} />
            <Button w='50%' onClick={() => setProject(object && queue ? { object: object, queue: queue } : undefined)}>Добавить</Button>
        </Flex>
    )
}