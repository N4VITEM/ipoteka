import { Button, Flex, InputBase, Select, TextInput } from "@mantine/core";
import { InputConfig, TextConfig } from "../Config/Configurations.config";
import { Variable, VariableInput } from "../Interfaces/Formula.interface";
import { Discount } from "../Interfaces/Discount.interface";
import { useState } from "react";
import UtilsCreateDiscount from "./Utils.create.discount";
import { useMutation, useQuery } from "@apollo/client";
import { Bank } from "../Interfaces/Bank.interface";
import { GET_BANKS } from "../GraphQL/Bank.query";
import { SET_PROGRAM } from "../GraphQL/Program.query";

const Inputs: VariableInput[] = [
    { key: 'name', description: 'Имя программы', variant: 'String', w: '49%' },
    { key: 'STAVKA_BASE', description: 'Базовая процентная ставка', w: '49%', symbol: '%' },
    { key: 'COMISSION', description: 'Комиссия за превышение', w: '49%', symbol: '%' },
    { key: 'ZERO_COMISSION_LIMIT', description: 'максимальная сумма кредитования', w: '49%', symbol: '₽' },
    { key: 'BANK_COMISSION', description: 'Комиссия банка за превышение', w: '49%', symbol: '%' },
    { key: 'PROGRAM_LIMIT', description: 'Ограничение программы (без комиссии)', w: '49%', symbol: '₽' },
    { key: 'DURATION_max', description: 'Максимальный срок кредитования', w: '49%', symbol: 'мес.' },
    { key: 'MIN_PV', description: 'Минимальный первоначальный взнос', w: '49%', symbol: '%' },
]

function removeTypename(obj: any) {
    const { __typename, id, ...rest } = obj;
    return rest;
}

export default function UtilsCreate() {
    const [isDiscount, setIsDiscount] = useState(false);
    const [Discounts, setDiscounts] = useState<Discount[]>([]);
    const [Name, setName] = useState<string | undefined>(undefined);
    const [Bank, setBank] = useState<Bank | undefined>(undefined);
    const [Variables, setVariables] = useState<Variable[] | undefined>(undefined);
    const { data: Banks } = useQuery<{ getAllBanks: Bank[] }>(GET_BANKS);
    const [createProgram] = useMutation(SET_PROGRAM);

    function HandleAddDiscount(discount: Discount) {
        setDiscounts((Discounts) => [...Discounts, discount]);
    }

    function HandleFetchDiscount(old_discount: Discount, new_discount: Discount) {
        setDiscounts((Discounts) => {
            Discounts[Discounts.findIndex((discount) => discount === old_discount)] = new_discount;
            return [...Discounts];
        });
    }

    function HandleVariable(key: string, value: string) {
        setVariables((prevVariables) => {
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

    const banks = Banks?.getAllBanks.map(bank => ({
        value: bank.id?.toString(),
        label: bank.name
    })) || [];

    return (
        <Flex w='100%' direction='row' wrap='wrap' my={10} p={10} justify='space-between'>
            <Select
                w='100%'
                description='Банк'
                placeholder="выберите банк"
                searchable
                data={banks}
                value={undefined}
                onChange={(e) => setBank(Banks?.getAllBanks.find((bank) => bank.id === parseInt(e || '')))}
            />
            {
                Inputs.map((input, index) => (
                    input.variant === 'String' ?
                        <TextInput onChange={(e) => setName(e.currentTarget.value)} key={index} {...TextConfig(input)} /> :
                        <InputBase key={index} {...InputConfig(input)} onAccept={(e) => HandleVariable(input.key, e)} />
                ))
            }
            <Button w='100%' onClick={() => setIsDiscount(!isDiscount)}>настроить скидки по кредитованию</Button>
            {
                isDiscount === true && <UtilsCreateDiscount HandleAddDiscount={HandleAddDiscount} />
            }
            {
                isDiscount === true && Discounts.length !== 0 && Discounts.map((discount, index) => (
                    <UtilsCreateDiscount key={index} Discount={discount} HandleAddDiscount={HandleAddDiscount} HandleFetchDiscount={HandleFetchDiscount} />
                ))
            }
            <Button
                w='100%'
                my={10}
                onClick={() => {
                    if (Discounts && Bank && Variables) {
                        const sanitizedDiscounts = Discounts.map(discount => ({
                            project: removeTypename(discount.project),
                            variables: discount.variables.map(variable => ({
                                name: variable.name,
                                definition: variable.definition || "",
                                isConstant: variable.isConstant,
                            }))
                        }));

                        const sanitizedVariables = Variables.map(variable => ({
                            name: variable.name,
                            definition: variable.definition || "",
                            isConstant: variable.isConstant,
                        }));

                        createProgram({
                            variables: {
                                createProgramDTO: {
                                    name: Name,
                                    variables: sanitizedVariables,
                                    discounts: sanitizedDiscounts,
                                    bankId: Bank.id
                                }
                            }
                        }).then(() => window.location.reload());
                    }
                }}
            >
                Добавить программу
            </Button>
        </Flex>
    );
}
