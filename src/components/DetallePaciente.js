import React from 'react'
import { Text, SafeAreaView, View, Pressable, StyleSheet } from 'react-native'
import { formatearFecha } from '../helpers'


const DetallePaciente = ({ paciente, setModalDetallePaciente, setPacienteEditando }) => {
  return (
    <SafeAreaView style={ styles.contenedor }>
      <View>
        <Text style={ styles.titulo }>Información {''}
          <Text style={ styles.tituloBold }>Paciente</Text>
        </Text>

        <Pressable onLongPress={ () => {
          setModalDetallePaciente(false);
          setPacienteEditando({});
        }} style={ styles.btnCerrar }>
          <Text style={ styles.btnCerrarTexto }>X Cerrar</Text>
        </Pressable>

        <View style={ styles.infoPaciente }>

          <View style={ styles.propertyView }>
            <Text style={ styles.propertyLabel }>Nombre: </Text>
            <Text style={ styles.propertyValue }>{ paciente.paciente }</Text>
          </View>

          <View style={ styles.propertyView }>
            <Text style={ styles.propertyLabel }>Propietario: </Text>
            <Text style={ styles.propertyValue }>{ paciente.propietario }</Text>
          </View>

          <View style={ styles.propertyView }>
            <Text style={ styles.propertyLabel }>Email: </Text>
            <Text style={ styles.propertyValue }>{ paciente.email }</Text>
          </View>

          <View style={ styles.propertyView }>
            <Text style={ styles.propertyLabel }>Teléfono: </Text>
            <Text style={ styles.propertyValue }>{ paciente.telefono }</Text>
          </View>

          <View style={ styles.propertyView }>
            <Text style={ styles.propertyLabel }>Fecha Alta: </Text>
            <Text style={ styles.propertyValue }>{ formatearFecha(paciente.fecha) }</Text>
          </View>

          <View style={ styles.propertyView }>
            <Text style={ styles.propertyLabel }>Síntomas: </Text>
            <Text style={ styles.propertyValue }>{ paciente.sintomas }</Text>
          </View>

        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F59E0B',
    flex: 1
  },
  titulo: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#FFF'
  },
  tituloBold: {
    fontWeight: '900',
  },
  btnCerrar: {
    marginVertical: 30,
    backgroundColor: '#E06900',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFF'
  },
  btnCerrarTexto: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase'
  },
  infoPaciente: {
    backgroundColor: '#FFF',
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  propertyView: {
    marginBottom: 10
  },
  propertyLabel: {
    textTransform: 'uppercase',
    color: '#374151',
    fontWeight: '600',
    fontSize: 12
  },
  propertyValue: {
    fontWeight: '700',
    fontSize: 20,
    color: '#334155'
  }
})

export default DetallePaciente