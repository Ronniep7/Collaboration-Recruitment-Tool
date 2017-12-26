import { Pipe ,Injectable } from "@angular/core";

@Pipe({
  name: "sort"
})
@Injectable()
export class ArraySortPipe {
  transform(array: any[], field: string): any[] {
    array.sort((a: any, b: any) => {
      if (a[field] < b.MatchPrecetage) {
        return -1;
      } else if (a.MatchPrecetage > b.MatchPrecetage) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}