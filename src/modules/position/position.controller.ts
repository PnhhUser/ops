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
    return responseSerialize(data, 'Successfully fetched position list');
  }

  @Post()
  async addPosition(@Body() position: CreatePositionDTO) {
    await this.positionService.addPosition(position);

    return responseSerialize({}, 'New position created successfully');
  }

  @Put()
  async updatePosition(@Body() position: UpdatePositionDTO) {
    await this.positionService.updatePosition(position);

    return responseSerialize({}, 'Position update successful');
  }

  @Delete(':id')
  async removePosition(@Param('id') id: number) {
    await this.positionService.removePosition(id);

    return responseSerialize({}, 'Position remove successful');
  }
}
