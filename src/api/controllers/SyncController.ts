import { Require } from 'typedi';
// import * as request from 'request';

import { JsonController, Get, Req } from 'routing-controllers';
import { Logger, LoggerInterface } from '../../decorators/Logger';

@JsonController('/sync')
export class SyncController {

    // private httpRequest: typeof request;

    constructor(
        @Require('request') r: any,
        @Logger(__filename) private log: LoggerInterface
    ) {
        // this.httpRequest = r;
    }

    @Get('/players')
    public syncPlayers( @Req() req: any): any {
        this.log.info('syncPlayers', req.session);
        return {
            success: true,
            user: req.user,
        };
        // this.httpRequest({
        //     method: 'GET',
        //     url: 'http://chpp.hattrick.org/chppxml.ashx',
        // },
        //     (error, response, body) => {
        //         if (error) {
        //             return this.log.error(error);
        //         }
        //         this.log.info(body);
        //     });

    }

}
