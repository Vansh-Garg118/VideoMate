class apierror extends Error{
    constructor(
        statuscode,
        message="Something went wrong",
        error=[],
        stack=""
    ){
        super(message)
        this.statuscode=statuscode
        this.message=message
        this.errors=error
        this.success=false
        this.data=null

        if(stack){
            this.stack=stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {apierror}