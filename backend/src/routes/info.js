// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from '../models/info'

exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter
    const mealFilter  = req.query.mealFilter
    const typeFilter  = req.query.typeFilter
    const sortBy      = req.query.sortBy
    /****************************************/

    // NOTE Hint: 
    // use `db.collection.find({condition}).exec(err, data) {...}`
    //console.log(priceFilter, mealFilter, typeFilter, sortBy)
    //console.log(priceFilter);
    let oneDollar = true
    let twoDollar =true;
    let threeDollar= true;
    if(priceFilter===undefined) {
        oneDollar=twoDollar=threeDollar=false
    }else {
        oneDollar = priceFilter.includes('$')  ? true : false;
        twoDollar = priceFilter.includes('$$')  ? true : false;
        threeDollar = priceFilter.includes('$$$')  ? true : false;
    }
    
    
    
    const filter = (data) => {
        const content = [];
        for(let i=0; i<data.length; i++){
            let haveDes = false;
            let meal = mealFilter===undefined ? '': mealFilter;
            let type = typeFilter===undefined ? '': typeFilter;
            let typebool=false; let mealbool=false;  let pricebool=false;
            
            for(let j=0; j<data[i].tag.length; j++){
                if((meal.includes(data[i].tag[j]))) {
                    mealbool=true
                }
            }
            if(meal==='') mealbool=true

            for(let j=0; j<data[i].tag.length; j++){
                if((type.includes(data[i].tag[j]))) {
                    typebool=true
                }
            }
            if(type==='') typebool=true

            if((oneDollar&&data[i].price===1)||(twoDollar&&data[i].price===2)||(threeDollar&&data[i].price===3))
                pricebool=true

            if(!oneDollar&&!twoDollar&&!threeDollar) pricebool=true

            if(mealbool&&typebool&&pricebool){
                content.push(data[i]);
            }
        }
        return content
    }

    if(priceFilter===undefined&&mealFilter===undefined&&typeFilter===undefined) {
        //console.log(sortBy)
        if(sortBy==='price'){

            Info.find({}).sort({price:1}).exec((err, data) => {
                if(err){
                    console.log(err)
                    res.status(403).send({ message: 'error', contents: data })
                    return
                }else {
                    //console.log('data2',data)
                    res.status(200).send({ message: 'success', contents: data })
                    return
                }
            })
        }else {
            Info.find({}).sort({distance:1}).exec((err, data) => {
                if(err){
                    console.log(err)
                    res.status(403).send({ message: 'error', contents: data })
                    return
                }else {
                    //console.log('data2',data)
                    res.status(200).send({ message: 'success', contents: data })
                    return
                }
            }) 
        }
    }else {
        if(sortBy==='price'){
        Info.find({}).sort({price:1}) 
        .exec((err, data)=> {
                if(err){
                    console.log(err)
                    res.status(403).send({ message: 'error', contents: data })
                }else {
                    //console.log('data',data)
                    let a = filter(data)
                    //console.log('len: ', a.length)
                    res.status(200).send({ message: 'success', contents: filter(data) })
                }
            }
        )
        }else {
            Info.find({}).sort({distance:1})
            .exec((err, data)=> {
                    if(err){
                        console.log(err)
                        res.status(403).send({ message: 'error', contents: data })
                    }else {
                        //console.log('data',data)
                        res.status(200).send({ message: 'success', contents: filter(data) })
                    }
                }
            )
        }
    }
    // When success, 
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })` 
    

    // TODO Part I-3-a: find the information to all restaurants
    
    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy

}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/

    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
        Info.find({ id: id})
        .exec((err, data)=> {
            if(err){
                console.log(err)
                res.status(403).send({ message: 'error', contents: data })
            }else {
                //console.log('data',data)
                data = {
                    name: data[0].name,
                    distance: data[0].distance,
                    tag : data[0].tag,
                    price: data[0].price,
                    time: data[0].time
                };
                //console.log(data)
                res.status(200).send({ message: 'success', contents: data })
            }
        })
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }

    // TODO Part III-2: find the information to the restaurant with the id that the user requests
}