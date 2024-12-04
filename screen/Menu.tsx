import { useNavigation } from "@react-navigation/native";
import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';

import MeusTenis from "./MeusTenis";
import ManterTenis from "./ManterTenis";
import Config from "./Config";
import { Tenis } from "../model/Tenis";

const Tab = createBottomTabNavigator();

export default function Menu() {
    return (
        <Tab.Navigator
            initialRouteName="Meus Tenis"
            screenOptions={{
                tabBarStyle: { 
                    backgroundColor: 'white', 
                    height: 60,
                    width: '95%',
                    margin: 'auto',
                    marginBottom: 10,
                    borderRadius: 20
                }, 
                tabBarActiveTintColor: '#9ac5d8', 
                tabBarInactiveTintColor: 'gray',  
                tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
            }}
        >
            <Tab.Screen 
                name="Meus Tenis" 
                component={MeusTenis}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon 
                            name="footsteps-outline" 
                            size={30} 
                            color={focused ? '#9ac5d8' : 'gray'} 
                        />
                    )
                }}
            />

            

            <Tab.Screen 
                name="Adicionar" 
                component={ManterTenis}
                initialParams={{tenis : new Tenis()}}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon 
                            name="add-circle" 
                            size={45} 
                            color={focused ? '#9ac5d8' : 'gray'} 
                        />
                    )
                }}
            />

            

            <Tab.Screen 
                name="Config" 
                component={Config}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon 
                            name="list-outline" 
                            size={30} 
                            color={focused ? '#9ac5d8' : 'gray'} 
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
}
