'use strict';

var fs = require('fs');
var path = require('path');


// Abrimos el fichero package.json
var fichero = path.join('./', 'package.json');



fs.readFile(fichero, { encoding: 'utf8' }, function(err,data) {
    if (err) {
        console.log('Error leyendo el fichero package.json');
        return ;
    }

    var infoPackage =  JSON.parse(data);
    if (!infoPackage.dependencies) {
        console.log('No se encuentran dependencias en el fichero package.json. ¿Estas usando algún módulo?');
        return;
    }

    // Obtenemos los nombres de los módulos que nos interesan
    var modules = Object.getOwnPropertyNames(infoPackage.dependencies);

    // Versión 1, simplemente mostramos la versión de los módulos
    modules.forEach(function(item) {
        console.log('Estas usando el módulo: ' + item + ' en su versión: ' + infoPackage.dependencies[item]);
    });


    // Versión 2, obtenemos información relevante de los módulos leyendo el package.json de cada uno de los
    // de los módulos.
    modules.forEach(function(item) {
        var moduleDir = path.join('./node_modules', item);

        /* Comprobamos que la carpeta exista */
        fs.exists(moduleDir, function(exists) {
            if (!exists) {
               console.log('La carpeta ' + moduleDir + ' ha sido borrada. Ejecuta npm install para descargar los módulos');
            }
            else {
                var packageFile = path.join(moduleDir, 'package.json');

                fs.readFile(packageFile, { encoding: 'utf8' }, function(err,data) {
                    var infoPackage =  JSON.parse(data);
                    console.log('Módulo: ' + infoPackage.name + ', Autor: ' + infoPackage.author.name + ', Version: ' + infoPackage.version);
                });
            }
        });
    });

});
