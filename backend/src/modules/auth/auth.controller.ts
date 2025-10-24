import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger(AuthController.name);

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Body() loginInput: LoginDto) {
  //   const user = await this.authService.validateUser(
  //     loginInput.email,
  //     loginInput.password,
  //   );

  //   this.logger.log('Logged in successfully');
  //   return this.authService.login(user);
  // }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    // @Body() loginInput: LoginDto,
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    // const user = await this.authService.validateUser(
    //   loginInput.email,
    //   loginInput.password,
    // );
    const user = req.user;

    const access_token = await this.authService.login(user);

    res.cookie('auth_token', access_token, {
      httpOnly: true,
      secure: false, // need to set to true in production with https
      sameSite: 'lax',
      path: '/', // reduces the risk of CSRF attacks
      maxAge: 60 * 60 * 1000, // 1h
    });
    return { message: 'Login successful', user };
  }

  // to revoque jwt here
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('auth_token');
    return { message: 'Logout successful' };
  }

  // 

  // @Get('me')
  // async getMe(@Req() req: Request) {
  //   const token = req.cookies?.['auth_token'];

  //   this.logger.log("HEEEEEEEERE", token);
  //   if (!token)
  //     throw new UnauthorizedException();
    
  //   const payload = await this.authService.verifyToken(token);
  //   const user = await this.authService.validateUserById(payload.sub);

  //   return user;
  // }
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req: any) {
    return req.user;
  }
}
