// const asyncHandler = (fn) =>  async(req,res,next)=>{try{
//     await fn(req,res,next)
// }
// catch(err){res.status(err.code||500).json({
//     success : false,
//     message : err.message
// })}
// }       

const AsyncHandler = (requestHandler)=>{
    (req,res,next) => {
        Promise
        .resolve(requestHandler(res,req,next))
        .catch((err)=> next(err))
    }
}

export {AsyncHandler}