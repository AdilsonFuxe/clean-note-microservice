import { DeleteNoteRepository } from '@src/data/protocols';
import { DbDeleteNote } from '@src/data/usecases';

const mockDeleteNoteRepository = (): DeleteNoteRepository => {
  class DeleteNoteRepositoryStub implements DeleteNoteRepository {
    async delete(): Promise<void> {
      return await Promise.resolve();
    }
  }
  return new DeleteNoteRepositoryStub();
};

type SutTypes = {
  sut: DbDeleteNote;
  deleteNoteRepositoryStub: DeleteNoteRepository;
};

const makeSut = (): SutTypes => {
  const deleteNoteRepositoryStub = mockDeleteNoteRepository();
  const sut = new DbDeleteNote(deleteNoteRepositoryStub);
  return {
    sut,
    deleteNoteRepositoryStub,
  };
};

describe('DbDeleteNOte UseCase', () => {
  it('Should call DeleteNoteRepository with correct id', async () => {
    const { sut, deleteNoteRepositoryStub } = makeSut();
    const deleteSpy = jest.spyOn(deleteNoteRepositoryStub, 'delete');
    await sut.delete('any_id');
    expect(deleteSpy).toHaveBeenCalledWith('any_id');
  });
});
