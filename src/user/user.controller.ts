import { Body, Controller, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { ChangeUserStatusDto, LoginUserDto, RegisterUserDto } from './dto/register-user-dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/')
  public async register(@Body() dto: RegisterUserDto) {
    const res = await this.userService.register(dto)
    return res
  }

  @Post('/login')
  public async login(@Body() dto: LoginUserDto) {
    const res = await this.userService.login(dto)
    return res
  }

  @Get('/search/:query')
  public async search(
    @Param('query') query: string,
    @Query('userName') userName: string
  ) {
    const res = await this.userService.search(query, userName)
    return res
  }

  @Get('/personal/:userId')
  public async getPersonalRooms(@Param('userId') userId: number) {
    const res = await this.userService.getPersonalRooms(userId)
    return res
  }

  @Get('/groups/:userId')
  public async getGroupRooms(@Param('userId') userId: number) {
    const res = await this.userService.getGroupRooms(userId)
    return res
  }

  @Put('/status')
  public async changeUserStatus(@Body() dto: ChangeUserStatusDto) {
    const changed = await this.userService.changeStatus(dto.userId, dto.status)
    return changed
  }
}
