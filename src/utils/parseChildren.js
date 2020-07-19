import Structure from '../nestedSelectsReact/createStructure';
import './cycle';

// parse react childrens
class ParseChildren{
    constructor(nestedSelectReactchildren){
        this.nestedSelectReactchildren = nestedSelectReactchildren;
        this.principalSelects = [];
        // structure API
        this.struct = new Structure();
    }

 

    // este metodo analiza una <Option/> ó una optionNode{} a la vez
    // para ver si dicha opción tiene sub-elementos
    // en caso de tenerlos se llama recursivamente en el método 'this.checkTypeOfChildrenComponents()'
    // si no tiene sub-elementos simplemente retorna un optionNode hecho con la Structure API 
    findSubElementsInEachOption(reactOptionChildren, optionNode = null){
        // si no es un nodo option hecho anteriormente con la api
        if(!optionNode){
            let { value, children } = reactOptionChildren.props;
            let text, makeVisibleChildren ;
            // the option have 2 or more children
            if( Array.isArray(children) ){
                text = children[0];
                makeVisibleChildren = children[1].props.children;
            }
            else text = children; // is a string 
            
            // make option
            let option = this.struct.makeElement('option', { value, text });
            // the option have 2 children, text and <MakeVisible>
            if( Array.isArray(children) ){
                // have multiple children inside <MakeVisible>
                if( Array.isArray(makeVisibleChildren) ){
                    for(let element of makeVisibleChildren){
                        // decycle json
                        element = JSON.decycle(element);
                        this.checkTypeOfChildrenComponents(element, option);
                    }
                }
                // have just one child inside <MakeVisible>
                else {
                    // decycle json
                    makeVisibleChildren = JSON.decycle(makeVisibleChildren);
                    this.checkTypeOfChildrenComponents(makeVisibleChildren, option);
                }

            }
    
            return option;
        }
        // si es un optionNode pasado por parametro
        else{
            this.checkTypeOfChildrenComponents(reactOptionChildren, optionNode);
        }

    }



    // analizar el elemento y ver que tipo es, por ejemplo 
    // <Select/>, <Option/>, <MakeVisible/>, ó un <componente react />
    // si es un <Select/> se analiza cada una de sus <Option/> para ver si tiene <MakeVisible/> dentro
    // si NO es un <Select/> solo se agrega el <componente react> a la propiedad makevisible
    // de la opción. option.makeVisible.push( <componente react> )
    checkTypeOfChildrenComponents(reactElement, optionNode){
        let elementNode, // select, option or component node, made with the structure API
        reactSelectOptions, // <Option>'s from <Select/>
        opts = [], // option node made with structure API
        optChildren, // each posible children of an <Option/>
        makeVisibleComponentChildren; // all the children inside a <MakeVisible/> component
        

        // create the element node with the structure API
        elementNode = this.createElementNode(reactElement);
        
        
        // check the type of the created node 
        if(elementNode.elementType === 'select'){
            // agregar sub select a la lista de makeVisible
            optionNode.makeVisible.push( elementNode );
            // convertir cada <Option/> en un objeto option, con ayuda de la API
            reactSelectOptions = reactElement.props.children;

            // have 2 or more options
            if( Array.isArray(reactSelectOptions) ){
                for(let opt of reactSelectOptions){
                    opts.push( this.createElementNode(opt) )
                }
            }
            // just 1 option
            else {
                opts.push( this.createElementNode(reactSelectOptions))
            }

            // asociar opciones al sub-select
            elementNode.options = opts;
            
            // ir por cada una de las opciones viendo si tienen subElementos '<MakeVisible/>'
            for(let i = 0; i < elementNode.options.length; i++){
                // si una de las opciones tiene más de un hijo
                // es porque tiene un <MakeVisible/>
                
                const optionChildren = Array.isArray(reactSelectOptions) ? reactSelectOptions[i] : reactSelectOptions; 
                if(optionChildren.props.children instanceof Array){
                    optChildren = reactSelectOptions[i].props.children; 
                    makeVisibleComponentChildren = optChildren[1].props.children;
                    // iterar por cada uno de los componentes hijos de <MakeVisible/>
                    
                    // en caso de que el <MakeVisible> tenga un (1) solo hijo
                    if(makeVisibleComponentChildren instanceof Array === false){
                        this.checkTypeOfChildrenComponents(
                            makeVisibleComponentChildren, 
                            elementNode.options[i] // opcion actual <<i>> 
                        );
                    }
                    // en caso de que tenga mas de un (1) hijo el <MakeVisible>
                    else{
                        for(let j = 0; j < makeVisibleComponentChildren.length ; j++){
                            // recursive call for 'findSubElementsInEachOption()'
                            // in case the current node is of type 'select' since a select has
                            // several options and these in turn can have several sub elements
                            this.findSubElementsInEachOption(
                                makeVisibleComponentChildren[j],
                                elementNode.options[i]
                            );
                        }
                    }

                }
            }
        }
        else if(elementNode.elementType === 'component'){
            optionNode.makeVisible.push( elementNode );
        }
    }



    // create the element depends element type
    // returns { elementNode: Object }
    createElementNode(reactElement){
        let elementNode;
        const name = reactElement.type.name; 
        // is a <Select> or a <Option> or a custom react component like '<MyComponent />'
        if(name){
            if(name === "Select"){
                
                elementNode = this.struct.makeElement('select', {...reactElement.props}  )
            }
            else if(name === 'Option'){
                elementNode = this.struct.makeElement('option', {...reactElement.props}  )
                // <Option> text
                if(typeof reactElement.props.children === "string"){
                    elementNode.text = reactElement.props.children;
                }
                else{
                    elementNode.text = reactElement.props.children[0];
                }
            }
            else{
                elementNode = this.struct.makeElement('component', {
                    // name: reactElement.type.name + '-' + Math.random(), // random name,
                    name: reactElement.type.name,
                    component: reactElement
                });
            }
        }
        // is a default react component like <h1>, <p>, <a>, <div>, etc
        else{
            elementNode = this.struct.makeElement('component', {
                name: reactElement.type + '-' + Math.random(), // random name,
                component: reactElement
            })
        }

        return elementNode;
    }


    // ============= parse components to object with the structure API =============
    getParsedData(){
        
        let nestedSelectReactchildren;

        if(this.nestedSelectReactchildren instanceof Array)
            nestedSelectReactchildren = this.nestedSelectReactchildren; 
        else
            nestedSelectReactchildren = [this.nestedSelectReactchildren];
        

        // principal selects
        for(let reactPrincipalSelect of nestedSelectReactchildren){
            
            const { 
                name, 
                id, 
                customchange, 
                label, 
                placeholder,
                'children': reactOptionsChildren 
            } = reactPrincipalSelect.props;
            
            
            // make select with the API
            const select = this.struct.makeElement('select', {
                name,
                id,
                customchange,
                label,
                placeholder, 
            });
     
            // loop each <Option/> and its sub-elements
            let options = [];

            if( Array.isArray(reactOptionsChildren) ){
                
                for(let reactOptionChild of reactOptionsChildren){
                    options.push( this.findSubElementsInEachOption(reactOptionChild) );
                };
            } 
            else{
                options.push(this.findSubElementsInEachOption(reactOptionsChildren));
            }
            
            // add options to current principalSelect
            this.struct.addOptionsToSelect(select, options);
            

            // save the select to principal selects
            this.principalSelects.push(select);

        }

        
        
        
        // JSON.decycle './cycle.js' to get a plain javascript object
        // let decycleObjectsArr = this.principalSelects.map( obj => JSON.decycle(obj) );

           
        // parsed components
        // return decycleObjectsArr;
        return this.principalSelects;
    }


}

export default ParseChildren;