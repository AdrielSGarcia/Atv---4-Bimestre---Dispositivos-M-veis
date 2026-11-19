import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TipoMovimentacao } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto';

@Injectable()
export class MovimentacoesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.movimentacao.findMany({
      include: {
        produto: {
          include: { categoria: true },
        },
      },
      orderBy: [{ criadoEm: 'desc' }, { id: 'desc' }],
    });
  }

  async create(dto: CreateMovimentacaoDto) {
    return this.prisma.$transaction(async (tx) => {
      const produto = await tx.produto.findUnique({
        where: { id: dto.produtoId },
      });

      if (!produto) {
        throw new NotFoundException(`Produto ${dto.produtoId} não encontrado`);
      }

      if (
        dto.tipo === TipoMovimentacao.SAIDA &&
        produto.quantidade < dto.quantidade
      ) {
        throw new BadRequestException(
          `Estoque insuficiente. Disponível: ${produto.quantidade}, solicitado: ${dto.quantidade}`,
        );
      }

      const novaQuantidade =
        dto.tipo === TipoMovimentacao.ENTRADA
          ? produto.quantidade + dto.quantidade
          : produto.quantidade - dto.quantidade;

      await tx.produto.update({
        where: { id: dto.produtoId },
        data: { quantidade: novaQuantidade },
      });

      return tx.movimentacao.create({
        data: {
          produtoId: dto.produtoId,
          tipo: dto.tipo,
          quantidade: dto.quantidade,
        },
        include: {
          produto: {
            include: { categoria: true },
          },
        },
      });
    });
  }
}
