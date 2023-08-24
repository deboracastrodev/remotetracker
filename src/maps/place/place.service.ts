import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Client as GoogleMapsClient,
  PlaceInputType,
} from '@googlemaps/google-maps-services-js';

@Injectable()
export class PlaceService {
  constructor(
    private googleMapsClient: GoogleMapsClient,
    private configService: ConfigService,
  ) {}

  async findPlaceFromText(text: string): Promise<any> {
    const { data } = await this.googleMapsClient.findPlaceFromText({
      params: {
        input: text,
        inputtype: PlaceInputType.textQuery,
        key: this.configService.get<string>('GOOGLE_MAPS_API_KEY'),
        fields: ['place_id', 'formatted_address', 'geometry', 'name'],
      },
    });
    return data;
  }
}
