class ajaxREQ{

    static get(type,url,startREQ,completeREQ){
        return ajaxREQ.requisicao(type, url,'GET', startREQ,completeREQ);
    }
    static post(type,url,startREQ,completeREQ){
        return ajaxREQ.requisicao(type, url,'POST', startREQ,completeREQ);
    }

    static requisicao(type,url,method, startREQ, completeREQ){
        
        return new Promise((resolve, reject)=>{
            $.ajax({
                url: url,
                type: method,
                dataType: type,
                beforeSend: startREQ,
                success: function(data) {
                    resolve(data);
                },
                complete: completeREQ,
                error: function(err) {
                   reject(err);
                }
            });
        });
    }
}

class ProductsObject{
    constructor(){ 
        
        this.initEvents();
    }

    initEvents(){
        let $class = this
        $class.returnXMLobj((obj)=>{
                console.log(obj.items_data);
                $class.loadProducts(obj.items_data); 
        });   
        
        $class.clickBoxPrimary();
        $class.clickBoxThumb();
        $class.clickAddMoreMore(); 
        $class.removeItem();
        $class.onSubmitForm();
    }

    clickAddMoreMore(){
        let $class = this;
        $('.add_miniaturas').click(function(){
            let parents = $(this).siblings('#items_receive');
            $('body').attr('data_parent',`#${parents[0].id}`).removeAttr('data_change');
            $class.showModalProds();
        });
    }
    changeProd(){
        let $class = this
        $('#items_receive div#change_prod').click(function(){
            $class.showModalProds();
            $(this).parents().each(function(i,e){
                if($(this).attr('id')){
                    if($(e)[0].id.includes('data_parent')){
                        $('body').attr('data_parent', `#${$(e).attr('id')}`);
                    }
                }
            });
        $('body').attr('data_change','true');
        });
    }

    clickBoxPrimary(){
        let $class = this
        $class.moduloForClickThumbAndPrimary('.actions_thumb','div#data_parent_thumb','thumb');
    }
    clickBoxThumb(){
        let $class = this
        $class.moduloForClickThumbAndPrimary('.box_primary','div#data_parent_primary','primary');
    }
    moduloForClickThumbAndPrimary(element, parentsThis, dataElement){
        let $class = this;
        $(element).click(function(){
            var parents = $(this).parents(parentsThis);
            $class.showModalProds();
            $('body').attr('data_parent',`#${parents[0].id}`).attr('data_element',dataElement).removeAttr('data_change');
        
        });
    }


    DOMProducts(inicio, fim, obj){
        let $class = this;
        obj.splice(inicio,fim).forEach(element=>{
            let e = element.info_item
            $('#products-modal .row.wrap-prds').append($class.htmlProductLoad(e));
    });

                                    
        $('div#btn-select-product').unbind().click(function(e){
            let datasetObject = $(this).parents('.product-block').find('input#input-product-dataset')[0].dataset
            let sttr = JSON.stringify(datasetObject);
            let parent = $('body').attr('data_parent');
            if($('body').attr('data_change')){
                    $(`form#form_create_date ${parent} input#data_set`)[0].dataset.select = sttr;
                    $(`form#form_create_date ${parent} input#data_set`).val(`${sttr}`);
                    $(`form#form_create_date ${parent} #getProductHTML`).html($class.htmlProdSelected(datasetObject));
            }else{
                if( parent == '#items_receive'){

                    $(`form#form_create_date ${parent}`).append(`
                    <div id="data_parent_thumb_${datasetObject.sku}" name="thumb">
                        <div class="box_thumbnails">
                            <div class="wrap_dataset">
                                <div class="wrap_date hidden">
                                    <div class="i-date hidden"><input name="thumbMini" class="hidden" type="text" id="data_set" data-select='${sttr}'></div>
                                </div>
                            </div>
                        <div id="getProductHTML">
                            ${$class.htmlProdSelected(datasetObject)}
                        </div> 
                        <div class="action_block">
                        <div id="change_prod"><i class="fas fa-exchange-alt"></i></div>   
                        <div class="remove"><i class="fas fa-trash"></i></div>
                            </div>
                        </div>
                    </div>`);
                    $class.removeItem();
                }else{
                    if($('body').attr('data_element') == 'thumb'){
                        $('.add_miniaturas.off').removeClass('off');
                    }
                        $(`form#form_create_date ${parent} #getProductHTML`).html($class.htmlProdSelected(datasetObject));
                        $(`form#form_create_date ${parent} input#data_set`)[0].dataset.select = sttr;
                        $(`form#form_create_date ${parent} input#data_set`).val(`${sttr}`);
                    
                }  
            }   

            $(`form#form_create_date ${parent}`).addClass('__received').find('.action_block').removeClass('hidden');

            $class.changeProd();
        $class.hideModalProds();
        $('body').removeAttr('data_change').removeAttr('data_parent');

    });	
        
    }
    
    loadProducts(obj){
        let $class = this;
        let inicio = 0;
        let fim = 50;
        $('div#exampleModal').scroll(function() {
            if($('div#exampleModal').scrollTop() + $('div#exampleModal').height() == $('.modal-dialog').height() + 40) {
                inicio + 50
                fim + 100;
                $class.DOMProducts(inicio, fim, obj);
            }
        });
        $class.DOMProducts(inicio, fim, obj);
    }

    removeItem(){
        $('.box_thumbnails .remove').click(function(){
            $(this).parents('[name="thumb"]').remove();
        });
    }

    onSubmitForm(){
        let objForm = {
            dataProd: {
                configList:{},
                principal:{},
                recebe:[]
            }
        }
        $('form#form_create_date').on('submit',function(event){
            //event.preventDefault();
            console.log('submitou');
            [...$(this)[0].elements].forEach(function(item, index){

                if(item.type !== 'submit'){
                    if(item.name !== 'allProds'){
                        if(item.name == 'data_primary'){
                            objForm.dataProd.principal = JSON.parse(item.dataset.select)
                            console.dir(item);
                        }else {
                            objForm.dataProd.recebe.push(JSON.parse(item.dataset.select))
                            console.dir(item);
                        }
                    }
                }
                
            });
            $('#allProds').val(JSON.stringify(objForm));
        });

    }

    returnXMLobj(callback){
        var myOBJECT = {
            store_data: [],
            items_data: []
        };
        ajaxREQ.get('xml','https://www.iluminim.com.br/xml/358fd/googlemerchant.xml',Start=>{
            console.log('startou agor');
        },Finish=>{
            console.log('finalizou agr');
        }).then(obj=>{
                   var xmlOBJ = obj.childNodes[0];
        if( xmlOBJ.childNodes.length === 3 ) {
            var toARRAY = Array.prototype.slice.call(xmlOBJ.childNodes[1].children);
            toARRAY.forEach(function(e,i){
            var indexBox = i - 3;
                if( e.nodeName === 'title' || e.nodeName === 'link' || e.nodeName === 'description'){
                    myOBJECT.store_data.push({
                        type: e.nodeName, text: e.textContent
                    });
                }else if( e.nodeName === 'item') {
                    var toARRAYitem = Array.prototype.slice.call(e.children);
                    myOBJECT.items_data.push({
                        full_text: e.textContent,
                        info_item: {}
    
                    });
                    toARRAYitem.forEach(function(a,b){
                        if( a.nodeName === 'g:installment'){
                            myOBJECT.items_data[indexBox].info_item.installments = {
                            months: `${a.childNodes[0].textContent}`, price_months: `${a.childNodes[1].textContent}`  
                            }

                        }else if(a.nodeName === 'g:image_link'){
                            myOBJECT.items_data[indexBox].info_item[`${a.nodeName}`] = a.textContent.replace('/800x800/','/300x300/');
                        }else{
                            myOBJECT.items_data[indexBox].info_item[`${a.nodeName}`] = a.textContent;
                        }
                    });    
                }
            });
        }
        callback(myOBJECT);
        },err=>{
            return err
        });
    } /* finish object */


    showModalProds(){
        $('button#triggerModal').click();
    } 
    hideModalProds(){
        $('.modal_products button.close').click();
    }


    htmlProductLoad(obj){
        let htmlProd = `
        <div class="col-md-3">
            <div class="product-block">
                <div  class="wrapdataset hidden">
                <input class="hidden" id="input-product-dataset" type="text" data-sku="${obj['g:id']}" data-name="${obj.title}" data-link="${obj.link}" data-image="${obj['g:image_link']}">
                </div>
                <div class="img-product">
                    <div class="wrapimg"><img src="${obj['g:image_link']}" alt="${obj.title}"></div>
                </div>
                <div class="info-product">
                    <div class="name-prod">
                        <span class="txt-name data-toggle="tooltip" data-placement="bottom" title="${obj.title}">${obj.title}</span>
                    </div>
                    <div class="sku-prod">
                        <span class="txt-sku">SKU: ${obj['g:id']}</span>
                    </div>
                </div>
                <div id="btn-select-product"><span>Selecionar</span></div>
            </div>
        </div>`;
        return htmlProd; 
    }

    htmlProdSelected(obj){
        let htmlProd = `
        <div class="prod_select">
            <div class="img_select">
                <img src="${obj.image}" alt="${obj.name}">
            </div>
            <div class="info_select">
                <span class="name_select">${obj.name}</span>
                <span class="sku_select">SKU: ${obj.sku}</span>
            </div>
        </div>`;
        return htmlProd
    }



} /* end class */




const productsObject = new ProductsObject();

