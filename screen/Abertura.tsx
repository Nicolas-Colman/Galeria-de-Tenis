import { useNavigation } from "@react-navigation/native";
import * as React from 'react';
import { useState } from "react";
import { auth } from '../firebase'
import { KeyboardAvoidingView, TouchableOpacity, Text, View, TextInput, Image, Platform, ScrollView } from "react-native";
import estilo from "../estilo.js";

const Login = () => {


  return (
    <View style={estilo.tela}>
      <Text>
        Serie A
      </Text>

      <Image
        source={require('../assets/Logo.png')}
        style={estilo.logoAbertura}
      />
    </View>

  )
}

export default Login;