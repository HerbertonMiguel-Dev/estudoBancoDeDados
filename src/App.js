import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, Keyboard } from "react-native";
import getRealm from "./services/realm";

import { Container,Logo, Title, Input, CenterView, Botao, BotaoText, List } from "./styles";

import Books from "./Books";

export default function App() {
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [books, setBooks] = useState([])
  
  useEffect(() => {
    loadBooks = async() =>{
      const realm = await getRealm()
      const data = realm.objects('Book');
      setBooks(data)
    }

    loadBooks()
  }, [])

  saveBook = async (data) =>{
    const realm = await getRealm();

    const id = realm.objects('Book').sorted('id', true).length > 0
    ? realm.objects('Book').sorted('id', true)[0].id + 1 : 1;

    const dadosLivro ={
      id: id,
      nome: data.nome,
      preco: data.preco
    }

    realm.write( () =>{
      realm.create('Book', dadosLivro)
    })

  }
  
   addBook = async () => {
    if(nome === '' || preco ===''){
      alert('Preecha todos os campos!')
      return;
    }
    try{
      const data = {nome: nome, preco: preco}
      await saveBook(data)

      setNome('');
      setPreco('');
      Keyboard.dismiss()

    }catch(err){
      alert(err);
    }
  }

  return (
    <Container>
      <Logo>Proximos Livros</Logo>
      <Title>Nome</Title>
      <Input 
        autoCapitalize="none" 
        autoCorrect={false}
        value={nome}
        onChangeText={ (text) => setNome(text)}
      />

      <Title>Preço</Title>
      <Input 
        autoCapitalize="none" 
        autoCorrect={false}
        value={preco}
        onChangeText={ (text) => setPreco(text)}
      />

      <CenterView>
          <Botao onPress={ addBook}>
            <BotaoText>Cadastrar</BotaoText>
          </Botao>

          <Botao onPress={ () => {}}>
            <BotaoText>Editar</BotaoText>
          </Botao>
      </CenterView>

      <List 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        data={books}
        keyExtractor={item => String(item.id)}
        renderItem={ ({item})  => (<Books data={item}/>)}
      />
    </Container>
  );
}
