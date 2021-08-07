import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'RestConnector',
  connector: 'rest',
  baseURL: '',
  crud: false,
  operations: [
    {
      "template": {
        "method": "GET",
        "url": "{url}",
        "fullResponse": true
      },
      "functions": {
        "getUrlContent": [
          "url"
        ]
      },
    }
  ]
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class RestConnectorDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'RestConnector';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.RestConnector', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
