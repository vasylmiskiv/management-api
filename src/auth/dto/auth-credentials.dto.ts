import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password should be longer than eight characters' })
  @MaxLength(20, {
    message: 'Password should be less than 20 characters',
  })
  // @Matches(/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/, {
  //   message:
  //     'Password should contain minimum eight characters, at least one letter and one number',
  // })
  password: string;
}
