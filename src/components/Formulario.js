import React, { useState , useEffect} from 'react'
import { 
  SafeAreaView, 
  Modal, 
  Text, 
  StyleSheet, 
  TextInput, 
  View, 
  ScrollView, 
  Button, 
  Pressable, 
  Alert } from 'react-native'
import DatePicker from 'react-native-date-picker';

const Formulario = ({ 
  modalVisible, 
  setModalVisible, 
  pacientes, 
  setPacientes, 
  pacienteEditando,
  setPacienteEditando 
}) => {

  const [id, setId] = useState('');
  const [nombrePaciente, setNombrePaciente] = useState(pacienteEditando.paciente);
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState(new Date());
  // const [fechaModalAbierto, setFechaModalAbierto] = useState(false);
  const [sintomas, setSintomas] = useState('');

  useEffect( () => {
    if(Object.keys( pacienteEditando ).length > 0){
      setValoresFormulario( pacienteEditando );
    }
  }, [ pacienteEditando ])

  const handleCita = () => {
    //Validar
    if([nombrePaciente, propietario, email, fecha, sintomas].includes('')){
      Alert.alert(
        'Error', 
        'Todos los campos son obligatorios.', 
        // [{ text: 'Recordármelo después' }, { text: 'Cancelar' }, { text: 'OK' }]
      )

      return;
    }

    const nuevoPaciente = {
      paciente: nombrePaciente,
      propietario,
      email,
      telefono,
      fecha,
      sintomas
    }

    //Revisar si es un registro nuevo o edición
    if(id){
      //Edición
      nuevoPaciente.id = id;
      //Genera un nuevo arreglo de elementos reemplazando el elemento editado, los demás los mantiene igual
      const pacientesActualizados = 
        pacientes.map( pac => pac.id === id ? nuevoPaciente : pac);

      setPacientes(pacientesActualizados);
      setPacienteEditando({});

    }else{
      //Nuevo registro
      nuevoPaciente.id = Date.now();
      setPacientes([...pacientes, nuevoPaciente]);
    }

    setModalVisible(!modalVisible);
    limpiarFormulario();
  }

  const limpiarFormulario = () => {
    setId('');
    setNombrePaciente('');
    setPropietario('');
    setEmail('');
    setTelefono('');
    setFecha(new Date());
    setSintomas('');
  }

  const setValoresFormulario = ( pac ) => {
    setId(pac.id);
    setNombrePaciente(pac.paciente);
    setPropietario(pac.propietario);
    setEmail(pac.email);
    setTelefono(pac.telefono);
    setFecha(pac.fecha);
    setSintomas(pac.sintomas);
  }

  return (
    <Modal animationType='slide' visible={ modalVisible }>
      <SafeAreaView style={ styles.contenido }>
        <ScrollView>
          <Text style={ styles.titulo }>{ pacienteEditando.id ? 'Editar' : 'Nueva' } {''}
            <Text style={ styles.tituloBold }>Cita</Text>
          </Text>

          <Pressable onLongPress={ () => {
            setPacienteEditando({});
            setModalVisible(!modalVisible);
            limpiarFormulario();
          }} style={ styles.btnCancelar }>
            <Text style={ styles.btnCancelarTexto }>X Cancelar</Text>
          </Pressable>

          <View style={ styles.campo }>
            <Text style={ styles.label }>Nombre Paciente</Text>
            <TextInput
              style={ styles.input }
              placeholder='Nombre Paciente'
              placeholderTextColor={ '#666' }
              value={ nombrePaciente }
              onChangeText={ setNombrePaciente }
            />
          </View>

          <View style={ styles.campo }>
            <Text style={ styles.label }>Nombre Propietario</Text>
            <TextInput
              style={ styles.input }
              placeholder='Nombre Propietario'
              placeholderTextColor={ '#666' }
              value={ propietario }
              onChangeText={ setPropietario }
            />
          </View>

          <View style={ styles.campo }>
            <Text style={ styles.label }>Email Propietario</Text>
            <TextInput
              style={ styles.input }
              placeholder='Email Propietario'
              placeholderTextColor={ '#666' }
              keyboardType='email-address'
              value={ email }
              onChangeText={ setEmail }
            />
          </View>

          <View style={ styles.campo }>
            <Text style={ styles.label }>Teléfono Propietario</Text>
            <TextInput
              style={ styles.input }
              placeholder='Teléfono Propietario'
              placeholderTextColor={ '#666' }
              keyboardType='number-pad'
              value={ telefono }
              onChangeText={ setTelefono }
              maxLength={ 9 }
            />
          </View>

          <View style={ styles.campo }>
            <Text style={ styles.label }>Fecha Alta</Text>
            {/* <Button title="Seleccionar Fecha" onPress={ () => setFechaModalAbierto(true) } /> */}
            <View style={ styles.fechaContenedor }>
              <DatePicker
                title={ 'Seleccionar Fecha' }
                locale='es'
                mode='date'
                date={ fecha }
                onDateChange={ (date) => setFecha(date) }
                // modal
                // open={ fechaModalAbierto }
                // onConfirm={ (fecha) => {
                //   setFechaModalAbierto(false)
                //   setFecha(fecha)
                // }}
                // onCancel={ () => {
                //   setFechaModalAbierto(false)
                // }}
              />
            </View>
          </View>

          <View style={ styles.campo }>
            <Text style={ styles.label }>Síntomas</Text>
            <TextInput
              style={ [styles.input, styles.sintomasInput] }
              placeholder='Síntomas paciente'
              placeholderTextColor={ '#666' }
              value={ sintomas }
              onChangeText={ setSintomas }
              multiline={ true }
              numberOfLines={ 4 }
            />
          </View>

          <Pressable onPress={ handleCita } style={ styles.btnNuevaCita }>
            <Text style={ styles.btnNuevaCitaTexto }>{ pacienteEditando.id ? 'Editar' : 'Agregar' } Paciente</Text>
          </Pressable>

        </ScrollView>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#6D28D9',
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
  btnCancelar: {
    marginVertical: 30,
    backgroundColor: '#5824A4',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFF'
  },
  btnCancelarTexto: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase'
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30
  },
  label: {
    color: '#FFF',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600'
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10
  },
  sintomasInput: {
    height: 100
  },
  fechaContenedor: {
    backgroundColor: '#FFF',
    borderRadius: 10
  },
  btnNuevaCita: {
    marginVertical: 50,
    backgroundColor: '#F59E0B',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#5824A4'
  },
  btnNuevaCitaTexto: {
    color: '#5824A4',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase'
  },
})

export default Formulario