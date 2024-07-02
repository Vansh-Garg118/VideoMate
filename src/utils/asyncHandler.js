
// const asynchandler=(fn)=>{
//     (req,res,next)=>{
//         Promise
//         .resolve(fn(req,res,next))
//         .reject((err)=>{
//             next(err)
//         })
//     }
// }


// high order function which accept and return function as paarmeter
const asynchandler=(fn)=>async(req,res,next)=>{
    try {
        await fn(req,res,next)
    } catch (error) {
        res.status(error.code||500)
        .json(
            {
                success:false,
                message:error.message
            }
        )
    }
}