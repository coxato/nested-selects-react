
// mapear todos los subelementos de cada elemento que viene en la estructura original,
// es decir, la estructura hecha a mano o con la API, para relacionar el elemento con sus datos
// y guardar éstos últimos (datos) en el selectStoreData.
// Ésto se hace porque cuando el usuario selecciona un <select> anterior aún se sigue
// guardando el valor de sus hijos los cuales ya no estarían en pantalla, y eso no debe ser asi.
// ya que solamente se debe guardar el valor de los <select> en pantalla y los <Component/> en pantalla.
function mapOriginalElementsToStoreData(originalSelectsArray){
    
    let dataOfEachNode = {};

    const findRecursively = node => {
        const { id, name, options} = node;
        const key = String(id || name);
        // guardar la referencia
        dataOfEachNode[key] = {
            nodeData: {},
            childrenNames: []
        } 
        // revisar las <option>
        for(let option of options || []){
            const { makeVisible } = option;
            // revisar makeVisible de las <option>
            if(makeVisible){
                for(let toMakeVisibleElement of makeVisible){
                    const { name, id } = toMakeVisibleElement;
                    // agregar nombre a la lista de nombres de los hijos de su padre, Suena raro verdad? xD
                    dataOfEachNode[key].childrenNames.push(id || name);
                    
                    // iterar recursivamente hacia los elementos más internos
                    findRecursively(toMakeVisibleElement);
                    
                }
            }
        }
    }

    // iterar por los principales <select>
    for(let node of originalSelectsArray){
        findRecursively(node);
    }

    return dataOfEachNode;
} 


// mapear el <Component/> al selectStoreData{} para asi poder
// guardar sus datos cuando esté en pantalla y también para poder borrar dichos datos
// en caso de ya no estar en pantalla
// nombre larguisimo pero al menos se entiende lo que hace la función xd
function mapComponentInsertedWithCustomOnChangeToStoreData(selectName, componentName, selectStoreData){
    const selectsData = {...selectStoreData};
    const { childrenNames } = selectsData[selectName];
    // incluir el nuevo componente en el storage
    childrenNames.push(componentName);
    
    selectsData[componentName] = {
        nodeData: {},
        childrenNames: []
    }

    // ahora se debe encontrar todos los elementos por encima del <Component />
    // para que al momento de seleccionar un anterior <select> ya no se guarden más
    // los datos selectsData{}, en resumen, si no esta en pantalla, no se guardan sus datos
    const updateChildrenNamesRecursively = (childrenNames) => {
        for(let name of childrenNames){
            // array con el nombre de los hijos
            const names = selectsData[name].childrenNames;

            if(!name.includes(componentName) && names.length > 0) names.push(componentName);

            updateChildrenNamesRecursively(names);
        }
    }

    updateChildrenNamesRecursively(childrenNames);
    return selectsData;

}



// borrar datos viejos de selectStoreData
function deleteOldSelectStoreData(selectName, selectStoreData){
    const selectsData = {...selectStoreData};
    
    const { childrenNames } = selectsData[selectName];

    const deleteRecursively = (childrenNames) => {
        for(let name of childrenNames || []){
            // borrar datos
            selectsData[name].nodeData = {}
            // nombre de los hijos
            const names = selectsData[name].childrenNames;
            if(names.length) deleteRecursively(names);
        }
    }

    deleteRecursively(childrenNames);

    return selectsData;
} 



// parsear selectStoreData para tener los datos limpios en un json
function parseSelectsStoreData(selectStoreData){
    let cleanData = {};

    for(let key in selectStoreData){
        let { nodeData } = selectStoreData[key];
        // is not a void value
        if(Object.keys(nodeData).length > 0){

            if(typeof nodeData === 'string'){
                cleanData[key] = nodeData;
            }
            // else, have a <Component/> keyName { [MyComponentName]: {...componentValues} }
            else{
                const componentName = Object.keys(nodeData)[0];
                cleanData[componentName] = nodeData[componentName];
            }
        }
    }
    return cleanData;
}

// parse the <select> data with parseSelectsStoreData method
function parse(jsonToParse){
    return parseSelectsStoreData(jsonToParse);
}


 

export {
    parse,
    mapOriginalElementsToStoreData,
    mapComponentInsertedWithCustomOnChangeToStoreData,
    deleteOldSelectStoreData,
}