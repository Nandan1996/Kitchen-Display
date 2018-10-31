import { Component, OnInit } from '@angular/core';
import { OrderService, Report } from '../service/order.service';
import { Observable } from 'rxjs';

import * as XLSX from 'xlsx';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.css']
})
export class OrderReportComponent implements OnInit {

  downloading: boolean = false;
  predictionReport$: Observable<Report[]>;
  data: Report[] = [];
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.predictionReport$ = this.orderService.getReport().pipe(tap(res => {
      this.data = res || [];
    }));
  }

  downloadReport() {
    this.downloading = true;
    this.exportAsExcelFile(this.data, "Report");
    this.downloading = false;
  }

  private exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
    XLSX.writeFile(workbook, this.getFileName(excelFileName));
  }

  private getFileName(name: string) {
    return `${name}_export_${new Date().getTime()}.xlsx`;
  }

}
