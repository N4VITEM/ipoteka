import { useQuery } from "@apollo/client";
import { Button, Center, Container } from "@mantine/core";
import { Project } from "../Interfaces/Project.interface";
import { GET_OBJECTS } from "../GraphQL/Object.query";

interface CalculatorObjectProps {
    setObject: (object: Project | undefined) => void
}

export default function CalculatorObject({ setObject }: CalculatorObjectProps) {
    const { data: Objects } = useQuery<{ getAllObjects: Project[] }>(GET_OBJECTS);

    return (
        <Container w='100%' p={10} my={20}>
            <label style={{ display: 'block', width: '100%', fontSize: '1.5rem', textAlign: 'center', fontWeight: 'lighter', marginBottom: '1rem' }}>Выберите объект</label>
            <Center style={{ flexDirection: 'row' }}>
                {
                    Objects?.getAllObjects.map((obj, index) => (
                        <Button
                            key={index}
                            w='50%'
                            mx={1}
                            onClick={() => setObject(obj)}
                        >{`${obj.region} | ${obj.object} | очередь: ${obj.queue}`}</Button>
                    ))
                }
            </Center>
        </Container >
    )
}