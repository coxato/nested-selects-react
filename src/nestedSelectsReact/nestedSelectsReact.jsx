import React, { Component, cloneElement } from 'react';
// functional components
import { MakeSelect } from './functionalComponents';
// api
import UserAPI from './createStructure';
// utils
import ParseChildren from '../utils/parseChildren';
import { 
    parse,
    mapOriginalElementsToStoreData,
    mapComponentInsertedWithCustomOnChangeToStoreData,
    deleteOldSelectStoreData
 } from '../utils/storeDataControl';


class NestedSelectsReact extends Component{ 
   
    state = {
        originalSelects: null,
        htmlToDraw: [],
        loading: true
    }

    
    elementsStructure = []; // array de objetos con subObjetos dentro. Estructura de todos los <select> en forma de arbol
    linearHtmlArrNodes = []; // array para renderizarlos de forma lineal, separado en grupos grandes (ver método organizarElementos )
    
    // guarda una referencia nombre-valor para guardar los components que se quieran renderizar
    // se hace esto debido a que JSON.stringify no guarda métodos
    componentsReferences = {};
    
    // guarda una referencia { name: function } ó { id: function } para guardar las funciones onChange personalizadas 
    // "customchange". Esto se hace debido a que JSON.stringify no guarda métodos y/o funciones
    customOnChangeReferences = {};
    
    // api que permite al usuario crear objetos de elementos
    // aquí en este componente se usará para manejar más comodamente el evento customchange
    userAPI = new UserAPI();
    
    // $$$$$ cambiar el comentario de abajo $$$$$

    // guardar los datos necesarios de los componentes hijos renderizados.
    // Básicamente es un objeto para guardar los estados de los componentes hijos
    // esto se hace para no tener que traerse todo el estado del componente
    // ya que no necesariamente todos los datos del estado del hijo son los que se desean guardar.
    // Se guardaría asi: { 'component-name': { key: value, ... } }
    STOREDATA =  {};
    STOREDATA_PARSED = {};    
    


    
    // handle onchange to create and insert new sub-select or <Component/> 
    handleOnChange = (ev) => {
        const select  = ev.target;
        const { 'name': selectName, value, id } = select;
        
        // ***** guardar datos del <select> seleccionado *****
        // delete childs values
        this.STOREDATA = deleteOldSelectStoreData(id || selectName, this.STOREDATA);
        // save selected value in the storage <<selectStoreData>>
        this.STOREDATA[id || selectName].nodeData = value;


        // comprobar si tiene un customchange o no.
        // en caso de tenerlo ejecutarlo y no hacer nada mas.
        const customchange = this.customOnChangeReferences[id || selectName];
        
        // customchange de parte de la API es asi:
        // (value: String, insertElement?: Function ) => void;
        if(customchange){            
            // borrar hijos viejos del <select> (ya sea que los tenga o no)
            this.findAndRemoveSubElementsRecursively(this.elementsStructure, selectName);
            this.prepareToDraw(this.elementsStructure);
            
            // ejecutar callback
            customchange(
                    value, 
                    (selectName, ...elementsArrayObjects) => {                    
                        this.insertElementsCustomOnChange(id || selectName, ...elementsArrayObjects);
                });
            // return <select> and <Components> values to <NestedSelects/> parent element
            this.props.getvalues( parse(this.STOREDATA) );
            
            return; // stop and exit
        }
        // en caso de el <select> NO tener customchange revisar las opciones del <select> actual y
        // ver si dichas opciones tienen o no el atributo makevisible
        // option selected
        const option = select.querySelector(`option[value="${value || ''}"]`);
        // get the 'makevisible' attribute object from an <option/>
        let makeElementsVisible = JSON.parse(option.getAttribute('makevisible') || '[]');
        
        // if the option has makeElementsVisible, insert in the structure and then render it. 
        if(makeElementsVisible.length > 0){
            let newElementsToDraw = []; // save the sub elements to draw
             
            // loop sub-elements to be visibles
            for(let element of makeElementsVisible){
                newElementsToDraw.push(this.makeStructureNode(element, selectName));
            }
            
            // clean old subElements
            this.findAndRemoveSubElementsRecursively(this.elementsStructure, selectName);
            // insert new subElement in structure
            this.insertInStructure(this.elementsStructure,newElementsToDraw, selectName);
            // return <select> and <Components> values to <NestedSelects/> parent element
            this.props.getvalues( parse(this.STOREDATA) );
            // prepare stucture to draw and update the state
            this.prepareToDraw(this.elementsStructure);
        }
        // simple option without sub-select
        else{
            this.findAndRemoveSubElementsRecursively(this.elementsStructure, selectName);
            // return <select> and <Components> values to <NestedSelects/> parent element
            this.props.getvalues( parse(this.STOREDATA) );
            this.prepareToDraw(this.elementsStructure);
        }
        
    }




    // recorrer la estructura de elementos (el array elementsStruture que posee todos los elementos a renderizar en forma de objetos)
    // para poder insertar los subElements correspondientes a un <select> padre
    // básicamente lo que hace es iterar recursivamente y modificar los objetos que se encuentran en this.elementsStructure
    insertInStructure = (elementsStructure, elementsToInsert, fatherName) => {
        for(let structureNode of elementsStructure){
            
            // si el nombre del nodo por el que va resulta ser el mismo que el padre
            // y si no tiene sub elementos, es porque ése nodo es el padre al cual 
            // se le asignaran los sub elementos hijos. Es decir, se encontró al nodo padre.
            if(structureNode.elementName === fatherName && structureNode.subElements.length === 0){
                // se asigna los sub elementos al padre
                structureNode.subElements = elementsToInsert;
                return;
            }
            // si el nombre del nodo actual no es igual al del padre, es porque dicho nodo no es
            // a quien se le asignarán los sub elementos hijos, si es asi, revisar si el nodo tiene
            // sub elementos y seguir buscando recursivamente al nodo padre entre ellos
            if(structureNode.elementName !== fatherName && structureNode.subElements.length){
                this.insertInStructure(structureNode.subElements, elementsToInsert, fatherName);
            }

        }
    }


    // save in an array all the elements to draw, then set the state
    prepareToDraw = elementsStructure => {

        this.linearHtmlArrNodes = []; // reset arr elements
        this.pushNodesToLinearArr(elementsStructure);

        // update state
        this.setState({
            htmlToDraw: this.linearHtmlArrNodes,
        })
    }

    // #############################################################
    // #################### find sub elements ######################
    // #############################################################
 
    // find sub elements recursively and push to linearHtmlArrNodes
    pushNodesToLinearArr = elementsStructure => {
        for(let elementNode of elementsStructure){
            this.linearHtmlArrNodes.push(elementNode);
            // ver si tiene sub elementos, para de esa manera respetar el orden en el cual serian pintados
            // es decir, si hay 2 principales <select> se checan primero todos los posibles sub elementos
            // del primer <select> y luego en la segunda iteracion del ciclo 'for' si vendria el 2do principal <select>
            // con sus respectivos sub elementos hijos
            if(elementNode.subElements.length > 0){
                this.pushNodesToLinearArr(elementNode.subElements);
            }
        }
    }

    // find and remove sub elements when the user select a previous option or user select a normal <select>
    findAndRemoveSubElementsRecursively = (elementsStructure, elementName) => {
        for(let elementNode of elementsStructure){
            if(elementNode.elementName === elementName){
                elementNode.subElements = []; // remove subElements
                return;
            }
            else if(elementNode.subElements.length){
                this.findAndRemoveSubElementsRecursively(elementNode.subElements, elementName);
            }
        }
    }


    // ***************** *************** **************** *************** **************
    // insertar elementos con el customchange
    // manejar la inserción de nuevos elementos en caso de hacer un customchange
    insertElementsCustomOnChange(selectName, ...elementsArrayObjects){        
        const objectElements = [];
        const elementsToInsert = [];
        let elementName;

        // ***** 1er paso: estandarizar, convertir los elementos en objetos, tal
        // cual como se haría con la API para los usuarios 

        // iterar por el arreglo de elementos y ver que tipo son
        // ver si ya fueron creados con la API o son solo react components
        for(let [index, element] of elementsArrayObjects.entries()){
            // es creado con la API
            if(element.elementType) objectElements.push(element);
            // es un react component, meterlo en un objeto, como se haría normalmente en la API
            else{
                // si es un elemento <Select> hecho con los componentes build in, 
                // NOTA: con build in me refiero a los componentes dentro de la carpeta 'src/components'  
                if(element.props && /\bSelect\b/.test(element.type.name)){
                    // si es un build in <Select> se supone que ya tiene nombre o id unicos
                    elementName = element.props.id || element.props.name;
                    const parser = new ParseChildren([element]);
                    objectElements.push( parser.getParsedData()[0] );
                    
                }else{ // es un componente hecho por el/la programador/a 
                    // react component name, +index is for unique key;
                    elementName = (element.type.name || element.type) + '-' + index;
                    objectElements.push(
                        this.userAPI.makeElement('component', {
                            name: elementName,
                            component: element
                        })
                    )
                }
                

            }
            // ***** 2do paso: mapear el componente al selectStoreData para asi poder
            // guardar sus datos cuando esté en pantalla y también para poder borrar dichos datos
            // en caso de ya no estar en pantalla
            this.STOREDATA = mapComponentInsertedWithCustomOnChangeToStoreData(
                selectName, 
                element.name || elementName,
                this.STOREDATA
            );

        }

        // ***** 3er paso: convertir cada objeto en un nodo e insertarlo en la estructura.
        // NestedSelectsReact trabaja con una estructura, la cual es un Array con nodos dentro
        // dichos nodos son un objeto un poquito diferente a los objetos creados con la API
        // para saber más de estos nodos, revisar el método makeStructureNode
        for(let objectElement of objectElements){
            elementsToInsert.push(
                this.makeStructureNode(objectElement, selectName)
            )
        }

        // borrar hijos viejos del <select> (ya sea que los tenga o no)
        this.findAndRemoveSubElementsRecursively(this.elementsStructure, selectName);
        // insertar nuevos elementos hijos en la estructura
        this.insertInStructure(this.elementsStructure, elementsToInsert, selectName);
        // preparar para dibujar
        this.prepareToDraw(this.elementsStructure);

    }

    // ##############################################################

    // revisar toda la estructura en busca de componentes de React (jsx components)
    // para luego guardarlos y asociarlos a su elemento correspondiente
    // esto se hace debido a que JSON.stringify no guarda funciones o métodos
    findComponentsInStructure(structure = []){
        let objComponents = {}
        // iterar por las opciones y por los elementos dentro de makeVisible
        function loopOptionsAndMakevisibleArrays(arrayOptions = []){
            for (let option of arrayOptions) {
                // si la option quiere hacer algo visible
                if(option.makeVisible){
                    for(let toMakeVisibleElement of option.makeVisible){
                        
                        const {elementType, name, id, component, options} = toMakeVisibleElement;
                        if( /component/i.test(elementType) ){
                            // guardar la referencia del componente
                            objComponents[id || name] = component;
                        }
                        // si no es un componente es porque es un <select> 
                        // en ese caso, iterar recursivamente para ver si hay sub componentes en la opciones de ese select
                        else if( /select/i.test(elementType) ){
                            loopOptionsAndMakevisibleArrays(options);
                        } 
                    }
                }
            }
        }

        // iterar a travez de los principales <select> de la estructura original
        for(let element of structure){
            // iterar cada una de las opciones
            loopOptionsAndMakevisibleArrays(element.options);
        }

        return objComponents;
    }



    // encontrar todos los customchange en la estructura original y guardar una referencia
    findAllCustomChange(structure){

        let objReferences = {};

        const findRecursively = node => {
            const {customchange, id, name, options} = node;
            // es un select con un customchange
            if(customchange) {
                const key = id || name;
                // guardar la referencia
                objReferences[key] = customchange;
            }
            // revisar las <option>
            for(let option of options){
                const { makeVisible } = option;
                // revisar makeVisible de las <option>
                if(makeVisible){
                    for(let toMakeVisibleElement of makeVisible){
                        const { elementType } = toMakeVisibleElement;
                        if(elementType === 'select'){
                            findRecursively(toMakeVisibleElement);
                        }
                    }
                }
            }
        }

        // iterar por los principales <select>
        for(let node of structure){
            findRecursively(node);
        }

        return objReferences;
    }
    



    // insert pricipal <selects> and sub-elements in a order matrix
    // make an individual array container for each principal <select>
    // return [ [principalSelect and childs], [principalSelect and childs], ... ]
    // NOTA: se usa mucho la palabra 'superior' en los comentarios, ésta se refiere a
    // los <select> superiores con los que trabaja MultiSelect-react, es decir, 
    // los principales selects ( los primeros que ve el usuario )
    // éste método no hace más que agruparlos para que esten ordenados a la hora de mostrarlos.
    organizarElementos = linearHtmlArrNodes => {
        
        let principalElements = [];
        let groups = [];

        for(let i = 0; i < linearHtmlArrNodes.length; i++){
            let { htmlElement, father } = linearHtmlArrNodes[i];
            // si el elemento no es de los principales, agruparlo con
            // el principal del momento
            if(father){
                groups.push( htmlElement );
                // ver si el siguiente elemento existe y es principal, para agregar los que van y limpiar el grupo.
                if(linearHtmlArrNodes[i+1]){
                    // si no tiene padre es que es un principal select
                    if(!linearHtmlArrNodes[i+1].father){
                        principalElements.push(groups); // añadir a los principales
                        groups = []; // limpiar grupo

                    }
                }
                // si es el ultimo elemento, sale del ciclo for
                // y se añade al grupo
            }
            // es principal
            else{
                // añadir al grupo
                groups.push(htmlElement);
                // comprobar si existe el siguiente elemento
                if(linearHtmlArrNodes[i+1]){
                    // ver si ese elemento siguiente es pricipal
                    // ¡¡¡ si no lo es, simplemente itera al siguiente elemento !!!
                    if(!linearHtmlArrNodes[i+1].father){
                        // añadir grupo a los elementos principales
                        principalElements.push(groups);
                        groups = []; // resetear grupo
                    }
                }
            }
        }
        // añadir el ultimo grupo a los elementos principales
        principalElements.push(groups);
        return principalElements;

    }



    // crear nodos para la estructura. <<this.elementsStructure>>
    makeStructureNode(element, fatherName, isSubSelect = true){
        const { elementType, name, id } = element;
        const key = String(id || name);
        let node;
        let htmlElement;

        // dependiendo del tipo de elemento se debe preparar de diferente manera su
        // htmlElement, para un select se crea un <select> y para un componente react
        // se crea una copia del mismo
        
        // <select>
        if(/select/i.test(elementType)){
            htmlElement = <MakeSelect 
                            select={element}
                            isSubSelect={isSubSelect}
                            onChange={this.handleOnChange}
                            key={key}
                          />
        }
        // <Component />
        else if(/component/i.test(elementType)){
            // si no hay una referencia del componente es porque se está incluyendo un nuevo
            // componente por medio de un customchange, de ser asi, guardarlo.
            if(!this.componentsReferences[key]){
                this.componentsReferences[key] = element.component;
            } 

            // crear proxy para detectar si se hace un cambio en el this.STOREDATA dentro del componente
            const that = this;
            let checker = {
                set: function(obj, prop, value) {
                    // The default behavior to store the value
                    obj[prop] = value;
                    // parsear data de los <select> y sub componentes   
                    that.props.getvalues( parse(that.STOREDATA) );
                    return true;
                }
              };
              
            let storedata = new Proxy(this.STOREDATA[key].nodeData , checker); 

            htmlElement = cloneElement(
                this.componentsReferences[key], // react <Component /> reference
                { 
                    // storedata: this.selectStoreData[key].nodeData,
                    storedata,
                    key
                }
            );
        }

        node = {
            father: fatherName, // parent <select/>
            elementName: key,
            elementType,
            htmlElement,
            subElements: []
        };

        return node;
    }



    // aqui se añaden los primeros elementos la estructura, que serían los principales <select>
    // además de encontrar y guardar los react components en el objeto componentsReferences{} para luego
    // referenciarlos en dicha estructura. 
    componentDidMount(){
        let { htmlToDraw } = this.state;
        let originalSelects;

        // structure made with children components
        if(this.props.children){
            
            const childrenParser = new ParseChildren(this.props.children);
            originalSelects = [...childrenParser.getParsedData()];       
                  
        }
        // structure made with the API or handmade
        else if(this.props.selects){
            originalSelects = this.props.selects
        }
        // structure not provided 
        else{
            throw new Error(
                'Structure not provided \n' +
                'you have to pass the structure by selects prop <NestedSelects selects={structArr} />\n' +
                'or use nested-selects-react components as children of <NestedSelects>{children}</NestedSelects> \n'
            );        
        }        
        
        // prepare the initials <select/>
        for(let select of originalSelects){
            // save a node with some information about the <select>.
            htmlToDraw.push(this.makeStructureNode(select, null, false));
        }
        
        // set first modification to structure
        this.elementsStructure = htmlToDraw
        // find and save react <Components /> reference 
        this.componentsReferences = this.findComponentsInStructure(originalSelects);
        // find and save customchange reference 
        this.customOnChangeReferences = this.findAllCustomChange(originalSelects);
        // map fathers with his childrens
        this.STOREDATA = mapOriginalElementsToStoreData(originalSelects);

        // first state modification
        this.setState({
            loading: false,
            htmlToDraw,
            originalSelects
        })
    }



    // ************************** render ****************************
    render(){
        let { htmlToDraw, loading } = this.state;
        let principalSelects;
        // elementos agrupados por <selects>
        if(!loading) principalSelects = this.organizarElementos(htmlToDraw)


        
        if(loading) return null;

        return (
            <div className="nestedselects-super-container">
                <div className="nestedselects-container">
                    { principalSelects.map( (element, index) => {
                        return( 
                            <div key={index} className={`nsr-principalSelect nsr-principalSelect${index}`}>
                                {element}
                            </div> 
                        )
                    }) }
                </div>
            </div>
        ) 
    }


}




export default NestedSelectsReact;