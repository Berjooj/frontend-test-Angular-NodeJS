import { BeerServiceService } from './../../services/beer-service.service';
import { AfterViewInit, Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Beer } from 'src/app/models/beer.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<Beer>();
  columnsToDisplay = ["name", 'category', 'country', 'state'];
  filterSelected = '';

  sortedData: Beer[];

  randomElement: Beer;
  expandedElement: Beer | null;
  isAsc: boolean = true;

  constructor(private beerService: BeerServiceService) {
  }

  ngOnInit(): void {
    this.beerService.read().subscribe(beer => {
      this.dataSource.data = beer;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openWebsite(link: string): void {
    window.open(link, "_blank");
  }

  selectRandom(amount: number) {
    this.beerService.random(amount).subscribe(beer => {
      let index = -1;

      this.dataSource.data.find(function (item, i) {
        if (item.name === beer[0].name) {
          index = i;
          return i;
        }
      });

      if (index != -1) {
        delete this.dataSource.data[index];
        this.dataSource.data.unshift(beer[0]);
        this.filterSelected = "random";
        this.sortData();
      }
    });
  }

  sortData() {
    const data = this.dataSource.data.slice();

    this.dataSource.data = data.sort((a, b) => {

      const isAsc = this.isAsc;
      switch (this.filterSelected) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'category': return compare(a.category, b.category, isAsc);
        case 'country': return compare(a.country, b.country, isAsc);
        case 'state': return compare(a.state, b.state, isAsc);
        case 'random': {
          this.expandedElement = this.dataSource.data[0];
          return 0;
        }
        default: return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
