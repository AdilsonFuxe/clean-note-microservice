export interface DeleteNoteRepository {
  delete: (id: string) => Promise<void>;
}
