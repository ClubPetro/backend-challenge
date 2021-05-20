import { PlaceUpdateDto } from '../../place/dto/place.update.dto';
import { Place } from '../../place/places.entity';

export default class UsefulTests {
  static giveMeValidPlace(): Place {
    const place = new Place();
    place.id = '1';
    place.country = 'Brasil';
    place.location = 'Bahia';
    place.meta = '2029-06';
    place.url = 'http://test/bandeirabrasil.com.br';
    return place;
  }
  static giveMeInvalidePlace(): Place {
    const place = new Place();
    place.id = '1';
    place.country = 'Brasil';
    place.location = 'Bahia';
    place.meta = '1990-06';
    place.url = 'http://test/bandeirabrasil.com.br';
    return place;
  }
  static giveMeValidePlaceWithDiferentLocation(): Place {
    const place = new Place();
    place.id = '1';
    place.country = 'Brasil';
    place.location = 'São Paulo';
    place.meta = '2025-06';
    place.url = 'http://test/bandeirabrasil.com.br';
    return place;
  }
  static giveMeUpdatePlace(): PlaceUpdateDto {
    const place = new PlaceUpdateDto();
    place.location = 'Disney';
    place.meta = '2040-04';
    return place;
  }
  static giveMeInvalidUpdatePlace(): PlaceUpdateDto {
    const place = new PlaceUpdateDto();
    place.location = 'Disney';
    place.meta = '1999-04';
    return place;
  }
  static giveMeInvalideMeta(): Place {
    const place = new Place();
    place.id = '1';
    place.country = 'Brasil';
    place.location = 'Bahia';
    place.meta = '1990-06';
    place.url = 'http://test/bandeirabrasil.com.br';
    return place;
  }
  static giveMeInvalideMeta2(): Place {
    const place = new Place();
    place.id = '1';
    place.country = 'Brasil';
    place.location = 'Bahia';
    place.meta = '2021-03';
    place.url = 'http://test/bandeirabrasil.com.br';
    return place;
  }
  static giveMeInvalideUpdateMeta(): Place {
    const place = new Place();
    place.id = '1';
    place.country = 'Brasil';
    place.location = 'Bahia';
    place.meta = '2021-02';
    place.url = 'http://test/bandeirabrasil.com.br';
    return place;
  }
}
