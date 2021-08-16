export interface DeleteNote {
  delete: (id: string) => Promise<void>;
}
