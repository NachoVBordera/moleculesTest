const fs = require('fs');
const path = require('path');
const cif = require('cif');

// Función para convertir CIF a XYZ
function cifToXyz(inputFile, outputFile) {
  // Leer el archivo CIF
  fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error leyendo el archivo CIF:', err);
      return;
    }

    // Parsear el archivo CIF
    const parsedCif = cif.parse(data);

    // Obtener los átomos y las coordenadas
    const atoms = parsedCif.blocks[0].getAtoms();
    const atomCount = atoms.length;

    // Crear el contenido del archivo XYZ
    let xyzContent = `${atomCount}\nConverted from CIF to XYZ\n`;

    atoms.forEach(atom => {
      const element = atom.element;
      const x = atom.x.toFixed(3);
      const y = atom.y.toFixed(3);
      const z = atom.z.toFixed(3);
      xyzContent += `${element} ${x} ${y} ${z}\n`;
    });

    // Escribir el archivo XYZ
    fs.writeFile(outputFile, xyzContent, (err) => {
      if (err) {
        console.error('Error escribiendo el archivo XYZ:', err);
        return;
      }
      console.log('Archivo XYZ guardado en:', outputFile);
    });
  });
}

// Especificar las rutas de los archivos de entrada y salida
const inputFilePath = path.join(__dirname, '34n.cif'); // Ruta de entrada CIF
const outputFilePath = path.join(__dirname, '34n.xyz'); // Ruta de salida XYZ

// Convertir CIF a XYZ
cifToXyz(inputFilePath, outputFilePath);
