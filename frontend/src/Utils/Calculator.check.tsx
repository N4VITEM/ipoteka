import { Container, TextInput } from "@mantine/core";

export default function CalculatorCheck() {
    return (
        <Container style={{ borderTop: '1px solid #ccc' }} p={20}>
            <TextInput pointer readOnly label='Для проверки вставь эту цифру' description='в желтое поле в своем EXCEL' value={8583691} />
        </Container>
    )
}