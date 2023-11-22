import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authSerivce: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) dto: AuthCredentialsDto): Promise<void> {
    return this.authSerivce.signUp(dto);
  }
}
