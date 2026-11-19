import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';

@Injectable()
export class ProdutosService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.produto.findMany({
      include: { categoria: true },
      orderBy: { nome: 'asc' },
    });
  }

  async findOne(id: number) {
    const produto = await this.prisma.produto.findUnique({
      where: { id },
      include: { categoria: true },
    });

    if (!produto) {
      throw new NotFoundException(`Produto ${id} não encontrado`);
    }

    return produto;
  }

  async create(dto: CreateProdutoDto) {
    const categoria = await this.prisma.categoria.findUnique({
      where: { id: dto.categoriaId },
    });

    if (!categoria) {
      throw new NotFoundException(`Categoria ${dto.categoriaId} não encontrada`);
    }

    return this.prisma.produto.create({
      data: {
        nome: dto.nome,
        preco: dto.preco,
        quantidade: dto.quantidade,
        categoriaId: dto.categoriaId,
      },
      include: { categoria: true },
    });
  }

  async remove(id: number) {
    const produto = await this.prisma.produto.findUnique({
      where: { id },
      include: {
        categoria: true,
        _count: { select: { movimentacoes: true } },
      },
    });

    if (!produto) {
      throw new NotFoundException(`Produto ${id} não encontrado`);
    }

    if (produto._count.movimentacoes > 0) {
      throw new ConflictException(
        'Não é possível remover um produto que já possui movimentações registradas',
      );
    }

    return this.prisma.produto.delete({
      where: { id },
      include: { categoria: true },
    });
  }
}
