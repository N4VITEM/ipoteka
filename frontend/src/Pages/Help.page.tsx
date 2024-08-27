import { AppShell, Center, Container } from "@mantine/core";

export default function HelpPage() {
    return (
        <AppShell.Main>
            <Center>
                <Container>
                    <label style={{ display: 'block', width: '100%', fontSize: '2rem', textAlign: 'center' }}>Помощь</label>
                </Container>
            </Center>
        </AppShell.Main>
    )
}