import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableModule, MatTable, MatTableDataSource} from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {ButtomReusableComponent} from "../button-reusable/buttom-reusable.component";

@Component({
  selector: 'app-tabla-reusbale',
  standalone: true,
  imports: [MatTableModule,
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule, ButtomReusableComponent],
  templateUrl: './tabla-reusbale.component.html',
  styleUrl: './tabla-reusbale.component.css'
})
export class TablaReusbaleComponent implements  OnInit{
  @Input() data: any[] = [];
  @Input() columns: {key: string, label: string}[] = [];
  @Input() showActions: boolean = false;



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 // @ViewChild(MatTable) table!: MatTable<any>;


  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [];


  constructor() {
    this.dataSource = new MatTableDataSource<any>([]);
    console.log("se inicia el constructor de la tabla")
  }





  ngOnInit() {
    console.log('OnInit - Columns:', this.columns);
    this.initializeColumns();
    // Inicializar dataSource con datos si existen
    if (this.data && this.data.length > 0) {
      console.log("dentro del if de ngonit")
      this.updateDataSource(this.data);
    }
  }



  private initializeColumns() {
    this.displayedColumns = this.columns.map(col => col.key);
    if (this.showActions) {
      this.displayedColumns.push('actions');
    }
    console.log('DisplayedColumns:', this.displayedColumns);
  }



  private updateDataSource(data: any[]) {
    console.log('Updating dataSource with:', data);
    const clientesData = data[0]?.datos || [];
    if (!this.dataSource) {
      console.log("dentro del if de updatingdatasource")
      this.dataSource = new MatTableDataSource<any>();
    }
    this.dataSource.data = clientesData;

    // Actualizar paginator y sort
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  /*export class TablaReusbaleComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() columns: { key: string, label: string }[] = [];
  @Input() showActions: boolean = false;
  @Input() dataProperty?: string; // Nueva propiedad opcional para especificar el nombre de la propiedad de datos

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [];

  constructor() {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit() {
    this.initializeColumns();
    if (this.data && this.data.length > 0) {
      this.updateDataSource(this.data);
    }
  }

  private initializeColumns() {
    this.displayedColumns = this.columns.map(col => col.key);
    if (this.showActions) {
      this.displayedColumns.push('actions');
    }
  }

  private extractData(data: any[]): any[] {
    // Si no hay datos, retornar array vacío
    if (!data || data.length === 0) {
      return [];
    }

    // Si se especificó una propiedad de datos específica
    if (this.dataProperty) {
      // Si los datos están en el primer elemento
      if (data[0] && data[0][this.dataProperty]) {
        return data[0][this.dataProperty];
      }
      // Si los datos están directamente en el array
      const extractedData = data.map(item => item[this.dataProperty]).filter(item => item);
      if (extractedData.length > 0) {
        return extractedData;
      }
    }

    // Si los datos ya son un array plano o no se encontró la propiedad especificada
    // intentar usar los datos directamente
    if (Array.isArray(data)) {
      return data;
    }

    // Si nada más funciona, convertir a array si no lo es
    return Array.isArray(data) ? data : [data];
  }

  private updateDataSource(data: any[]) {
    if (!this.dataSource) {
      this.dataSource = new MatTableDataSource<any>();
    }

    // Procesar los datos usando el método extractData
    const processedData = this.extractData(data);
    this.dataSource.data = processedData;

    // Configurar paginator y sort
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      const currentData = changes['data'].currentValue;
      if (currentData) {
        this.updateDataSource(Array.isArray(currentData) ? currentData : [currentData]);
      }
    }

    if (changes['columns']) {
      this.initializeColumns();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(element: any) {
    console.log('Editar:', element);
  }

  onDelete(element: any) {
    console.log('Eliminar:', element);
  }
}*/




  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  ngOnChanges(changes: SimpleChanges) {
    console.log("se detecto al gun cambio")
    if (changes['data']) {
      console.log("dentro del if de cuando se detectyo un cambio")
      const currentData = changes['data'].currentValue;
      console.log('Data changed:', currentData);
      if (Array.isArray(currentData)) {
        console.log("dentro del segundo if del cuandose detecto un cambio");
        this.updateDataSource(currentData);
      }
    }

    if (changes['columns']) {
      this.initializeColumns();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onEdit(element: any) {
    // Emitir evento de edición
    console.log('Editar:', element);
  }
  onDelete(element: any) {
    // Emitir evento de eliminación
    console.log('Eliminar:', element);
  }
  get tableData() {
    return this.dataSource?.data || [];
  }

  // Aña
  ngDoCheck() {
   // console.log('DoCheck - DataSource data:', this.dataSource?.data);
    //console.log('DoCheck - Table data:', this.tableData);
  }
}


//

























