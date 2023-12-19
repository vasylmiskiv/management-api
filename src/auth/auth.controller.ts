import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AccessToken } from './jwt.interface';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authSerivce: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) dto: AuthCredentialsDto,
    @Res() res,
  ): Promise<User> {
    this.authSerivce.signUp(dto);

    return res.status(HttpStatus.CREATED).json({
      message: 'User created',
    });
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) dto: AuthCredentialsDto): Promise<AccessToken> {
    return this.authSerivce.signIn(dto);
  }

  // @Post('/test')
  // @UseGuards(AuthGuard())
  // test(@GetUser() user: User) {
  //   console.log(user);
  // }
}
