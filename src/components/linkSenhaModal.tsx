import {Modal, View, Text, ScrollView, Pressable} from "react-native";
import { router } from "expo-router";
 
import globalStyles from "@/styles/globalStyles";
import enviarLinkStyle from "@/styles/enviarLinkStyle";
 
interface EnviaLinkProps{
    visible: boolean;
    onClose: () => void;
}
 
export default function EnviarLinkModal(
    {
    visible,
    onClose,
    }: EnviaLinkProps){
 
        return(
        <Modal
       
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
 
            <View style={enviarLinkStyle.sobrepor}>
 
            <View style={enviarLinkStyle.conteudo}>
            <Text style={enviarLinkStyle.titulo}>Enviar Link</Text>
 
 
           
            <ScrollView style={enviarLinkStyle.scroll}>
                <Text style={enviarLinkStyle.texto}>Caso este e-mail esteja cadastrado em nosso sistema, você receberá um link de redefinição por e-mail.
 
                    validade do link (10 minutos)
                </Text>
               
 
            </ScrollView>
 
            <Pressable style={enviarLinkStyle.btnEntendi}
                            onPress={() => {
                                onClose();
                                router.navigate("/redefinir-senha");
                            }}
             
           
            >
            <Text style={enviarLinkStyle.txtEntendi}onPress={() => {
                                onClose();
                                router.navigate("/redefinir-senha");
                            }}>Ok</Text>
            </Pressable>
            </View>
 
            </View>
 
        </Modal>
        );
}
 