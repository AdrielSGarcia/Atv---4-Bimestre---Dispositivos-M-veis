import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MovimentacoesService } from './movimentacoes.service';
import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto';

@ApiTags('movimentacoes')
@Controller('movimentacoes')
export class MovimentacoesController {
  constructor(private readonly movimentacoesService: MovimentacoesService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar histórico de movimentações da mais recente para a mais antiga',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de movimentações retornada com sucesso.',
  })
  findAll() {
    return this.movimentacoesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Registrar uma nova movimentação de estoque' })
  @ApiResponse({
    status: 201,
    description: 'Movimentação registrada e estoque atualizado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou estoque insuficiente.',
  })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  create(@Body() createMovimentacaoDto: CreateMovimentacaoDto) {
    return this.movimentacoesService.create(createMovimentacaoDto);
  }
}
