import { errorHandlerServer } from "../middleware/errorHandler";
import prisma from "../utils/prismaClient";
import { z } from "zod";
import { deletedAndResignIds } from "./updateOrderDatabase";

export const fetchAllOrganizations = async () => {
  const selectFields = {
    select: {
      text: true,
      state: true
    }
  }
  try {
    const organizations = await prisma.organization.findMany({
      select: {
        id: true,
        nameOrganization: selectFields,
        ruc: {
          select: {
            rucText: true,
            state: true
          }
        },
        phone: selectFields,
        email: selectFields,
        purpose: selectFields,
        dependentsBenefit: selectFields,
        motive: selectFields,
        numPreRegister: selectFields,
        address: {
          select: {
            street: selectFields,
            city: selectFields,
            neighborhood: selectFields,
            province: selectFields,
            country: selectFields,
          }
        },
        coordinates: {
          select: {
            latitude: true,
            longitude: true
          }
        },
        representative: {
          select: {
            name: selectFields,
            numDoc: selectFields,
            role: selectFields,
            emailRepresentative: selectFields,
            phoneRepresentative: selectFields,
          }
        },
        stateRegistration: true
      }
    });
    return organizations;
  } catch (error: any) {
    console.error("Error al obtener las organizaciones", error);
    return [];
  }
};

const createNestedField = (field: any) => ({
  create: {
    text: field.text,
    state: field.state,
  },
});

const createAddressField = (field: any) => ({
  create: {
    text: field.text,
    state: field.state,
  },
});

export const createOrganization = async (data: any) => {


  try {
    const {
      nameOrganization,
      ruc,
      phone,
      email,
      purpose,
      dependentsBenefit,
      motive,
      numPreRegister,
      address,
      coordinates,
      representative,
      stateRegistration,
    } = data;

    const newOrganization = await prisma.organization.create({
      data: {
        nameOrganization: createNestedField(nameOrganization),
        ruc: {
          create: {
            rucText: ruc.rucText,
            state: ruc.state,
          },
        },
        phone: createNestedField(phone),
        email: createNestedField(email),
        purpose: createNestedField(purpose),
        dependentsBenefit: createNestedField(dependentsBenefit),
        motive: createNestedField(motive),
        numPreRegister: {
          create: {
            text: parseInt(numPreRegister.text),
            state: numPreRegister.state,
          },
        },
        address: {
          create: {
            street: createAddressField(address.street),
            city: createAddressField(address.city),
            neighborhood: createAddressField(address.neighborhood),
            province: createAddressField(address.province),
            country: createAddressField(address.country),
          },
        },
        coordinates: {
          create: {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          },
        },
        representative: {
          create: {
            name: createNestedField(representative.name),
            numDoc: createNestedField(representative.numDoc),
            role: createNestedField(representative.role),
            emailRepresentative: createNestedField(
              representative.emailRepresentative
            ),
            phoneRepresentative: createNestedField(
              representative.phoneRepresentative
            ),
          },
        },
        stateRegistration,
      },
    });
    return newOrganization;
  } catch (error) {
    throw new Error(
      "No se pudo crear la organización, verifique los campos completos"
    );
  }
};

const updateNestedField = (field: any) => ({
  update: {
    text: field.text,
    state: field.state,
  },
});

const updateAddressField = (field: any) => ({
  update: {
    text: field.text,
    state: field.state,
  },
});

export const putDataOrganization = async (id: number, data: any) => {
  try {
    const {
      nameOrganization,
      ruc,
      phone,
      email,
      purpose,
      dependentsBenefit,
      motive,
      numPreRegister,
      address,
      coordinates,
      representative,
      stateRegistration,
    } = data;

    const updatedOrganization = await prisma.organization.update({
      where: {
        id: id, // Aquí puedes usar la variable id para actualizar la organización específica
      },
      data: {
        nameOrganization: updateNestedField(nameOrganization),
        ruc: {
          update: {
            rucText: ruc.rucText,
            state: ruc.state,
          },
        },
        phone: updateNestedField(phone),
        email: updateNestedField(email),
        purpose: updateNestedField(purpose),
        dependentsBenefit: updateNestedField(dependentsBenefit),
        motive: updateNestedField(motive),
        numPreRegister: {
          update: {
            text: parseInt(numPreRegister.text),
            state: numPreRegister.state,
          },
        },
        address: {
          update: {
            street: updateAddressField(address.street),
            city: updateAddressField(address.city),
            neighborhood: updateAddressField(address.neighborhood),
            province: updateAddressField(address.province),
            country: updateAddressField(address.country),
          },
        },
        coordinates: {
          update: {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          },
        },
        representative: {
          update: {
            name: updateNestedField(representative.name),
            numDoc: updateNestedField(representative.numDoc),
            role: updateNestedField(representative.role),
            emailRepresentative: updateNestedField(
              representative.emailRepresentative
            ),
            phoneRepresentative: updateNestedField(
              representative.phoneRepresentative
            ),
          },
        },
        stateRegistration,
      }
    });
    
    return updatedOrganization;
  } catch (error: any) {
    throw new Error("No se pudo actualizar la organización");
  }
};

export const patchDataOrganization = async (id: number, data: any) => {
  try {
    const updatedData = createPrismaUpdateObject(data);

    if (!updatedData) {
      throw new Error("Datos no validos para actualizar");
    }

    const updatedOrganization = await prisma.organization.update({
      where: { id },
      data: updatedData,
    });
    return updatedOrganization;
  } catch (error: any) {
    console.error("Error al actualizar la organización", error);
    throw new Error("No se pudo actualizar la organización");
  }
};

function createPrismaUpdateObject(data: any) {
  const updateData: { [key: string]: any } = {};

  for (const key in data) {
    if (
      data[key] &&
      typeof data[key] === "object" &&
      !Array.isArray(data[key])
    ) {
      if (
        key === "nameOrganization" ||
        key === "ruc" ||
        key === "phone" ||
        key === "email" ||
        key === "purpose" ||
        key === "dependentsBenefit" || // Asegúrate de que el nombre del campo sea correcto
        key === "motive" ||
        key === "numPreRegister" ||
        key === "address" ||
        key === "coordinates" ||
        key === "representative"
      ) {
        updateData[key] = {
          upsert: {
            create: createPrismaUpdateObject(data[key]), // Llamada recursiva para objetos anidados
            update: createPrismaUpdateObject(data[key]),
          },
        };
      } else {
        updateData[key] = {
          upsert: {
            create: data[key],
            update: data[key],
          },
        };
      }
    } else if (data[key] !== undefined && data[key] !== null) {
      updateData[key] = data[key];
    }
  }

  return Object.keys(updateData).length ? updateData : undefined;
}

export const deleteOrganizationData = async (id: number) => {
  try {
    await prisma.$transaction(async (prisma) => {
      const deletedOrganization = await deletedAndResignIds(id);
      return deletedOrganization;
    });
  } catch (error: any) {
    console.error("Error al eliminar la organización", error);
    throw new Error("No se pudo eliminar la organización");
  }
};
