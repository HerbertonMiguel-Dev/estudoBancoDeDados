import React from "react";
import { Container, Nome, Preco, CenterView, Botao, BotaoText } from "./styles";
import { Text, View } from "react-native";


export default function Books({data}){
  return(
    <Container>
      <Nome>{data.nome}</Nome>
      <Preco>R$ {data.preco}</Preco>

      <CenterView>
        <Botao onPess={() => {}}>
           <BotaoText>Editar</BotaoText>
        </Botao>

        <Botao onPess={() => {}}>
           <BotaoText>Excluir</BotaoText>
        </Botao>
      </CenterView>

    </Container>
  )
}