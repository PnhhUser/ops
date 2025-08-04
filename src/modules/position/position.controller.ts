import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { PositionService } from './position.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreatePositionDTO } from './dto/create-position.dto';
import { responseSerialize } from 'src/common/serializers/response.serializer';
import { UpdatePositionDTO } from './dto/update-position.dto';
import { PositionModel } from './position.model';

@UseGuards(JwtAuthGuard)
@Controller('positions')
export class PositionController {
  constructor(
    @Inject('IPositionService')
    private readonly positionService: PositionService,
  ) {}

  @Get()
  async positions() {
    const data = await this.positionService.getPositions();

    const models = PositionModel.toModels(data);

    return responseSerialize(models, 'Successfully fetched position list');
  }

  @Post()
  async addPosition(@Body() position: CreatePositionDTO) {
    const created = await this.positionService.addPosition(position);

    const model = PositionModel.toModel(created);

    return responseSerialize(model, 'New position created successfully');
  }

  @Put()
  async updatePosition(@Body() position: UpdatePositionDTO) {
    const updated = await this.positionService.updatePosition(position);

    const model = PositionModel.toModel(updated);

    return responseSerialize(model, 'Position update successful');
  }

  @Delete(':id')
  async removePosition(@Param('id') id: number) {
    await this.positionService.removePosition(id);

    return responseSerialize({}, 'Position remove successful');
  }
}
