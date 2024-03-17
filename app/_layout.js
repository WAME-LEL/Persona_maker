import { Stack } from 'expo-router'

const StackLayout = () => {

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