const {ai} = require('../config/gemini');

exports.review = async (req, res) => {
    const code = req.body.code;
    const error = req.body.error || "";

    if(!code){
        return res.status(400).json({
            success:false,
            message:"Please provide code to review"
        })
    }

    let prompt = `this the code for review \n ${code}`

    if(error!==""){
        prompt = `this the code for review \n ${code} \n and this error come in my code error: ${error}`
    }

    const result  = await ai(prompt);

    return res.status(200).json({
        success:true,
        data:result
    })
}