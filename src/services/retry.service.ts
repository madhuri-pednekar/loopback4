import { /* inject, */ BindingScope, injectable, service} from '@loopback/core';
import {RestConnector, RestConnectorProvider} from './rest-connector.service';

const RETRY_COUNT = 2;
@injectable({scope: BindingScope.TRANSIENT})
export class RetryService {
  constructor(
    @service(RestConnectorProvider) private restConnectorService: RestConnector,

  ) { }

  /*
   * Add service methods here
   */
  async getUrlContent(url: string): Promise<Object> {
    console.log(`fetching.content.from.url.${url}`);
    const urlContent = await this.customInvokeMethod(RETRY_COUNT, this.restConnectorService.getUrlContent, url);
    console.log(`fetching.content.from.url.${url}.success`);
    return Promise.resolve(urlContent);
  }

  /**
   * Custom invoke method to retry a functionality
   * @param retryCount
   * @param fn
   * @param args
   * @returns
   */
  async customInvokeMethod(retryCount: number, fn: Function, ...args: unknown[]) {
    const METHOD_NAME = `retry.service.customInvokeMethod.${fn.name}`;
    const ErrorCodes = [404, 500, 502]
    let retry: boolean, successResponse;
    do {
      try {
        retry = false;
        successResponse = await fn(...args);
      } catch (err) {
        console.error(`${METHOD_NAME}.request.failed.${JSON.stringify(err)}`)
        //custom logic to trigger retry
        if (ErrorCodes.includes(err.statusCode) && retryCount > 0) {
          retry = true;
          console.log(`${METHOD_NAME}.retry.attempt.${retryCount}`);
        }
        else {
          throw err;
        }
      }
    }
    while (retryCount-- > 0 && retry);
    return successResponse.body;
  }
}
