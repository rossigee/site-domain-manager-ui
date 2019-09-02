/**
 * Service to interact with Http cache interceptor
 */

import { Injectable } from '@angular/core';
import { CacheInterceptor } from './cache.interceptor';

@Injectable({
  providedIn: 'root',
})
export class HttpCacheService {
  constructor(private cache: CacheInterceptor) {}

  /**
   * Delete entire cache
   */
  flushAll(): void {
    this.cache.clear();
  }

  /**
   * Delete cache by it's key
   *
   * @param {string} entity Cached url
   */
  flush(entity: string) {
    this.cache.clear(entity);
  }
}
