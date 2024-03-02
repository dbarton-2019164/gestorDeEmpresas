import ExcelJS from "exceljs";
import { response } from "express";
import businessModel from "./business.model.js";

export const businessPOST = async (req, res) => {
  const { name, impactLevel, yearsOfExperience, category } = req.body;
  const business = new businessModel({
    name,
    impactLevel,
    yearsOfExperience,
    category,
  });
  await business.save();
  res.status(200).json({
    business,
  });
};

export const businessGET = async (req, res = response) => {
  const { order } = req.params;

  let sortBy, orderBy;

  switch (parseInt(order)) {
    case 1:
      sortBy = "name";
      orderBy = "asc";
      break;
    case 2:
      sortBy = "name";
      orderBy = "desc";
      break;
    case 3:
      sortBy = "yearsOfExperience";
      orderBy = "asc";
      break;
    case 4:
      sortBy = "yearsOfExperience";
      orderBy = "desc";
      break;
    case 5:
      sortBy = "category";
      orderBy = "asc";
      break;
    case 6:
      sortBy = "category";
      orderBy = "desc";
      break;
    default:
      sortBy = "name";
      orderBy = "asc";
      break;
  }

  try {
    const businesses = await businessModel.find().sort({ [sortBy]: orderBy });

    res.status(200).json({
      businesses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error getting business",
      error: error.message,
    });
  }
};

export const businessPUT = async (req, res) => {
  var uniqueName = true;
  const { id } = req.params;
  var { name, impactLevel, yearsOfExperience, category } = req.body;
  const oldName = businessModel.findOne({ _id: id });

  if (!name) {
    name = oldName.name;
    uniqueName = false;
  }
  if (uniqueName) {
    // Que tire el error solo si el nombre existe pero no en el que estamos editando
    const comparisonname = await businessModel.findOne({ name: name });
    if (comparisonname) {
      if (comparisonname.id !== id) {
        return res.status(400).json({
          msg: `The name ${comparisonname.name} already exists`,
        });
      }
    }

  }
  // No edita el nivel si no es valido
  if (!["Alto", "Medio", "Bajo"].includes(impactLevel)) {
    impactLevel = oldName.impactLevel;
  }
  if (!yearsOfExperience) {
    yearsOfExperience = oldName.yearsOfExperience;
  }
  // No edita la categoria si no es valida
  if (!["IT",
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
    "Agricultura"].includes(category)) {
    category = oldName.category;
  }


  await businessModel.findByIdAndUpdate(id, {
    name: name,
    impactLevel: impactLevel,
    yearsOfExperience: yearsOfExperience,
    category: category,
  });
  res.status(200).json({
    msg: "The business was updated",
  });
};

export const businessReportGET = async (req, res = response) => {
  try {
    const businesses = await businessModel.find();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Businesses");

    worksheet.addRow([
      "Name",
      "Impact Level",
      "Years of experience",
      "Category",
    ]);

    businesses.forEach((business) => {
      worksheet.addRow([
        business.name,
        business.impactLevel,
        business.yearsOfExperience,
        business.category,
      ]);
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="negocios.xlsx"'
    );

    await workbook.xlsx.write(res);

    res.end();
  } catch (error) {
    console.error("Error in businessReportGET:", error);
    return res.status(500).json({
      error: "Error",
    });
  }
};
