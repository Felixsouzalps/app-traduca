import { router } from "expo-router";
import { useState } from "react";

import { View, Text, Image, TextInput, Pressable, ScrollView } from "react-native";

import globalStyle from "@/styles/globalStyles";
import esqueciSenhaStyle from "@/styles/esqueciSenhaStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import EnviarLinkModal from "@/components/linkSenhaModal";

export default function EsqueciSenhaScreen() {
  const [modalLinkSenha, setModalLinkSenha] = useState(false);
  
  return (
    <View style={globalStyle.container}>
      <Image
        source={require('@/assets/images/imgIcon/logo-traducaapp.png')}
        style={globalStyle.logoMaior}
       resizeMode="contain"
    />

    
 
    <View style={esqueciSenhaStyle.conteudo}>
  
   
      <Text style={esqueciSenhaStyle.titulo}>Esqueci a senha</Text>
      <Text>Informe seu e-mail para receber o link de redefinição de senha</Text>
 
                    {/* Formulario de login */}
              <View style={esqueciSenhaStyle.form}>
                <View style={esqueciSenhaStyle.input}>
                  <Image
                    source={require("@/assets/images/imgIcon/email-azul.png")}
                    style={esqueciSenhaStyle.icone}
                  />
 
                  <TextInput
                    placeholder="E-mail"
                    placeholderTextColor="#888888"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={esqueciSenhaStyle.TextInput}
                  />
                </View>
 
              <Pressable
                  style={({ pressed }) => [
                    esqueciSenhaStyle.btnEnviarLink,
                    pressed && esqueciSenhaStyle.btnEnviarLinkPressed,
                  ]}
                  onPress={() => setModalLinkSenha(true)}
                >
                  <Text style={esqueciSenhaStyle.txtEnviarLink}>Enviar link</Text>
                </Pressable>

                  <Pressable
                      style={({ pressed }) => [
                          esqueciSenhaStyle.btnVoltarLogin,
                          pressed && esqueciSenhaStyle.btnVoltarLoginPressed,
                      ]}
                       onPress={() => router.navigate("/")}
                  >
                      <Text style={esqueciSenhaStyle.txtVoltarLogin}>Voltar ao login</Text>
                  </Pressable>
 
              </View>
            </View>

          <EnviarLinkModal
              visible={modalLinkSenha}
              onClose={() => {
                  router.navigate("/");
                  setModalLinkSenha(false);
              }}
          />
</View>
    
  );
}