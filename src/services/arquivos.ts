// src/services/arquivos.ts
// Baixar e abrir arquivos protegidos no Android/iOS.
// No navegador, o Expo utiliza o arquivo arquivos.web.ts.

import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";

import { AtividadeResumo, Material, sessao } from "@/services/api";

/**
 * Cria um nome de arquivo válido.
 */
function montarNome(
  titulo: string,
  reserva: string,
  extensao: string | null,
): string {
  const nome =
    titulo
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w-]+/g, "_")
      .replace(/^_+|_+$/g, "") || reserva;

  const extensaoLimpa = extensao
    ?.replace(/^\./, "")
    .replace(/[^\w]+/g, "")
    .toLowerCase();

  return extensaoLimpa ? `${nome}.${extensaoLimpa}` : nome;
}

/**
 * Retorna o nome do arquivo de um material.
 */
export function nomeArquivo(material: Material): string {
  return montarNome(
    material.titulo,
    `material_${material.id_material}`,
    material.extensao,
  );
}

/**
 * Baixa um arquivo protegido pela autenticação
 * e abre as opções de compartilhamento do dispositivo.
 */
async function abrirArquivoProtegido(
  url: string,
  nome: string,
  titulo: string,
): Promise<void> {
  if (!url || !url.trim()) {
    throw new Error("O endereço do arquivo não foi informado.");
  }

  if (!sessao.token) {
    throw new Error("Sua sessão expirou. Entre novamente no aplicativo.");
  }

  let arquivo: File;

  try {
    arquivo = await File.downloadFileAsync(url, new File(Paths.cache, nome), {
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${sessao.token}`,
      },
      idempotent: true,
    });
  } catch (erro) {
    console.error("Erro ao baixar arquivo:", erro);

    throw new Error(
      "Não foi possível baixar o arquivo. Verifique sua conexão e tente novamente.",
    );
  }

  try {
    const compartilhamentoDisponivel = await Sharing.isAvailableAsync();

    if (!compartilhamentoDisponivel) {
      throw new Error(
        "Este dispositivo não permite abrir o arquivo pelo menu de compartilhamento.",
      );
    }

    await Sharing.shareAsync(arquivo.uri, {
      dialogTitle: titulo,
      mimeType: obterMimeType(nome),
    });
  } catch (erro) {
    if (erro instanceof Error) {
      throw erro;
    }

    throw new Error("Não foi possível abrir o arquivo.");
  }
}

/**
 * Identifica o tipo de arquivo pelo nome.
 */
function obterMimeType(nome: string): string {
  const extensao = nome.split(".").pop()?.toLowerCase();

  switch (extensao) {
    case "mp3":
      return "audio/mpeg";

    case "wav":
      return "audio/wav";

    case "m4a":
      return "audio/mp4";

    case "aac":
      return "audio/aac";

    case "ogg":
      return "audio/ogg";

    case "pdf":
      return "application/pdf";

    case "png":
      return "image/png";

    case "jpg":
    case "jpeg":
      return "image/jpeg";

    default:
      return "application/octet-stream";
  }
}

/**
 * Abre ou compartilha um material protegido.
 */
export async function abrirMaterial(
  material: Material,
  _modo: "ver" | "baixar",
): Promise<void> {
  if (!material.url_download) {
    throw new Error(
      "Este material não possui um arquivo disponível para download.",
    );
  }

  await abrirArquivoProtegido(
    material.url_download,
    nomeArquivo(material),
    material.titulo,
  );
}

/**
 * Abre ou compartilha o áudio de uma atividade.
 *
 * Importante: esta função não reproduz o áudio dentro
 * da tela. Ela baixa o arquivo e abre as opções do dispositivo.
 */
export async function ouvirAudioAtividade(
  atividade: AtividadeResumo,
): Promise<void> {
  if (!atividade.tem_audio || !atividade.url_audio) {
    throw new Error("Esta atividade não possui um áudio disponível.");
  }

  const extensao = atividade.extensao_audio?.replace(/^\./, "") || "mp3";

  const nome = montarNome(
    atividade.titulo,
    `atividade_${atividade.id_atividade}`,
    extensao,
  );

  await abrirArquivoProtegido(
    atividade.url_audio,
    nome,
    `Áudio: ${atividade.titulo}`,
  );
}
