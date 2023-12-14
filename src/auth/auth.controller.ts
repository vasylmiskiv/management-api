import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AccessToken } from './jwt.interface';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authSerivce: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) dto: AuthCredentialsDto): Promise<void> {
    return this.authSerivce.signUp(dto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) dto: AuthCredentialsDto): Promise<AccessToken> {
    return this.authSerivce.signIn(dto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user);
  }
}
