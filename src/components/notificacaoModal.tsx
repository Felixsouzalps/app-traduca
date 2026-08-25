import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, Image, Modal, Pressable, ScrollView, Text, View, type ImageSourcePropType } from "react-native";
import styles from "@/styles/notificacoesStyle";

type Tipo = "aula" | "mensagem" | "pagamento" | "lembrete";
type Notificacao = { id: number; tipo: Tipo; titulo: string; detalhe: string; horario: string; lida: boolean };
const iniciais: Notificacao[] = [
  { id: 1, tipo: "lembrete", titulo: "Aula em 30 minutos", detalhe: "Sua aula de inglês começa em breve.", horario: "há 5 min", lida: false },
  { id: 2, tipo: "aula", titulo: "Nova aula agendada", detalhe: "Sua aula de conversação foi confirmada.", horario: "há 40 min", lida: false },
  { id: 3, tipo: "aula", titulo: "Aula atualizada", detalhe: "O horário da aula de amanhã foi alterado.", horario: "há 2 h", lida: false },
  { id: 4, tipo: "pagamento", titulo: "Pagamento confirmado", detalhe: "Seu pagamento foi processado com sucesso.", horario: "ontem", lida: true },
  { id: 5, tipo: "mensagem", titulo: "Nova mensagem", detalhe: "Seu professor enviou uma mensagem.", horario: "ontem", lida: true },
];
const abas = [{ chave: "todas", nome: "Todas" }, { chave: "aula", nome: "Aulas" }, { chave: "mensagem", nome: "Mensagens" }, { chave: "pagamento", nome: "Pagamentos" }] as const;
const icones: Record<Tipo, ImageSourcePropType> = { aula: require("@/assets/images/imgIcon/atividade.png"), mensagem: require("@/assets/images/imgIcon/email-azul.png"), pagamento: require("@/assets/images/imgIcon/check.png"), lembrete: require("@/assets/images/imgIcon/relogio-azul.png") };

interface Props { visible: boolean; onClose: () => void }
export default function NotificacoesModal({ visible, onClose }: Props) {
  const [aba, setAba] = useState<(typeof abas)[number]["chave"]>("todas");
  const [notificacoes, setNotificacoes] = useState(iniciais);
  const entrada = useRef(new Animated.Value(0)).current;
  const linhas = useRef(iniciais.map(() => new Animated.Value(0))).current;
  const naoLidas = notificacoes.filter((n) => !n.lida).length;
  const filtradas = useMemo(() => aba === "todas" ? notificacoes : notificacoes.filter((n) => n.tipo === aba), [aba, notificacoes]);
  useEffect(() => {
    if (!visible) return;
    entrada.setValue(0);
    linhas.forEach((linha) => linha.setValue(0));
    Animated.parallel([
      Animated.timing(entrada, { toValue: 1, duration: 260, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.stagger(55, linhas.map((linha) => Animated.timing(linha, { toValue: 1, duration: 240, easing: Easing.out(Easing.cubic), useNativeDriver: true }))),
    ]).start();
  }, [visible, entrada, linhas]);
  const alternar = (id: number) => setNotificacoes((atual) => atual.map((n) => n.id === id ? { ...n, lida: !n.lida } : n));
  const descartar = (id: number) => setNotificacoes((atual) => atual.filter((n) => n.id !== id));
  return <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}><View style={styles.sobrepor}><Animated.View style={[styles.conteudo, { opacity: entrada, transform: [{ translateY: entrada.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) }, { scale: entrada.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1] }) }] }]}>
    <View style={styles.capa}>{Array.from({ length: 9 }).map((_, i) => <View key={i} style={styles.furo} />)}</View>
    <View style={styles.corpo}>
      <View style={styles.cabecalho}><View style={styles.tituloArea}><Image source={require("@/assets/images/imgIcon/sino-azul.png")} style={styles.iconeTitulo} /><View><Text style={styles.titulo}>Caderno de avisos</Text><Text style={styles.subtitulo}>{naoLidas ? `${naoLidas} ${naoLidas === 1 ? "novo aviso" : "novos avisos"}` : "Tudo em dia por aqui"}</Text></View></View><Pressable onPress={onClose} style={styles.botaoFechar}><Text style={styles.fechar}>×</Text></Pressable></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.abas}>{abas.map((item) => { const ativa = aba === item.chave; const count = item.chave === "todas" ? notificacoes.length : notificacoes.filter((n) => n.tipo === item.chave).length; return <Pressable key={item.chave} onPress={() => setAba(item.chave)} style={[styles.aba, ativa && styles.abaAtiva]}><Text style={[styles.textoAba, ativa && styles.textoAbaAtiva]}>{item.nome} {count || ""}</Text></Pressable>; })}</ScrollView>
      <ScrollView style={styles.lista}>{filtradas.length === 0 ? <View style={styles.vazio}><Text style={styles.vazioTitulo}>Página em branco</Text><Text style={styles.vazioTexto}>Nenhum aviso por aqui ainda.</Text></View> : filtradas.map((item) => { const animacao = linhas[item.id - 1] ?? entrada; return <Animated.View key={item.id} style={[styles.notificacao, !item.lida && styles.notificacaoNova, { opacity: animacao, transform: [{ translateY: animacao.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) }] }]}>{!item.lida && <Text style={styles.marcaNova}>*</Text>}<View style={styles.iconeContainer}><Image source={icones[item.tipo]} style={styles.iconeNotificacao} /></View><View style={styles.textos}><View style={styles.linhaTitulo}><Text style={styles.tituloNotificacao}>{item.titulo}</Text><Text style={styles.horario}>{item.horario}</Text></View><Text style={styles.descricao}>{item.detalhe}</Text><View style={styles.acoes}><Pressable onPress={() => alternar(item.id)}><Text style={styles.acaoPrincipal}>{item.lida ? "Marcar como não lida" : "Marcar como lida"}</Text></Pressable><Pressable onPress={() => descartar(item.id)}><Text style={styles.acao}>Descartar</Text></Pressable></View></View></Animated.View>; })}</ScrollView>
      <View style={styles.rodape}><Pressable disabled={!naoLidas} onPress={() => setNotificacoes((atual) => atual.map((n) => ({ ...n, lida: true })))}><Text style={[styles.textoBotao, !naoLidas && styles.botaoDesabilitado]}>Marcar todas como lidas</Text></Pressable></View>
    </View>
  </Animated.View></View></Modal>;
}
