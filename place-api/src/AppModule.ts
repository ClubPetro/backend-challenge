import { HttpModule, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PlaceController } from './application/v1/PlaceController'
import PlaceService from './service/PlaceService'
import { Place, PlaceSchema } from './domain/model/Place'
import { PlaceRepository } from './repository/PlaceRepository'

@Module({
    imports: [
        HttpModule,

        MongooseModule.forRoot(
            'mongodb+srv://leo:FLtzcDIC3PAGeJ03@projeto-node.yn1uq.mongodb.net/?retryWrites=true&w=majority',
            {
                dbName: 'places-db',
            },
        ),

        MongooseModule.forFeature([
            {
                name: Place.name,
                schema: PlaceSchema,
                collection: 'places',
            },
        ]),
    ],
    controllers: [PlaceController],
    providers: [PlaceService, PlaceRepository],
})
export class AppModule {}
