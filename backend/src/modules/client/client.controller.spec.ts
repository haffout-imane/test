import { Body, Controller, Get, Post, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  createClient(@Body() data: CreateClientDto) {
    return this.clientService.createClient(data);
  }

  @Get()
  getAllClients() {
    return this.clientService.getAllClients();
  }

  @Get(':id')
  getClientById(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.getClientById(id);
  }

  @Delete(':id')
  deleteClient(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.deleteClient(id);
  }
}
