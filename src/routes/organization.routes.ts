import express from "express";
import * as Organization from "../controller/organizationController";
import * as OtherRouter from "../controller/otherRoutes";
import storage from "../storage/storage";

const router = express.Router();

/**
 * @swagger
 * /api/organization/all:
 *   get:
 *     summary: Recuperar todas las organizaciones
 *     tags: [Organization]
 *     responses:
 *       200:
 *         description: Entrega la lista de organizaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Organization'
 */
router.get("/all", Organization.getAllOrganizations);

//From Tickets
/**
 * @swagger
 * /api/organization/organizationinfo:
 *   get:
 *     summary: Recuperar información de la organización
 *     tags: [Organization]
 *     responses:
 *       200:
 *         description: Información de la organización
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Organization'
 */
router.get("/organizationinfo", OtherRouter.getOrganizationInfo);
/**
 * @swagger
 * /api/organization/organizationinfo/{id}:
 *   get:
 *     summary: Recuperar información de la organización por ID
 *     tags: [Organization]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID de la organización
 *     responses:
 *       200:
 *         description: Información de la organización
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 */

router.get("/organizationinfo/:id", OtherRouter.getOrgnizationInfoById);

/**
 * @swagger
 * /api/organization/getCertifications/{filename}:
 *   get:
 *     summary: Obtiene un archivo de certificación
 *     tags: [Files]
 *     description: Descarga un archivo de certificación desde el almacenamiento basado en el nombre de archivo proporcionado.
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: El nombre del archivo a descargar.
 *     responses:
 *       200:
 *         description: Archivo descargado exitosamente.
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Tipo de archivo no soportado.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Tipo de archivo no soportado.
 *       500:
 *         description: Error al obtener el archivo.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Error al obtener el archivo.
 */


/**
 * @swagger
 * /api/organization/getBeneficiaries/{filename}:
 *   get:
 *     summary: Obtiene un archivo de beneficiarios desde el almacenamiento.
 *     tags: [Files]
 *     description: Descarga un archivo de beneficiarios desde el almacenamiento basado en el nombre del archivo proporcionado.
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: El nombre del archivo a descargar.
 *     responses:
 *       '200':
 *         description: Archivo descargado exitosamente.
 *         content:
 *           consumes:
 *              - application/pdf
 *              - image/png
 *           application/pdf:
 *            schema:
 *             type: string
 *             format: binary
 *       '400':
 *         description: Tipo de archivo no soportado.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Tipo de archivo no soportado.
 *       '500':
 *         description: Error al obtener el archivo.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Error al obtener el archivo.
 */


/**
 *
 * @swagger
 * /api/organization/uploadBeneficiaries:
 *   post:
 *     summary: Subir el archivo al storage Bucket de la organización
 *     tags: [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: "El archivo pdf de los beneficiarios, key: beneficiariesFile"
 *             key: 
 *              type: beneficiariesFile
 *              description: "key: beneficiariesFile para subir el archivo"
 *     responses:
 *       200:
 *         description: Archivo subido exitosamente
 *         tags: [Files]
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: La respuesta al subir el archivo
 *                 error:
 *                   type: object
 *                   description: Error al subir el archivo
 *       400:
 *         description: Bad request
 *       500:
 *         description: Error al subir el archivo.
 */


/**
 *
 * @swagger
 * /api/organization/uploadCertifications:
 *   post:
 *     summary: Subir el archivo al storage Bucket de la organización
 *     tags: [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: "El archivo pdf de los cerificados, key: certificationFile"
 *     responses:
 *       200:
 *         description: Archivo subido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: La respuesta al subir el archivo
 *                 error:
 *                   type: object
 *                   description: Error al subir el archivo
 *       400:
 *         description: Bad request
 *       500:
 *         description: Error al subir el archivo.
 */


router.use(storage);

/**
 * @swagger
 * /api/organization/{id}:
 *   get:
 *     summary: Obtener organización por ID
 *     tags: [Organization]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la organización
 *     responses:
 *       200:
 *         description: Organización encontrada
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Organization'
 *       404:
 *         description: Organización no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: Organización no encontrada
 *                   type: string
 */
router.get("/:id", Organization.getOrganizationById);

/**
 * @swagger
 * /api/organization/create:
 *   post:
 *     summary: Crear una nueva organización
 *     tags: [Organization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Organization'
 *     responses:
 *       201:
 *         description: La organización creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 */

router.post("/create", Organization.createOrganization);

/**
 * @swagger
 * /api/organization/{id}:
 *   put:
 *     summary: Actualizar una organización por ID
 *     tags: [Organization]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la organización
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Organization'
 *     responses:
 *       200:
 *         description: La organización actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 */

router.put("/:id", Organization.updatePutOrganization);

/**
 * @swagger
 * /api/organization/update/{id}:
 *   patch:
 *     summary: Actualizar parcialmente una organización por ID
 *     tags: [Organization]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la organización
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Organization'
 *     responses:
 *       200:
 *         description: La organización actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                  type: string
 *                  description: La organización ha sido actualizada correctamente
 *                response:
 *                  type: object
 */

router.patch("/update/:id", Organization.updatePatchOrganization);

/**
 * @swagger
 * /api/organization/delete/{id}:
 *   delete:
 *     summary: Eliminar una organización por ID
 *     tags: [Organization]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la organización
 *     responses:
 *       200:
 *         description: La organización con el id sido eliminada correctamente
 */
router.delete("/delete/:id", Organization.deleteOrganization);

/**
 * @swagger
 * components:
 *   schemas:
 *     Organization:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         nameOrganization:
 *           type: object
 *           properties:
 *             text:
 *               type: string
 *             state:
 *               type: string
 *         ruc:
 *           type: object
 *           properties:
 *             rucText:
 *               type: string
 *             state:
 *               type: string
 *         phone:
 *           type: object
 *           properties:
 *             text:
 *               type: string
 *             state:
 *               type: string
 *         email:
 *           type: object
 *           properties:
 *             text:
 *               type: string
 *             state:
 *               type: string
 *         purpose:
 *           type: object
 *           properties:
 *             text:
 *               type: string
 *             state:
 *               type: string
 *         dependentsBenefit:
 *           type: object
 *           properties:
 *             text:
 *               type: string
 *             state:
 *               type: string
 *         motive:
 *           type: object
 *           properties:
 *             text:
 *               type: string
 *             state:
 *               type: string
 *         numPreRegister:
 *           type: object
 *           properties:
 *             text:
 *               type: string
 *             state:
 *               type: string
 *         address:
 *           type: object
 *           properties:
 *             street:
 *               type: object
 *               properties:
 *                  text:
 *                      type: string
 *                  state:
 *                      type: string
 *             city:
 *               type: object
 *               properties:
 *                  text:
 *                      type: string
 *                  state:
 *                      type: string
 *             neighborhood:
 *               type: object
 *               properties:
 *                  text:
 *                      type: string
 *                  state:
 *                      type: string
 *             province:
 *               type: object
 *               properties:
 *                  text:
 *                      type: string
 *                  state:
 *                      type: string
 *             country:
 *               type: object
 *               properties:
 *                  text:
 *                      type: string
 *                  state:
 *                      type: string
 *             coordinates:
 *               type: object
 *               properties:
 *                 latitude:
 *                      type: number
 *                 longitude:
 *                      type: number
 *             representative:
 *               type: object
 *               properties:
 *                  name:
 *                     type: object
 *                     properties:
 *                       text:
 *                          type: string
 *                       state:
 *                          type: string
 *                  numDoc:
 *                     type: object
 *                     properties:
 *                      text:
 *                         type: string
 *                      state:
 *                         type: string
 *                  role:
 *                     type: object
 *                     properties:
 *                      text:
 *                         type: string
 *                      state:
 *                         type: string
 *                  emailRepresentative:
 *                      type: object
 *                      properties:
 *                       text:
 *                          type: string
 *                       state:
 *                          type: string
 *                  phoneRepresentative:
 *                      type: object
 *                      properties:
 *                       text:
 *                          type: string
 *                       state:
 *                          type: string
 *                  stateRegistration:
 *                     type: string
 * 
 */

export default router;
