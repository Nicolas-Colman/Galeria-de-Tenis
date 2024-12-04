import { useNavigation} from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';
import { FlatList, View, TextInput, TouchableOpacity, Text, ActivityIndicator, Alert } from "react-native";
import estilo from '../estilo';
import { Tenis } from '../model/Tenis';
import { SafeAreaView } from "react-native-safe-area-context";
import ManterTenis from "./ManterTenis";







const MeusTenis = () => {
    const [loading, setLoading] = useState(true);
    const [atualizar, setAtualizar] = useState(true);
    const [tenis, setTenis] = useState<Tenis[]>([]); // Array em branco
    const [formTenis, setFormTenis] = useState<Partial<Tenis>>({});
    const [imagePath, setImagePath] = useState('');
    const navigation = useNavigation();

    const refTenis = firestore.collection("Usuario")
        .doc(auth.currentUser?.uid)
        .collection("Tenis")

    useEffect(() => {
        if (loading) {
            listarTodos();
        }
    }, [tenis]);

    const listarTodos = () => {
        const subscriber = refTenis
            .onSnapshot((querySnapshot) => {
                const tenis = [];
                querySnapshot.forEach((documentSnapshot) => {
                    tenis.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id
                    });
                });
                setTenis(tenis);
                setLoading(false);
                setAtualizar(false);
                console.log(tenis);
            });
        return () => subscriber();
    }

    const Limpar = () => {
        setFormTenis({})
        setImagePath('')
    }

    const editTenis = (item: Tenis) =>{
        navigation.navigate( 'Adicionar', {tenis: item})
    }

    const deleteTenis = async (item) => {
        Alert.alert(
            "Excluir " + item.modelo + "?",
            "Essa operação não pode ser desfeita!",
            [
                {
                    text: "Cancelar"
                },
                {
                    text: "Excluir",
                    onPress: async () => {
                        const resultado = await refTenis
                            .doc(item.id)
                            .delete()
                            .then( () => {
                                setAtualizar(true);
                                alert(item.modelo + " excluído!");
                                Limpar();
                            });
                    }
                }
            ]
        )
    }


    if (loading) {
        return <ActivityIndicator
            size="60"
            color="#0782F9"
            style={estilo.tela}
        />
    }


    const renderItem = ({ item }) => <Item item={item} />
    const Item = ({ item }) => (
        <TouchableOpacity 
            onPress={() => {editTenis(item)}}
            onLongPress={ () => deleteTenis(item) }
        >

        <View style={estilo.item}>
            <Text style={estilo.titulo}>modelo: {item.modelo}</Text>
            <Text style={estilo.titulo}>marca: {item.marca}</Text>
            <Text style={estilo.titulo}>numero: {item.numero}</Text>
            <Text style={estilo.titulo}>cor: {item.cor}</Text>
        </View>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={estilo.tela}>
            <FlatList
                data={tenis}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                refreshing={atualizar}
                onRefresh={() => listarTodos()}
            />
        </SafeAreaView>
    )
}

export default MeusTenis;