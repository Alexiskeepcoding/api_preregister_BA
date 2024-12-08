import { errorHandlerServer } from "../middleware/errorHandler";
import prisma from "../utils/prismaClient";
import { z } from "zod";
import { deletedAndResignIds } from "./updateOrderDatabase";

export const fetchAllOrganizations = async () => {
  try {
    return await prisma.organization.findMany({
      select: {
        nameOrganization: {
          select: {
            text: true,
            state: true,
          },
        },
        ruc: {
          select: {
            rucText: true,
            state: true
          },
        },
        phone: {
          select: {
            text: true,
            state: true,
          },
        },
        email: {
          select: {
            text: true,
            state: true,
          },
        },
        purpose: {
          select: {
            text: true,
            state: true,
          },
        },
        motive: {
          select: {
            text: true,
            state: true,
          },
        },
        numPreRegister: {
          select: {
            text: true,
            state: true,
          },
        },
        address: {
          include: {
            street: {
              select: {
                text: true,
                state: true,
              },
            },
            city: {
              select: {
                text: true,
                state: true,
              },
            },
            neighborhood: {
              select: {
                text: true,
                state: true,
              },
            },
            province: {
              select: {
                text: true,
                state: true,
              },
            },
            country: {
              select: {
                text: true,
                state: true,
              },
            },
          },
        },
        coordinates: {
          select: {
            latitude: true,
            longitude: true,
          },
        },
        representative: {
          select: {
            name: {
              select: {
                text: true,
                state: true,
              },
            },
            numDoc: {
              select: {
                text: true,
                state: true,
              },
            },
            role: {
              select: {
                text: true,
                state: true,
              },
            },
            emailRepresentative: {
              select: {
                text: true,
                state: true,
              },
            },
            phoneRepresentative: {
              select: {
                text: true,
                state: true,
              },
            },
          },
        },
      },
    });
  } catch (error: any) {
    console.error("Error al obtener las organizaciones", error);
    return [];
  }
};

export const createOrganization = async (data: any) => {
  try {
    const newOrganization = await prisma.organization.create({
      data: {
        nameOrganization: {
          create: {
            text: data.nameOrganization.text,
            state: data.nameOrganization.state,
          },
        },
        ruc: {
          create: {
            rucText: data.ruc.rucText,
            state: data.ruc.state,
          },
        },
        phone: {
          create: {
            text: data.phone.text,
            state: data.phone.state,
          },
        },
        email: {
          create: {
            text: data.email.text,
            state: data.email.state,
          },
        },
        purpose: {
          create: {
            text: data.purpose.text,
            state: data.purpose.state,
          },
        },
        dependentsBenefit: {
          create: {
            text: data.dependentsBenefit.text,
            state: data.dependentsBenefit.state,
          },
        },
        motive: {
          create: {
            text: data.motive.text,
            state: data.motive.state,
          },
        },
        numPreRegister: {
          create: {
            text: parseInt(data.numPreRegister.text),
            state: data.numPreRegister.state,
          },
        },
        address: {
          create: {
            street: {
              create: {
                text: data.address.street.text,
                state: data.address.street.state,
              },
            },
            city: {
              create: {
                text: data.address.city.text,
                state: data.address.city.state,
              },
            },
            neighborhood: {
              create: {
                text: data.address.neighborhood.text,
                state: data.address.neighborhood.state,
              },
            },
            province: {
              create: {
                text: data.address.province.text,
                state: data.address.province.state,
              },
            },
            country: {
              create: {
                text: data.address.country.text,
                state: data.address.country.state,
              },
            },
          },
        },
        coordinates: {
          create: {
            latitude: data.coordinates.latitude,
            longitude: data.coordinates.longitude,
          },
        },
        representative: {
          create: {
            name: {
              create: {
                text: data.representative.name.text,
                state: data.representative.name.state,
              },
            },
            numDoc: {
              create: {
                text: data.representative.numDoc.text,
                state: data.representative.numDoc.state,
              },
            },
            role: {
              create: {
                text: data.representative.role.text,
                state: data.representative.role.state,
              },
            },
            emailRepresentative: {
              create: {
                text: data.representative.emailRepresentative.text,
                state: data.representative.emailRepresentative.state,
              },
            },
            phoneRepresentative: {
              create: {
                text: data.representative.phoneRepresentative.text,
                state: data.representative.phoneRepresentative.state,
              },
            },
          },
        },

        stateRegistration: data.stateRegistration,
      },
    });
    return newOrganization;
  } catch (error) {
    throw new Error(
      "No se pudo crear la organización, verifique los campos completos"
    );
  }
};

export const putDataOrganization = async (id: number, data: any) => {
  try {
    const updatedOrganization = await prisma.organization.update({
      where: {
        id: id, // Aquí puedes usar la variable id para actualizar la organización específica
      },
      data: {
        nameOrganization: {
          update: {
            text: data.nameOrganization.text,
            state: data.nameOrganization.state,
          },
        },
        ruc: {
          update: {
            rucText: data.ruc.rucText,
            state: data.ruc.state,
          },
        },
        phone: {
          update: {
            text: data.phone.text,
            state: data.phone.state,
          },
        },
        email: {
          update: {
            text: data.email.text,
            state: data.email.state,
          },
        },
        purpose: {
          update: {
            text: data.purpose.text,
            state: data.purpose.state,
          },
        },
        dependentsBenefit: {
          create: {
            text: data.dependentsBenefit.text,
            state: data.dependentsBenefit.state,
          },
        },
        motive: {
          update: {
            text: data.motive.text,
            state: data.motive.state,
          },
        },
        numPreRegister: {
          update: {
            text: parseInt(data.numPreRegister.text),
            state: data.numPreRegister.state,
          },
        },
        address: {
          update: {
            street: {
              update: {
                text: data.address.street.text,
                state: data.address.street.state,
              },
            },
            city: {
              update: {
                text: data.address.city.text,
                state: data.address.city.state,
              },
            },
            neighborhood: {
              update: {
                text: data.address.neighborhood.text,
                state: data.address.neighborhood.state,
              },
            },
            province: {
              update: {
                text: data.address.province.text,
                state: data.address.province.state,
              },
            },
            country: {
              update: {
                text: data.address.country.text,
                state: data.address.country.state,
              },
            },
          },
        },
        coordinates: {
          update: {
            latitude: data.coordinates.latitude,
            longitude: data.coordinates.longitude,
          },
        },
        representative: {
          update: {
            name: {
              update: {
                text: data.representative.name.text,
                state: data.representative.name.state,
              },
            },
            numDoc: {
              update: {
                text: data.representative.numDoc.text,
                state: data.representative.numDoc.state,
              },
            },
            role: {
              update: {
                text: data.representative.role.text,
                state: data.representative.role.state,
              },
            },
            emailRepresentative: {
              update: {
                text: data.representative.emailRepresentative.text,
                state: data.representative.emailRepresentative.state,
              },
            },
            phoneRepresentative: {
              update: {
                text: data.representative.phoneRepresentative.text,
                state: data.representative.phoneRepresentative.state,
              },
            },
          },
        },
        stateRegistration: data.stateRegistration,
      },
    });
    return updatedOrganization;
  } catch (error: any) {
    console.error("Error al actualizar la organización", error);
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
