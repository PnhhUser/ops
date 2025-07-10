import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { PositionService } from './position.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreatePositionDTO } from './dto/create-position.dto';
import { serializeResponse } from 'src/common/serializers/response.serializer';
import { UpdatePositionDTO } from './dto/update-position.dto';
import { RemovePositionDTO } from './dto/remove-position.dto';

@Controller('positions')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async positions() {
    return await this.positionService.getPositions();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async addPosition(@Body() position: CreatePositionDTO) {
    await this.positionService.addPosition(position);

    return serializeResponse({}, 'New position created successfully');
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updatePosition(@Body() position: UpdatePositionDTO) {
    await this.positionService.updatePosition(position);

    return serializeResponse({}, 'Position update successful');
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async removePosition(@Body() position: RemovePositionDTO) {
    await this.positionService.removePosition(position.positionId);

    return serializeResponse({}, 'Position remove successful');
  }
}
