import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Place {
    @Prop({ name: 'country', nullable: true })
    country: string

    @Prop({ name: 'place', nullable: true })
    place: string

    @Prop({ name: 'goal', nullable: true })
    goal: string

    @Prop({ name: 'urlFlag', nullable: true })
    urlFlag?: string

    @Prop({ nullable: true })
    registerDate?: Date

    @Prop({ nullable: true })
    lastModifyDate?: Date
}

export const PlaceSchema = SchemaFactory.createForClass(Place)
