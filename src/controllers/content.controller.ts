import {service} from '@loopback/core';
import {get, param} from '@loopback/rest';
import {RetryService} from '../services';

export class ContentController {
  constructor(
    @service(RetryService) private retryService: RetryService,
  ) { }

  @get('/content/url/{url}', {
    responses: {
      '200': {
        description: 'Get url content',
      },
    },
  })
  async getUrlContent(
    @param.path.string('url') url: string,
  ): Promise<Object> {
    return this.retryService.getUrlContent(url);
  }
}
