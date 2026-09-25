import { useState } from "react";

import { Image, Pressable, Text, View } from "react-native";

import BandeiraIdioma, { IdiomaId } from "@/components/bandeira-idioma";
import ModalEntrarAula from "@/components/modal-entrar-aula";
import TelaComAbas from "@/components/tela-com-abas";
import agendaStyles from "@/styles/agendaStyles";

const diasSemana: { abrev: string; numero: number; selecionado?: boolean }[] = [
  { abrev: "SEG", numero: 27 },
  { abrev: "TER", numero: 28, selecionado: true },
  { abrev: "QUA", numero: 29 },
  { abrev: "QUI", numero: 30 },
  { abrev: "SEX", numero: 31 },
  { abrev: "SÁB", numero: 1 },
  { abrev: "DOM", numero: 2 },
];

const filtros = ["Hoje", "Semana", "Todas", "Concluídas"] as const;

const aulasDoDia: {
  idioma: IdiomaId;
  titulo: string;
  sala?: string;
  horario: string;
  professor: string;
  ativo?: boolean;
}[] = [
  {
    idioma: "portugues",
    titulo: "Português",
    sala: "Sala 03",
    horario: "Hoje · 12:00",
    professor: "Prof. Renato Caetano",
    ativo: true,
  },
  {
    idioma: "italiano",
    titulo: "Italiano",
    horario: "Amanhã · 12:00",
    professor: "Prof. Renato Caetano",
  },
  {
    idioma: "ingles",
    titulo: "Inglês",
    horario: "Quinta · 14:00",
    professor: "Prof. Renato Caetano",
  },
];

export default function AgendaScreen() {
  const [modalAulaVisivel, setModalAulaVisivel] = useState(false);
  const [carregandoAula, setCarregandoAula] = useState(false);

  const confirmarEntrada = () => {
    setCarregandoAula(true);
    setTimeout(() => {
      setCarregandoAula(false);
      setModalAulaVisivel(false);
    }, 1800);
  };
  const [filtroSelecionado, setFiltroSelecionado] = useState<string>("Hoje");

  return (
    <TelaComAbas titulo="Agenda" subtitulo="Gerencie suas aulas com a agenda">
      {/* Próxima aula */}
      <View style={agendaStyles.cardDestaque}>
        <View style={agendaStyles.cardDestaqueTopo}>
          <Text style={agendaStyles.cardDestaqueLabel}>Próxima aula</Text>

          <View style={agendaStyles.duracaoBadge}>
            <Image
              source={require("@/assets/images/imgIcon/relogio-azul.png")}
              style={agendaStyles.duracaoBadgeIcone}
            />
            <Text style={agendaStyles.duracaoBadgeTexto}>25 min</Text>
          </View>
        </View>

        <View style={agendaStyles.cardDestaqueCorpo}>
          <View style={{ marginRight: 12 }}>
            <BandeiraIdioma idioma="portugues" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={agendaStyles.cardDestaqueTitulo}>Aula de português</Text>

            <View style={agendaStyles.cardDestaqueLinhaInfo}>
              <Image
                source={require("@/assets/images/imgIcon/calendario-azul.png")}
                style={agendaStyles.cardDestaqueLinhaIcone}
              />
              <Text style={agendaStyles.cardDestaqueLinhaTexto}>
                28/07/2026 às 12:00
              </Text>
            </View>

            <View style={agendaStyles.cardDestaqueLinhaInfo}>
              <Image
                source={require("@/assets/images/imgIcon/professor.png")}
                style={agendaStyles.cardDestaqueLinhaIcone}
              />
              <Text style={agendaStyles.cardDestaqueLinhaTexto}>
                Prof. Renato Caetano
              </Text>
            </View>
          </View>
        </View>

        <View style={agendaStyles.cardDestaqueBotoes}>
          <Pressable style={agendaStyles.btnEntrar} onPress={() => setModalAulaVisivel(true)}>
            <Image
              source={require("@/assets/images/imgIcon/play.png")}
              style={agendaStyles.iconeBtnEntrar}
            />
            <Text style={agendaStyles.txtBtnEntrar}>Entrar na aula</Text>
          </Pressable>

          <Pressable style={agendaStyles.btnReagendar}>
            <Image
              source={require("@/assets/images/imgIcon/calendario-azul.png")}
              style={agendaStyles.iconeBtnReagendar}
            />
            <Text style={agendaStyles.txtBtnReagendar}>Reagendar</Text>
          </Pressable>
        </View>
      </View>

      <ModalEntrarAula
        visible={modalAulaVisivel}
        carregando={carregandoAula}
        onClose={() => setModalAulaVisivel(false)}
        onConfirmar={confirmarEntrada}
      />

      {/* Calendário */}
      <View style={agendaStyles.secaoTitulo}>
        <View style={agendaStyles.secaoTituloEsquerda}>
          <Image
            source={require("@/assets/images/imgIcon/calendario-azul.png")}
            style={agendaStyles.secaoTituloIcone}
          />
          <Text style={agendaStyles.secaoTituloTexto}>Calendário</Text>
        </View>
        <Pressable>
          <Text style={agendaStyles.secaoLink}>Ver mês</Text>
        </Pressable>
      </View>

      <View style={agendaStyles.semanaLinha}>
        {diasSemana.map((dia) => (
          <View
            key={dia.abrev}
            style={[
              agendaStyles.diaItem,
              dia.selecionado && agendaStyles.diaItemSelecionado,
            ]}
          >
            <Text
              style={[
                agendaStyles.diaAbreviacao,
                dia.selecionado && agendaStyles.diaAbreviacaoSelecionada,
              ]}
            >
              {dia.abrev}
            </Text>
            <Text
              style={[
                agendaStyles.diaNumero,
                dia.selecionado && agendaStyles.diaNumeroSelecionado,
              ]}
            >
              {String(dia.numero).padStart(2, "0")}
            </Text>
          </View>
        ))}
      </View>

      {/* Filtros */}
      <View style={agendaStyles.filtrosLinha}>
        {filtros.map((filtro) => {
          const selecionado = filtro === filtroSelecionado;

          return (
            <Pressable
              key={filtro}
              style={[
                agendaStyles.filtroPill,
                selecionado && agendaStyles.filtroPillSelecionado,
              ]}
              onPress={() => setFiltroSelecionado(filtro)}
            >
              {filtro === "Hoje" && (
                <Image
                  source={require("@/assets/images/imgIcon/relogio-azul.png")}
                  style={agendaStyles.filtroPillIcone}
                />
              )}
              <Text
                style={[
                  agendaStyles.filtroPillTexto,
                  selecionado && agendaStyles.filtroPillTextoSelecionado,
                ]}
              >
                {filtro}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Aulas do dia */}
      <View style={[agendaStyles.secaoTitulo, { marginBottom: 8 }]}>
        <Text style={agendaStyles.secaoTituloTexto}>Hoje · 28 de julho</Text>
      </View>

      {aulasDoDia.map((aula) => (
        <View key={aula.titulo} style={agendaStyles.aulaCard}>
          <View style={agendaStyles.aulaCardTopo}>
            <View style={{ marginRight: 12 }}>
              <BandeiraIdioma idioma={aula.idioma} tamanho={40} />
            </View>

            <View style={agendaStyles.aulaCardCabecalho}>
              <View>
                <Text style={agendaStyles.aulaCardTitulo}>{aula.titulo}</Text>

                <View style={agendaStyles.aulaCardLinhaInfo}>
                  <Image
                    source={require("@/assets/images/imgIcon/relogio-azul.png")}
                    style={agendaStyles.aulaCardLinhaIcone}
                  />
                  <Text style={agendaStyles.aulaCardLinhaTexto}>{aula.horario}</Text>
                </View>

                <View style={agendaStyles.aulaCardLinhaInfo}>
                  <Image
                    source={require("@/assets/images/imgIcon/professor.png")}
                    style={agendaStyles.aulaCardLinhaIcone}
                  />
                  <Text style={agendaStyles.aulaCardLinhaTexto}>{aula.professor}</Text>
                </View>
              </View>

              {aula.sala ? (
                <Text style={agendaStyles.aulaCardSala}>{aula.sala}</Text>
              ) : null}
            </View>
          </View>

          {aula.ativo ? (
            <View style={agendaStyles.aulaCardBotoes}>
              <Pressable
                style={agendaStyles.btnEntrarPequeno}
                onPress={() => setModalAulaVisivel(true)}
              >
                <Text style={agendaStyles.txtBtnEntrarPequeno}>Entrar</Text>
              </Pressable>
              <Pressable style={agendaStyles.btnReagendarPequeno}>
                <Text style={agendaStyles.txtBtnReagendarPequeno}>Reagendar</Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      ))}
    </TelaComAbas>
  );
}
