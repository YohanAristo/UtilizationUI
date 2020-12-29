import { BaseResponse } from '../common/base-response';

export class GetChannelListResp extends BaseResponse{
    output_schema:[
        {
            channel_id: string;
            channel_name: string;
        }
    ]
}
