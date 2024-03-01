import adminModel from "../admin/admin.model.js";



export async function emailExists(correo = "") {
    const user = await adminModel.findOne({ email: correo });
    if (user) {
        throw new Error(`The email ${user.email} already exists`);
    }
  }