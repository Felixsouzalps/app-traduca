import { router } from "expo-router";
import { useState } from "react";

import { View, Text, Image, TextInput, Pressable, ScrollView } from "react-native";

import globalStyle from "@/styles/globalStyles";
import redefinirSenhaStyle from "@/styles/redefinirSenhaStyle";
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
 
    <View style={redefinirSenhaStyle.conteudo}>
  
   
      <Text style={redefinirSenhaStyle.titulo}>Redefinir senha</Text>
      <Text style={redefinirSenhaStyle.subtitulo}>Crie uma nova senha para entrar na sua conta</Text>
 
              <View style={redefinirSenhaStyle.input}>
                  <Image
                    source={require("@/assets/images/imgIcon/senha-azul.png")}
                    style={redefinirSenhaStyle.icone}
                  />
                  <TextInput
                    placeholder="Nova senha"
                    placeholderTextColor="#888888"
                    style={redefinirSenhaStyle.TextInput}
                    secureTextEntry={!verSenha}
                  />
 
                  <Pressable
                    style={redefinirSenhaStyle.btnMostrarSenha}
                    onPress={() => setVerSenha((current) => !current)}
                  >
                    <Image
                      source={
                        verSenha
                        ? require("@/assets/images/imgIcon/esconder.png")
                        : require("@/assets/images/imgIcon/visualizar-azul.png")
                      }
                      style={redefinirSenhaStyle.mostrarSenha}
                    />
                  </Pressable>
                </View>
 
                <View style={redefinirSenhaStyle.input}>
                  <Image
                    source={require("@/assets/images/imgIcon/senha-azul.png")}
                    style={redefinirSenhaStyle.icone}
                  />
                  <TextInput
                    placeholder="Confirmar senha"
                    placeholderTextColor="#888888"
                    style={redefinirSenhaStyle.TextInput}
                    secureTextEntry={!verSenha}
                  />
 
                  <Pressable
                    style={redefinirSenhaStyle.btnMostrarSenha}
                    onPress={() => setVerSenha((current) => !current)}
                  >
                    <Image
                      source={
                        verSenha
                        ? require("@/assets/images/imgIcon/esconder.png")
                        : require("@/assets/images/imgIcon/visualizar-azul.png")
                      }
                      style={redefinirSenhaStyle.mostrarSenha}
                    />
                  </Pressable>
                </View>
 
                <Pressable
                  style={({ pressed }) => [
                    redefinirSenhaStyle.btnEntrar,
                    pressed && redefinirSenhaStyle.btnEntrarPressed,
                  ]}
                  onPress={() => router.navigate("/")}
                 
                >
                  <Text style={redefinirSenhaStyle.txtEntrar}>Salvar senha</Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    redefinirSenhaStyle.btnEntrar,
                    pressed && redefinirSenhaStyle.btnEntrarPressed,
                  ]}
                  onPress={() => router.navigate("/")}
                 
                >
                  <Text style={redefinirSenhaStyle.txtEntrar}>Voltar ao login</Text>
                </Pressable>
 
              </View>
            </View>

    
  );
}


  
 
