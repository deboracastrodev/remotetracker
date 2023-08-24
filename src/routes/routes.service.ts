import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { DirectionService } from 'src/maps/direction/direction.service';

@Injectable()
export class RoutesService {
  constructor(
    private prismaService: PrismaService,
    private directionsService: DirectionService,
  ) {}

  async create(createRouteDto: CreateRouteDto) {
    const { available_travel_modes, geocoded_waypoints, routes } =
      await this.directionsService.getDirections(
        createRouteDto.source_id,
        createRouteDto.destination_id,
      );

    const legs = routes[0].legs[0];
    return this.prismaService.route.create({
      data: {
        name: createRouteDto.name,
        source: {
          name: String(createRouteDto.source_id),
          location: {
            lat: 0,
            lng: 0,
          },
        },
        destination: {
          name: String(createRouteDto.destination_id),
          location: {
            lat: 0,
            lng: 0,
          },
        },
        distance: 0,
        duration: 0,
        directions: JSON.stringify({
          available_travel_modes,
          geocoded_waypoints,
          routes,
        }),
      },
    });
  }

  async findAll() {
    return await this.prismaService.route.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} route`;
  }

  update(id: number, updateRouteDto: UpdateRouteDto) {
    return `This action updates a #${id} route`;
  }

  remove(id: number) {
    return `This action removes a #${id} route`;
  }
}
