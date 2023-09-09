const form  = document.querySelector('form');
let priceInput = document.querySelector('#price');
let dishInput = document.querySelector('#dish');
let tableInput = document.querySelector('#category');
let table1List= document.querySelector('#table1list');
let table2List= document.querySelector('#table2list');
let table3List= document.querySelector('#table3list');

form.addEventListener('submit',function(e){
    e.preventDefault();
    
    let price = priceInput.value;
    let dish = dishInput.value;
    let table = tableInput.value;

    const newOrder = {price,dish,table};

    axios.post('https://crudcrud.com/api/4b0f0f35eaa54e0cb5dd97d161f06b57/orderData',
    newOrder)
    .then((res)=> {
        showOrder(res.data);
    })
    .catch(err => 
       {
        console.log(err);
       });
    })

    window.addEventListener("DOMContentLoaded",() =>{
        axios
          .get("https://crudcrud.com/api/4b0f0f35eaa54e0cb5dd97d161f06b57/orderData")
          .then((res) => {
            for(let i=0;i<res.data.length;i++)
            {
             showOrder(res.data[i]);
            }

          }).catch(err => console.log(err));
    })

function showOrder(newOrder)
{
    let listItem  = document.createElement('li');
    listItem.textContent = `${newOrder.price} - ${newOrder.table} - ${newOrder.dish}`;
    
    if(newOrder.table == 'table1')
    {
        table1List.appendChild(listItem);
    }
    else if(newOrder.table == 'table2')
    {
        table2List.appendChild(listItem);
    }
    else if(newOrder.table == 'table3')
    {
        table3List.appendChild(listItem);
    }

   priceInput.value= "";
   dishInput.value="";
   tableInput.value="Choose an option";


    let delBtn = document.createElement('button');
    delBtn.className = 'btn btn-danger';
    delBtn.appendChild(document.createTextNode('delete'));
    listItem.appendChild(delBtn);

    delBtn.onclick=(e)=>{
        e.preventDefault();
        let id = '';
        axios
        .get("https://crudcrud.com/api/4b0f0f35eaa54e0cb5dd97d161f06b57/orderData")
        .then((res) => {
         for(let i=0;i<res.data.length;i++)
         {
          if(newOrder.dish === res.data[i].dish)
          {
            id= res.data[i]._id;
          }
         }
         axios.delete(`https://crudcrud.com/api/4b0f0f35eaa54e0cb5dd97d161f06b57/orderData/${id}`)
        .then(res => console.log('deleted item'))
        .catch(err=> console.log(err));
        }).catch(err=> console.log(err));


        if(newOrder.table == 'table1')
        {
            table1List.removeChild(listItem);
        }
        else if(newOrder.table == 'table2')
        {
            table2List.removeChild(listItem);
        }
        else if(newOrder.table == 'table3')
        {
            table3List.removeChild(listItem);
        }
    }

      

}
