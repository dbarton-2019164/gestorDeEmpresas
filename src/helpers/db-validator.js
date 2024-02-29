import adminModel from "../admin/admin.model.js";

export const emailExists = async (email = "") => {
    const emailExists = await adminModel.findOne({email: emailExists});
    if(emailExists){
        throw new Error(`The email ${email} already exists`);
    }
}

