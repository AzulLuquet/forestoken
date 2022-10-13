// ./src/server/app.controller.ts
import {
  Logger,
  UseFilters,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ParamsInterceptor } from './params.interceptor';
import { ConfigInterceptor } from '../config/config.interceptor';
import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { DefaultErrorFilter } from './default-error.filter';
import { AuthGuard } from '@nestjs/passport';
import account from "../../pages/account";

@Controller()
@UseFilters(new DefaultErrorFilter())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  home() {
    return {};
  }

  @Get('/auth/google/callback')
  @UseGuards(AuthGuard('google'))
  @Render('account')
  async googleAuthRedirect(@Req() req) {
    return this.appService.googleLogin(req);
  }

  @Get('/login')
  @Render('login')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  public login() {
    return {};
  }

  @Get('/home')
  @Render('home')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  public home_user() {
    return {};
  }

  @Get('/acreditacion')
  @Render('acreditacion')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  public acreditacion() {
    return {};
  }

  @Get('/api/blog-posts')
  listBlogPosts() {
    return this.appService.getBlogPosts();
  }

  @Get('/api/blog-posts/:id')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  public getBlogPostById(@Param('id') id: number) {
    Logger.log(`getBlogPostById called with Id ${id}`, AppController.name);
    return this.appService.getBlogPost(id);
  }
}
