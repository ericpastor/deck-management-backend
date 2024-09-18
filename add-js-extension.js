import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Obtener __filename y __dirname en un entorno de ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Directorio donde están los archivos compilados
const directoryPath = path.join(__dirname, 'dist')

// Función para recorrer los archivos y modificar las importaciones
function addJsExtension(dirPath) {
  fs.readdirSync(dirPath).forEach((file) => {
    const fullPath = path.join(dirPath, file)

    // Si es un directorio, recursivamente busca más archivos
    if (fs.lstatSync(fullPath).isDirectory()) {
      addJsExtension(fullPath)
    } else if (file.endsWith('.js')) {
      // Leer el contenido del archivo
      let content = fs.readFileSync(fullPath, 'utf8')

      // Buscar importaciones y exportaciones sin '.js' y añadirlas
      const updatedContent = content
        .replace(/(require\(['"])(\.\/[^'"]+)(['"]\))/g, '$1$2.js$3')
        .replace(/(from\s+['"])(\.\/[^'"]+)(['"])/g, '$1$2.js$3')
        .replace(/(from\s+['"])(\..\/[^'"]+)(['"])/g, '$1$2.js$3')

      // Sobrescribir el archivo con el contenido modificado
      fs.writeFileSync(fullPath, updatedContent, 'utf8')
      console.log(`Updated file: ${fullPath}`)
    }
  })
}

// Ejecutar la función para añadir .js en el directorio 'dist'
addJsExtension(directoryPath)
