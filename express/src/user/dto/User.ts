/**
 * @swagger
 * definitions:
 *   User:
 *     type: "object"
 *     properties:
 *       id:
 *         type: "integer"
 *         format: "int"
 *         example: 1
 *       name:
 *         type: "string"
 *         example: "Firstname Lastname"
 */
export class User {
  id: number;
  name: string;
}

/**
 * @swagger
 * definitions:
 *   UserInput:
 *     type: "object"
 *     properties:
 *       name:
 *         type: "string"
 *         example: "Firstname Lastname"
 */
export class UserInput {
  readonly name: string;
}
