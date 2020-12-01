import { NextFunction, Request, Response, Router } from 'express';
import { HttpStatus } from '../common/HttpStatus';
import { NotFoundException } from './exception/NotFoundException';
import { UserService } from './UserService';

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Operations about users
 */
export class UserController {
  readonly router = Router();

  constructor(private readonly userService: UserService) {
    this.router.get('/users', this.getUsers.bind(this));
    this.router.get('/users/:userId', this.getUserById.bind(this));
    this.router.post(
      '/users',
      this.validateUserInput.bind(this),
      this.createUser.bind(this),
    );
    this.router.put(
      '/users/:userId',
      this.validateUserInput.bind(this),
      this.updateUserById.bind(this),
    );
    this.router.delete('/users/:userId', this.removeUserById.bind(this));
  }

  /**
   * @swagger
   * /users:
   *   get:
   *     tags: ["User"]
   *     description: Returns the users
   *     responses:
   *       "200":
   *         description: "Successful operation"
   *         schema:
   *           type: "array"
   *           items:
   *             $ref: "#/definitions/User"
   */
  private getUsers(_req: Request, res: Response): void {
    const users = this.userService.getUsers();
    res.json(users);
  }

  /**
   * @swagger
   * /users/{userId}:
   *   get:
   *     tags: ["User"]
   *     description: Returns found user by id
   *     parameters:
   *     - name: "userId"
   *       in: "path"
   *       description: "ID of user that needs to be fethed"
   *       required: true
   *       type: "integer"
   *     responses:
   *       "200":
   *         description: "Successful operation"
   *         schema:
   *           $ref: "#/definitions/User"
   *       "404":
   *         description: "Not found"
   */
  private getUserById(req: Request, res: Response): void {
    try {
      const { userId } = req.params;
      const user = this.userService.getUserById(Number(userId));

      res.json(user);
    } catch (err) {
      if (err instanceof NotFoundException) {
        res.status(HttpStatus.NOT_FOUND).send(err.message);
      } else throw err;
    }
  }

  /**
   * @swagger
   * /users:
   *   post:
   *     tags: ["User"]
   *     description: Create user
   *     parameters:
   *     - name: "body"
   *       in: "body"
   *       description: "Create user"
   *       required: true
   *       schema:
   *         $ref: "#/definitions/User"
   *     responses:
   *       "201":
   *         description: "Successful operation"
   *         schema:
   *           $ref: "#/definitions/User"
   *       "400":
   *         description: "Bad request"
   */
  private createUser(req: Request, res: Response): void {
    const user = this.userService.createUser(req.body);
    res.status(HttpStatus.CREATED).json(user);
  }

  /**
   * @swagger
   * /users/{userId}:
   *   put:
   *     tags: ["User"]
   *     description: Update user by id
   *     parameters:
   *     - name: "userId"
   *       in: "path"
   *       description: "ID of user that needs to be update"
   *       required: true
   *       type: "integer"
   *     - name: "body"
   *       in: "body"
   *       description: "Update user"
   *       required: true
   *       schema:
   *         $ref: "#/definitions/User"
   *     responses:
   *       "200":
   *         description: "Successful operation"
   *         schema:
   *           $ref: "#/definitions/User"
   *       "400":
   *         description: "Bad request"
   *       "404":
   *         description: "Not found"
   */
  private updateUserById(req: Request, res: Response): void {
    try {
      const { userId } = req.params;
      const user = this.userService.updateUserById(Number(userId), req.body);

      res.json(user);
    } catch (err) {
      if (err instanceof NotFoundException) {
        res.status(HttpStatus.NOT_FOUND).send(err.message);
      } else throw err;
    }
  }

  /**
   * @swagger
   * /users/{userId}:
   *   delete:
   *     tags: ["User"]
   *     description: `Remove found user by id`
   *     parameters:
   *     - name: "userId"
   *       in: "path"
   *       description: "ID of user that needs to be update"
   *       required: true
   *       type: "integer"
   *     responses:
   *       "200":
   *         description: "Successful operation"
   */
  private removeUserById(req: Request, res: Response): void {
    const { userId } = req.params;
    this.userService.removeUserById(Number(userId));

    res.sendStatus(HttpStatus.NO_CONTENT);
  }

  private validateUserInput(req: Request, res: Response, next: NextFunction) {
    try {
      this.userService.validateUserInput(req.body);
      next();
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }
}
