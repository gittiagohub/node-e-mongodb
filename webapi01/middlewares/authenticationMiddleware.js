const Keymodel = require('../models/keyModel')
module.exports =  (req,res,next)=>{
    // tanto faz, das duas formas consigo acessar a propriedade if(req.headers.['authorization'] ==='123'  ) 
    // if(req.headers.authorization ==='123'  ) 
    // return next();
    // else
    // res.sendStatus(401).json({error: "Usuário não autenticado"})
    
    // if(req.body.username ==='adm' &&
    //    req.body.password ==='123' ) 
    //    return next();
    //    else
    //    res.sendStatus(401).json({error: "Usuário não autenticado"})

    const key =  req.headers['authorization']
    console.log(key)
    const apiKey=  Keymodel.findKey(key.replace('ApiKey ',''));
    
    if (apiKey && apiKey.enabled){
        return next()
    }else
    {
        res.sendStatus(401)
    }

}