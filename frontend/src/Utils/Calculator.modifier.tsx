import { Flex, Container, Select, Button, InputBase, Text } from "@mantine/core";
import { HypotekaDTOprops } from "../Interfaces/Formula.interface";
import { useEffect, useState } from "react";
import { InputInterface } from "../Interfaces/input.interface";
import { NumberInputConfig } from "../Config/Configurations.config";
import useCalculate from "./Hooks/Calculator.calculate";

const formatYear = (years: number) => {
    if (years === 1) return `${years} год`;
    if (years >= 2 && years <= 4) return `${years} года`;
    return `${years} лет`;
};

export default function CalculatorModifier({ HandleHypoteka, Hypoteka, Program }: HypotekaDTOprops) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [period, setPeriod] = useState<string | undefined>(undefined)
    const [discount, setDiscount] = useState<string | undefined>(undefined)
    const [inputs, setInputs] = useState<InputInterface[]>(
        [
            { key: 'PRICE', description: 'стоимость объекта', symbol: '₽', w: '45%', readonly: true, variant: 'filled' },
            { key: 'PV_RUB', description: 'первоначальный взнос', symbol: '₽', w: '25%', readonly: true, variant: 'filled' },
            { key: 'CLIENT_MONEY', description: 'средства клиента', symbol: '₽', w: '25%', readonly: true, variant: 'filled' },
            { key: 'CREDIT', description: 'сумма кредитования', symbol: '₽', w: '45%', readonly: true, variant: 'filled' },
            { key: 'STAVKA_BASE', isShowable: false },
            { key: 'DURATION', isShowable: false },
            { key: 'PAYMENT', isShowable: false },
            { key: 'PAYMENT_SUB', isShowable: false },
        ]
    )
    const discounts = Program?.discounts && Program?.discounts.filter(
        discount => discount.variables.find(
            variable => variable.name === 'discount' && parseFloat(variable.definition || '0') < parseFloat(Hypoteka?.find(variable => variable.name === 'STAVKA_BASE')?.definition || '0')
        )
    )

    const discounts_map = discounts?.map(discount => ({
        value: (parseFloat(Hypoteka?.find(variable => variable.name === 'STAVKA_BASE')?.definition || '0') - parseFloat(discount.variables.find(variable => variable.name === 'discount')?.definition || '0')).toString(),
        label: (parseFloat(Hypoteka?.find(variable => variable.name === 'STAVKA_BASE')?.definition || '0') - parseFloat(discount.variables.find(variable => variable.name === 'discount')?.definition || '0')).toString() + ' %'
    }))

    const totalMonths = parseInt(inputs[5].variable?.definition || '0');

    const periods_map = new Map();
    for (let months = 12; months <= totalMonths; months += 12) {
        const years = months / 12;
        periods_map.set(`${months}`, formatYear(years));
    }

    const periods_array = Array.from(periods_map, ([value, label]) => ({ value, label }));

    useCalculate(6, [(parseFloat(inputs[3].variable?.definition || '0') / parseInt(inputs[5].variable?.definition || '0') * (parseInt(inputs[5].variable?.definition || '0') - parseInt(period || '0'))).toString(), inputs[4].variable?.definition, (parseInt(inputs[5].variable?.definition || '0') - parseInt(period || '0')).toString()], 'PAYMENT', HandleHypoteka)
    useCalculate(6, [(parseFloat(inputs[3].variable?.definition || '0') / parseInt(inputs[5].variable?.definition || '0') * parseInt(period || '0')).toString(), discount, period], 'PAYMENT_SUB', HandleHypoteka)

    useEffect(() => {
        if (Hypoteka) {
            setInputs(
                inputs.map(input => {
                    return {
                        ...input,
                        variable: Hypoteka.find(variable => variable.name === input.key),
                        min_value: Hypoteka.find(variable => variable.name === input.key + '_min')?.definition,
                        max_value: Hypoteka.find(variable => variable.name === input.key + '_max')?.definition,
                    }
                })
            )
        }
        console.log(Hypoteka?.find(variable => variable.name === 'PAYMENT')?.definition)
    }, [JSON.stringify(Hypoteka)])

    return (
        <Container style={{ borderTop: '1px solid #ccc' }} p={20}>
            <Flex direction='row' wrap='wrap' justify='center' align='center'>
                <Flex w='100%' direction='row' wrap='wrap' justify='center' align='center'>
                    <Button bg='transparent' c='black' style={{ fontWeight: 'lighter' }} onClick={() => setIsOpen(!isOpen)}><label style={{ display: 'block', width: '100%', fontSize: '1.5rem', textAlign: 'center', marginBottom: '1rem' }}>Субсидирование{isOpen === true ? ' ⏶ ' : ' ⏷ '}</label> </Button>
                </Flex>
                {
                    isOpen === true && <>
                        <Flex w='100%' gap="md" justify="space-between" align="center" direction="row" wrap="wrap" my={10}>
                            <Select w='45%' description='период субсидирования' data={periods_array} placeholder="выберите период" searchable value={period} onChange={(e) => setPeriod(e || undefined)} />
                            <Select readOnly={period ? false : true} w='45%' description='Ставка на начальный период' data={discounts_map} placeholder={period && "выберите ставку" || "выберите ставку (в начале выбирите период)"} searchable value={discount} onChange={(e) => setDiscount(e || undefined)} />
                        </Flex>
                        {
                            period && discount && <>
                                <label style={{ display: 'block', width: '100%', fontWeight: 'lighter', fontSize: '1rem', textAlign: 'center', marginBottom: '1rem', marginTop: '1rem' }}>Итог с Субсидированием</label>
                                <Flex w='100%' gap="md" justify="space-between" align="center" direction="row" wrap="wrap" my={10}>
                                    {
                                        inputs?.map((input, index) => (
                                            input.isShowable !== false && <InputBase
                                                key={index}
                                                value={input.readonly === true && input.variable?.definition ? input.variable?.definition : '0'}
                                                description={input.description}
                                                rightSection={input.symbol}
                                                w={input.w}
                                                label={input.label}
                                                variant={input.variant}
                                                readOnly={input.readonly}
                                                min={input.min_value ? parseFloat(input.min_value || '0') : 0}
                                                max={input.max_value ? parseFloat(input.max_value || '0') : (input.symbol === '₽' && index !== 0 && parseFloat(inputs[0].variable?.definition || '0') || (input.symbol === '%' ? 100 : undefined))}
                                                {...NumberInputConfig}
                                            />
                                        ))
                                    }
                                    <label style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '50%', fontWeight: 'lighter', fontSize: '1rem', textAlign: 'center', marginBottom: '1rem', marginTop: '1rem' }}> на {formatYear(parseInt(period || '0') / 12)} <Text mx={10} c='green'>{discount}%</Text>далее<Text mx={10} c='green'>{inputs[4].variable?.definition}%</Text></label>

                                    <label style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', fontWeight: 'lighter', fontSize: '1rem', textAlign: 'center', marginBottom: '1rem', marginTop: '1rem' }}>Месячный платеж: на {formatYear(parseInt(period || '0') / 12)} <Text mx={10} c='green'>{inputs[7].variable?.definition} ₽</Text>далее<Text mx={10} c='green'>{inputs[6].variable?.definition} ₽</Text></label>
                                </Flex>
                            </>
                        }
                    </>
                }
            </Flex>
        </Container>
    )
}