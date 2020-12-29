import { BaseResponse } from '../common/base-response';

export class GetChannelServiceListResp extends BaseResponse{
    output_schema:[
        {
            channel_service_id: string;
            channel_id: string;
            service_path: string;
            method: string;
        }
    ]
}
