import { Controller, Get, Query } from '@nestjs/common';
import { DirectionService } from './direction.service';

@Controller('directions')
export class DirectionController {
  constructor(private directionService: DirectionService) {}

  @Get()
  getDirections(
    @Query('originId') placeOriginId: string,
    @Query('destinationId') placeDestinationId: string,
  ) {
    return this.directionService.getDirections(
      placeOriginId,
      placeDestinationId,
    );
  }
}
