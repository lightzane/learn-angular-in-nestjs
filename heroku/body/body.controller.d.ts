import { BodyService } from './body.service';
export declare class BodyController {
    private readonly bodyService;
    constructor(bodyService: BodyService);
    submitPOST(data: any): any;
}
