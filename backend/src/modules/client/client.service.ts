import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async createClient(data: CreateClientDto) {
    return this.prisma.client.create({
      data: {
        name: data.name,
        email: data.email,
        domains: {
          create: data.domains.map((domain) => ({ name: domain })),
        },
      },
      include: { domains: true }, // Return the domains as well
    });
  }

  async getAllClients() {
    return this.prisma.client.findMany({
      include: { domains: true },
    });
  }

  async getClientById(id: number) {
    return this.prisma.client.findUnique({
      where: { id },
      include: { domains: true },
    });
  }

  async deleteClient(id: number) {
    return this.prisma.client.delete({
      where: { id },
    });
  }
}
