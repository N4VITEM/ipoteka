import { Button, Center, Container } from "@mantine/core";
import { Bank, BankProps } from "../Interfaces/Bank.interface";
import { useQuery } from "@apollo/client";
import { GET_BANKS } from "../GraphQL/Bank.query";

export default function CalculatorBank({ setBank }: BankProps) {
    const { data: Banks } = useQuery<{ getAllBanks: Bank[] }>(GET_BANKS)

    return (
        <Container w='100%' p={10} my={20}>
            <label style={{ display: 'block', width: '100%', fontSize: '1.5rem', textAlign: 'center', fontWeight: 'lighter', marginBottom: '1rem' }}>Выберите банк</label>
            <Center style={{ flexDirection: 'row' }}>
                {
                    Banks?.getAllBanks.map((bank, index) => (
                        <Button
                            key={index}
                            style={{ backgroundColor: '#009A00' }}
                            w='50%'
                            mx={1}
                            onClick={() => setBank(bank)}
                        >{bank.name}</Button>
                    ))
                }
            </Center>
        </Container >
    )
}