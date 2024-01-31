# Este script toma todos los ficheros que hay en un directorio,
# se crea un nuevo directorio para cada uno, y se cortan 
# dentro todos los que coincidan en la primera palabra hasta un punto (.)


import os
import shutil

def organizar_archivos(directorio):
    # Obtener la lista de archivos en el directorio
    archivos = os.listdir(directorio)

    # Crear un conjunto para almacenar las primeras palabras únicas
    palabras_unicas = set()

    # Iterar sobre los archivos para obtener las primeras palabras
    for archivo in archivos:
        if '.' in archivo and archivo not in 'script.py':
            palabra = archivo.split('.')[0]
            palabras_unicas.add(palabra)

    # Crear directorios para cada palabra única y organizar los archivos
    for palabra in palabras_unicas:
        nuevo_directorio = os.path.join(directorio, palabra)
        os.makedirs(nuevo_directorio, exist_ok=True)

        # Mover archivos que comienzan con la palabra al nuevo directorio
        for archivo in archivos:
            if archivo.startswith(palabra):
                ruta_origen = os.path.join(directorio, archivo)
                ruta_destino = os.path.join(nuevo_directorio, archivo)
                shutil.move(ruta_origen, ruta_destino)

if __name__ == "__main__":

    # Ruta del directorio que contiene los archivos
    directorio_actual = os.getcwd()

    # Llamar a la función para organizar los archivos
    organizar_archivos(directorio_actual)
