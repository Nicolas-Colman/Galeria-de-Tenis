import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import { auth, firestore, storage } from '../firebase';
import { KeyboardAvoidingView, View, Image, TextInput, TouchableOpacity, Text, Pressable, Alert, FlatList } from "react-native";
import estilo from '../estilo';
import { Tenis } from '../model/Tenis';
import * as ImagePicker from "expo-image-picker";
import { uploadBytes } from "firebase/storage"; //Envia arq para o storage

const ManterTenis = () => {

    
    const [formTenis, setFormTenis] = useState<Partial<Tenis>>({});
    const [loading, setLoading] = useState(true);
    const [atualizar, setAtualizar] = useState(true);
    const route = useRoute();
    const {tenis} = route.params;
    

    const [imagePath, setImagePath] = useState('');

    const refTenis = firestore.collection("Usuario")
        .doc(auth.currentUser?.uid)
        .collection("Tenis")

    const Salvar = async() => {
        const tenis = new Tenis(formTenis);

        if (tenis.id === undefined){
            const refIdTenis = refTenis.doc();        
            tenis.id = refIdTenis.id;

            refIdTenis.set(tenis.toFirestore())
            .then(() => {
                alert("Tenis adicionado com sucesso!");
                Limpar();
            })
            .catch( error => alert(error.message) )
        } else {
            const refIdTenis = refTenis.doc(tenis.id);

            refIdTenis.update(tenis.toFirestore())
            .then(() => {
                alert(tenis.modelo + " atualizado com sucesso!");
                Limpar();
            })
        }
        
    }

    const Limpar = () => {
        setFormTenis({})
        setImagePath('')
    }

    // FUNÇÕES FOTO
    const escolheFoto = () => {
        Alert.alert(
            "Selecionar Foto",
            "Escolha uma alternativa",
            [
                {
                    text: "Câmera",
                    onPress: () => abrirCamera()
                },
                {
                    text: "Abrir Galeria",
                    onPress: () => abrirGaleria()
                }
            ]
        );
    }

    const abrirCamera = async () => {
        const permissao = await ImagePicker.requestCameraPermissionsAsync();
        if (permissao.granted === false) {
            alert("Você recusou a permissão de acesso à câmera.")
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        //console.log(result.assets[0]);
        enviarImagem(result);
    }

    const abrirGaleria = async () => {
        const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissao.granted === false) {
            alert("Você recusou a permissão de acesso à galeria.")
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        enviarImagem(result);
    }

    const enviarImagem = async (result) => {
        if (!result.canceled){
            setImagePath(result.assets[0].uri);
            let filename = result.assets[0].fileName;
            const ref = storage.ref(`imagens/${filename}`);

            const img = await fetch(result.assets[0].uri);
            const bytes = await img.blob();
            const fbResult = await uploadBytes(ref, bytes);

            const urlDownload = await storage.ref(
                fbResult.metadata.fullPath).getDownloadURL()

            setFormTenis({... formTenis, urlfoto: urlDownload});

        } else {
            alert("Envio cancelado!");
        }
    }



    //EDITA E EXCLUI REGISTRO
    const BuscarTenis = (tenis: Tenis) => {
        setFormTenis(tenis)
        if(tenis.urlfoto != null)
            setImagePath(tenis.urlfoto)
            
    }
    useEffect(() => {
        
            BuscarTenis(tenis);
            console.log('teste')
        
    }, [tenis]);

    return (
        <KeyboardAvoidingView style={estilo.tela}>
            <View style={estilo.inputArea}>

                <Pressable onPress={() => escolheFoto() }>
                    <View style={estilo.imagemView}>
                        {
                            imagePath !== "" && (
                                <Image source={{ uri: imagePath }} style={estilo.imagemTenis} />
                            )
                        }
                        {
                            imagePath === "" && (
                                <Image source={require("../assets/camera.png")} style={estilo.imagemTenis} />
                            )
                        }                        
                    </View>
                </Pressable>

                <TextInput 
                    placeholder="Modelo" 
                    value={formTenis.modelo}
                    onChangeText={texto => setFormTenis({...formTenis, modelo: texto })}
                    style={estilo.input}
                />
                <TextInput 
                    placeholder="Marca" 
                    value={formTenis.marca}
                    onChangeText={texto => setFormTenis({...formTenis, marca: texto })}
                    style={estilo.input}
                />
                <TextInput 
                    placeholder="Numero" 
                    value={formTenis.numero}
                    onChangeText={texto => setFormTenis({...formTenis, numero: texto })}
                    style={estilo.input}
                />
                <TextInput 
                    placeholder="Cor" 
                    value={formTenis.cor}
                    onChangeText={texto => setFormTenis({...formTenis, cor: texto })}
                    style={estilo.input}
                />
            </View>
            <View style={estilo.buttonArea}>
                <TouchableOpacity 
                    style={estilo.botao}
                    onPress={Salvar}
                >
                    <Text style={estilo.botaoTexto}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={estilo.botaoBranco}
                    onPress={Limpar}
                >
                    <Text style={estilo.botaoBrancoTexto}>Limpar</Text>
                </TouchableOpacity>
            </View>

            
        </KeyboardAvoidingView>
    )
    
}

export default ManterTenis;