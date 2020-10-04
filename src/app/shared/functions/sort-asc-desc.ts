// direction = true if asc,  direction = true if desc

export function sortAscDesc(array: Array<any> = [], direction: boolean = true, property: string) {
  const p = property.toLowerCase();
  const sortFn: (a: any, b: any) => any = (a, b) => {
    let value = 0;
    if (a[p] === undefined) { value = -1; } else if (b[p] === undefined) { value = 1; } else { value = a[p] > b[p] ? 1 : (b[p] > a[p] ? -1 : 0); }
    return direction ? (value * -1) : value;
  };
  return array.sort(sortFn);
}
