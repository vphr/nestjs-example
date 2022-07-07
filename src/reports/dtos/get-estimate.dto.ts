import { Expose, Transform } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GetEstimateDto {
  @Expose()
  @IsString()
  make: string;

  @Expose()
  @IsString()
  model: string;

  @Expose()
  @IsNumber()
  @Min(1930)
  @Max(2022)
  @Transform(({ value }) => parseInt(value))
  year: number;

  @Expose()
  @IsLongitude()
  @Transform(({ value }) => parseFloat(value))
  lng: number;

  @Expose()
  @IsLatitude()
  @Transform(({ value }) => parseFloat(value))
  lat: number;

  @Expose()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  @Transform(({ value }) => parseInt(value))
  miles: number;
}
