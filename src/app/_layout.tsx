
import { Stack } from "expo-router";
import { useEffect, useState } from "react";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { carregarSessao } from "@/services/api";

export default function RootLayout() {
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function inicializar() {
      try {
        await carregarSessao();
      } catch (error) {
        console.error("Erro ao recuperar a sessão:", error);
      } finally {
        if (ativo) {
          setPronto(true);
        }
      }
    }

    inicializar();

    return () => {
      ativo = false;
    };
  }, []);

  if (!pronto) return null;

  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ThemeProvider>
  );
}
