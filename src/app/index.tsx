import { router } from "expo-router";
import { useState } from "react";

import { View, Text, Image, TextInput, Pressable, ScrollView } from "react-native";

import globalStyle from "@/styles/globalStyles";
import loginStyles from "@/styles/loginStyles";
import { SafeAreaView } from "react-native-safe-area-context";
 
export default function LoginScreen() {
  const [verSenha, setVerSenha] = useState(false);

  return (
       <View style={globalStyle.container}>
      <Image
        source={require('@/assets/images/imgIcon/logo-traducaapp.png')}
        style={globalStyle.logoMaior}
       resizeMode="contain"
 
      />
 
    <View style={loginStyles.conteudo}>
  
   
      <Text style={loginStyles.titulo}>Bem-vindo(a)!</Text>
      <Text>Faça seu login para continuar</Text>
 
                    {/* Formulario de login */}
              <View style={loginStyles.form}>
                <View style={loginStyles.input}>
                  <Image
                    source={require("@/assets/images/imgIcon/email-azul.png")}
                    style={loginStyles.icone}
                  />
 
                  <TextInput
                    placeholder="E-mail"
                    placeholderTextColor="#888888"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={loginStyles.TextInput}
                  />
                </View>
 
                <View style={loginStyles.input}>
                  <Image
                    source={require("@/assets/images/imgIcon/senha-azul.png")}
                    style={loginStyles.icone}
                  />
                  <TextInput
                    placeholder="Senha"
                    placeholderTextColor="#888888"
                    style={loginStyles.TextInput}
                    secureTextEntry={!verSenha}
                  />
 
                  <Pressable
                    style={loginStyles.btnMostrarSenha}
                    onPress={() => setVerSenha((current) => !current)}
                  >
                    <Image
                      source={
                        verSenha
                        ? require("@/assets/images/imgIcon/esconder.png")
                        : require("@/assets/images/imgIcon/visualizar-azul.png")
                      }
                      style={loginStyles.mostrarSenha}
                    />
                  </Pressable>
                </View>
 
                <Pressable
                  style={loginStyles.btnEsqueciSenha}
                   onPress={() => router.navigate("/esqueci-senha")}
    
                >
                  <Text style={loginStyles.txtEsqueciSenha}>
                    Esqueci minha senha
                  </Text>
                </Pressable>
 
                <Pressable
                  style={({ pressed }) => [
                    loginStyles.btnEntrar,
                    pressed && loginStyles.btnEntrarPressed,
                  ]}
                 
                >
                  <Text style={loginStyles.txtEntrar}>Entrar</Text>
                </Pressable>
 
              </View>
            </View>
</View>
    
  );
}


  
 
