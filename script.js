
        const form = document.getElementById('form');
        
        let tableD = document.getElementById('table1');
    

        form.addEventListener('submit',(event)=>{
            event.preventDefault();

            if(form.monto.value > 0){
                const formD = new FormData(form);
                
                let tipo = formD.get('ingreso');
                console.log(tipo);
                let descripcion = formD.get('descripcion');
                let monto = formD.get('monto');
                let categoria = formD.get('categoria');

                let tableObject = {
                    "id":idtable(),
                    "tipo":tipo,
                    "descripcion":descripcion,
                    "monto":monto,
                    "categoria":categoria
                }
            

            let objectData = localStorage.getItem('gastos');
            
            let arrayobject = JSON.parse(objectData) || []

            arrayobject.push(tableObject)

            let tableObjectJson = JSON.stringify(arrayobject);

            localStorage.setItem('gastos',tableObjectJson);

            objectData = localStorage.getItem('gastos')
            

            let dataObjectArray = JSON.parse(objectData)
            
            let indice = dataObjectArray.length-1

            let dataObject = dataObjectArray[indice]

            createTable(dataObject);

            let name = document.querySelectorAll('[date-title="floriambra"]');
            console.log(name.values);
            form.reset();
            }else{
                alert('ingrese un numero mayor a 0')
            }
            
        })

        document.addEventListener('DOMContentLoaded',(event)=>{
            BDCategoria();
            let objectStorage = localStorage.getItem('gastos')
            let objectArray = JSON.parse(objectStorage);
            objectArray.map(e =>{
                createTable(e);
            })
        })


        function createTable(dataArray){
            let dataObject = dataArray
            let fila = tableD.insertRow(-1);
            fila.setAttribute('date-id',`${dataObject.id}`)
            let celda = fila.insertCell(0);
            const button = document.createElement('button');

            celda.textContent = dataObject.tipo;
            celda = fila.insertCell(1);
            celda.textContent = dataObject.descripcion;
            celda = fila.insertCell(2);
            celda.textContent = dataObject.monto;
            celda = fila.insertCell(3);
            celda.textContent = dataObject.categoria;
            celda = fila.insertCell(4);
            button.textContent = 'eliminar'
            celda.appendChild(button);

            button.addEventListener('click',(event)=>{
                event.target.parentNode.parentNode.remove();
                deleteRegister(idtable());
            })
            
        }

        function idtable(){
            let idcounter = localStorage.getItem('idcounter') || '0';
            idcounter = parseInt(idcounter);
            idcounter += 1
            let idregister = localStorage.setItem('idcounter',idcounter);
            return idregister ;
        }

        function deleteRegister(idname){
            let data = JSON.parse(localStorage.getItem('gastos'));
            console.log(data);
            let indice = data.findIndex(element => element.id === idname)
            data.splice(indice,1);
            dataJSON = JSON.stringify(data);
            localStorage.setItem('gastos',dataJSON);
        }

        function BDCategoria(){
            let base = [ 'alquiler','comida','diversion','novia','albina'];
            base.map((e)=>{ 
                listaCategoria(e);
            })
        }


        function listaCategoria(category){
            const select = document.getElementById('categoria');
            let categoria = `<option value=${category}>${category}</option>`;
            select.insertAdjacentHTML('beforeend',categoria);
        }

        

