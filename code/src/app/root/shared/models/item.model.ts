export interface ItemModel {
  id: number | undefined;
  name: string;
  boxId: number;
  checked: boolean;
  image?: string | null;
}
