import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E4E4E4',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    border: '1px solid #000',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#3388af',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#3388af',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Times-Roman',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
});

const SaleContractPDF = ({ values }) => {
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.main}>
          <Text style={styles.title}>Contrato de Compra Venta</Text>
          <Text style={styles.subtitle}>Forestoken</Text>
          <Image
            src="https://picsum.photos/600/400"
            alt="random image"
            style={styles.image}
          />
          <Text style={styles.subtitle}>{lorem}</Text>
          <Text style={styles.text}>
            Mediante este documento el productor cederá los derechos de compra
            venta del activo a tokenizar
          </Text>

          <View style={styles.section}>
            <Text
              style={styles.text}
              render={() =>
                `Nombre y Apellido: ${values.firstName} ${values.lastName}`
              }
              fixed
            />
            <Text
              style={styles.text}
              render={() => `Email: ${values.email}`}
              fixed
            />
          </View>

          <View style={styles.section}>
            <Text
              style={styles.text}
              render={() => `Tipo de Arbol: ${values.tipoArbol}`}
              fixed
            />
            <Text
              style={styles.text}
              render={() => `Cantidad: ${values.toneladas} tn`}
              fixed
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SaleContractPDF;
