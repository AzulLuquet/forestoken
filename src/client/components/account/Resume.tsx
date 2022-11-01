import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { UserDto } from '../../../server/dtos/user.dto';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';

const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd

interface DocumentsProps {
  setActiveStep: (value: ((prevState: number) => number) | number) => void;
  formulario: any;
}

export default function Documentos({
  setActiveStep,
  formulario,
}: DocumentsProps) {
  const router = useRouter();

  function handleSubmit(e) {
    const userDto: UserDto = {
      name: formulario.datosGenerales.nombre,
      mail: formulario.user.user.mail,
      postalCode: formulario.datosPersonales.codigoPostal,
      address: formulario.datosPersonales.direccion,
      provincia: formulario.datosPersonales.provincia,
      dateOfBirth: formulario.datosGenerales.fechaNacimiento,
      isPoliticPerson:
        formulario.datosPersonales.politicamenteExpuesto == 'si' ? true : false,
      isRegulatedPerson:
        formulario.datosPersonales.sujetoRegulado == 'si' ? true : false,
      photoUrl: formulario.user.user.photoUrl,
      dni: formulario.datosGenerales.nroDocumento,
      producerType: formulario.datosGenerales.tipoProductor,
      city: formulario.datosPersonales.ciudad,
      taxSubjectType: formulario.datosPersonales.tipoTributo,
    };
    e.preventDefault();
    axios
      .post('/users', userDto)
      .then(response => {
        setCookie('userData',`userId|${response.data.id}|userImage|${formulario.user.user.photoUrl}|userName|${formulario.datosGenerales.nombre}`,null); // seteo la cookie userData con los datos del form en el momento que se hace el registro de usuario.
        router.push('/home');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Fallo el envio del formulario', {
          theme: 'colored',
        });
      });
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={styles.form}
      autoComplete="off"
    >
      <Typography variant="h3" gutterBottom>
        Resumen
      </Typography>
      <br />
      <div style={styles.divider}>
        <TextField
          id="controllable-states-demo"
          color="secondary"
          label="Nombre"
          InputProps={{
            readOnly: true,
          }}
          value={formulario.datosGenerales.nombre}
          sx={styles.input}
        />
        <TextField
          id="controllable-states-demo"
          color="secondary"
          label="Apellido"
          InputProps={{
            readOnly: true,
          }}
          value={formulario.datosGenerales.apellido}
          sx={styles.input}
        />
        <TextField
          id="controllable-states-demo"
          color="secondary"
          label="Número de DNI"
          InputProps={{
            readOnly: true,
          }}
          value={formulario.datosGenerales.nroDocumento}
          sx={styles.input}
        />
        <TextField
          id="date"
          color="secondary"
          label="Fecha de nacimiento"
          defaultValue={today}
          InputProps={{
            readOnly: true,
          }}
          value={formulario.datosGenerales.fechaNacimiento}
          sx={{ width: 220, margin: '10px' }}
        />
      </div>
      <br />
      <Typography variant="h5" gutterBottom>
        Ubicacion
      </Typography>
      <div style={styles.divider}>
        <TextField
          id="controllable-states-demo"
          color="secondary"
          label="Provincia"
          InputProps={{
            readOnly: true,
          }}
          value={formulario.datosPersonales.provincia}
          sx={styles.input}
        />
        <TextField
          id="controllable-states-demo"
          color="secondary"
          label="Ciudad"
          InputProps={{
            readOnly: true,
          }}
          value={formulario.datosPersonales.ciudad}
          sx={styles.input}
        />
        <TextField
          id="controllable-states-demo"
          color="secondary"
          label="Código postal"
          InputProps={{
            readOnly: true,
          }}
          value={formulario.datosPersonales.codigoPostal}
          sx={styles.input}
        />
        <TextField
          id="controllable-states-demo"
          color="secondary"
          label="Dirección"
          InputProps={{
            readOnly: true,
          }}
          value={formulario.datosPersonales.direccion}
          sx={styles.input}
        />
      </div>
      <br />
      <Typography variant="h5" gutterBottom>
        Tributo
      </Typography>
      <div style={styles.divider}>
        <TextField
          id="controllable-states-demo"
          color="secondary"
          label="Condición impositiva"
          InputProps={{
            readOnly: true,
          }}
          value={formulario.datosPersonales.tipoTributo}
          sx={styles.input}
        />
        <TextField
          id="controllable-states-demo"
          color="secondary"
          label="Persona politicamente expuesta"
          InputProps={{
            readOnly: true,
          }}
          value={formulario.datosPersonales.politicamenteExpuesto}
          sx={styles.input}
        />
        <TextField
          id="controllable-states-demo"
          color="secondary"
          label="Sujeto regulado"
          InputProps={{
            readOnly: true,
          }}
          value={formulario.datosPersonales.sujetoRegulado}
          sx={styles.input}
        />
      </div>
      <br />
      <div>
        <Button color="secondary" type="submit">
          Enviar form
        </Button>
        <ToastContainer />
      </div>
    </Box>
  );
}

const styles = {
  form: {
    '& > :not(style)': { m: 1 },
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    mt: '40px',
  },
  divider: {
    display: 'flex',
    flexDirection: 'row' as const,
  },
  input: {
    margin: '10px',
  },
};