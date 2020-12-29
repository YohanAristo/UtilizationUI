import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilizationService } from 'src/app/service/utilization.service';
import { ActivatedRoute } from '@angular/router';
import { GetChannelServiceListResp } from 'src/app/entity/channel-service/get-channel-service-list-resp';
import { MatTab } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-channel-service',
  templateUrl: './channel-service.component.html',
  styleUrls: ['./channel-service.component.css']
})
export class ChannelServiceComponent implements OnInit {

  channel_id: string;
  getChannelServiceListResp: GetChannelServiceListResp;

  searchKey: string;
  listDataChannelService: MatTableDataSource<any>;
  displayedColumnsChannel: string[] = ['no', 'channel_service_id', 'channel_id', 'service_path', 'method'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private route: ActivatedRoute,
    private utilizationService: UtilizationService) {
   }

  ngOnInit(): void {
    this.channel_id = this.route.snapshot.paramMap.get('id');
    this.loadData();
  }

  loadData(){
    this.utilizationService.getChannelService(this.channel_id)
    .subscribe(data => {
      this.getChannelServiceListResp = data;
      this.listDataChannelService = new MatTableDataSource(this.getChannelServiceListResp.output_schema)
      this.listDataChannelService.sort = this.sort;
      this.listDataChannelService.paginator = this.paginator;
    })
  }

  applyFilter(){
    this.listDataChannelService.filter = this.searchKey.trim();
  }

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }

}
