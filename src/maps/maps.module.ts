import { Module } from '@nestjs/common';
import { PlaceController } from './place/place.controller';
import { PlaceService } from './place/place.service';
import { Client as GoogleMapsClient } from '@googlemaps/google-maps-services-js';
import { DirectionController } from './direction/direction.controller';
import { DirectionService } from './direction/direction.service';

@Module({
  controllers: [PlaceController, DirectionController],
  providers: [
    PlaceService,
    {
      provide: GoogleMapsClient,
      useValue: new GoogleMapsClient({}),
    },
    DirectionService,
  ],
  exports: [DirectionService],
})
export class MapsModule {}
