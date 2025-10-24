import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { DomainService } from './domain.service';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';

@Controller('domains')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Post()
  create(@Body() data: CreateDomainDto) {
    return this.domainService.create(data);
  }

  @Get()
  findAll() {
    return this.domainService.findAll();
  }

  @Get('client/:clientId')
  getDomainsByClient(@Param('clientId', ParseIntPipe) clientId: number) {
    return this.domainService.getDomainsByClient(clientId);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDomainDto) {
    return this.domainService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.domainService.remove(id);
  }
}
