import { Stack, useRouter } from 'expo-router'
import { Button } from 'react-native'

const StackLayout = () => {
    const router = useRouter();

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'black'
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }}>
            <Stack.Screen
                name='home'
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='(tabs)'
                options={{
                    headerShown: false
                }} 
            />

        </Stack>
    )
}

export default StackLayout