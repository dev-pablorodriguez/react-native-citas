import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
  Modal
} from 'react-native';
import Formulario from './src/components/Formulario';
import Paciente from './src/components/Paciente';
import DetallePaciente from './src/components/DetallePaciente';

const App = () => {
  
  //Los hooks se colocan en la parte superior
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [pacienteEditando, setPacienteEditando] = useState({});
  const [modalDetallePaciente, setModalDetallePaciente] = useState(false);

  const editarPaciente = ( id ) => {
    const pacienteEdit = pacientes.filter( pac => pac.id === id);
    setPacienteEditando(pacienteEdit[0]);
  }

  const eliminarPaciente = ( id ) => {
    Alert.alert(
      '¿Deseas eliminar esta cita?',
      'Una cita eliminada no se puede recuperar.',
      [
        { text: 'Cancelar' },
        { text: 'Eliminar', onPress: () => {
          const pacientesActualizados = pacientes.filter( pac => pac.id !== id);
          setPacientes(pacientesActualizados);
        }}
      ]
    );
  }

  return (
    <SafeAreaView style={ styles.container }>
      <Text style={ styles.titulo }>
        Administrador de Citas { '' }
        <Text style={ styles.tituloBold }>Veterinaria</Text>
      </Text>

      <Pressable 
        onPress={ () => setModalVisible(!modalVisible) }
        style={ styles.btnNuevaCita }>
        <Text style={ styles.btnTextoNuevaCita }>Nueva Cita</Text>
      </Pressable>

      { 
        pacientes.length === 0 ? 
        <Text style={ styles.noPacientes }>No hay pacientes aún.</Text> 
        : 
        <FlatList
          style={ styles.listado }
          data={ pacientes }
          keyExtractor={ item => item.id }
          renderItem={ ({ item }) => {
            return (
              <Paciente 
                paciente={ item }
                setModalVisible={ setModalVisible }
                editarPaciente={ editarPaciente }
                eliminarPaciente={ eliminarPaciente }
                setModalDetallePaciente={ setModalDetallePaciente }
                setPacienteEditando={ setPacienteEditando }
              />
            )
          }}
        />
      }

      { modalVisible && (
        <Formulario 
          modalVisible={ modalVisible }
          setModalVisible={ setModalVisible }
          pacientes={ pacientes }
          setPacientes={ setPacientes }
          pacienteEditando={ pacienteEditando }
          setPacienteEditando={ setPacienteEditando }
          />
      ) }

      <Modal animationType='fade' visible={ modalDetallePaciente }>
        <DetallePaciente 
          paciente={ pacienteEditando }
          setModalDetallePaciente={ setModalDetallePaciente }
          setPacienteEditando={ setPacienteEditando }
        />
      </Modal>

    </SafeAreaView>    
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600'
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6D28D9'
  },
  btnNuevaCita: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600'
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30
  }
})

export default App;
