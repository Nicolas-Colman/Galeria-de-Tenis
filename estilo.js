import { StyleSheet } from "react-native";

export default StyleSheet.create({

    tela:{
        flex: 1,
        alignItems: 'center',

    },
    telaH:{
        flex: 1,
        alignItems: 'center',

    },

    inputArea:{
        width: '80%',
    },

    buttonArea:{
        width:"60%",
        marginTop: 40
    },

    input: {
        backgroundColor: 'white',
        marginTop: 10,
        padding: 10,
        borderRadius: 10
    },

    botao:{
        backgroundColor: '#0f66d7',
        width: '100%',
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        color: 'white',
        marginTop: 5


    },

    botaoTexto:{
        color: 'white',
        fontWeight: '700'
    },

    botaoBranco:{
        width: '100%',
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        color: 'white',
        marginTop: 10,
        borderColor: '#0f66d7',
        borderWidth: 2
    },

    botaoBrancoTexto:{
        color: '#0f66d7',
        fontWeight: '700'
    },

    flat: {
        flex: 1,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        width: "40%",
        marginBottom: 5,
        backgroundColor: 'grey',
        margin: 'auto',
        height: '100%'

        
    },
    titulo:{
        fontSize: 14,
        fontWeight: '500'
    },
    telaSafe:{
        flex: 1,

        
    },

    tabNav:{
        backgroundColor: 'black'
    },

    cabecalhoH:{
        width: '100%',
        height: '15%',
        marginTop: 25,
        borderColor: 'grey',
        
    },

    buscarH:{
        flexDirection: 'row',
        borderWidth: 1,
        width: '50%',
        borderRadius: 20,
        borderColor: 'grey',
        margin: 'auto',
        height: 35,

    },

    buscarH2:{
        flexDirection: 'row',
        borderWidth: 1,
        width: '50%',
        borderRadius: 5,
        borderColor: 'grey',
        margin: 'auto',
        height: 35,

    },
    logoAbertura:{

        width: 300,
        height: 300,
        margin: 'auto'
         
        
    },

    logo:{
        width: 200,
        height: 200,
        marginTop: 50,
        marginBottom: 50
    }

});