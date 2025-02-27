export class CreateAddressDto {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export class UpdateAddressDto extends CreateAddressDto {}
