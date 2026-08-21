import{ StyleSheet} from "react-native"
 
const globalStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
   
    flex: 1,
    backgroundColor: '#ffffff',
  },
 
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
 
  },
 
  subtitulo: {
    fontSize: 20,
    color: '#0000ff'
  },

  logoMaior:{
    width:300,
    height:190,
    marginTop: 50,
  }
})
 
export default globalStyle;