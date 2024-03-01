import adminModel from "../admin/admin.model.js";

import businessModel from "../business/business.model.js";

export async function emailExists(correo = "") {
  const user = await adminModel.findOne({ email: correo });
  if (user) {
    throw new Error(`The email ${user.email} already exists`);
  }
}

export async function userExists(correo = "") {
  const user = await adminModel.findOne({ email: correo });
  if (!user) {
    throw new Error(`The email ${user.email} does not exist`);
  }
}

export async function businessExists(name = "") {
  const business = await businessModel.findOne({ name: name });
  if (business) {
    throw new Error(`The name ${business.name} already exists`);
  }
}

export async function impactLevelExists(impactLevel = "") {
  if (
    impactLevel !== "Alto" &&
    impactLevel !== "Medio" &&
    impactLevel !== "Bajo"
  ) {
    throw new Error("Invalid impact level");
  }
}

export async function categoryExists(category = "") {
  const allowedCategories = [
    "IT",
    "Servicios Financieros",
    "Manufactura",
    "Salud",
    "Comercio",
    "Educación",
    "Alimentos",
    "Construcción",
    "Comunicación y entretenimiento",
    "Energía",
    "Transporte",
    "Turismo",
    "Agricultura",
  ];

  if (!allowedCategories.includes(category)) {
    throw new Error("Invalid category");
  }
}
