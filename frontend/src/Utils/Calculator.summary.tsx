import { Flex } from "@mantine/core";
import { HypotekaDTOprops } from "../Interfaces/Formula.interface";
import { InputInterface } from "../Interfaces/input.interface";
import { useEffect, useState } from "react";

export default function CalculatorSummary({ Hypoteka }: HypotekaDTOprops) {
    const [params, setParams] = useState<InputInterface[]>(
        [
            { key: 'PRICE', description: 'Цена по прайсу:', symbol: '₽' },
            { key: 'PV_RUB', description: 'ПВ полный:', symbol: '₽' },
            { isShowable: false, key: 'PV', description: 'ПВ полный:', symbol: '₽' },
            { key: 'CLIENT_MONEY', description: 'ПВ Клиента:', symbol: '₽' },
            { key: 'COMPANY_MONEY', description: 'ПВ СК «Гарантия»', symbol: '₽' },
            { key: 'CREDIT', description: 'Сумма кредитования', symbol: '₽' },
            { key: 'DURATION', description: 'Срок Кредитования', symbol: 'мес.' },
            { key: 'STAVKA_BASE', description: 'Базовая ставка', symbol: '%' },
        ]
    )
    const [results, setResults] = useState<InputInterface[]>(
        [
            { key: 'PRICE', description: 'Цена фактическая:', symbol: '₽' },
            { key: 'PV_RUB', description: 'ПВ полный:', symbol: '₽' },
            { isShowable: false, key: 'PV', description: 'ПВ полный:', symbol: '₽' },
            { key: 'CLIENT_MONEY', description: 'ПВ Клиента:', symbol: '₽' },
            { key: 'COMPANY_MONEY', description: 'ПВ СК «Гарантия»', symbol: '₽' },
            { key: 'CREDIT', description: 'Кредит', symbol: '₽' },
            { key: 'DURATION', description: 'Срок Кредитования', symbol: 'мес.' },
            { key: 'STAVKA_BASE', description: 'Базовая ставка', symbol: '%' },
        ]
    )

    useEffect(() => {
        if (Hypoteka) {
            setParams(
                params.map(param => {
                    return {
                        ...param,
                        variable: Hypoteka.find(variable => variable.name === param.key),
                    }
                })
            )
            setResults(
                results.map(result => {
                    return {
                        ...result,
                        variable: Hypoteka.find(variable => variable.name === result.key),
                    }
                })
            )
        }
    }, [JSON.stringify(Hypoteka)])

    useEffect(() => {
        params[1].label = `(${params[2].variable?.definition} %)`
    }, [params])

    return (
        <Flex direction='column' style={{ borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }} p={20}>
            <Flex direction='column' wrap='wrap' justify='center' align='center' w='100%'>
                <label style={{ display: 'block', width: '100%', fontSize: '1.5rem', textAlign: 'center', fontWeight: 'lighter', marginBottom: '1rem' }}>Параметры</label>
                {
                    params?.map((param) => (
                        param.isShowable !== false && param.variable?.definition && param.variable?.definition !== '0' && <Flex direction='row' justify='start' align='start' my={5} w='80%'>
                            <label>{param.description}</label>
                            <label style={{ color: 'green', marginLeft: '10px' }}>{param.variable?.definition || 0} {param.symbol}</label>
                            {
                                param.label && <label style={{ color: 'grey', marginLeft: '5px' }}>{param.label}</label>
                            }
                        </Flex>
                    ))
                }
            </Flex>
            <Flex direction='column' wrap='wrap' justify='center' align='center' w='100%'>
                <label style={{ display: 'block', width: '100%', fontSize: '1.5rem', textAlign: 'center', fontWeight: 'lighter', marginBottom: '1rem' }}>Рассчет</label>
                {
                    results?.map((result) => (
                        result.isShowable !== false && result.variable?.definition && result.variable?.definition !== '0' && <Flex direction='row' justify='start' align='start' my={5} w='80%'>
                            <label>{result.description}</label>
                            <label style={{ color: 'green', marginLeft: '10px' }}>{result.variable?.definition || 0} {result.symbol}</label>
                            {
                                result.label && <label style={{ color: 'grey', marginLeft: '5px' }}>{result.label}</label>
                            }
                        </Flex>
                    ))
                }
            </Flex>
        </Flex>
    )
}