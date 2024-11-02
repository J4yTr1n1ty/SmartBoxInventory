import { BoxModel } from '@root/shared/models/box.model';
import { ItemModel } from '@root/shared/models/item.model';

export interface StateModel {
  items: { [itemId: number]: ItemModel };
  boxes: { [boxId: number]: BoxModel };
  indexes: { itemsByBoxId: { [boxId: number]: number[] } };
}
