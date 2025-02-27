import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from './address.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('AddressService', () => {
  let service: AddressService;
  let prisma: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressService, PrismaService, JwtService],
    }).compile();

    service = module.get<AddressService>(AddressService);
    prisma = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('upsertAddress', () => {
    it('should create a new address if not exists', async () => {
      const token = 'valid.token.here';
      const decodedToken = { sub: 'user-id-123' };
      const createAddressDto = {
        userId: decodedToken.sub,
        addressLine1: '123 Main St',
        addressLine2: '',
        city: 'Sample City',
        state: 'Sample State',
        zipCode: '12345',
        country: 'Sample Country',
      };

      jest.spyOn(jwtService, 'verify').mockReturnValue(decodedToken);

      jest.spyOn(prisma.address, 'findUnique').mockResolvedValue(null);

      const createdAddress = { ...createAddressDto, id: 'address-id-123' };
      jest.spyOn(prisma.address, 'create').mockResolvedValue(createdAddress);

      const result = await service.upsertAddress(token, createAddressDto);

      expect(result).toEqual(createdAddress);
      expect(prisma.address.create).toHaveBeenCalledWith({
        data: { ...createAddressDto, userId: decodedToken.sub },
      });
    });

    it('should update the address if it exists', async () => {
      const token = 'valid.token.here';
      const decodedToken = { sub: 'user-id-123' };
      const updateAddressDto = {
        userId: decodedToken.sub,
        addressLine1: '456 Updated St',
        addressLine2: '',
        city: 'Updated City',
        state: 'Updated State',
        zipCode: '67890',
        country: 'Updated Country',
      };

      jest.spyOn(jwtService, 'verify').mockReturnValue(decodedToken);

      const existingAddress = {
        id: 'address-id-123',
        userId: decodedToken.sub,
        addressLine1: '123 Main St',
        addressLine2: '',
        city: 'Sample City',
        state: 'Sample State',
        zipCode: '12345',
        country: 'Sample Country',
      };
      jest
        .spyOn(prisma.address, 'findUnique')
        .mockResolvedValue(existingAddress);

      const updatedAddress = { ...updateAddressDto, id: 'address-id-123' };
      jest.spyOn(prisma.address, 'update').mockResolvedValue(updatedAddress);

      const result = await service.upsertAddress(token, updateAddressDto);

      expect(result).toEqual(updatedAddress);
      expect(prisma.address.update).toHaveBeenCalledWith({
        where: { userId: decodedToken.sub },
        data: updateAddressDto,
      });
    });
  });

  describe('getAddress', () => {
    it('should return the address for the user', async () => {
      const token = 'valid.token.here';
      const decodedToken = { sub: 'user-id-123' };

      jest.spyOn(jwtService, 'verify').mockReturnValue(decodedToken);

      const existingAddress = {
        id: 'address-id-123',
        userId: decodedToken.sub,
        addressLine1: '123 Main St',
        addressLine2: '',
        city: 'Sample City',
        state: 'Sample State',
        zipCode: '12345',
        country: 'Sample Country',
      };
      jest
        .spyOn(prisma.address, 'findUnique')
        .mockResolvedValue(existingAddress);

      const result = await service.getAddress(token);

      expect(result).toEqual(existingAddress);
    });

    it('should throw NotFoundException if no address exists', async () => {
      const token = 'valid.token.here';
      const decodedToken = { sub: 'user-id-123' };

      jest.spyOn(jwtService, 'verify').mockReturnValue(decodedToken);

      jest.spyOn(prisma.address, 'findUnique').mockResolvedValue(null);

      await expect(service.getAddress(token)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw UnauthorizedException for invalid token', async () => {
      const token = 'invalid.token.here';

      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new Error('Token inválido');
      });

      await expect(service.getAddress(token)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
