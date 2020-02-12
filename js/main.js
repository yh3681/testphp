console.log('testing console');

var request = window.indexedDB.open('EXAMPLE_DB', 1);
//creating database

request.onsuccess = function(event){
    console.log("Database created successfully");
    
    //sample products data
    var products = [
        {id:1, name:'Red Men T-Shirt', price:'$3.99'},
        {id:2, name:'Pink Women T-Shirt', price:'$5.99'},
        {id:3, name:'Nike White Shoes', price:'$300'}   
    ];
    
    //get database from event
    var db = event.target.result;
    
    //create transaction from database
    //create table
    var transaction = db.transaction('products', 'readwrite'); //true
    
    //add success event handler for transaction
    //you should also add onerror, onabort event handlers
    transaction.onsuccess = function(event){
        console.log('[transaction] all done!');
    };
  

    //get store from transaction
    var productsStore = transaction.objectStore('products');
    
    //put products data in productsStore
    products.forEach(function(product){
        var db_op_req = productsStore.add(product);
        db_op_req.onsucess = function(event){
            console.log(event.target.result == product.id);//true 
        }
        
        }
        );
 
    //count number of objects in store
    productsStore.count().onsuccess = function(event) {
        console.log('[Transaction - COUNT] number of products in store', event.target.result);
    };
        
    // get product with id 1
    productsStore.get(1).onsuccess = function(event) {
        console.log('[Transaction - GET] product with id 1', event.target.result);
    };
        
    
};

request.onerror = function(event){
    console.log('[onerror]', request.error);
};

request.onupgradeneeded = function(event) {
    var db = event.target.result;
    var productsStore = db.createObjectStore('products', {keyPath: 'id'});
};