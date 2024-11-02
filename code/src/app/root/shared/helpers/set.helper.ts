export class SetHelper {
  public static add<TType>(list: TType[], toAdd: TType): TType[] {
    const index = this.findPlace(list, toAdd);
    const item = list[index];
    const replace = item != toAdd;
    list.splice(index, replace ? 0 : 1, toAdd);
    return list;
  }

  public static addRange<TType>(list: TType[], toAdd: TType[]): TType[] {
    for (const value of toAdd) {
      this.add(list, value);
    }
    return list;
  }

  public static remove<TType>(list: TType[], toRemove: TType): TType[] {
    const index = this.findIndex(list, toRemove);

    list.splice(index, 1);

    return list;
  }

  // https://stackoverflow.com/questions/1344500/efficient-way-to-insert-a-number-into-a-sorted-array-of-numbers
  public static findPlace<TType>(list: TType[], toFind: TType): number {
    var low = 0,
      high = list.length;

    while (low < high) {
      var mid = (low + high) >>> 1;
      if (list[mid] < toFind) low = mid + 1;
      else high = mid;
    }
    return low;
  }

  // https://stackabuse.com/binary-search-in-javascript/
  public static findIndex<TType>(list: TType[], toFind: TType): number {
    let start = 0;
    let end = list.length - 1;

    while (start <= end) {
      let middle = Math.floor((start + end) / 2);

      if (list[middle] == toFind) {
        // found the key
        return middle;
      } else if (list[middle] < toFind) {
        // continue searching to the right
        start = middle + 1;
      } else {
        // search searching to the left
        end = middle - 1;
      }
    }
    // key wasn't found
    return -1;
  }

  public static innerJoin<TType>(list1: TType[], list2: TType[]): TType[] {
    const result: TType[] = [];
    for (const item of list1) {
      if (this.findIndex(list2, item) != -1) {
        this.add(result, item);
      }
    }

    return result;
  }

  public static combine<TType>(...lists: TType[][]): TType[] {
    const result: TType[] = [];
    for (const list of lists) {
      for (const item of list) {
        this.add(result, item);
      }
    }

    return result;
  }
}
