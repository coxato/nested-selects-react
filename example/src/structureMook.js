let selects = [
  // first select
  {
    name: "servicio",
    elementType: "select",
    placeholder: "selecciona un servicio por favor",
    options: [
      {
        value: 'reparacion_motor',
        text: 'reparación de motor'
      },
      {
        value: 'pintura',
        text: 'pintura',
        makeVisible: [
          {
            name: 'color-pintura',
            elementType: 'select',
            placeholder: 'seleccione el color por favor',
            options: [
              {
                value: 'amarillo',
                text: 'amarillo'
              },
              {
                value: 'azul',
                text: 'azul',
                makeVisible: [
                  {
                    name: 'component-random',
                    elementType: 'component',
                    component: <TestComponent key="component-random" />
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        value: 'latoneria',
        text: 'servicio de latonería'
      },
    ]
  },
  // second select 
  {
    name: "vehiculo",
    elementType: "select",
    placeholder: "selecciona tu vehiculo",
    options: [
      {
        value: "moto",
        text: "moto",
        // sub select
        makeVisible: [
          {
            name: 'marca-moto',
            elementType: "select",
            placeholder: 'seleccione la marca',
            options: [
              {
                value: "susuki",
                text: "susuki"
              },
              {
                value: "yamaha",
                text: "yamaha"
              },
              {
                value: "honda",
                text: "honda",
                makeVisible: [
                  {
                    name: 'modelo-honda',
                    elementType: 'select',
                    placeholder: 'seleccione el modelo',
                    options: [
                      {
                        value: 'modelo1',
                        text: 'modelo 1'
                      },
                      {
                        value: 'modelo2',
                        text: 'modelo 2'
                      }
                    ]
                  },
                  {
                    name: 'year-honda',
                    elementType: 'select',
                    placeholder: 'seleccione el año',
                    options: [
                      {
                        value: '2009',
                        text: '2009'
                      },
                      {
                        value: '2020',
                        text: '2020'
                      }
                    ]
                  }
                  
                ]
              },
            ]
          }
        ]
      },
      {
        value: "carro",
        text: "carro",
        makeVisible: [
          {
            name: 'marca-carro',
            elementType: 'select',
            placeholder: 'seleccione la marca',
            options: [
              {
                value: 'nissan',
                text: 'nissan',
                makeVisible: [
                  {
                    elementType: 'component',
                    name: 'superCompo',
                    component: <TestComponent key="superCompo" />
                  }
                ]
              },
              {
                value: 'ferrari',
                text: 'ferrari'
              }
            ]
          }
        ]
      }
    ]
  }
]
