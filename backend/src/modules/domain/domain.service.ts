import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateDomainDto } from './dto/update-domain.dto';
import { CreateDomainDto } from './dto/create-domain.dto';

@Injectable()
export class DomainService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateDomainDto) {
    return this.prisma.domain.create({ data });
  }

  findAll() {
    return this.prisma.domain.findMany({
      include: { client: true },
    });
  }

  getDomainsByClient(clientId: number) {
	return this.prisma.domain.findMany({
		where: { clientId },
	});
	}

  async update(id: number, data: UpdateDomainDto) {
    const existing = await this.prisma.domain.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Domain not found');

    return this.prisma.domain.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.domain.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Domain not found');

    return this.prisma.domain.delete({ where: { id } });
  }
}
