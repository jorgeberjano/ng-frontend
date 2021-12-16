# NgFrontend

Esta aplicación consta de dos proyectos:

- `ges-crud`: es la libreria de componentes válida para cualquier aplicación CRUD que use una API Restful que se base en la libreria Java `comun-ges-apirest`
- `bp-front`: es la aplicación CRUD para el mantenimiento del proyecto HIRIS. Depende de la libreria `ges-crud` y personaliza algunas pantallas.



## Ejecución

Ejecutar `ng build ges-crud --watch` para construir la libreria ges-crud y que esté pendiente de los cambios para recompilar.

Luego ejecutar `ng serve` para ejecutar el servicio.



## Despliegue en contenedor Docker

Hay que tener instalado Docker for Windows (solo Windows 10) o Docker Toolbox (Windows 7).

Hay que instalar la extensión de docker para Visual Studio:

> Abrir la vista Extensiones (Ctrl + Shift + X) > buscar "Docker" para filtrar los resultados > seleccionar la extensión Docker creada por Microsoft.

Configurar la url de la maquina que tiene instalado docker:

> Pestaña *Docker* > ? > *Edit settings* > *Docker:Host*
>

En mi caso he puesto: `centos.shsconsultores.es:2375`

No hay que poner http:// solo el nombre del host y el puerto.

Para construir la imagen:

> Botón derecho sobre el editor > *Command Palette* > *Docker Images: Build Image...* > poner el nombre (por defecto ngfronted:latest)
>

Esto construye la imagen, luego habrá que ejecutarla con el comando `docker run` o desde el Netbeans.

## Crear un componente en uno de los proyectos

ng g s auth-interceptor --project ges-crud


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
