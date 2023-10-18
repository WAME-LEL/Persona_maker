import { Tabs } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons';

export default () => {
    return (
        <Tabs>
            <Tabs.Screen
                name='introduce'
                options={{
                    tabBarLabel: 'Introduce',
                    headerTitle: 'Introduce',
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name="info" size={size} color={color} />
                }}
            />

            <Tabs.Screen
                name='persona'
                options={{
                    tabBarLabel: 'Persona',
                    headerTitle: 'Create Persona',
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name="plus" size={size} color={color} />
                }}
            />

            <Tabs.Screen
                name='resultList'
                options={{
                    tabBarLabel: 'Result List',
                    headerTitle: 'Result List',
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name="list" size={size} color={color} />
                }}
            />
        </Tabs>
    )
}