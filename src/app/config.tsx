
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Switch, Text, View } from "react-native";

import AlterarSenhaModal from "@/components/alterar-senha-modal";
import ModalIphone from "@/components/modal-iphone";
import ModalPermissaoInstalacao from "@/components/modal-permissao-instalacao";
import TelaComAbas from "@/components/tela-com-abas";

import { useThemePreference } from "@/contexts/ThemeContext";
import { useTheme } from "@/hooks/use-theme";

import {
  fotoAlunoUrl,
  logoutAluno,
  primeiroNomeAluno,
} from "@/services/api";

import configStyles from "@/styles/configStyles";
import { cores } from "@/styles/variaveis";

type ItemConfig = {
  titulo: string;
  subtitulo: string;
  icone: number;
  acao: "seta" | "instalar" | "notificacao";
  onPress?: () => void;
};

const minhaConta: ItemConfig[] = [
  {
    titulo: "Perfil",
    subtitulo: "Dados pessoais, telefone e E-mail",
    icone: require("@/assets/images/imgIcon/usuario.png"),
    acao: "seta",
  },
  {
    titulo: "Alterar senha",
    subtitulo: "Atualize sua senha com segurança",
    icone: require("@/assets/images/imgIcon/senha-azul.png"),
    acao: "seta",
  },
];

const appItens: ItemConfig[] = [
  {
    titulo: "Instalar aplicativo",
    subtitulo: "Adicione o app à sua tela inicial",
    icone: require("@/assets/images/imgIcon/download-azul.png"),
    acao: "instalar",
  },
  {
    titulo: "Ativar notificações",
    subtitulo: "Receba avisos sobre atividades e aulas",
    icone: require("@/assets/images/imgIcon/sino-azul.png"),
    acao: "notificacao",
  },
];

function ItemLista({ item }: { item: ItemConfig }) {
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);
  const tema = useTheme();

  return (
    <Pressable
      style={[
        configStyles.itemCard,
        { backgroundColor: tema.backgroundElement },
      ]}
      onPress={item.acao === "notificacao" ? undefined : item.onPress}
      accessibilityRole={item.acao === "notificacao" ? undefined : "button"}
    >
      <View
        style={[
          configStyles.itemIconeBox,
          { backgroundColor: tema.backgroundSelected },
        ]}
      >
        <Image
          source={item.icone}
          style={configStyles.itemIcone}
          resizeMode="contain"
        />
      </View>

      <View style={[configStyles.itemCorpo, { flex: 1 }]}>
        <Text style={[configStyles.itemTitulo, { color: tema.text }]}>
          {item.titulo}
        </Text>

        <Text
          style={[
            configStyles.itemSubtitulo,
            { color: tema.textSecondary },
          ]}
        >
          {item.subtitulo}
        </Text>
      </View>

      {item.acao === "seta" && (
        <Image
          source={require("@/assets/images/imgIcon/voltar-azul.png")}
          style={configStyles.itemSeta}
        />
      )}

      {item.acao === "instalar" && (
        <Pressable
          style={configStyles.btnInstalar}
          onPress={item.onPress}
          accessibilityRole="button"
          accessibilityLabel="Instalar aplicativo"
        >
          <Text style={configStyles.txtBtnInstalar}>Instalar</Text>
        </Pressable>
      )}

      {item.acao === "notificacao" && (
        <Switch
          value={notificacoesAtivas}
          onValueChange={setNotificacoesAtivas}
          trackColor={{
            false: cores.cinza,
            true: cores.azul,
          }}
          thumbColor={cores.branco}
          accessibilityLabel="Ativar notificações"
        />
      )}
    </Pressable>
  );
}

function SeletorAparencia() {
  const { preference, setPreference } = useThemePreference();
  const tema = useTheme();

  const opcoes = [
    { label: "Claro", value: "light" as const },
    { label: "Escuro", value: "dark" as const },
    { label: "Sistema", value: "system" as const },
  ];

  return (
    <View
      style={[
        configStyles.itemCard,
        { backgroundColor: tema.backgroundElement },
      ]}
    >
      <View
        style={[
          configStyles.itemIconeBox,
          { backgroundColor: tema.backgroundSelected },
        ]}
      >
        <Image
          source={require("@/assets/images/imgIcon/personalizar-azul.png")}
          style={configStyles.itemIcone}
          resizeMode="contain"
        />
      </View>

      <View style={[configStyles.itemCorpo, { flex: 1 }]}>
        <Text style={[configStyles.itemTitulo, { color: tema.text }]}>
          Aparência
        </Text>

        <Text
          style={[
            configStyles.itemSubtitulo,
            { color: tema.textSecondary },
          ]}
        >
          Escolha o tema do aplicativo
        </Text>

        {opcoes.map((opcao) => {
          const selecionado = preference === opcao.value;

          return (
            <Pressable
              key={opcao.value}
              accessibilityRole="radio"
              accessibilityState={{ checked: selecionado }}
              onPress={() => {
                void setPreference(opcao.value).catch((erro) => {
                  console.error("Não foi possível salvar o tema:", erro);
                });
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 10,
                gap: 10,
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: selecionado
                    ? cores.azul
                    : tema.textSecondary,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {selecionado && (
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: cores.azul,
                    }}
                  />
                )}
              </View>

              <Text
                style={[
                  configStyles.itemTitulo,
                  { color: tema.text },
                ]}
              >
                {opcao.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function ConfigScreen() {
  const [modalAlterarSenhaVisivel, setModalAlterarSenhaVisivel] =
    useState(false);

  const [modalIphoneVisivel, setModalIphoneVisivel] = useState(false);

  const [modalPermissaoVisivel, setModalPermissaoVisivel] =
    useState(false);

  const tema = useTheme();
  const { theme: temaAtual } = useThemePreference();
  <View style={{ backgroundColor: "#121318", padding: 16 }}>
  <Text style={{ color: "#F5F5F7", fontSize: 20 }}>
    TESTE: TEXTO BRANCO
  </Text>

  <Text style={{ color: "#FF0000", fontSize: 20 }}>
    TESTE: TEXTO VERMELHO
  </Text>
</View>


  const foto = fotoAlunoUrl();

  return (
    <TelaComAbas
      titulo="Configurações"
      subtitulo="Gerencie seu perfil, desempenho, entre outros"
    >
      <View
        style={[
          configStyles.cardBoasVindas,
          { backgroundColor: tema.backgroundElement },
        ]}
      >
        <View style={configStyles.avatar}>
          {foto ? (
            <Image
              source={{ uri: foto }}
              style={configStyles.avatarFoto}
            />
          ) : (
            <Image
              source={require("@/assets/images/imgIcon/usuario.png")}
              style={configStyles.avatarIcone}
            />
          )}
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={[
              configStyles.boasVindasTitulo,
              { color: tema.text },
            ]}
          >
            Olá, {primeiroNomeAluno()}!
          </Text>

          <Text
            style={[
              configStyles.boasVindasSubtitulo,
              { color: tema.textSecondary },
            ]}
          >
            Acesse e organize sua experiência no app
          </Text>
        </View>
      </View>

      <View style={configStyles.secao}>
        <Text
          style={[
            configStyles.secaoTitulo,
            { color: tema.text },
          ]}
        >
          Meu Progresso
        </Text>

        <ItemLista
          item={{
            titulo: "Desempenho",
            subtitulo: "Visualize suas aulas e gerencie suas faltas",
            icone: require("@/assets/images/imgIcon/desempenho-azul.png"),
            acao: "seta",
            onPress: () => router.navigate("/desempenho"),
          }}
        />
      </View>

      <View style={configStyles.secao}>
        <Text
          style={[
            configStyles.secaoTitulo,
            { color: tema.text },
          ]}
        >
          Minha conta
        </Text>

        {minhaConta.map((item) => {
          const onPress =
            item.titulo === "Alterar senha"
              ? () => setModalAlterarSenhaVisivel(true)
              : item.titulo === "Perfil"
                ? () => router.navigate("/perfil")
                : undefined;

          return (
            <ItemLista
              key={item.titulo}
              item={{ ...item, onPress }}
            />
          );
        })}
      </View>

      <View style={configStyles.secao}>
        <Text
          style={[
            configStyles.secaoTitulo,
            { color: tema.text },
          ]}
        >
          App
        </Text>

        <SeletorAparencia />

        {appItens.map((item) => {
          const onPress =
            item.titulo === "Instalar aplicativo"
              ? () => setModalPermissaoVisivel(true)
              : undefined;

          return (
            <ItemLista
              key={item.titulo}
              item={{ ...item, onPress }}
            />
          );
        })}
      </View>

      <View style={configStyles.secao}>
        <Text
          style={[
            configStyles.secaoTitulo,
            { color: tema.text },
          ]}
        >
          Contato
        </Text>

        <ItemLista
          item={{
            titulo: "Tire sua dúvida",
            subtitulo: "Peça mais informações ao professor",
            icone: require("@/assets/images/imgIcon/chat.png"),
            acao: "seta",
            onPress: () => router.navigate("/duvida"),
          }}
        />
      </View>

      <Pressable
        style={configStyles.btnSair}
        onPress={async () => {
          try {
            await logoutAluno();
            router.replace("/");
          } catch (error) {
            console.error("Não foi possível sair da conta:", error);
          }
        }}
        accessibilityRole="button"
      >
        <Text style={configStyles.txtBtnSair}>Sair da conta</Text>
      </Pressable>

      <AlterarSenhaModal
        visible={modalAlterarSenhaVisivel}
        onClose={() => setModalAlterarSenhaVisivel(false)}
      />

      <ModalIphone
        visible={modalIphoneVisivel}
        onClose={() => setModalIphoneVisivel(false)}
      />

      <ModalPermissaoInstalacao
        visible={modalPermissaoVisivel}
        onClose={() => setModalPermissaoVisivel(false)}
        onPermitir={() => {
          setModalPermissaoVisivel(false);
          setModalIphoneVisivel(true);
        }}
      />
    </TelaComAbas>
  );
}
