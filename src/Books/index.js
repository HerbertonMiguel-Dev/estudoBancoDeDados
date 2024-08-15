import React from "react";
import { Container, Nome, Preco, CenterView, Botao, BotaoText } from "./styles";


export default function Books({data, editar}){
  return(
    <Container>
      <Nome>{data.nome}</Nome>
      <Preco>R$ {data.preco}</Preco>

      <CenterView>
        <Botao onPress={()=> editar(data) }>
         <BotaoText>Editar</BotaoText>
       </Botao>

        <Botao onPess={() => {}}>
           <BotaoText>Excluir</BotaoText>
        </Botao>
      </CenterView>

    </Container>
  )
}