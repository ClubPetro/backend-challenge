import { Test } from '@nestjs/testing';
import { FilesService } from '../files.service';
import File from '../file.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('FilesService', () => {
  let filesService: FilesService;
  let findOne: jest.Mock;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FilesService,
        {
          provide: getRepositoryToken(File),
          useValue: { findOne },
        },
      ],
    }).compile();
    filesService = await module.get(FilesService);
  });
  describe('when getting a user by email', () => {
    describe('and the user is matched', () => {
      let file: File;
      beforeEach(() => {
        const hashedName = 'sdcksdkclsdc12354scdsdc7.jpg';
        file = new File(hashedName);
        findOne.mockReturnValue(Promise.resolve(file));
      });
      it('should return the file', async () => {
        const fetchedFile = await filesService.findOne('1');
        expect(fetchedFile).toEqual(file);
      });
    });
    describe('and the user is not matched', () => {
      beforeEach(() => {
        findOne.mockReturnValue(undefined);
      });
      it('should throw an error', async () => {
        await expect(filesService.findOne('150')).rejects.toThrow();
      });
    });
  });
});
