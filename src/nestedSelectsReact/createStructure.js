// *****************************************************************
// *****************************************************************
// metodos para definir y agregar los elementos mas facilmente
// API para agregar datos facilmente
class ElementsStructure{
    constructor(){
        this.elementsStructure = [];
        // guardar como {llave: valor} todas las opciones existentes
        // para poder acceder a ellas rapidamente en caso de querer darle un valor a su propiedad makeVisble
        // recordar que un objeto option se vería asi
        /**
         * { <<optionValue>>: {value, text, elementType ,makeVisible} }
         */
        this.allOptions = {};
    }




    // ========================== methods to make select, option and React components ==================

    // make individual select object and return it
    _makeSelect({
        name,
        id = null,
        customchange = null,
        placeholder = 'please select an option',
        label = null
    }){
        // make select object
        let selectObject = {
            name, // mandatory / obligatorio
            id,
            customchange,
            placeholder,
            label,
            elementType: 'select',
            options: []
        }
        // verify the object keys and values
        let isGood = this._verifyKeysAndValues('selectObject', selectObject);
        if(isGood){
            return selectObject;
        }
        // mandatory {name: value} is not valid
        else{
            throw new Error('the \'name\' property is mandatory. You can also use the \'id\' property. Error with the (<Select>|selectObject)');
        }
    
    }


    // make just one option object and return it
    _makeOption({ value, text, makeVisible = [] }){
        const option = {
            value,
            text,
            makeVisible,
            elementType: 'option', // add elementType key
        }
        // save in global options
        this.allOptions[value] = option; 
        
        return option;

    }


    // make options
    // return an array of options objects
    _makeOptions(optionsArray){
        let optArr = []
        // make each option
        for(let option of optionsArray){
            optArr.push(
                this._makeOption(option) // returns a option object
            )
        }

        // verify mandatory { value, text } for every optionObject in optionsArray 
        let allGood = this._verifyKeysAndValues('optionsArray', optArr);
        if(allGood){ return optArr; }
        // mandatory { value, text } is not valid
        else{
            throw new Error('the \'value\' and \'text\' propertys are mandatory for every optionObject in the array. Error with the optionObject');
        }


    }


    // make a object with a react component inside
    _makeReactComponentObj({ name, component}){
        return {
            elementType: 'component',
            name,
            component
        }
    }


    // ================= methods to build the principal structure ====================

    // add options array to select object 
    // addSubElements(elementsToAdd, fatherElement , optionValue = '' ){
    addOptionsToSelect(fatherSelect, childsOptions){
        let elementType;
        /* ver si existe un elemento padre, en caso de no existir es porque se quiere añadir
           un makeVisible[] a una option{} en especifico. Si si existe fatherSelect es porque se 
           quiere añadir las option{} a un select{}  
        */ 
        if(fatherSelect) elementType = fatherSelect.elementType;
        // si es un select, agregar las options[] a ese select
        if( /select/i.test(elementType) ){
            fatherSelect.options = childsOptions;
        }
        else{
            throw new Error(`Error adding subElements, check the parameters: \n 
                 { 
                     fatherSelect : object,  
                     childsOptions : object
                 }`);
        }

    }


    // "enlazar" un elemento hijo, ya sea otro <select> ó un <Component/>
    // a su <option> 'disparadora', es decir, cuando se seleccione dicha <option>
    // un elemento se va a renderizar.
    linkElementWithTriggerOption(element, triggerOption){
        
        const link = option => {
            // ver si es un array de objetos o un solo objeto
            if(element instanceof Array) option.makeVisible = [...option.makeVisible, ...element];
            else option.makeVisible = [...option.makeVisible, element ];
        }

        // si se le pasa el nombre de la trigger option
        if(typeof triggerOption === 'string'){
            let option = this.allOptions[triggerOption];
            // si existe una opción con dicho value
            if(option) link(option);
            // no existe una opcion con ese value
            else throw new Error(`there is no option with this value: ${triggerOption}`);
        }
        // si es un objeto <option>{}
        else if(triggerOption.elementType === 'option'){
            link(triggerOption);
        }
        // no pasó ni el value de la opción ni el objeto opción como tal
        else{
            console.error(`the triggerOption must be a string with the option value or an element option object, instead this was received:`, triggerOption);
            throw new Error(`error in linkElementWithTriggerOption method`);
        }
    }


    // *********************************************************************************
    // *********************************************************************************
    /**
     * Make a element object like a select, option or a react component.
     * @method
     * @param {string} elementType - select | option | options | component.
     * @param {object} object - a object with the values of component.
     */
    makeElement(elementType, { 
        name, // for all
        id, // (optional) for all
        placeholder = 'please select an option', // for <select>
        optionsArray = [], // for <select>
        customchange, // for <select>
        label, // for <select>
        value, // for <option>
        text, // for <option>
        component, // for <Component/>
     }){

        let elementCreated;
        // make a select{} object
        if(/select/i.test(elementType)){
            elementCreated = this._makeSelect({ name, id, customchange, placeholder, label });
        }
        // make just one option{} object
        else if(/option\b/i.test(elementType)){
            elementCreated = this._makeOption({ value, text });
        }
        // make multiple option{} objects
        else if(/options/i.test(elementType)){
            elementCreated = this._makeOptions(optionsArray);
        }
        // make component
        else if(/component/i.test(elementType)){
            elementCreated = this._makeReactComponentObj({ name, component});
        }

        return elementCreated;
    }

    // agregar a la estructura principal
    // save and return principals elements
    savePrincipalSelects(...principalSelectObjects){
        this.elementsStructure = principalSelectObjects;
        return this.elementsStructure;
    }
    


    // buscar por medio de la propiedad value en todas las opciones globales
    // y la option{} que tenga ese 'value' modificarle la propiedad 'makeVisible'
    _searchOptionAndSetMakeVisible(optionValue, elementsToAdd){
        if(this.allOptions[optionValue]){

            // if elementsToAdd is just one object
            if( !(elementsToAdd instanceof Array) ) elementsToAdd = [elementsToAdd];

            this.allOptions[optionValue].makeVisible = elementsToAdd;
        }
        // no existe dicha option{} con tal 'value'
        else{
            throw new Error(`there is no option with this value: ${optionValue}`)
        }
    }

    // verify mandatory keys and values for objects created
    // so this verify for example if selectObject has a name,
    // and every option in optionsArray has a truty { value, text }
    _verifyKeysAndValues(objectType, objNode){
        if(objectType === 'selectObject'){
            // check name key 
            return objNode['name'] || objNode['id'] ? true : false;
        }
        else if(objectType === 'optionsArray'){
            //  optionsArray
            for(let optionObj of objNode){
                let { value, text } = optionObj;
                if( !(value && text  ) ) return false; // check truty values
            }
            return true; // all good
        }
        // sub element, like a <div> or a React Component
        else{
            // in development
        }

    }

    
}




// funcion para obtener el valor de los <select> dentro de <NestedSelects/>
// esta función se usa dentro de 


export default ElementsStructure;

// export { 
//     ElementsStructure 

// };