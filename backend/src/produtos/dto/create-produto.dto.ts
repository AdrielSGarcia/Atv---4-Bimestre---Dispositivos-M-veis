import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProdutoDto {
  @ApiProperty({
    example: 'Suco de Uva',
    description: 'Nome do produto (mínimo de 2 caracteres)',
  })
  @IsString({ message: 'O nome deve ser um texto' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(2, { message: 'O nome deve ter no mínimo 2 caracteres' })
  nome: string;

  @ApiProperty({
    example: 6.0,
    description: 'Preço unitário do produto (maior que zero)',
  })
  @IsPositive({ message: 'O preço deve ser maior que zero' })
  @IsNumber({}, { message: 'O preço deve ser um valor numérico' })
  @IsNotEmpty({ message: 'O preço é obrigatório' })
  preco: number;

  @ApiProperty({
    example: 10,
    description: 'Quantidade em estoque (inteiro maior ou igual a zero)',
  })
  @Min(0, { message: 'A quantidade deve ser maior ou igual a zero' })
  @IsInt({ message: 'A quantidade deve ser um número inteiro' })
  @IsNotEmpty({ message: 'A quantidade é obrigatória' })
  quantidade: number;

  @ApiProperty({
    example: 1,
    description: 'ID da categoria à qual o produto pertence',
  })
  @IsInt({ message: 'O categoriaId deve ser um número inteiro' })
  @IsNotEmpty({ message: 'O categoriaId é obrigatório' })
  categoriaId: number;
}
