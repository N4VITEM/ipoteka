import { Button, Flex, InputBase, Select } from "@mantine/core";
import { DiscountProps } from "../Interfaces/Discount.interface";
import { InputConfig, SelectConfig } from "../Config/Configurations.config";
import { Variable, VariableInput } from "../Interfaces/Formula.interface";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Project } from "../Interfaces/Project.interface";
import { GET_OBJECTS } from "../GraphQL/Object.query";

const Inputs: VariableInput[] = [
    { key: 'discount', description: 'скидка', symbol: '%', w: '46%' },
    { key: 'comission', description: 'комиссия', symbol: '%', w: '46%' },
    { key: 'project', description: 'объект', w: '95%', variant: 'Select' },
    { key: 'DURATION_min', description: 'ограничение по сроку (ОТ)', symbol: 'мес.', w: '46%' },
    { key: 'DURATION_max', description: 'ограничение по сроку (ДО)', symbol: 'мес.', w: '46%' },
    { key: 'PERIOD_min', description: 'ограничение по периоду (ОТ)', symbol: 'год', w: '46%' },
    { key: 'PERIOD_max', description: 'ограничение по периоду (ДО)', symbol: 'год', w: '46%' },
    { key: 'CREDIT_min', description: 'ограничение по сумме (ОТ)', symbol: '₽', w: '46%' },
    { key: 'CREDIT_max', description: 'ограничение по сумме (ДО)', symbol: '₽', w: '46%' },
]

export default function UtilsCreateDiscount({ Discount, HandleAddDiscount, HandleFetchDiscount }: DiscountProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [project, setProject] = useState<Project | undefined>(undefined);
    const [Variables, setVariables] = useState<Variable[] | undefined>(undefined);

    const { data: Objects } = useQuery<{ getAllObjects: Project[] }>(GET_OBJECTS);
    const objects = Objects?.getAllObjects.map(object => ({
        value: object.id?.toString(),
        label: object.region + '/' + object.object + ' очередь: ' + object.queue
    })) || [];

    function HandleVariable(key: string, value: string) {
        setVariables(prevVariables => {
            if (prevVariables) {
                const variableIndex = prevVariables.findIndex(variable => variable.name === key);
                if (variableIndex !== -1) {
                    const updatedVariables = prevVariables.map((variable, index) =>
                        index === variableIndex ? { ...variable, definition: value } : variable
                    );
                    return updatedVariables;
                } else {
                    return [...prevVariables, { name: key, isConstant: true, definition: value }];
                }
            } else {
                return [{ name: key, isConstant: true, definition: value }];
            }
        });
    }

    return (
        <Flex style={{ borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc', }} w='50%' direction='row' wrap='wrap' justify='center' align='center' my={10} p={10}>
            <Flex w='100%' direction='row' wrap='wrap' justify='center' align='center'>
                <Button bg='transparent' c='black' onClick={() => setIsOpen(!isOpen)}><label>{Discount ? `скидка: ${Discount?.variables.find((variable) => variable.name === 'discount')?.definition} %` : 'новая скидка'}{isOpen === true ? ' ⏶ ' : ' ⏷ '}</label> </Button>
            </Flex>
            {
                isOpen === true ? <>
                    {
                        Inputs.map((input, index) => (
                            input.variant === 'Select' ? <Select
                                searchable key={index}
                                data={objects}
                                {...SelectConfig(input)}
                                m={5}
                                placeholder={`${Discount ? Discount.project.region + '/' + Discount.project.object + ' очередь: ' + Discount.project.queue : 'выберите объект'}`}
                                value={undefined}
                                onChange={(e) => setProject(Objects?.getAllObjects.find((object) => object.id === parseInt(e || '')))}
                            /> :
                                <InputBase
                                    key={index}
                                    {...InputConfig(input)}
                                    m={5}
                                    placeholder={Discount ? Discount.variables.find((variable) => variable.name === input.key)?.definition : undefined}
                                    value={undefined}
                                    onAccept={(e) => HandleVariable(input.key, e)}
                                />
                        ))
                    }
                    <Button w='100%' onClick={() => Discount === undefined ? project && Variables && HandleAddDiscount({ project: project, variables: Variables }) : project && Variables && HandleFetchDiscount && HandleFetchDiscount(Discount, { project: project, variables: Variables })}>{HandleFetchDiscount ? 'сохранить изменения' : 'добавить'}</Button>
                </>
                    : <></>
            }

        </Flex>
    )
}