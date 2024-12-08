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
 *               $ref: '#/components/schemas/OrganizationInfo'
 */

router.get("/organizationinfo/:id", OtherRouter.getOrgnizationInfoById);

/**
 * Uploads a file to the "organizations" storage bucket in Supabase.
 *
 * @swagger
 * /api/organization/uploadBeneficiaries:
 *   post:
 *     summary: Subir el archivo al storage Bucket de la organización
 *     tags: [UploadFiles]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: beneficiariesFile
 *                 format: fileExample.pdf
 *                 description: Archivo a subir key(value)
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


/**
 * Uploads a file to the "organizations" storage bucket in Supabase.
 *
 * @swagger
 * /api/organization/uploadCertifications:
 *   post:
 *     summary: Subir el archivo al storage Bucket de la organización
 *     tags: [UploadFiles]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: certificationFile
 *                 format: fileExample.pdf
 *                 description: Archivo a subir key(value)              
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
 *               type: object
 *               properties:
 *                 stateRegistration:
 *                   type: string
 *                 address:
 *                   type: object
 *                   properties:
 *                     city:
 *                       type: string
 *                 representative:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
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
 *           type: string
 *         nameOrganization:
 *           type: string
 *         ruc:
 *           type: string
 *         phone:
 *           type: string
 *         email:
 *           type:
 *         purpose:
 *           type: string
 *         dependentsBenefit:
 *           type: number
 *         motive:
 *           type: string
 *         numPreRegister:
 *           type: number
 */

export default router;
