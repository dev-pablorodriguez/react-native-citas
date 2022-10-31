import React from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import { formatearFecha } from '../helpers'

const Paciente = ({ 
  paciente, 
  setModalVisible, 
  editarPaciente, 
  eliminarPaciente,
  setModalDetallePaciente,
  setPacienteEditando
}) => {
  const { paciente: nombre, fecha, id } = paciente;

  return (
    <Pressable onLongPress={ () => {
      setModalDetallePaciente(true);
      setPacienteEditando(paciente)
    }}>
      <View style={ styles.contenedor }>
        <Text style={ styles.label }>Paciente</Text>
        <Text style={ styles.texto }>{ nombre }</Text>
        <Text style={ styles.fecha }>{ formatearFecha(fecha) }</Text>

        <View style={ styles.contenedorBotones }>
          <Pressable 
            style={[ styles.btn, styles.btnEditar ]}
            onPress={ () => { setModalVisible(true); editarPaciente(id) } }
          >
            <Text style={ styles.btnTexto }>Editar</Text>
          </Pressable>

          <Pressable 
            style={[ styles.btn, styles.btnEliminar ]}
            onPress={ () => eliminarPaciente(id) }
          >
          <Text style={ styles.btnTexto }>Eliminar</Text>
          </Pressable>
        </View>

      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#FFF',
    padding: 20,
    borderBottomColor: '#94A3B8',
    borderBottomWidth: 1
  },
  label: {
    color: '#374151',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 10
  },
  texto: {
    color: '#6D28D9',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10
  },
  fecha: {
    color: '#374151'
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  btnEditar: {
    backgroundColor: '#F59E0B'
  },
  btnEliminar: {
    backgroundColor: '#EF4444'
  },
  btnTexto: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
    color: '#FFF'
  }
})

export default Paciente