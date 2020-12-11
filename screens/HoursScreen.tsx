import * as React from 'react'
import { View } from 'react-native'
import PDFReader from 'rn-pdf-reader-js';
import PDF from '../assets/h1.pdf';

export default function HoursScreen({ navigation }) {
  return (
    <PDFReader
      source={{
        uri: 'https://raw.githubusercontent.com/ErickOliveiraT/Transporte-Itajuba/073ab32f024fb24013c59b2720c84979e94fcd68/app/src/main/assets/h1.pdf'
      }}
    />
  );
}
