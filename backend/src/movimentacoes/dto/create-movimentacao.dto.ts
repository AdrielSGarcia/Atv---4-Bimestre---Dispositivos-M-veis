import { ApiProperty } from '@nestjs/swagger';
import { TipoMovimentacao } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateMovimentacaoDto {
  @ApiProperty({
    example: 1,
    description: 'ID do produto movimentado',
  })
  @IsInt({ message: 'O produtoId deve ser um número inteiro' })
  @IsNotEmpty({ message: 'O produtoId é obrigatório' })
  produtoId: number;

  @ApiProperty({
    enum: TipoMovimentacao,
    example: TipoMovimentacao.ENTRADA,
    description: 'Tipo da movimentação (ENTRADA ou SAIDA)',
  })
  @IsEnum(TipoMovimentacao, {
    message: 'O tipo deve ser ENTRADA ou SAIDA',
  })
  @IsNotEmpty({ message: 'O tipo é obrigatório' })
  tipo: TipoMovimentacao;

  @ApiProperty({
    example: 10,
    description: 'Quantidade movimentada (inteiro maior que zero)',
  })
  @IsPositive({ message: 'A quantidade deve ser maior que zero' })
  @IsInt({ message: 'A quantidade deve ser um número inteiro' })
  @IsNotEmpty({ message: 'A quantidade é obrigatória' })
  quantidade: number;
}
