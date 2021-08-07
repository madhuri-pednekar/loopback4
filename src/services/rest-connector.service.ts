import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {RestConnectorDataSource} from '../datasources';

export interface RestConnector {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getUrlContent(url: string): Promise<Object>
}

export class RestConnectorProvider implements Provider<RestConnector> {
  constructor(
    // RestConnector must match the name property in the datasource json file
    @inject('datasources.RestConnector')
    protected dataSource: RestConnectorDataSource = new RestConnectorDataSource(),
  ) { }

  value(): Promise<RestConnector> {
    return getService(this.dataSource);
  }
}
