import { EntityRepository, Repository } from 'typeorm';
import { WorldPlaces } from './worldPlaces.entity';

@EntityRepository(WorldPlaces)
export class WorldPlacesRepository extends Repository<WorldPlaces> {}
