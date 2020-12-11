import * as React from 'react'
import { View } from 'react-native'
import PDFReader from 'rn-pdf-reader-js';
import PDF from '../assets/h1.pdf';

export default function PathsScreen({ navigation }) {
  return (
    <PDFReader
      source={{
        uri: 'https://raw.githubusercontent.com/ErickOliveiraT/iBus/483c5903eeb4c9c278c6dcd8b15cfb7acf62ec8d/1.pdf'
      }}
    />
  );
}
