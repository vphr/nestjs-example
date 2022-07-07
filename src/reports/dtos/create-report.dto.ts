import { Expose } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReportDto {
  @Expose()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;

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
  year: number;

  @Expose()
  @IsLongitude()
  lng: number;

  @Expose()
  @IsLatitude()
  lat: number;

  @Expose()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  miles: number;
}
