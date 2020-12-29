import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { GetChannelListResp } from 'src/app/entity/channel/get-channel-list-resp';
import { UtilizationService } from 'src/app/service/utilization.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseResponse } from 'src/app/entity/common/base-response';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  searchKey: string;
  listDataChannel: MatTableDataSource<any>;
  displayedColumnsChannel: string[] = ['no', 'channel_id', 'channel_name', 'channel_detail'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  getChannelListResp: GetChannelListResp;
  baseResponse: BaseResponse;

  channelForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private utilizationService: UtilizationService,
    private route: ActivatedRoute,
    private router: Router) {
      this.utilizationService.listen().subscribe((m:any)=>{
        this.loadData();
      })
    }

  ngOnInit(): void {
    this.postChannelForm();
    this.loadData();
  }

  postChannelForm(){
    this.channelForm = this.formBuilder.group({
      channel_name: ['', [Validators.required]]
    })
  }

  loadData(){
    this.utilizationService.getChannel()
      .subscribe(data => {
        this.getChannelListResp = data;
        this.listDataChannel = new MatTableDataSource(this.getChannelListResp.output_schema);
        this.listDataChannel.sort = this.sort;
        this.listDataChannel.paginator = this.paginator;
      })
  }

  onChannelDetail(element){
    this.router.navigate(['channel-detail', element.channel_id], {relativeTo: this.route})
  }

  applyFilter(){
    this.listDataChannel.filter = this.searchKey.trim();
  }

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }

  onCreateChannel(){

  }

  onSubmit(){
    this.utilizationService.postChannel(this.channelForm.value)
      .subscribe(data => {
        this.baseResponse = data;
        this.utilizationService.filter("POST");
        console.log(data);
      })
  }

  onDelete(element){
    this.utilizationService.deleteChannel(element.channel_id)
      .subscribe(data => {
        this.baseResponse = data;
        this.utilizationService.filter("DELETE");
      })
  }

  get f(){
    return this.channelForm.controls;
  }
}
