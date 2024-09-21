import Controller from "@App/utils/decorators/controller.decorator";
import { Get } from "@App/utils/decorators/handlers.decorator";
import { Request, Response } from "express";
@Controller("/users")
export default class UserController {
  @Get("/:id")
  public getUser(_req: Request, res: Response) {
    res.json({ message: "Get user by id" });
  }
}
