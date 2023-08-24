import { Controller, Get, Query } from '@nestjs/common';
import { PlaceService } from './place.service';

@Controller('places')
export class PlaceController {
  constructor(private placeService: PlaceService) {}

  @Get()
  findPlace(@Query('text') text: string) {
    return this.placeService.findPlaceFromText(text);
  }
}
